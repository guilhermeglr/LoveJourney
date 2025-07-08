import { AnimatedBackground } from '@/components/animated-background';
import { ThemeSelector } from '@/components/theme-selector';
import { Countdown } from '@/components/countdown';
import { PhotoCarousel } from '@/components/photo-carousel';
import { MemoryTimeline } from '@/components/memory-timeline';
import { LoveQuotes } from '@/components/love-quotes';
import { MusicPlayer } from '@/components/music-player';
import { SocialSharing } from '@/components/social-sharing';
import { useTheme } from '@/hooks/use-theme';

export default function Home() {
  const { theme, switchTheme } = useTheme();

  return (
    <div className="font-inter overflow-x-hidden">
      {/* Background with animated particles */}
      <AnimatedBackground theme={theme} />

      {/* Theme Toggle */}
      <ThemeSelector currentTheme={theme} onThemeChange={switchTheme} />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <header className="text-center pt-12 pb-8 animate-slide-up">
          <div className="glass-effect rounded-2xl p-8 mx-4 max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Guilherme <span className="text-yellow-400">&</span> Carolina
            </h1>
            <p className="font-dancing text-xl sm:text-2xl text-white/90 mb-6">
              "Você é meu lugar favorito no mundo" 💕
            </p>
            
            {/* Animated Hearts */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              <i className="fas fa-heart text-red-400 text-2xl animate-sparkle"></i>
              <i className="fas fa-heart text-pink-400 text-4xl animate-pulse-heart animate-romantic-glow"></i>
              <i className="fas fa-heart text-red-400 text-2xl animate-sparkle" style={{ animationDelay: '1s' }}></i>
            </div>
          </div>
        </header>

        {/* Countdown Section */}
        <Countdown />

        {/* Photo Carousel Section */}
        <PhotoCarousel />

        {/* Memory Timeline Section */}
        <MemoryTimeline />

        {/* Love Quotes Section */}
        <LoveQuotes />

        {/* Music Player Section */}
        <MusicPlayer />

        {/* Social Sharing Section */}
        <SocialSharing />

        {/* Footer */}
        <footer className="text-center py-8 text-white/80">
          <p className="font-dancing text-lg">
            Feito com 💕 para Carolina, meu amor eterno
          </p>
          <p className="text-sm mt-2">
            © 2024 - Guilherme & Carolina • Nosso Amor Infinito
          </p>
        </footer>
      </div>
    </div>
  );
}
