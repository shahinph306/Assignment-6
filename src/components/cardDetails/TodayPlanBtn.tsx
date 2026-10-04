'use client';
import React, { useContext } from 'react';
import { PlanContext } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import { toast } from 'react-toastify';

const TodayPlanBtn =  ({ workout }: { workout: Workout }) => {
    const {todayPlan, setTodayPlan} = useContext(PlanContext);

    const handleTodayPlanCard = () => {
        console.log("Today plan trigered", workout);
        
        setTodayPlan([...todayPlan, workout]);
        toast.success(`you have added card "${workout.name}" to your today plan list`)
    }
    return <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-full transition-colors cursor-pointer" onClick={() => handleTodayPlanCard()}>
        Add to Todays Plan
    </button>
};

export default TodayPlanBtn;