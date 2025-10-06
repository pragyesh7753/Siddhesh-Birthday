import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let nextBirthday = new Date(currentYear, 9, 6);

      if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, 9, 6);
      }

      const difference = nextBirthday.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const isBirthdayToday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Clock className="w-10 h-10 text-purple-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {isBirthdayToday ? "It's Your Special Day!" : 'Countdown to Next Birthday'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 md:p-8 text-white transform hover:scale-105 transition-transform"
            >
              <div className="text-4xl md:text-6xl font-bold mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg font-semibold uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {isBirthdayToday && (
          <div className="mt-8 text-center">
            <p className="text-2xl font-semibold text-pink-600 animate-pulse">
              Happy Birthday, Siddhesh! Enjoy your special day!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
