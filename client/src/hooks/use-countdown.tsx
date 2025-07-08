import { useState, useEffect, useMemo } from 'react';

interface CountdownData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(startDate: Date): CountdownData {
  const [countdown, setCountdown] = useState<CountdownData>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Memoize the start date timestamp to prevent dependency issues
  const startTimestamp = useMemo(() => startDate.getTime(), [startDate]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const duration = now.getTime() - startTimestamp;

      const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((duration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((duration % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);

      setCountdown({ years, months, days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp]);

  return countdown;
}
