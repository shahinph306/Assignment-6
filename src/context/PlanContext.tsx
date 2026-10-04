
"use client";
import React, { ReactNode, useState, createContext, useMemo } from "react";
import { Workout } from "@/types/workout";

type PlanContextType = {
  todayPlan: Workout[];
  setTodayPlan: React.Dispatch<React.SetStateAction<Workout[]>>;
  savedPlan: Workout[];
  setSavedPlan: React.Dispatch<React.SetStateAction<Workout[]>>;
  markAsDone: (id: string | number) => void;
  removeFromPlan: (id: string | number) => void;
  addToPlan: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
  addToSaved: (workout: Workout) => void;
  planCount: number;
  savedCount: number;
};

export const PlanContext = createContext<PlanContextType>({
  todayPlan: [],
  setTodayPlan: () => {},
  savedPlan: [],
  setSavedPlan: () => {},
  markAsDone: () => {},
  removeFromPlan: () => {},
  addToPlan: () => {},
  removeFromSaved: () => {},
  addToSaved: () => {},
  planCount: 0,
  savedCount: 0,
});

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedPlan, setSavedPlan] = useState<Workout[]>([]);

  const planCount = useMemo(() => todayPlan.length, [todayPlan]);
  const savedCount = useMemo(() => savedPlan.length, [savedPlan]);

  const markAsDone = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const addToPlan = (workout: Workout) => {
    setTodayPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromSaved = (id: string | number) => {
    setSavedPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const addToSaved = (workout: Workout) => {
    setSavedPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        setTodayPlan,
        savedPlan,
        setSavedPlan,
        markAsDone,
        removeFromPlan,
        addToPlan,
        removeFromSaved,
        addToSaved,
        planCount,
        savedCount,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;

