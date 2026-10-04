
'use client';
import { PlanContext } from "@/context/PlanContext";
import { Workout } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SortOption = 'duration' | 'calories' | 'rating';

const PlanedCard = () => {
    const [activeTab, setActiveTab] = useState<'today' | 'saved'>('today');
    const [sortBy, setSortBy] = useState<SortOption>('duration');

    const {
        todayPlan, savedPlan, markAsDone, removeFromPlan,
        addToPlan, removeFromSaved
    } = useContext(PlanContext);

    const todayStats = useMemo(() => ({
        exercises: todayPlan.length,
        minutes: todayPlan.reduce((s, w) => s + (Number(w.duration) || 0), 0),
        calories: todayPlan.reduce((s, w) => s + (Number(w.caloriesBurned) || 0), 0),
    }), [todayPlan]);

    const savedStats = useMemo(() => ({
        exercises: savedPlan.length,
        minutes: savedPlan.reduce((s, w) => s + (Number(w.duration) || 0), 0),
        calories: savedPlan.reduce((s, w) => s + (Number(w.caloriesBurned) || 0), 0),
    }), [savedPlan]);

    const sortItems = (list: Workout[]) => [...list].sort((a, b) => {
        switch (sortBy) {
            case 'duration': return Number(a.duration) - Number(b.duration);
            case 'calories': return Number(a.caloriesBurned) - Number(b.caloriesBurned);
            case 'rating': return Number(b.rating) - Number(a.rating);
            default: return 0;
        }
    });

    const t = {
        done: (n: string) => toast.success(`✅ "${n}" completed!`, { theme: 'dark', autoClose: 2500, position: 'top-right' }),
        remPlan: (n: string) => toast.warn(`🗑️ "${n}" removed from plan`, { theme: 'dark', autoClose: 2500, position: 'top-right' }),
        addPlan: (n: string) => toast.success(`➕ "${n}" added to plan`, { theme: 'dark', autoClose: 2500, position: 'top-right' }),
        remSaved: (n: string) => toast.warn(`🗑️ "${n}" removed from saved`, { theme: 'dark', autoClose: 2500, position: 'top-right' }),
        alreadyInPlan: (n: string) => toast.info(`ℹ️ "${n}" is already in your plan`, { theme: 'dark', autoClose: 2500, position: 'top-right' }),
    };

    const renderCard = (w: Workout, isToday: boolean) => {
        const isInPlan = todayPlan.some(item => item.id === w.id);

        return (
            <div key={w.id} className="flex flex-col sm:flex-row items-start sm:items-center w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500 transition-all p-3 sm:p-4 gap-3">
                <div className="relative w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={w.image} alt={w.name} fill className="object-cover" sizes="(max-width:640px)100vw,80px" />
                </div>
                <div className="flex-1 w-full">
                    <h3 className="font-bold text-lg uppercase">{w.name}</h3>
                    <p className="text-gray-400 text-sm mt-0.5">{w.equipment}</p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-300">
                        <span>⏱ {w.duration} min</span>
                        <span>🔥 {w.caloriesBurned} kcal</span>
                        <span>⭐ {w.rating}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                   
                    <Link
                        href={`/workout/${w.id}`}
                        className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition whitespace-nowrap"
                    >
                        View Details
                    </Link>

                    {isToday ? (
                        <>
                            <button
                                onClick={() => { markAsDone(w.id); t.done(w.name); }}
                                className="px-3 py-1.5 bg-green-500 text-black rounded-lg text-sm font-medium hover:bg-green-400 transition whitespace-nowrap"
                            >
                                Mark as Done
                            </button>
                            <button
                                onClick={() => { removeFromPlan(w.id); t.remPlan(w.name); }}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-red-500 transition-all text-lg"
                            >
                                ×
                            </button>
                        </>
                    ) : (
                        <>
                            
                            <button
                                onClick={() => { removeFromSaved(w.id); t.remSaved(w.name); }}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-red-500 transition-all text-lg"
                            >
                                ×
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };


    const renderEmptyState = () => (
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 py-12 px-6 text-center">
            <h3 className="text-white font-bold text-2xl uppercase mb-2">NOTHING HERE YET</h3>
            <p className="text-gray-400 mb-6">Browse the library and add a lift to get today moving.</p>
            <Link
                href="/workouts"
                className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-3 rounded-full transition"
            >
                Go to workouts
            </Link>
        </div>
    );
    const sortedToday = sortItems(todayPlan);
    const sortedSaved = sortItems(savedPlan);
    const activeStats = activeTab === 'today' ? todayStats : savedStats;

    return (
        <div className="min-h-screen text-white">
            <ToastContainer position="top-right" autoClose={2500} theme="dark" />
            <div className="container mx-auto px-4 sm:px-[20px]">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">MY PLAN</h1>
                    <p className="text-gray-400 text-sm">Cap of five lifts for today. Finish them, then load more.</p>
                </div>

            
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 bg-gray-900/50 rounded-xl p-4 sm:p-5 border border-gray-800">
                    <div>
                        <p className="text-gray-400 text-xs sm:text-sm">Exercises</p>
                        <p className={`text-xl sm:text-2xl font-bold ${activeTab === 'today' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {activeStats.exercises}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs sm:text-sm">Minutes</p>
                        <p className="text-xl sm:text-2xl font-bold">{activeStats.minutes}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs sm:text-sm">Calories</p>
                        <p className="text-xl sm:text-2xl font-bold">{activeStats.calories}</p>
                    </div>
                </div>

               
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('today')}
                            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'today'
                                    ? 'bg-gray-800 border border-green-500 text-green-400'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                }`}
                        >
                            Today's Plan
                        </button>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'saved'
                                    ? 'bg-gray-800 border border-yellow-400 text-yellow-400'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                }`}
                        >
                            Saved 
                        </button>
                    </div>
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                        <span>Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="bg-gray-800 border-none rounded px-2 py-1 outline-none text-sm"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    {activeTab === 'today' ? (
                        sortedToday.length > 0
                            ? sortedToday.map(w => renderCard(w, true))
                            : renderEmptyState()
                    ) : (
                        sortedSaved.length > 0
                            ? sortedSaved.map(w => renderCard(w, false))
                            : renderEmptyState()
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlanedCard;