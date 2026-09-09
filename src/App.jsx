import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // CSS Injetado: Adicionado 'hide-scrollbar' para o carrossel mobile
  const glitchStyles = `
    @keyframes matrix-teleport {
      0%, 100% { transform: translate(0, 0); }
      15% { transform: translate(-4px, 2px); }
      20% { transform: translate(0, 0); }
      45% { transform: translate(4px, -2px); }
      50% { transform: translate(0, 0); }
      75% { transform: translate(-2px, -3px); }
      80% { transform: translate(0, 0); }
    }
    .matrix-glitch { transition: all 0.3s ease; }
    .matrix-glitch:hover {
      animation: matrix-teleport 0.8s infinite step-end;
      background-color: #000000 !important;
      border-color: #00FF41 !important;
      box-shadow: 0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1) !important;
      color: #00FF41 !important;
    }
    .matrix-glitch:hover * { color: #00FF41 !important; border-color: #00FF41 !important; }
    
    @keyframes text-break-1 {
      0%, 88% { transform: skewX(0deg); text-shadow: none; }
      89% { transform: skewX(12deg); text-shadow: 2px 0 #00F0FF, -2px 0 #9D00FF; }
      90% { transform: skewX(-12deg); text-shadow: -2px 0 #00F0FF, 2px 0 #9D00FF; }
      91%, 100% { transform: skewX(0deg); text-shadow: none; }
    }
    @keyframes text-break-2 {
      0%, 85% { transform: skewX(0deg); text-shadow: none; }
      86% { transform: skewX(-10deg); text-shadow: 2px 0 #9D00FF, -2px 0 #00FF41; }
      87% { transform: skewX(10deg); text-shadow: -2px 0 #9D00FF, 2px 0 #00FF41; }
      88%, 100% { transform: skewX(0deg); text-shadow: none; }
    }
    .glitch-text-1 { display: inline-block; animation: text-break-1 1.8s infinite linear; }
    .glitch-text-2 { display: inline-block; animation: text-break-2 2.3s infinite linear; }
    .glitch-text-3 { display: inline-block; animation: text-break-1 3.1s infinite linear reverse; }
    
    @keyframes border-break {
      0%, 94% { box-shadow: none; background-color: transparent; }
      95% { border-color: #00F0FF; box-shadow: inset 0 0 15px rgba(0, 240, 255, 0.3); background-color: rgba(0, 240, 255, 0.05); }
      96% { border-color: #9D00FF; box-shadow: inset 0 0 15px rgba(157, 0, 255, 0.3); background-color: rgba(157, 0, 255, 0.05); }
      97%, 100% { box-shadow: none; background-color: transparent; }
    }
    .glitch-border-1 { animation: border-break 4s infinite linear; }
    .glitch-border-2 { animation: border-break 5.5s infinite linear reverse; }
    .glitch-border-3 { animation: border-break 3.7s infinite linear; }

    @keyframes pulse-whatsapp {
      0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
      100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
    }
    .whatsapp-float { animation: pulse-whatsapp 2s infinite; }

    .nav-link { position: relative; color: #cbd5e1; transition: color 0.3s; }
    .nav-link:hover { color: #00F0FF; text-shadow: 0 0 8px rgba(0,240,255,0.4); }
    .nav-link::after {
      content: ''; position: absolute; width: 0; height: 2px;
      bottom: -4px; left: 0; background-color: #00F0FF;
      transition: width 0.3s ease; box-shadow: 0 0 8px #00F0FF;
    }
    .nav-link:hover::after { width: 100%; }

    /* Esconde barra de rolagem no mobile para o carrossel */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <style>{glitchStyles}</style>
      
      {/* HEADER FLUTUANTE */}
      <div className="fixed w-full top-0 md:top-6 z-50 px-0 md:px-4 flex justify-center pointer-events-none">
        <header className="w-full max-w-6xl bg-[#0A0F1C]/90 md:bg-[#0A0F1C]/80 backdrop-blur-lg border-b md:border border-secondary/30 md:rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] pointer-events-auto transition-all">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20 md:h-24">
              
              {/* LOGO E NOME */}
              <a href="#" className="flex-shrink-0 flex items-center gap-3 md:gap-5 group">
                <img 
                  src="/logo.png" 
                  alt="GSB Logo" 
                  className="h-11 sm:h-12 md:h-16 lg:h-20 w-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-white font-bold text-[13px] sm:text-[15px] md:text-lg lg:text-xl tracking-wider md:tracking-widest uppercase leading-tight md:leading-none mb-[2px] md:mb-2 group-hover:text-primary transition-colors">
                    Gustavo De Souza<br className="md:hidden" /> Beserra
                  </span>
                  <span className="text-secondary text-[8.5px] sm:text-[10.5px] md:text-xs lg:text-sm font-mono tracking-widest md:tracking-[0.2em] glitch-text-2">
                    ENGENHEIRO DE SOFTWARE
                  </span>
                </div>
              </a>
              
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                <a href="#sobre" className="nav-link text-xs lg:text-sm font-semibold uppercase tracking-wide">Sobre</a>
                <a href="#servicos" className="nav-link text-xs lg:text-sm font-semibold uppercase tracking-wide">Serviços</a>
                <a href="#processo" className="nav-link text-xs lg:text-sm font-semibold uppercase tracking-wide">Processo</a>
                <a href="#projetos" className="nav-link text-xs lg:text-sm font-semibold uppercase tracking-wide">Projetos</a>
                <a href="#contato" className="nav-link text-xs lg:text-sm font-semibold uppercase tracking-wide">Contato</a>
              </nav>

              {/* BOTÃO MOBILE */}
              <div className="md:hidden flex items-center justify-center">
                <button onClick={toggleMenu} className="text-primary hover:text-white transition-colors p-2 bg-primary/10 rounded-md border border-primary/30 flex items-center justify-center">
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
            <div className="md:hidden bg-[#070B14] border-t border-secondary/30 rounded-b-2xl shadow-xl">
              <div className="px-3 py-3 space-y-2">
                <a href="#sobre" onClick={toggleMenu} className="block px-3 py-2.5 text-center text-[12px] font-semibold tracking-widest uppercase text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/30">Sobre</a>
                <a href="#servicos" onClick={toggleMenu} className="block px-3 py-2.5 text-center text-[12px] font-semibold tracking-widest uppercase text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/30">Serviços</a>
                <a href="#processo" onClick={toggleMenu} className="block px-3 py-2.5 text-center text-[12px] font-semibold tracking-widest uppercase text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/30">Processo</a>
                <a href="#projetos" onClick={toggleMenu} className="block px-3 py-2.5 text-center text-[12px] font-semibold tracking-widest uppercase text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/30">Projetos</a>
                <a href="#contato" onClick={toggleMenu} className="block px-3 py-2.5 text-center text-[12px] font-semibold tracking-widest uppercase text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all border border-transparent hover:border-primary/30">Contato</a>
              </div>
            </div>
          )}
        </header>
      </div>

      <main className="pt-24 md:pt-40">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8 pb-10 md:pb-20 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12 relative">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[80px] md:blur-[100px] rounded-full pointer-events-none z-0"></div>

          {/* =========================================
              VERSÃO MOBILE DO HERO
          ========================================= */}
          <div className="flex md:hidden flex-col w-full gap-5 relative z-10">
            <div className="flex flex-row items-center justify-between gap-3 w-full">
              <div className="flex-1 text-left">
                <h1 className="text-[30px] sm:text-[38px] font-bold text-white leading-tight mb-2">
                  Muito prazer,<br/>sou o <span className="text-primary glitch-text-2">Gustavo.</span>
                </h1>
                <div className="inline-block border border-secondary py-1 px-2 rounded-md bg-secondary/10">
                  <p className="text-secondary font-semibold text-[11px] leading-tight">
                    Eu construo <span className="glitch-text-1">ferramentas</span><br/>que resolvem <span className="glitch-text-3">problemas reais.</span>
                  </p>
                </div>
              </div>
              <div className="w-28 h-32 sm:w-36 sm:h-44 relative rounded-xl overflow-hidden border border-primary/50 shadow-[0_0_20px_rgba(0,240,255,0.2)] glitch-border-1 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#070B14]/60 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                <img src="/perfil.png" alt="Gustavo Beserra" className="object-cover w-full h-full" />
              </div>
            </div>
            
            <p className="text-[16px] sm:text-[17px] text-slate-200 leading-relaxed text-left font-medium">
              Esqueça templates prontos e genéricos. Meu foco é a <span className="glitch-text-2 text-primary/80">individualização</span>. Construo experiências únicas e sob medida, garantindo que o seu site seja tão <span className="glitch-text-1 text-secondary/80">exclusivo</span> e performático quanto a sua própria marca.
            </p>
            
            <div className="flex flex-row gap-2 w-full mt-1">
              <a href="https://docs.google.com/presentation/d/1HLV9MJ2s2Vje3of9y-rLhLR7Th3EbEalbR0lw_NkjyU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="matrix-glitch flex-1 px-2 py-3 bg-primary text-[#070B14] font-bold rounded-lg text-[11px] sm:text-[13px] flex items-center justify-center text-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                Apresentação
              </a>
              <a href="#projetos" className="matrix-glitch flex-1 px-2 py-3 bg-transparent text-white font-medium rounded-lg text-[11px] sm:text-[13px] border border-secondary flex items-center justify-center text-center">
                Ver Projetos
              </a>
            </div>
          </div>

          {/* =========================================
              VERSÃO DESKTOP DO HERO
          ========================================= */}
          <div className="hidden md:flex flex-1 text-left w-full flex-col relative z-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
              Muito prazer, sou o <span className="text-primary glitch-text-2">Gustavo.</span>
            </h1>
            <div className="inline-block border border-secondary py-2 px-3 mb-4 rounded-lg bg-secondary/10 self-start transition-colors">
              <p className="text-secondary font-semibold text-lg lg:text-xl">
                Eu construo <span className="glitch-text-1">ferramentas</span> que resolvem <span className="glitch-text-3">problemas reais.</span>
              </p>
            </div>
            <p className="text-lg text-slate-300 mb-6 max-w-xl leading-relaxed mx-0">
              Ao contrário de agências que te prendem a templates lentos e engessados, eu construo a sua presença digital do <span className="glitch-text-2 text-primary/80">absoluto zero</span>. Entendo que o seu negócio é único, por isso cada detalhe é desenhado sob medida para os seus objetivos. Meu foco é entregar muito mais do que apenas uma página: desenvolvo aplicações com foco absoluto em alta performance, usabilidade premium e <span className="glitch-text-1 text-secondary/80">arquiteturas impecáveis</span>, sempre preparadas para escalar junto com o seu crescimento.
            </p>
            
            <div className="flex flex-row gap-4 justify-start w-full">
              <a href="https://docs.google.com/presentation/d/1HLV9MJ2s2Vje3of9y-rLhLR7Th3EbEalbR0lw_NkjyU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="matrix-glitch relative px-8 py-4 bg-primary hover:bg-transparent text-[#070B14] font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></svg>
                <span>Ver Apresentação Completa</span>
              </a>
              
              <a href="#projetos" className="matrix-glitch relative px-8 py-4 bg-transparent text-white font-medium rounded-lg transition-all flex items-center justify-center gap-3 border border-secondary shadow-[0_0_15px_rgba(157,0,255,0.2)]">
                <svg className="w-5 h-5 flex-shrink-0 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                <span>Ver Projetos</span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex flex-1 justify-end relative mt-0">
            <div className="relative w-[420px] h-[520px] rounded-2xl overflow-hidden border border-primary/50 shadow-[0_0_40px_rgba(0,240,255,0.2)] hover:scale-[1.02] transition-transform duration-500 z-10 glitch-border-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#070B14]/60 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
              <img src="/perfil.png" alt="Gustavo Beserra" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        {/* SEÇÃO: SOBRE */}
        <section id="sobre" className="relative py-12 md:py-20 bg-[#0A0F1C]/50 border-t border-secondary/20 overflow-hidden">
          <div className="absolute top-1/2 left-0 md:left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[90px] md:blur-[120px] -translate-y-1/2 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* =========================================
                VERSÃO MOBILE DA SEÇÃO SOBRE
            ========================================= */}
            <div className="flex md:hidden flex-col w-full gap-5">
              
              <div className="flex flex-row items-center justify-between gap-4 w-full">
                
                <div className="flex flex-col flex-1">
                  <h2 className="text-[27px] sm:text-[32px] font-bold text-white leading-[1.2] mb-3">
                    Código Limpo,<br/><span className="text-primary glitch-text-1">Mente Focada.</span>
                  </h2>
                  <div className="w-12 h-1 bg-secondary/50 rounded-full mt-1"></div>
                </div>

                <div className="w-[154px] h-[192px] sm:w-[192px] sm:h-[240px] relative rounded-xl overflow-hidden border border-secondary/50 shadow-[0_0_20px_rgba(157,0,255,0.2)] glitch-border-2 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-60 z-10"></div>
                  <img src="/Gustavo.ia.jpg" alt="Gustavo programando" className="w-full h-full object-cover relative z-0" />
                </div>
                
              </div>
              
              <div className="flex flex-col w-full gap-5 mt-1">
                  
                  <p className="text-slate-300 text-[15px] sm:text-[16px] leading-relaxed">
                    Minha jornada na programação é guiada pela constante busca por <span className="glitch-text-3 text-secondary/80 font-semibold">evolução</span>. Mais do que escrever linhas de código, meu objetivo é construir sistemas inteligentes e automatizados que facilitem o dia a dia.
                  </p>
                  
                  <div className="relative bg-[#070B14]/60 backdrop-blur-sm border-l-4 border-primary p-4 rounded-r-xl shadow-[inset_0_0_20px_rgba(0,240,255,0.03)] border-y border-r border-primary/10">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 blur-[20px] rounded-full pointer-events-none"></div>
                    
                    <p className="text-slate-200 text-[14px] sm:text-[15px] leading-relaxed relative z-10">
                      Tenho experiência sólida na criação de interfaces dinâmicas com <span className="text-primary font-medium">React</span> e estruturação de lógicas de negócio. Sempre atento às novas tecnologias, incluindo a integração de <span className="glitch-text-2 text-primary/80 font-bold">Inteligência Artificial</span> para otimizar processos.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glitch-border-1 bg-[#070B14]/80 backdrop-blur-sm border border-primary/20 p-3 rounded-lg flex flex-col items-start justify-start gap-2 hover:border-primary/60 transition-colors">
                        <div className="bg-primary/10 p-1.5 rounded text-primary">
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        </div>
                        <span className="text-[11px] sm:text-[13px] font-bold text-slate-200 leading-tight"><span className="glitch-text-3">Projetos 100%</span><br/>Autorais</span>
                      </div>
                      <div className="glitch-border-2 bg-[#070B14]/80 backdrop-blur-sm border border-secondary/20 p-3 rounded-lg flex flex-col items-start justify-start gap-2 hover:border-secondary/60 transition-colors">
                        <div className="bg-secondary/10 p-1.5 rounded text-secondary">
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <span className="text-[11px] sm:text-[13px] font-bold text-slate-200 leading-tight">Foco em <span className="glitch-text-1">Alta</span><br/>Performance</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-start gap-2 mt-1">
                      <span className="glitch-text-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-primary text-[11px] font-medium">React & Vite</span>
                      <span className="glitch-text-1 px-3 py-1.5 bg-secondary/10 border border-secondary/30 rounded-lg text-secondary text-[11px] font-medium">Tailwind CSS</span>
                      <span className="glitch-text-3 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-primary text-[11px] font-medium">Integração IA</span>
                    </div>
                  </div>
              </div>
            </div>

            {/* =========================================
                VERSÃO DESKTOP DA SEÇÃO SOBRE
            ========================================= */}
            <div className="hidden md:flex flex-row items-center gap-12 lg:gap-16 w-full">
              <div className="flex-1 flex justify-start items-center">
                <div className="flex flex-col items-center justify-center mr-8">
                  <div className="h-32 w-px bg-primary/30 mb-4"></div>
                  <span className="text-primary/50 text-xs tracking-[0.3em] font-mono glitch-text-2" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    DEV.SYS_2026
                  </span>
                  <div className="h-32 w-px bg-primary/30 mt-4"></div>
                </div>

                <div className="relative w-full max-w-[400px] rounded-2xl overflow-hidden border border-secondary/50 shadow-[0_0_30px_rgba(157,0,255,0.2)] group hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-60 z-10 group-hover:opacity-30 transition-opacity"></div>
                  <img 
                    src="/Gustavo.ia.jpg" 
                    alt="Gustavo programando" 
                    className="w-full h-auto object-cover relative z-0"
                  />
                </div>
              </div>

              <div className="flex-1 text-left w-full">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Código Limpo, <span className="text-primary glitch-text-1">Mente Focada.</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Minha jornada na programação é guiada pela constante busca por <span className="glitch-text-3 text-secondary/80">evolução</span>. Mais do que escrever linhas de código, meu objetivo é construir sistemas inteligentes e automatizados que facilitem o dia a dia.
                </p>
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  Tenho experiência sólida na criação de interfaces dinâmicas com React e estruturação de lógicas de negócio. Sempre atento às novas tecnologias, incluindo a integração de <span className="glitch-text-2 text-primary/80">Inteligência Artificial</span> para otimizar processos.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glitch-border-1 bg-[#070B14]/80 backdrop-blur-sm border border-primary/20 p-4 rounded-lg flex flex-row items-center justify-start gap-4 hover:border-primary/60 transition-colors">
                    <div className="bg-primary/10 p-2 rounded text-primary">
                      <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <span className="text-sm font-bold text-slate-200 leading-tight"><span className="glitch-text-3">Projetos 100%</span><br/>Autorais</span>
                  </div>
                  <div className="glitch-border-2 bg-[#070B14]/80 backdrop-blur-sm border border-secondary/20 p-4 rounded-lg flex flex-row items-center justify-start gap-4 hover:border-secondary/60 transition-colors">
                    <div className="bg-secondary/10 p-2 rounded text-secondary">
                      <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <span className="text-sm font-bold text-slate-200 leading-tight">Foco em <span className="glitch-text-1">Alta</span><br/>Performance</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-start gap-3">
                  <span className="glitch-text-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium">React & Vite</span>
                  <span className="glitch-text-1 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-lg text-secondary text-sm font-medium">Tailwind CSS</span>
                  <span className="glitch-text-3 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium">Integração com IA</span>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* SEÇÃO: PILARES DA ENGENHARIA */}
        <section id="servicos" className="bg-[#0A0F1C]/80 border-y border-secondary/20 py-12 md:py-20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[25px] md:text-4xl font-bold text-primary mb-8 md:mb-12 text-left">
              Os Pilares da <span className="glitch-text-2 text-white">Engenharia</span>
            </h2>
            
            <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8">
              <div className="glitch-border-3 bg-[#070B14] p-4 md:p-8 rounded-xl border border-secondary hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(157,0,255,0.3)] transition-all duration-300 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="md:mb-6 flex-shrink-0">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-primary glitch-text-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[15px] md:text-xl font-bold text-white mb-1 md:mb-4">Pilar 1 - Performance</h3>
                  <p className="text-[12px] md:text-sm text-slate-400 leading-relaxed">
                    Aplicações que carregam em milissegundos, usando as mesmas tecnologias modernas adotadas pelo mercado.
                  </p>
                </div>
              </div>

              <div className="glitch-border-1 bg-[#070B14] p-4 md:p-8 rounded-xl border border-primary hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="md:mb-6 flex-shrink-0">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-secondary glitch-text-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[15px] md:text-xl font-bold text-white mb-1 md:mb-4">Pilar 2 - Segurança</h3>
                  <p className="text-[12px] md:text-sm text-slate-400 leading-relaxed">
                    Toda a arquitetura e captação de leads é desenhada em conformidade com as exigências da LGPD.
                  </p>
                </div>
              </div>

              <div className="glitch-border-2 bg-[#070B14] p-4 md:p-8 rounded-xl border border-secondary hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(157,0,255,0.3)] transition-all duration-300 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="md:mb-6 flex-shrink-0">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-primary glitch-text-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[15px] md:text-xl font-bold text-white mb-1 md:mb-4">Pilar 3 - Design Único</h3>
                  <p className="text-[12px] md:text-sm text-slate-400 leading-relaxed">
                    Fugimos do genérico. Interfaces estrategicamente focadas na experiência do usuário e conversão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO: O PROCESSO (TIMELINE) */}
        <section id="processo" className="py-12 md:py-20 bg-[#070B14] border-b border-secondary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center mb-10 md:mb-16 justify-start">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-secondary mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <h2 className="text-[25px] md:text-4xl font-bold text-white">Como eu <span className="glitch-text-2 text-primary">Trabalho</span></h2>
            </div>

            <div className="relative border-l-2 border-secondary/30 ml-3 md:ml-0 space-y-8 md:space-y-12">
              
              <div className="relative pl-6 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[11px] top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#070B14] border-2 border-primary shadow-[0_0_10px_rgba(0,240,255,0.5)] group-hover:bg-primary transition-colors duration-300"></div>
                <div className="glitch-border-1 bg-[#0A0F1C]/80 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-primary/20 hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-primary font-mono text-[9.5px] md:text-sm font-bold tracking-widest block mb-1 md:mb-2">FASE 01 // DIAGNÓSTICO</span>
                  <h3 className="text-[17px] md:text-xl font-bold text-white mb-2 md:mb-3">Estratégia e Briefing</h3>
                  <p className="text-slate-400 text-[12px] md:text-sm leading-relaxed">
                    Antes de escrever qualquer linha, mapeamos os seus objetivos, público e as funcionalidades essenciais para que o software realmente resolva o seu problema.
                  </p>
                </div>
              </div>

              <div className="relative pl-6 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[11px] top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#070B14] border-2 border-secondary shadow-[0_0_10px_rgba(157,0,255,0.5)] group-hover:bg-secondary transition-colors duration-300"></div>
                <div className="glitch-border-2 bg-[#0A0F1C]/80 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-secondary/20 hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-secondary font-mono text-[9.5px] md:text-sm font-bold tracking-widest block mb-1 md:mb-2">FASE 02 // PROJETO</span>
                  <h3 className="text-[17px] md:text-xl font-bold text-white mb-2 md:mb-3">Arquitetura & Design</h3>
                  <p className="text-slate-400 text-[12px] md:text-sm leading-relaxed">
                    Criamos a planta do projeto. Defino a arquitetura e construo interfaces (UX/UI) focadas em conversão, garantindo uma experiência premium.
                  </p>
                </div>
              </div>

              <div className="relative pl-6 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[11px] top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#070B14] border-2 border-primary shadow-[0_0_10px_rgba(0,240,255,0.5)] group-hover:bg-primary transition-colors duration-300"></div>
                <div className="glitch-border-3 bg-[#0A0F1C]/80 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-primary/20 hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-primary font-mono text-[9.5px] md:text-sm font-bold tracking-widest block mb-1 md:mb-2">FASE 03 // CÓDIGO</span>
                  <h3 className="text-[17px] md:text-xl font-bold text-white mb-2 md:mb-3">Desenvolvimento</h3>
                  <p className="text-slate-400 text-[12px] md:text-sm leading-relaxed">
                    Aqui a mágica acontece. Transformo o design em sistema utilizando tecnologias modernas (React, Tailwind) e integrando Inteligência Artificial onde necessário.
                  </p>
                </div>
              </div>

              <div className="relative pl-6 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[11px] top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#070B14] border-2 border-secondary shadow-[0_0_10px_rgba(157,0,255,0.5)] group-hover:bg-secondary transition-colors duration-300"></div>
                <div className="glitch-border-1 bg-[#0A0F1C]/80 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-secondary/20 hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-secondary font-mono text-[9.5px] md:text-sm font-bold tracking-widest block mb-1 md:mb-2">FASE 04 // DEPLOY</span>
                  <h3 className="text-[17px] md:text-xl font-bold text-white mb-2 md:mb-3">Lançamento & Escala</h3>
                  <p className="text-slate-400 text-[12px] md:text-sm leading-relaxed">
                    Testes rigorosos de velocidade, segurança e responsividade. O sistema é entregue otimizado (SEO) e pronto para receber alto volume de acessos sem travar.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projetos" className="py-12 md:py-20 pl-4 pr-0 md:px-8 max-w-6xl mx-auto">
          <div className="flex items-center mb-8 md:mb-12 justify-start pr-4 md:pr-0">
            <svg className="w-6 h-6 md:w-7 md:h-7 text-primary mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
            <h2 className="text-[25px] md:text-3xl font-bold text-white">Projetos <span className="glitch-text-1 text-secondary">Desenvolvidos</span></h2>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 snap-x snap-mandatory hide-scrollbar pb-6 pr-4 md:pr-0 md:pb-0">
            
            <div className="min-w-[85%] sm:min-w-[300px] md:min-w-0 snap-center bg-[#0A0F1C] rounded-xl overflow-hidden border border-secondary/30 hover:-translate-y-1 md:hover:-translate-y-2 hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <div className="h-40 md:h-48 bg-[#070B14] flex items-center justify-center border-b border-secondary/20">
                <span className="text-primary font-medium glitch-text-3 text-[15px] md:text-sm">Projeto 1</span>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-[19px] md:text-xl font-bold text-white mb-2">Seu Novo Site</h3>
                <p className="text-slate-400 text-[13px] md:text-sm mb-4 line-clamp-3">
                  Substitua pelos sites reais que você desenvolveu com a sua nova experiência técnica.
                </p>
                <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                  <span className="text-[9.5px] md:text-xs font-medium text-primary bg-primary/10 border border-primary/30 px-2 py-1 rounded">React</span>
                  <span className="text-[9.5px] md:text-xs font-medium text-secondary bg-secondary/10 border border-secondary/30 px-2 py-1 rounded">Tailwind</span>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <a href="#" className="matrix-glitch relative flex-1 flex items-center justify-center text-[11px] md:text-sm font-medium text-white bg-[#070B14] border border-secondary/50 py-2.5 md:py-2 rounded transition-colors">
                    Repo
                  </a>
                  <a href="#" className="matrix-glitch relative flex-1 flex items-center justify-center gap-2 text-[11px] md:text-sm font-medium text-[#070B14] bg-primary py-2.5 md:py-2 rounded transition-colors shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg> Demo
                  </a>
                </div>
              </div>
            </div>

            <div className="min-w-[85%] sm:min-w-[300px] md:min-w-0 snap-center bg-[#0A0F1C] rounded-xl overflow-hidden border border-secondary/30 hover:-translate-y-1 md:hover:-translate-y-2 hover:border-secondary transition-all duration-300 flex flex-col justify-center items-center h-full min-h-[300px] md:min-h-[400px]">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-secondary mb-3 md:mb-4 glitch-text-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              <h3 className="text-[15px] md:text-lg font-medium text-slate-300 px-4 text-center">Mais projetos na Apresentação</h3>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contato" className="bg-[#070B14] border-t border-secondary/30 py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[25px] md:text-3xl font-bold text-white mb-3 md:mb-6">Pronto para <span className="text-primary glitch-text-3">escalar</span> o seu negócio?</h2>
          <p className="text-slate-400 text-[13px] md:text-base mb-8 max-w-2xl mx-auto px-2">
            O meu objetivo não é entregar apenas um site, mas construir uma base digital sólida.
          </p>
          
          <div className="flex flex-row md:flex-row justify-center gap-3 md:gap-6 mb-8 w-full">
            <a 
              href="mailto:gustavo.beserra29@gmail.com" 
              className="matrix-glitch relative flex-1 flex flex-col md:flex-row items-center justify-center p-3 md:px-6 md:py-4 bg-[#0A0F1C] text-white rounded-xl border border-secondary/50 transition-colors"
            >
              <div className="bg-primary/10 p-2 md:p-3 rounded-lg md:mr-4 mb-2 md:mb-0 border border-primary/30 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[8.5px] md:text-xs text-secondary font-medium uppercase tracking-wider mb-1">E-mail</p>
                <p className="font-medium text-[10px] sm:text-[13px] md:text-base break-all">gustavo.beserra29@gmail.com</p>
              </div>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/gustavo-de-souza-beserra-8205641bb/" 
              target="_blank"
              rel="noopener noreferrer"
              className="matrix-glitch relative flex-1 flex flex-col md:flex-row items-center justify-center p-3 md:px-6 md:py-4 bg-[#0A0F1C] text-white rounded-xl border border-secondary/50 transition-colors"
            >
              <div className="bg-[#0A66C2]/20 p-2 md:p-3 rounded-lg md:mr-4 mb-2 md:mb-0 border border-[#0A66C2]/30 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0A66C2] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[8.5px] md:text-xs text-secondary font-medium uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="font-medium text-[10px] sm:text-[13px] md:text-base break-all">Conecte-se comigo</p>
              </div>
            </a>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <div className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-[9999]">
        <a
          href="https://wa.me/5511998954769?text=Olá,%20Gustavo!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float matrix-glitch flex bg-[#25D366] text-[#070B14] p-3 md:p-4 rounded-full items-center justify-center group shadow-xl"
          aria-label="Falar no WhatsApp"
        >
          <svg className="w-[30px] h-[30px] md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;