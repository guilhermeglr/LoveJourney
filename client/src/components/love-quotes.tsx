import { useState, useEffect } from 'react';

const loveQuotes = [
  "Em todos os mundos, em todas as vidas, eu te escolheria novamente.",
  "Você é a razão pela qual eu acredito no amor verdadeiro.",
  "Meu coração é seu lar, e você sempre será bem-vinda.",
  "Contigo, aprendi que o amor não tem fim, apenas recomeços.",
  "Você é minha pessoa favorita em todos os universos possíveis."
];

export function LoveQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 mb-12">
      <div className="glass-effect rounded-2xl p-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl">
        <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white text-center mb-6">
          <i className="fas fa-quote-left text-yellow-400 mr-2"></i>
          Palavras do Coração
        </h2>
        
        <div className="text-center">
          <blockquote className="font-dancing text-xl sm:text-2xl text-white/90 italic mb-4 min-h-[60px] flex items-center justify-center">
            {loveQuotes[currentQuote]}
          </blockquote>
          <div className="flex justify-center space-x-2">
            {loveQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuote ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
