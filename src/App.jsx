import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen">
      {/* HEADER / NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-[#070B14]/90 backdrop-blur-md border-b border-secondary/30 shadow-[0_0_15px_rgba(157,0,255,0.1)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#" className="text-xl font-bold text-white tracking-tight">Gustavo <span className="text-primary">Beserra</span></a>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#servicos" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Serviços</a>
              <a href="#sobre" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Sobre</a>
              <a href="#projetos" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Projetos</a>
              <a href="#contato" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Contato</a>
            </nav>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-primary hover:text-white">
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0A0F1C] border-b border-secondary/30">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#servicos" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary hover:bg-slate-800/50 rounded-md">Serviços</a>
              <a href="#sobre" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary hover:bg-slate-800/50 rounded-md">Sobre</a>
              <a href="#projetos" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary hover:bg-slate-800/50 rounded-md">Projetos</a>
              <a href="#contato" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-primary hover:bg-slate-800/50 rounded-md">Contato</a>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
              Muito prazer, sou o <span className="text-primary">Gustavo.</span>
            </h1>
            <div className="inline-block border border-secondary p-2 mb-6 rounded bg-secondary/10">
              <p className="text-secondary font-medium text-lg md:text-xl">
                Eu construo ferramentas que resolvem problemas reais.
              </p>
            </div>
            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed mx-auto md:mx-0">
              Ao contrário de agências tradicionais que entregam templates engessados e lentos, eu desenvolvo o seu projeto 100% do zero. Sou obcecado por velocidade e arquiteturas limpas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* BOTÃO DA APRESENTAÇÃO */}
              <a href="https://docs.google.com/presentation/d/1HLV9MJ2s2Vje3of9y-rLhLR7Th3EbEalbR0lw_NkjyU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary hover:bg-cyan-400 text-[#070B14] font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></svg>
                Ver Apresentação Completa
              </a>
              <a href="#projetos" className="px-8 py-4 bg-transparent hover:bg-secondary/10 text-white font-medium rounded-lg transition-all inline-flex items-center justify-center border border-secondary shadow-[0_0_15px_rgba(157,0,255,0.2)]">
                <svg className="w-5 h-5 mr-2 text-secondary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                Ver Projetos
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            {/* MOLDURA NEON PARA A NOVA IMAGEM */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-primary shadow-[0_0_30px_rgba(0,240,255,0.3)] transform transition hover:scale-105 duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
              <img 
                src="/Gustavo.ia.jpg" 
                alt="Gustavo Beserra - Desenvolvedor" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* NOVA SEÇÃO: PILARES DA ENGENHARIA */}
        <section id="servicos" className="bg-[#0A0F1C]/80 border-y border-secondary/20 py-20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center md:text-left">
              Os Pilares da Minha Engenharia
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Pilar 1 */}
              <div className="bg-[#070B14] p-8 rounded-xl border border-secondary hover:shadow-[0_0_20px_rgba(157,0,255,0.3)] transition-all duration-300 group">
                <div className="mb-6">
                  <svg className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Pilar 1 - Performance Extrema</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  O barato sai caro. Crio aplicações que carregam em milissegundos, usando as mesmas tecnologias modernas adotadas por gigantes do mercado de software.
                </p>
              </div>

              {/* Pilar 2 */}
              <div className="bg-[#070B14] p-8 rounded-xl border border-primary hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group">
                <div className="mb-6">
                  <svg className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Pilar 2 - Segurança Total</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Proteção rigorosa de dados. Toda a arquitetura de banco de dados e captação de leads é desenhada em absoluta conformidade com as exigências da LGPD.
                </p>
              </div>

              {/* Pilar 3 */}
              <div className="bg-[#070B14] p-8 rounded-xl border border-secondary hover:shadow-[0_0_20px_rgba(157,0,255,0.3)] transition-all duration-300 group">
                <div className="mb-6">
                  <svg className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Pilar 3 - Design Exclusivo</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Fugimos do genérico. Aplico interfaces modernas, responsivas e estrategicamente focadas na melhor experiência do usuário e alta taxa de conversão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projetos" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12 justify-center md:justify-start">
              <svg className="w-7 h-7 text-primary mr-3" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
              <h2 className="text-3xl font-bold text-white">Projetos Desenvolvidos</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-[#0A0F1C] rounded-xl overflow-hidden border border-secondary/30 hover:-translate-y-2 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <div className="h-48 bg-[#070B14] flex items-center justify-center border-b border-secondary/20">
                  <span className="text-primary font-medium">Projeto 1</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Seu Novo Site</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    Substitua pelos sites reais que você desenvolveu com a sua nova experiência técnica.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-2 py-1 rounded">React</span>
                    <span className="text-xs font-medium text-secondary bg-secondary/10 border border-secondary/30 px-2 py-1 rounded">Tailwind</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="flex-1 flex items-center justify-center text-sm font-medium text-white bg-[#070B14] hover:bg-secondary/20 border border-secondary/50 py-2 rounded transition-colors">
                      Repo
                    </a>
                    <a href="#" className="flex-1 flex items-center justify-center text-sm font-medium text-[#070B14] bg-primary hover:bg-cyan-400 py-2 rounded transition-colors shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg> Demo
                    </a>
                  </div>
                </div>
              </div>

               {/* Mais Projetos CTA */}
               <div className="bg-[#0A0F1C] rounded-xl overflow-hidden border border-secondary/30 hover:-translate-y-2 hover:border-secondary transition-all duration-300 flex flex-col justify-center items-center h-full min-h-[400px]">
                <svg className="w-12 h-12 text-secondary mb-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                <h3 className="text-lg font-medium text-slate-300">Mais projetos na Apresentação</h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contato" className="bg-[#070B14] border-t border-secondary/30 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para escalar o seu negócio?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            O meu objetivo não é entregar apenas um "site bonito", mas construir uma base digital sólida e veloz. Entre em contato.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a 
              href="mailto:gustavo.beserra29@gmail.com" 
              className="flex items-center justify-center px-6 py-4 bg-[#0A0F1C] hover:bg-secondary/10 text-white rounded-xl border border-secondary/50 transition-colors group"
            >
              <div className="bg-primary/10 p-3 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors border border-primary/30">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">E-mail</p>
                <p className="font-medium">gustavo.beserra29@gmail.com</p>
              </div>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/gustavo-de-souza-beserra-8205641bb/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-4 bg-[#0A0F1C] hover:bg-secondary/10 text-white rounded-xl border border-secondary/50 transition-colors group"
            >
              <div className="bg-[#0A66C2]/20 p-3 rounded-lg mr-4 group-hover:bg-[#0A66C2]/30 border border-[#0A66C2]/30 transition-colors flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="font-medium">Conecte-se comigo</p>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;