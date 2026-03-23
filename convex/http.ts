import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

const ollamaBaseUrl = process.env.OLLAMA_BASE_URL;
const ollamaModel = process.env.OLLAMA_MODEL;
const ollamaApiKey = process.env.OLLAMA_API_KEY;
const corsOrigin = process.env.CORS_ORIGIN || "*";
const corsHeaders = {
  "Access-Control-Allow-Origin": corsOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const buildOllamaUrl = (path: string) => new URL(path, ollamaBaseUrl).toString();

const buildOllamaHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (ollamaApiKey) {
    headers.Authorization = `Bearer ${ollamaApiKey}`;
  }

  return headers;
};

const extractJson = (content: string) => {
  const trimmed = content.trim();
  const startIndex = trimmed.indexOf("{");
  const endIndex = trimmed.lastIndexOf("}");
  if (startIndex === -1 || endIndex === -1) {
    return trimmed;
  }
  return trimmed.slice(startIndex, endIndex + 1);
};

const callOllamaChat = async (messages: Array<{ role: string; content: string }>) => {
  const response = await fetch(buildOllamaUrl("/api/chat"), {
    method: "POST",
    headers: buildOllamaHeaders(),
    body: JSON.stringify({
      model: ollamaModel,
      messages,
      stream: false,
      format: "json",
      options: {
        temperature: 0.4,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  return data.message.content;
};


http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    return new Response("Webhooks processed successfully", { status: 200 });
  }),
});

// validate and fix workout plan to ensure it has proper numeric types
function validateWorkoutPlan(plan: any) {
  const validatedPlan = {
    schedule: plan.schedule,
    exercises: plan.exercises.map((exercise: any) => ({
      day: exercise.day,
      routines: exercise.routines.map((routine: any) => ({
        name: routine.name,
        sets: typeof routine.sets === "number" ? routine.sets : parseInt(routine.sets) || 1,
        reps: typeof routine.reps === "number" ? routine.reps : parseInt(routine.reps) || 10,
      })),
    })),
  };
  return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: any) {
  // only keep the fields we want
  const validatedPlan = {
    dailyCalories:
      typeof plan.dailyCalories === "number"
        ? plan.dailyCalories
        : parseInt(plan.dailyCalories) || 2000,
    meals: plan.meals.map((meal: any) => ({
      name: meal.name,
      foods: meal.foods,
    })),
  };
  return validatedPlan;
}

function validateGrocerylistPlan(plan: any) {
  const validatedPlan = {
    categories: (plan.categories || []).map((category: any) => ({
      name: category.name,
      items: Array.isArray(category.items) ? category.items : [],
    })),
  };
  return validatedPlan;
}

function validateMacrosPlan(plan: any) {
  const validatedPlan = {
    dailyCalories:
      typeof plan.dailyCalories === "number"
        ? plan.dailyCalories
        : parseInt(plan.dailyCalories) || 2000,
    proteinGrams:
      typeof plan.proteinGrams === "number"
        ? plan.proteinGrams
        : parseInt(plan.proteinGrams) || 120,
    carbsGrams:
      typeof plan.carbsGrams === "number"
        ? plan.carbsGrams
        : parseInt(plan.carbsGrams) || 200,
    fatGrams:
      typeof plan.fatGrams === "number"
        ? plan.fatGrams
        : parseInt(plan.fatGrams) || 60,
  };
  return validatedPlan;
}

http.route({
  path: "/ollama/generate-program",
  method: "OPTIONS",
  handler: httpAction(async () => new Response(null, { status: 204, headers: corsHeaders })),
});

http.route({
  path: "/ollama/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payload = await request.json();

      const {
        user_id,
        age,
        height,
        weight,
        gender,
        status,
        body_fat,
        injuries,
        workout_days,
        training_style,
        target_timeline,
        fitness_goal,
        fitness_level,
        dietary_restrictions,
        food_allergies,
        daily_calories,
        protein_target,
        carbs_target,
        fat_target,
        meals_per_day,
        working_hours,
        sleep_hours,
        stress_level,
        workout_time,
        available_equipment,
        country_region,
        city_region,
      } = payload;

      console.log("Payload is here:", payload);

      const workoutPrompt = `You are an experienced fitness coach creating a personalized workout plan based on:
      Age: ${age}
      Height: ${height}
      Weight: ${weight}
      Gender: ${gender}
      Status: ${status}
      Body fat %: ${body_fat}
      Injuries or limitations: ${injuries}
      Available days for workout: ${workout_days}
      Target timeline: ${target_timeline}
      Fitness goal: ${fitness_goal}
      Fitness level: ${fitness_level}
      Preferred training style: ${training_style}
      Preferred workout time: ${workout_time}
      Available equipment: ${available_equipment}
      Location: ${city_region}, ${country_region}
      Working hours: ${working_hours}
      Sleep hours: ${sleep_hours}
      Stress level: ${stress_level}
      
      As a professional coach:
      - Consider muscle group splits to avoid overtraining the same muscles on consecutive days
      - Design exercises that match the fitness level and account for any injuries
      - Structure the workouts to specifically target the user's fitness goal
      
      CRITICAL SCHEMA INSTRUCTIONS:
      - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
      - "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
      - For example: "sets": 3, "reps": 10
      - Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
      - Instead use specific numbers like "reps": 12 or "reps": 15
      - For cardio, use "sets": 1, "reps": 1 or another appropriate number
      - NEVER include strings for numerical fields
      - NEVER add extra fields not shown in the example below
      
      Return a JSON object with this EXACT structure:
      {
        "schedule": ["Monday", "Wednesday", "Friday"],
        "exercises": [
          {
            "day": "Monday",
            "routines": [
              {
                "name": "Exercise Name",
                "sets": 3,
                "reps": 10
              }
            ]
          }
        ]
      }
      
      DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

      const workoutPlanText = await callOllamaChat([
        {
          role: "system",
          content:
            "Return only valid JSON. Do not include markdown, commentary, or extra keys.",
        },
        { role: "user", content: workoutPrompt },
      ]);

      // VALIDATE THE INPUT COMING FROM AI
      let workoutPlan = JSON.parse(extractJson(workoutPlanText));
      workoutPlan = validateWorkoutPlan(workoutPlan);

      const dietPrompt = `You are an experienced nutrition coach creating a personalized diet plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Fitness goal: ${fitness_goal}
        Fitness level: ${fitness_level}
        Daily calories target (user input): ${daily_calories}
        Dietary restrictions: ${dietary_restrictions}
        Food allergies: ${food_allergies}
        Meals per day: ${meals_per_day}
        Protein target (g): ${protein_target}
        Carbs target (g): ${carbs_target}
        Fat target (g): ${fat_target}
        Location: ${city_region}, ${country_region}
        
        As a professional nutrition coach:
        - Calculate appropriate daily calorie intake based on the person's stats and goals
        - Create a balanced meal plan with proper macronutrient distribution
        - Include a variety of nutrient-dense foods while respecting dietary restrictions
        - Prefer ingredients, meal names, and food choices that are common in the user's location
        - If a food is not locally common, replace it with a realistic local alternative
        - Consider meal timing around workouts for optimal performance and recovery
        
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "dailyCalories" MUST be a NUMBER, not a string
        - DO NOT add fields like "supplements", "macros", "notes", or ANYTHING else
        - ONLY include the EXACT fields shown in the example below
        - Each meal should include ONLY a "name" and "foods" array

        Return a JSON object with this EXACT structure and no other fields:
        {
          "dailyCalories": 2000,
          "meals": [
            {
              "name": "Breakfast",
              "foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
            },
            {
              "name": "Lunch",
              "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
            }
          ]
        }
        
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

      const dietPlanText = await callOllamaChat([
        {
          role: "system",
          content:
            "Return only valid JSON. Do not include markdown, commentary, or extra keys.",
        },
        { role: "user", content: dietPrompt },
      ]);

      // VALIDATE THE INPUT COMING FROM AI
      let dietPlan = JSON.parse(extractJson(dietPlanText));
      dietPlan = validateDietPlan(dietPlan);

      const macrosPrompt = `You are an experienced nutrition coach creating daily macro targets based on this user's personalized diet context:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Fitness goal: ${fitness_goal}
        Fitness level: ${fitness_level}
        Daily calories target: ${dietPlan.dailyCalories}
        Dietary restrictions: ${dietary_restrictions}

        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY these fields: dailyCalories, proteinGrams, carbsGrams, fatGrams
        - ALL values MUST be NUMBERS, never strings
        - Use realistic macro targets for the user's goal and calories

        Return a JSON object with this EXACT structure and no other fields:
        {
          "dailyCalories": 2200,
          "proteinGrams": 160,
          "carbsGrams": 240,
          "fatGrams": 70
        }

        DO NOT add any fields that are not in this example. Your response must be valid JSON with no extra text.`;

      const macrosPlanText = await callOllamaChat([
        {
          role: "system",
          content:
            "Return only valid JSON. Do not include markdown, commentary, or extra keys.",
        },
        { role: "user", content: macrosPrompt },
      ]);

      let macrosPlan = JSON.parse(extractJson(macrosPlanText));
      macrosPlan = validateMacrosPlan(macrosPlan);

      const grocerylistPrompt = `You are an experienced nutrition coach creating a grocery list from this diet plan.
        Daily calories target: ${dietPlan.dailyCalories}
        Meals JSON: ${JSON.stringify(dietPlan.meals)}
        Dietary restrictions: ${dietary_restrictions}
        Location: ${city_region}, ${country_region}

        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY this top-level field: categories
        - categories MUST be an array of objects with ONLY: name, items
        - items MUST be an array of strings
        - Keep grocery items practical and grouped by category
        - Prefer locally common ingredients based on the user's location
        - Replace any uncommon items with realistic local alternatives

        Return a JSON object with this EXACT structure and no other fields:
        {
          "categories": [
            {
              "name": "Proteins",
              "items": ["Chicken breast", "Greek yogurt"]
            },
            {
              "name": "Produce",
              "items": ["Spinach", "Blueberries"]
            }
          ]
        }

        DO NOT add any fields that are not in this example. Your response must be valid JSON with no extra text.`;

      const grocerylistPlanText = await callOllamaChat([
        {
          role: "system",
          content:
            "Return only valid JSON. Do not include markdown, commentary, or extra keys.",
        },
        { role: "user", content: grocerylistPrompt },
      ]);

      let grocerylistPlan = JSON.parse(extractJson(grocerylistPlanText));
      grocerylistPlan = validateGrocerylistPlan(grocerylistPlan);

      // save to our DB: CONVEX
      const planId = await ctx.runMutation(api.plans.createPlan, {
        userId: user_id,
        dietPlan,
        grocerylistPlan,
        isActive: true,
        macrosPlan,
        workoutPlan,
        name: `${fitness_goal || "Custom"} Plan - ${new Date().toLocaleDateString()}`,
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            planId,
            workoutPlan,
            dietPlan,
            grocerylistPlan,
            macrosPlan,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  }),
});

export default http;