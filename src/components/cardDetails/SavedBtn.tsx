
'use client';
import React, { useContext } from 'react';
import { PlanContext } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import { toast } from 'react-toastify';

const SaveBtn = ({ workout }: { workout: Workout }) => {
  const { savedPlan, setSavedPlan } = useContext(PlanContext);

  const isAlreadySaved = savedPlan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const handleSavedCard = () => {
    if (isAlreadySaved) {
      toast.info(`"${workout.name}" is already in Saved!`);
      return;
    }

    setSavedPlan([...savedPlan, workout]);
    toast.success(`✅ Added "${workout.name}" to your Saved list!`);
  };

  return (
    <button
      onClick={handleSavedCard}
      disabled={isAlreadySaved}
      className={`font-bold py-3 px-6 rounded-full transition-colors ${
        isAlreadySaved
          ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
          : 'bg-gray-800 text-white hover:bg-gray-700'
      }`}
    >
      {isAlreadySaved ? '✓ In Saved' : 'Add to Saved'}
    </button>
  );
};

export default SaveBtn;