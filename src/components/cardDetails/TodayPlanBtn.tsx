
'use client';
import React, { useContext } from 'react';
import { PlanContext } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import { toast } from 'react-toastify';

const PlanBtn = ({ workout }: { workout: Workout }) => {
  const { todayPlan, setTodayPlan } = useContext(PlanContext);

  const isInPlan = todayPlan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.info(`"${workout.name}" is already in Today's Plan!`);
      return;
    }

    setTodayPlan([...todayPlan, workout]);
    toast.success(`✅ Added "${workout.name}" to Today's Plan!`);
  };

  return (
    <button
      onClick={handleAddToPlan}
      disabled={isInPlan}
      className={`font-bold py-3 px-6 rounded-full transition-colors ${
        isInPlan
          ? 'bg-yellow-600/70 text-yellow-100 cursor-not-allowed opacity-60'
          : 'bg-yellow-400 text-black hover:bg-yellow-300'
      }`}
    >
      Add to Today's Plan 
    </button>
  );
};

export default PlanBtn;