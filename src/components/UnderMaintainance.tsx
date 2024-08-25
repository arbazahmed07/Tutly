"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UnderMaintenance() {
    const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now: any = new Date();
      const target: any = new Date('2024-08-26T00:00:00');
      
      const difference = target - now;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);


    return (
        <div className="flex flex-col items-center justify-center gap-6 pt-12">
            <Image src='/maintenance.svg' className="block m-auto" width={500} height={500} alt="icon" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Under Maintenance</h1>
            <p className="font-semibold font-serif">This page will be back in</p>
            <p className="text-3xl font-black text-secondary-600">{timeRemaining}</p>
            <Image src='/under-construction.gif' className="absolute top-0 right-96" width={100} height={100} alt="icon" />
        </div>
    )
}
