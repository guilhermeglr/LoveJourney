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
      const startDateObj = new Date(startTimestamp);
      
      // Calculate years
      let years = now.getFullYear() - startDateObj.getFullYear();
      
      // Calculate months
      let months = now.getMonth() - startDateObj.getMonth();
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Calculate days
      let days = now.getDate() - startDateObj.getDate();
      if (days < 0) {
        months--;
        if (months < 0) {
          years--;
          months += 12;
        }
        // Get the last day of the previous month
        const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth;
      }
      
      // Calculate hours, minutes, seconds
      const hours = now.getHours() - startDateObj.getHours();
      const minutes = now.getMinutes() - startDateObj.getMinutes();
      const seconds = now.getSeconds() - startDateObj.getSeconds();
      
      // Adjust for negative values
      let finalHours = hours < 0 ? hours + 24 : hours;
      let finalMinutes = minutes < 0 ? minutes + 60 : minutes;
      let finalSeconds = seconds < 0 ? seconds + 60 : seconds;
      
      // Handle negative adjustments
      if (hours < 0) {
        days = days > 0 ? days - 1 : days;
      }
      if (minutes < 0) {
        finalHours = finalHours > 0 ? finalHours - 1 : finalHours;
      }
      if (seconds < 0) {
        finalMinutes = finalMinutes > 0 ? finalMinutes - 1 : finalMinutes;
      }

      setCountdown({ 
        years: Math.max(0, years), 
        months: Math.max(0, months), 
        days: Math.max(0, days), 
        hours: Math.max(0, finalHours), 
        minutes: Math.max(0, finalMinutes), 
        seconds: Math.max(0, finalSeconds) 
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp]);

  return countdown;
}
