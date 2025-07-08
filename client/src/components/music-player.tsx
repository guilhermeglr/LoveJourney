import { useState, useRef, useEffect } from 'react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="px-4 mb-12">
      <div className="glass-effect rounded-2xl p-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl">
        <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
          <i className="fas fa-music text-pink-400 mr-2"></i>
          Nossa Música
        </h2>
        
        <div className="bg-white/20 rounded-xl p-6 text-center">
          <div className="mb-4">
            <i className="fas fa-heart text-red-400 text-4xl animate-pulse-heart"></i>
          </div>
          <h3 className="font-semibold text-white mb-2">Perfect - Ed Sheeran</h3>
          <p className="text-white/80 text-sm mb-4">A música que toca sempre que penso em você</p>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={toggleMusic}
              className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div 
                className="bg-pink-400 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-white/80 text-sm">
              {formatTime(currentTime)} / {duration ? formatTime(duration) : '4:23'}
            </span>
          </div>
          
          {/* Hidden audio element for romantic background music */}
          <audio 
            ref={audioRef} 
            preload="metadata"
            loop
          >
            <source src="https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav" type="audio/wav" />
            {/* Note: Replace with actual romantic music file */}
          </audio>
        </div>
      </div>
    </section>
  );
}
