import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-dark">
      {/* HEADER / NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#" className="text-xl font-bold text-white tracking-tight">Gustavo Beserra</a>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <a href="#sobre" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Sobre</a>
              <a href="#formacao" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Formação</a>
              <a href="#habilidades" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Habilidades</a>
              <a href="#projetos" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Projetos</a>
              <a href="#contato" className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">Contato</a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-slate-300 hover:text-white">
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
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#sobre" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">Sobre</a>
              <a href="#formacao" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">Formação</a>
              <a href="#habilidades" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">Habilidades</a>
              <a href="#projetos" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">Projetos</a>
              <a href="#contato" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">Contato</a>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-primary font-medium mb-2">Olá, sou</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Gustavo de Souza Beserra
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Desenvolvedor de Software em formação | 20 anos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contato" className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Entre em Contato
              </a>
              <a href="#projetos" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center border border-slate-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6l-6 6 6 6"/></svg>
                Ver Projetos
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
              <img 
                src="/image_ea6ddb.jpg" 
                alt="Foto de Gustavo de Souza Beserra" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="sobre" className="bg-slate-800/50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <svg className="w-7 h-7 text-primary mr-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <h2 className="text-3xl font-bold text-white">Sobre Mim</h2>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-lg">
              <p className="text-slate-300 leading-relaxed text-lg mb-4">
                "Sou completamente dedicado a tudo que me proponho a realizar, desde pequenos detalhes às grandes conquistas, e não me contento com um trabalho mal efetuado. Procuro sempre melhorar e me adequar a qualquer situação adversa, contando com a minha flexibilidade, comunicação e estratégias adequadas, interesse e atenção.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg">
                Iniciei no mercado de trabalho com 14 anos, e venho obtendo conhecimento e experiência para evoluir no âmbito profissional e pessoal. No momento iniciei minha jornada na programação e estou à disposição para oportunidades nas quais eu consiga exercer a profissão."
              </p>
            </div>
          </div>
        </section>

        {/* EDUCATION & EXPERIENCE SECTION */}
        <section id="formacao" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12 justify-center md:justify-start">
              <svg className="w-7 h-7 text-primary mr-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
              <h2 className="text-3xl font-bold text-white">Formação e Experiência</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Educação */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center border-b border-slate-700 pb-2">
                  Histórico Acadêmico
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                  <h4 className="text-lg font-medium text-primary">Engenharia de Software</h4>
                  <p className="text-slate-400 text-sm mb-2">Cursando - 2º Semestre</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                  <h4 className="text-lg font-medium text-primary">Profissão Programador</h4>
                  <p className="text-slate-400 text-sm mb-2">Curso Profissionalizante</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                  <h4 className="text-lg font-medium text-primary">Inglês</h4>
                  <p className="text-slate-400 text-sm mb-2">Nível Intermediário</p>
                </div>
              </div>

              {/* Experiência */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center border-b border-slate-700 pb-2">
                  Experiência Profissional
                </h3>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors h-full">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-slate-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                    <div>
                      <h4 className="text-lg font-medium text-primary mb-2">Desenvolvimento & Automação</h4>
                      <p className="text-slate-300 leading-relaxed">
                        Geração de sites e estruturação de planilhas automatizadas com o auxílio de ferramentas de Inteligência Artificial, focando em produtividade e resolução de problemas tecnológicos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="habilidades" className="bg-slate-800/50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12 justify-center">
              <svg className="w-7 h-7 text-primary mr-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              <h2 className="text-3xl font-bold text-white">Minhas Habilidades</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Hard Skills */}
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Front-End (Hard Skills)</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'React'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-slate-900 text-primary border border-slate-700 rounded-full text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills & Tools */}
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Ferramentas & Soft Skills</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Git', 'GitHub', 'Metodologias Ágeis', 'Resolução de Problemas', 'Adaptabilidade', 'Uso de IA para Desenvolvimento'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-slate-700 text-slate-200 border border-slate-600 rounded-full text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projetos" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12 justify-center md:justify-start">
              <svg className="w-7 h-7 text-primary mr-3" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
              <h2 className="text-3xl font-bold text-white">Projetos Recentes</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card Placeholder 1 */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <div className="h-48 bg-slate-700 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">Imagem do Projeto</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Título do Projeto 1</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    Breve descrição do projeto. Aqui você detalha o que a aplicação faz, qual problema ela resolve e qual foi o seu papel no desenvolvimento.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">React</span>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Tailwind</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="flex-1 flex items-center justify-center text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 py-2 rounded transition-colors">
                      <div className="w-4 h-4 bg-slate-400 rounded-sm mr-2"></div> Repo
                    </a>
                    <a href="#" className="flex-1 flex items-center justify-center text-sm font-medium text-white bg-primary hover:bg-blue-600 py-2 rounded transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg> Demo
                    </a>
                  </div>
                </div>
              </div>

               {/* Card Placeholder 2 */}
               <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <div className="h-48 bg-slate-700 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">Imagem do Projeto</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Título do Projeto 2</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    Breve descrição do projeto. Substitua este texto com os detalhes do seu projeto real quando ele estiver pronto para ser publicado.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">JavaScript</span>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">HTML/CSS</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="flex-1 flex items-center justify-center text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 py-2 rounded transition-colors">
                      <div className="w-4 h-4 bg-slate-400 rounded-sm mr-2"></div> Repo
                    </a>
                    <a href="#" className="flex-1 flex items-center justify-center text-sm font-medium text-white bg-primary hover:bg-blue-600 py-2 rounded transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg> Demo
                    </a>
                  </div>
                </div>
              </div>

               {/* Card Placeholder 3 */}
               <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-center items-center h-full min-h-[400px]">
                <svg className="w-12 h-12 text-slate-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                <h3 className="text-lg font-medium text-slate-400">Mais projetos em breve</h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER / CONTACT SECTION */}
      <footer id="contato" className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Vamos trabalhar juntos?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e desafios para aplicar meus conhecimentos e continuar evoluindo como desenvolvedor.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a 
              href="mailto:gustavo.beserra29@gmail.com" 
              className="flex items-center justify-center px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors group"
            >
              <div className="bg-primary/20 p-3 rounded-lg mr-4 group-hover:bg-primary/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">E-mail</p>
                <p className="font-medium">gustavo.beserra29@gmail.com</p>
              </div>
            </a>
            
           <a 
              href="https://www.linkedin.com/in/gustavo-de-souza-beserra-8205641bb/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors group"
            >
              <div className="bg-[#0A66C2]/20 p-3 rounded-lg mr-4 group-hover:bg-[#0A66C2]/30 transition-colors flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="font-medium">Conecte-se comigo</p>
              </div>
            </a>
          </div>

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Gustavo de Souza Beserra. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;