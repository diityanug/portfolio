import { useState, useEffect, memo } from 'react';
import type { ReactElement } from 'react';

// CLOCK WIDGET
export const ClockWidget = memo((): ReactElement => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const msToNextSecond = 1000 - new Date().getMilliseconds();
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      setTime(new Date());
      intervalId = setInterval(() => setTime(new Date()), 1000);
    }, msToNextSecond);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <span className="font-poppins text-[#2A2320] text-sm md:text-base font-medium tracking-wide tabular-nums">
      {formattedTime}
    </span>
  );
});
ClockWidget.displayName = 'ClockWidget';