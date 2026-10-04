"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

const PlanWorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <Link href={`/workout/${workout.id}`} className="block">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-all duration-300">

        <div className="relative h-48 w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="px-5 pt-4 flex gap-2 flex-wrap">
          {workout.muscleGroups.map((muscle, index) => (
            <span
              key={index}
              className="bg-yellow-400 text-black text-xs font-medium px-3 py-1 rounded-xl"
            >
              {muscle}
            </span>
          ))}
        </div>

        <div className="px-5 pt-3 pb-4">
          <h3 className="text-lg font-bold uppercase text-white">
            {workout.name}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {workout.equipment}
          </p>
        </div>

        <div className="px-5 py-4 flex justify-between items-center text-sm text-gray-400 border-t border-gray-800">
          <span>⏱ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>⭐ {workout.rating}</span>
        </div>

      </div>
    </Link>
  );
};

export default PlanWorkoutCard;
