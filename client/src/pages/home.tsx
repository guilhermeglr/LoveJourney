import { AnimatedBackground } from '@/components/animated-background';
import { ThemeSelector } from '@/components/theme-selector';
import { Countdown } from '@/components/countdown';
import { PhotoCarousel } from '@/components/photo-carousel';
import { MemoryTimeline } from '@/components/memory-timeline';
import { LoveQuotes } from '@/components/love-quotes';
import { MusicPlayer } from '@/components/music-player';
import { SocialSharing } from '@/components/social-sharing';
import { useTheme } from '@/hooks/use-theme';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { SiteContent } from '@shared/schema';

export default function Home() {
  const { theme, switchTheme } = useTheme();
  
  const { data: content, isLoading, error } = useQuery<SiteContent>({
    queryKey: ['/api/content'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando nossa história de amor...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar o conteúdo</p>
          <Link href="/admin">
            <button className="bg-pink-500 text-white px-4 py-2 rounded">
              Ir para Administração
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter overflow-x-hidden">
      {/* Background with animated particles */}
      <AnimatedBackground theme={theme} />

      {/* Theme Toggle */}
      <ThemeSelector currentTheme={theme} onThemeChange={switchTheme} />

      {/* Admin Access Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/admin">
          <button className="bg-black/20 hover:bg-black/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm">
            <i className="fas fa-cog text-sm"></i>
          </button>
        </Link>
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <header className="text-center pt-12 pb-8 animate-slide-up">
          <div className="glass-effect rounded-2xl p-8 mx-4 max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="font-dancing text-xl sm:text-2xl text-white/90 mb-6">
              "{content.subtitle}"
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
        <Countdown startDate={content.startDate} />

        {/* Photo Carousel Section */}
        <PhotoCarousel images={content.images} />

        {/* Memory Timeline Section */}
        <MemoryTimeline memories={content.memories} />

        {/* Love Quotes Section */}
        <LoveQuotes quotes={content.quotes} />

        {/* Music Player Section */}
        <MusicPlayer 
          title={content.musicTitle} 
          artist={content.musicArtist} 
          musicFile={content.musicFile} 
        />

        {/* Social Sharing Section */}
        <SocialSharing whatsappNumber={content.whatsappNumber} />

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
