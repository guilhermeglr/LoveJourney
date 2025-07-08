export function SocialSharing() {
  const setupWhatsApp = () => {
    const numero = '47999471966';
    const urlApp = window.location.href;
    const mensagemTexto = `Oi vida, criei este app para não deixar passar em branco. 💖✨ Veja com carinho aqui: ${urlApp}`;
    const mensagem = encodeURIComponent(mensagemTexto);
    return `https://wa.me/${numero}?text=${mensagem}`;
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Confira nossa história de amor! 💕');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  return (
    <section className="px-4 mb-12">
      <div className="glass-effect rounded-2xl p-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl text-center">
        <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white mb-6">
          Compartilhe Nosso Amor
        </h2>
        
        <div className="space-y-4">
          <a
            href={setupWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i className="fab fa-whatsapp text-2xl mr-3"></i>
            💌 Enviar Amor via WhatsApp
          </a>
          
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={shareOnFacebook}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <i className="fab fa-facebook-f"></i>
            </button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 inline-flex items-center justify-center"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <button
              onClick={shareOnTwitter}
              className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <i className="fab fa-twitter"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
