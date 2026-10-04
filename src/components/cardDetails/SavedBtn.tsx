'use client';
import React, { useContext } from 'react';
import { PlanContext } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import { toast } from 'react-toastify';

const SaveBtn=  ({ workout }: { workout: Workout }) => {
    const {savedPlan, setSavedPlan} = useContext(PlanContext);

    const handleSavedCard = () => {
        console.log("saved plan trigered", workout);
        
        setSavedPlan([...savedPlan, workout]);
        toast.success(`you have added card "${workout.name}" to your saved list`)
    }
    return <button className=" bg-gray-800 font-bold py-3 px-6 rounded-full transition-colors cursor-pointer" onClick={() => handleSavedCard()}>
        Add to Saved
    </button>
};
export default SaveBtn;