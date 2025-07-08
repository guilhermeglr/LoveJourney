import { useState, useEffect, useRef } from 'react';

interface PhotoCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
}

export function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diffX = touchStartX.current - touchEndX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="px-4 mb-12">
      <div className="glass-effect rounded-2xl p-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl">
        <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
          <i className="fas fa-heart text-red-400 mr-2"></i>
          Nossos Momentos Especiais
        </h2>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div
            className="relative w-full h-64 sm:h-80 lg:h-96"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => (
              <div key={index} className={`slide absolute inset-0 ${
                index === currentSlide ? 'active' : index < currentSlide ? 'prev' : ''
              }`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
