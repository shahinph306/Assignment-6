'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PlanContext } from '@/context/PlanContext';
import logo from '@/Image/logo.png';

const Navbar = () => {
  const { planCount, savedCount } = useContext(PlanContext);

  return (
    <div className="navbar shadow-sm text-white bg-gray-800 mx-auto container items-center px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link href="/workouts">Workouts</Link>
            </li>
            <li>
              <Link href="/my-plan">My Plan</Link>
            </li>
          </ul>
        </div>
        <div className="text-xl flex gap-2 items-center font-bold">
          <Image src={logo} alt="logo-image" width={32} height={32} />
          <a>FITLOG</a>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/workouts">Workouts</Link>
          </li>
          <li>
            <Link href="/my-plan">My Plan</Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end flex gap-4 sm:gap-6 items-center">
        <Link href="/my-plan" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
          <span>Plan</span>
          <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center">
            {planCount}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
          <span>Saved</span>
          <span className="bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[24px] text-center">
            {savedCount}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;