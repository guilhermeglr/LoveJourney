import { useCountdown } from '@/hooks/use-countdown';

interface CountdownProps {
  startDate: string;
}

export function Countdown({ startDate: startDateString }: CountdownProps) {
  const startDate = new Date(startDateString);
  const { years, months, days, hours, minutes, seconds } = useCountdown(startDate);

  return (
    <section className="px-4 mb-12 animate-fade-in">
      <div className="glass-effect rounded-2xl p-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl">
        <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
          <i className="fas fa-clock text-yellow-400 mr-2"></i>
          Nosso Tempo Juntos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl sm:text-3xl font-bold text-white">{years}</div>
            <div className="text-sm text-white/80">Anos</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl sm:text-3xl font-bold text-white">{months}</div>
            <div className="text-sm text-white/80">Meses</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl sm:text-3xl font-bold text-white">{days}</div>
            <div className="text-sm text-white/80">Dias</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl sm:text-3xl font-bold text-white">{hours}</div>
            <div className="text-sm text-white/80">Horas</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-white/90 text-lg font-semibold">
            {years} anos, {months} meses, {days} dias, {hours}h {minutes}m {seconds}s
          </div>
          <div className="text-white/70 text-sm mt-2">
            de amor puro! ❤️
          </div>
        </div>
      </div>
    </section>
  );
}
