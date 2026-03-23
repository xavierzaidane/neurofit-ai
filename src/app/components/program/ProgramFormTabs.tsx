"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, Apple, Clock3, Target } from "lucide-react";
import type { ProgramFormData } from "@/data/samples";

type ProgramFormTabsProps = {
  formData: ProgramFormData;
  setField: (field: keyof ProgramFormData, value: string) => void;
  inputClassName: string;
};

const ProgramFormTabs = ({ formData, setField, inputClassName }: ProgramFormTabsProps) => (
  <Tabs defaultValue="basics" className="w-full">
    <div className="pb-7">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="basics" className="font-mono text-xs md:text-sm">
          <Activity className="size-4" />
          Basics
        </TabsTrigger>

        <TabsTrigger value="goals" className="font-mono text-xs md:text-sm">
          <Target className="size-4" />
          Goals
        </TabsTrigger>

        <TabsTrigger value="nutrition" className="font-mono text-xs md:text-sm">
          <Apple className="size-4" />
          Nutrition
        </TabsTrigger>

        <TabsTrigger value="lifestyle" className="font-mono text-xs md:text-sm">
          <Clock3 className="size-4" />
          Lifestyle
        </TabsTrigger>
      </TabsList>
    </div>

    <div className="relative border border-white/10 bg-white/5 rounded-lg p-6 md:p-8 overflow-hidden">
      <TabsContent value="basics" className="space-y-4">
        <h2 className="text-lg font-mono font-semibold text-white">Basics</h2>
        <h3 className="text-sm font-mono -mt-3 mb-6 text-white/80">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Age</label>
            <input
              className={inputClassName}
              placeholder="e.g. 28"
              value={formData.age}
              onChange={(e) => setField("age", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Height</label>
            <input
              className={inputClassName}
              placeholder="e.g. 175 cm"
              value={formData.height}
              onChange={(e) => setField("height", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Weight</label>
            <input
              className={inputClassName}
              placeholder="e.g. 72 kg"
              value={formData.weight}
              onChange={(e) => setField("weight", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Status</label>
            <Select value={formData.status} onValueChange={(value) => setField("status", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="working-parent">Working Parent</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Gender</label>
            <Select value={formData.gender} onValueChange={(value) => setField("gender", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Body fat % (optional)</label>
            <input
              className={inputClassName}
              placeholder="e.g. 18%"
              value={formData.bodyFat}
              onChange={(e) => setField("bodyFat", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Injuries / limitations</label>
            <textarea
              className={`${inputClassName} min-h-24 resize-none`}
              placeholder="e.g. Lower back pain, avoid heavy deadlifts"
              value={formData.injuries}
              onChange={(e) => setField("injuries", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Country / region</label>
            <input
              className={inputClassName}
              placeholder="e.g. Philippines"
              value={formData.countryRegion}
              onChange={(e) => setField("countryRegion", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">City / region</label>
            <input
              className={inputClassName}
              placeholder="e.g. Quezon City"
              value={formData.cityRegion}
              onChange={(e) => setField("cityRegion", e.target.value)}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="goals" className="space-y-4">
        <h2 className="text-lg font-mono font-semibold text-white">Goals</h2>
        <h3 className="text-sm font-mono -mt-3 mb-6 text-white/80">Fitness Objectives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Fitness goal</label>
            <Select value={formData.fitnessGoal} onValueChange={(value) => setField("fitnessGoal", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="improve-endurance">Improve endurance</SelectItem>
                <SelectItem value="fat-loss">Fat loss</SelectItem>
                <SelectItem value="lean-bulk">Lean bulk</SelectItem>
                <SelectItem value="dirty-bulk">Dirty bulk</SelectItem>
                <SelectItem value="cutting">Cutting</SelectItem>
                <SelectItem value="recomposition">Body recomposition</SelectItem>
                <SelectItem value="strength">Build strength</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Fitness level</label>
            <Select value={formData.fitnessLevel} onValueChange={(value) => setField("fitnessLevel", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Target timeline</label>
            <Select value={formData.targetTimeline} onValueChange={(value) => setField("targetTimeline", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4-weeks">4 Weeks</SelectItem>
                <SelectItem value="8-weeks">8 Weeks</SelectItem>
                <SelectItem value="12-weeks">12 Weeks</SelectItem>
                <SelectItem value="16-plus-weeks">16+ Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Workout days per week</label>
            <Select value={formData.workoutDays} onValueChange={(value) => setField("workoutDays", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Preferred training style</label>
            <Select value={formData.trainingStyle} onValueChange={(value) => setField("trainingStyle", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                <SelectItem value="cardio-conditioning">Cardio + Conditioning</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="nutrition" className="space-y-4">
        <h2 className="text-lg font-mono font-semibold text-white">Nutrition</h2>
        <h3 className="text-sm font-mono -mt-3 mb-6 text-white/80">Caloric and Nutritional Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Daily calories target</label>
            <input
              className={inputClassName}
              placeholder="e.g. 2200 kcal"
              value={formData.dailyCalories}
              onChange={(e) => setField("dailyCalories", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Dietary restrictions</label>
            <textarea
              className={`${inputClassName} min-h-28 resize-none`}
              placeholder="e.g. Lactose intolerant, no shellfish"
              value={formData.dietaryRestrictions}
              onChange={(e) => setField("dietaryRestrictions", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Food allergies</label>
            <input
              className={inputClassName}
              placeholder="e.g. Shellfish, peanuts"
              value={formData.foodAllergies}
              onChange={(e) => setField("foodAllergies", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Protein target (g)</label>
            <input
              className={inputClassName}
              placeholder="e.g. 150"
              value={formData.proteinTarget}
              onChange={(e) => setField("proteinTarget", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Carbs target (g)</label>
            <input
              className={inputClassName}
              placeholder="e.g. 220"
              value={formData.carbsTarget}
              onChange={(e) => setField("carbsTarget", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Fat target (g)</label>
            <input
              className={inputClassName}
              placeholder="e.g. 65"
              value={formData.fatTarget}
              onChange={(e) => setField("fatTarget", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Meals per day</label>
            <Select value={formData.mealsPerDay} onValueChange={(value) => setField("mealsPerDay", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select meals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5-plus">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="lifestyle" className="space-y-4">
        <h2 className="text-lg font-mono font-semibold text-white">Lifestyle</h2>
        <h3 className="text-sm font-mono -mt-3 mb-6 text-white/80">Daily Habits and Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Working Hours</label>
            <input
              className={inputClassName}
              placeholder="e.g. 09:00 - 18:00"
              value={formData.workingHours}
              onChange={(e) => setField("workingHours", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Sleep hours</label>
            <input
              className={inputClassName}
              placeholder="e.g. 7"
              value={formData.sleepHours}
              onChange={(e) => setField("sleepHours", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Stress level</label>
            <Select value={formData.stressLevel} onValueChange={(value) => setField("stressLevel", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select stress level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Preferred workout time</label>
            <Select value={formData.workoutTime} onValueChange={(value) => setField("workoutTime", value)}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-mono uppercase tracking-wide text-white/70">Available equipment</label>
            <input
              className={inputClassName}
              placeholder="e.g. Dumbbells, resistance bands, treadmill"
              value={formData.availableEquipment}
              onChange={(e) => setField("availableEquipment", e.target.value)}
            />
          </div>
        </div>
      </TabsContent>
    </div>
  </Tabs>
);

export default ProgramFormTabs;
