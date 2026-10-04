
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

const WorkoutCard = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
      if (!response.ok) throw new Error("Data Not Found");
      const data = await response.json();
      setWorkouts(data);
      setLoading(false);
    };
    fetchWorkouts().catch(err => {
      console.error("Error fetching workouts:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Data Loading.....</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-8 mx-auto container">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">THE LIBRARY</h1>
        <p className="text-gray-400 mt-2">Twelve lifts covering every major muscle group</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {workouts.map((workout) => (
            
          <Link
            key={workout.id}
            // href={`/workouts/${workout.id}`}
            href={`/workout/${workout.id}`}
            className="block group"
          >
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500 transition-all duration-300 h-full">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="px-5 pt-4 flex gap-2 flex-wrap">
                {workout.muscleGroups.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-400 text-black text-xs font-medium px-3 py-1 rounded-xl"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div className="px-5 pt-3 pb-2">
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  {workout.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{workout.equipment}</p>
              </div>

              <div className="px-5 py-4 flex justify-evenly items-center gap-6 text-sm text-gray-400 border-t border-gray-800 mt-2">
                <span>⏱ {workout.duration} min</span>
                <span>🔥 {workout.caloriesBurned} kcal</span>
                <span>⭐ {workout.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 

export default WorkoutCard;