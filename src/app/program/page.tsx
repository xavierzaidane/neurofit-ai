"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ProgramFormTabs from "../components/program/ProgramFormTabs";
import ProgramFormActions from "../components/program/ProgramFormActions";
import ProgramFormSkeleton from "../components/program/ProgramFormSkeleton";
import {
	initialProgramFormData,
	sampleProgramFormData,
	type ProgramFormData,
} from "@/data/samples";

const inputClassName =
	"w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm font-mono text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/20";

const ProgramPage = () => {
	const [formData, setFormData] = useState(initialProgramFormData);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		const timer = window.setTimeout(() => setIsLoading(false), 900);
		return () => window.clearTimeout(timer);
	}, []);

	const setField = (field: keyof ProgramFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleGenerateSamples = () => {
		setIsLoading(true);
		window.setTimeout(() => {
			setFormData(sampleProgramFormData);
			setIsLoading(false);
		}, 500);
	};

	const handleClear = () => {
		setFormData(initialProgramFormData);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitError(null);
		setSubmitSuccess(false);

		if (!user?.id) {
			setSubmitError("Please sign in to generate a program.");
			return;
		}

		const convexHttpUrl = process.env.NEXT_PUBLIC_CONVEX_HTTP_URL;
		if (!convexHttpUrl) {
			setSubmitError("Missing NEXT_PUBLIC_CONVEX_HTTP_URL environment variable.");
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch(`${convexHttpUrl}/ollama/generate-program`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: user.id,
					age: formData.age,
					height: formData.height,
					weight: formData.weight,
					gender: formData.gender,
					status: formData.status,
					body_fat: formData.bodyFat,
					injuries: formData.injuries,
					workout_days: formData.workoutDays,
					training_style: formData.trainingStyle,
					target_timeline: formData.targetTimeline,
					fitness_goal: formData.fitnessGoal,
					fitness_level: formData.fitnessLevel,
					dietary_restrictions: formData.dietaryRestrictions,
					food_allergies: formData.foodAllergies,
					daily_calories: formData.dailyCalories,
					protein_target: formData.proteinTarget,
					carbs_target: formData.carbsTarget,
					fat_target: formData.fatTarget,
					meals_per_day: formData.mealsPerDay,
					working_hours: formData.workingHours,
					sleep_hours: formData.sleepHours,
					stress_level: formData.stressLevel,
					workout_time: formData.workoutTime,
					available_equipment: formData.availableEquipment,
					country_region: formData.countryRegion,
					city_region: formData.cityRegion,
				}),
			});

			const data = await response.json();
			if (!response.ok || !data?.success) {
				throw new Error(data?.error || "Failed to generate program.");
			}

			setSubmitSuccess(true);
			window.setTimeout(() => {
				router.push("/profile");
			}, 1200);
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : "  generate program.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const previewRows = [
		{ label: "Age", value: formData.age },
		{ label: "Height", value: formData.height },
		{ label: "Weight", value: formData.weight },
		{ label: "Goal", value: formData.fitnessGoal },
		{ label: "Level", value: formData.fitnessLevel },
		{ label: "Calories", value: formData.dailyCalories },
		{ label: "Workout Days", value: formData.workoutDays },
		{ label: "Workout Time", value: formData.workoutTime },
		{ label: "Sleep", value: formData.sleepHours },
	];

	return (
		<section className="max-w-5xl relative z-10 pt-20 pb-32 flex-grow container mx-auto px-4 md:px-6">
			<form className="space-y-8" onSubmit={handleSubmit}>
				<div className="text-left pt-10">
					<h1 className="text-3xl md:text-3xl font-mono font-semibold tracking-tight text-white">
						Program Intake Form
					</h1>
					<p className="text-sm font-mono text-white/60 mt-2">
						Static form grouped into categories for quick planning.
					</p>
				</div>

				{isLoading ? (
					<ProgramFormSkeleton />
				) : (
					<ProgramFormTabs
						formData={formData}
						setField={setField}
						inputClassName={inputClassName}
					/>
				)}

					<ProgramFormActions
						previewRows={previewRows}
						isLoading={isLoading}
						isSubmitting={isSubmitting}
						onClear={handleClear}
						onGenerateSamples={handleGenerateSamples}
					/>

				{submitError && (
					<p className="text-sm font-mono text-red-300">{submitError}</p>
				)}
				{submitSuccess && (
					<p className="text-sm font-mono text-emerald-300">
						Program created. Redirecting to your profile...
					</p>
				)}
			</form>
		</section>
	);
};

export default ProgramPage;
