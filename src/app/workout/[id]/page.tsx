"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Workout } from "@/types/workout";
import TodayPlanBtn from "@/components/cardDetails/TodayPlanBtn";
import SaveBtn from "@/components/cardDetails/SavedBtn";

const WorkoutDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWorkout = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Data not found");
        
        const data: Workout[] = await res.json();
        const found = data.find(item => item.id === Number(id));
        setWorkout(found || null);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Workout Not Found — ID: {id}</p>
        <Link href="/workouts" className="text-yellow-400 hover:text-yellow-300">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/workouts"
          className="text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-2 mb-8"
        >
          ← Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <div className="flex gap-2 flex-wrap mb-4">
              {workout.muscleGroups.map((muscle, i) => (
                <span
                  key={i}
                  className="bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{workout.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{workout.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                ["Equipment", workout.equipment],
                ["Difficulty", workout.difficulty],
                ["Sets", workout.sets],
                ["Reps", workout.reps],
                ["Duration", `${workout.duration} min`],
                ["Calories", `${workout.caloriesBurned} kcal`],
                ["Rating", `⭐ ${workout.rating}`],
              ].map(([label, value], i) => (
                <div key={i} className="bg-gray-900 p-3 rounded-lg">
                  <p className="text-gray-500 text-xs uppercase">{label}</p>
                  <p className="font-semibold mt-1">{value}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-3">Instructions</h2>
            <ol className="space-y-2 mb-8">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-gray-300">
                  <span className="text-yellow-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="flex flex-col sm:flex-row gap-3">
              <TodayPlanBtn workout = {workout}></TodayPlanBtn>
              <SaveBtn workout = {workout}></SaveBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
