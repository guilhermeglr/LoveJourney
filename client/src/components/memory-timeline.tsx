export function MemoryTimeline() {
  const memories = [
    {
      icon: "fas fa-heart",
      iconColor: "bg-red-500",
      title: "Primeiro Encontro",
      description: "8 de Julho, 2019 - O dia que mudou nossas vidas",
      date: "2019-07-08"
    },
    {
      icon: "fas fa-star",
      iconColor: "bg-yellow-500",
      title: "Primeiro \"Eu te amo\"",
      description: "Aquele momento mágico que selou nosso destino",
      date: "2019"
    },
    {
      icon: "fas fa-ring",
      iconColor: "bg-purple-500",
      title: "Momentos Especiais",
      description: "Cada dia ao seu lado é uma nova aventura",
      date: "Sempre"
    }
  ];

  return (
    <section className="px-4 mb-12">
      <div className="glass-effect rounded-2xl p-8 mx-auto max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl">
        <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-white text-center mb-8">
          <i className="fas fa-timeline text-yellow-400 mr-2"></i>
          Nossa Timeline de Amor
        </h2>
        
        <div className="space-y-6">
          {memories.map((memory, index) => (
            <div key={index} className="flex items-center space-x-4 animate-fade-in">
              <div className={`${memory.iconColor} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl`}>
                <i className={memory.icon}></i>
              </div>
              <div className="bg-white/20 rounded-xl p-4 flex-1">
                <h3 className="font-semibold text-white">{memory.title}</h3>
                <p className="text-white/80 text-sm">{memory.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
