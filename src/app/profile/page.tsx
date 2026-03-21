"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import NoFitnessPlan from "../components/profile/NoFitnessPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { AppleIcon, CalendarIcon, DumbbellIcon, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import ConfirmDeleteDialog from "../components/profile/ConfirmDeleteDialog";
import { Id } from "../../../convex/_generated/dataModel";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";


const ProfilePage = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const allPlans = useQuery(api.plans.getUserPlans, { userId });
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<null | { id: Id<"plans">; name: string }>(null);

  const activePlan = allPlans?.find((plan) => plan.isActive);

  const currentPlan = selectedPlanId
    ? allPlans?.find((plan) => plan._id === selectedPlanId)
    : activePlan;

  const deletePlan = useMutation(api.plans.deletePlan);

  const handleDeleteClick = (planId: Id<"plans">, planName: string) => {
    setPlanToDelete({ id: planId, name: planName });
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (planToDelete) {
      await deletePlan({ planId: planToDelete.id });
      setSelectedPlanId(null);
      window.location.reload();
    }
  };


  return (
    <section className="max-w-5xl relative z-10 pt-20 pb-32 flex-grow container mx-auto px-4 md:px-6 ">
      <ProfileHeader user={user} />
      {allPlans && allPlans?.length > 0 ? (
        <div className="space-y-12">
          {/* PLAN SELECTOR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative backdrop-blur-md border border-white/10 bg-white/5 rounded-lg p-3 md:p-7 overflow-hidden -mt-10"
          >
            <div className="flex items-start justify-between mb-9">
              <div>
                <h2 className="text-3xl md:text-2xl font-mono tracking-tighter font-display text-white">
                  <span className="text-white">Your</span>
                  {" "}
                  <span className="text-white">Fitness Plans</span>
                </h2>
                <p className="text-sm font-mono text-muted-foreground mt-1">
                  Manage and track all your fitness plans
                </p>
              </div>
              
              <div className="font-mono text-xs text-muted-foreground px-3 py-1">
                TOTAL: {allPlans.length}
              </div>
            </div>

            {/* PLAN SELECTOR BUTTONS */}
            <div className="flex flex-wrap gap-3 -mt-2">
              {allPlans.map((plan) => (
                <div key={plan._id} className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPlanId(plan._id)}
                    className={`px-3 py-2 rounded-lg font-normal text-sm tracking-wider transition-all duration-300 border ${
                      selectedPlanId === plan._id
                        ? "bg-orange-500/20 text-orange-500 border-orange-500/50 "
                        : " text-white/70 border-white/20 hover:border-orange-500/50 hover:text-white"
                    }`}
                  >
                    {plan.name}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/20 hover:text-red-400 hover:border-red-500/50 transition-all duration-300"
                    onClick={() => handleDeleteClick(plan._id, plan.name)}
                    title="Delete plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              ))}

              <ConfirmDeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={handleConfirmDelete}
                planName={planToDelete?.name || ""}
              />
            </div>
          </motion.div>

          {/* PLAN DETAILS */}
          {currentPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative border border-white/10 bg-white/5 rounded-lg p-6 md:p-8 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-lg font-mono font-bold text-white">
                  PLAN: <span className="text-orange-500">{currentPlan.name}</span>
                </h3>
              </div>

              <Tabs defaultValue="workout" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="workout">
                    <DumbbellIcon className=" size-4" />
                    Workout
                  </TabsTrigger>

                  <TabsTrigger value="diet">
                    <AppleIcon className=" h-4 w-4" />
                    Diet
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="workout">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-mono text-white/70">
                      <CalendarIcon className="h-4 w-4" />
                      SCHEDULE: {currentPlan.workoutPlan.schedule.join(", ")}
                    </div>

                    <Accordion type="multiple" className="space-y-2">
                      {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                        <AccordionItem
                          key={index}
                          value={exerciseDay.day}
                          className="border border-white/10 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5 font-mono text-sm font-bold text-white">
                            <div className="flex justify-between w-full items-center gap-2">
                              <span>{exerciseDay.day}</span>
                              <div className="text-xs text-white/60 font-mono">
                                {exerciseDay.routines.length} EXERCISES
                              </div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-4 px-4 pt-3">
                            <div className="space-y-2">
                              {exerciseDay.routines.map((routine, routineIndex) => (
                                <div
                                  key={routineIndex}
                                  className="border border-white/10 rounded p-3 text-sm"
                                >
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-monofont-semibold text-white">
                                      {routine.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-xs font-mono">
                                      <span className="text-white/70">{routine.sets} sets</span>
                                      <span className="text-white/70">×</span>
                                      <span className="text-white/70">{routine.reps} reps</span>
                                    </div>
                                  </div>
                                  {routine.description && (
                                    <p className="text-xs text-white/60 mt-1">
                                      {routine.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="diet">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span className="text-white/70">DAILY CALORIES:</span>
                      <span className="text-white font-bold">{currentPlan.dietPlan.dailyCalories}K</span>
                    </div>

                    <div className="space-y-2">
                      {currentPlan.dietPlan.meals.map((meal, index) => (
                        <div
                          key={index}
                          className="border border-white/10 rounded-lg p-3"
                        >
                          <h4 className="font-mono text-sm font-bold text-white mb-2">
                            {meal.name}
                          </h4>
                          <ul className="space-y-1">
                            {meal.foods.map((food, foodIndex) => (
                              <li
                                key={foodIndex}
                                className="text-xs font-mono text-white/70"
                              >
                                • {food}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </div>
      ) : allPlans === undefined || allPlans === null ? (
        <div className="space-y-12">
          {/* SKELETON PLAN SELECTOR */}
          <div className="relative backdrop-blur-md border border-white/10 bg-white/5 rounded-lg p-3 md:p-7 overflow-hidden -mt-10">
            <div className="flex items-start justify-between mb-9">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>

            {/* SKELETON PLAN BUTTONS */}
            <div className="flex flex-wrap gap-3 -mt-2">
              <Skeleton className="px-3 py-2 rounded-lg w-24 h-8" />
              <Skeleton className="px-3 py-2 rounded-lg w-32 h-8" />
              <Skeleton className="px-3 py-2 rounded-lg w-28 h-8" />
            </div>
          </div>

          {/* SKELETON PLAN DETAILS */}
          <div className="relative border border-white/10 bg-white/5 rounded-lg p-6 md:p-8 overflow-hidden">
            <Skeleton className="h-6 w-40 mb-6" />

            <div className="space-y-4">
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoFitnessPlan />
      )}
    </section>
  );
};

export default ProfilePage;