import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// 0. MOTOR DE ÁUDIO PROCEDURAL (WEB AUDIO API - CUSTO ZERO / ZERO ARQUIVOS)
// ============================================================================
function useCyberAudio() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef(null);

  const playTone = useCallback(
    (type = 'click') => {
      if (!soundEnabled || typeof window === 'undefined') return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime;

        if (type === 'click') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
        } else if (type === 'tab') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(340, now);
          osc.frequency.exponentialRampToValueAtTime(680, now + 0.07);
          gain.gain.setValueAtTime(0.035, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === 'palette') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(660, now + 0.04);
          gain.gain.setValueAtTime(0.035, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
        }
      } catch {
        // Ignora bloqueios silenciosamente
      }
    },
    [soundEnabled]
  );

  return { soundEnabled, setSoundEnabled, playTone };
}

// ============================================================================
// 1. CASCATA DE CÓDIGO EM CANVAS (OTIMIZADA PARA MOBILE E DESKTOP)
// ============================================================================
function CodeCascadeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const fontSize = isMobile ? 11 : 14;
    const columnSpacing = isMobile ? 48 : 32;
    const columns = Math.floor(width / columnSpacing);

    const tokens = [
      '0', '1', '{ }', '< />', 'AI', 'SYS', '0xFF', 'REACT',
      'VITE', 'API', '=>', '01', '10', 'DEV', 'GSB', '::'
    ];

    const drops = Array.from({ length: columns }, () => ({
      y: Math.random() * -100,
      speed: isMobile ? 0.18 + Math.random() * 0.32 : 0.22 + Math.random() * 0.48,
      color: Math.random() > 0.35 ? '#00F0FF' : '#9D00FF',
      tokenIndex: Math.floor(Math.random() * tokens.length),
      opacity: isMobile ? 0.04 + Math.random() * 0.07 : 0.05 + Math.random() * 0.11
    }));

    const mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const render = () => {
      ctx.fillStyle = 'rgba(7, 11, 20, 0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * columnSpacing;
        const y = drop.y * fontSize;

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = !isMobile && dist < 140 ? (1 - dist / 140) * 0.4 : 0;

        ctx.fillStyle = drop.color;
        ctx.globalAlpha = Math.min(0.65, drop.opacity + boost);

        if (Math.random() > 0.96) {
          drop.tokenIndex = Math.floor(Math.random() * tokens.length);
        }

        ctx.fillText(tokens[drop.tokenIndex], x, y);

        drop.y += drop.speed;
        if (y > height && Math.random() > 0.975) {
          drop.y = -2;
          drop.speed = isMobile ? 0.18 + Math.random() * 0.32 : 0.22 + Math.random() * 0.48;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 md:opacity-75"
      aria-hidden="true"
    />
  );
}

// ============================================================================
// 2. EFEITO VISUAL DE ABERTURA (BOOT SEQUENCE + CORTINA LASER)
// ============================================================================
function BootOverlay({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isGone, setIsGone] = useState(false);

  const bootLogs = [
    { threshold: 10, tag: 'SYS', text: 'Inicializando GSB_CORE_KERNEL v2026.4...' },
    { threshold: 35, tag: 'ARCH', text: 'Arquitetura 100% autoral [ZERO_TEMPLATES]...' },
    { threshold: 62, tag: 'HUD', text: 'Calibrando interface responsiva e telemetria...' },
    { threshold: 88, tag: 'OK', text: 'Acesso liberado // Gustavo Beserra' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 5;
        return Math.min(100, prev + step);
      });
    }, 95);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const splitTimer = setTimeout(() => setIsSplitting(true), 350);
      const removeTimer = setTimeout(() => {
        setIsGone(true);
        if (onComplete) onComplete();
      }, 1150);
      return () => {
        clearTimeout(splitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsSplitting(true);
    setTimeout(() => {
      setIsGone(true);
      if (onComplete) onComplete();
    }, 450);
  };

  if (isGone) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-auto overflow-hidden flex flex-col justify-between">
      {/* METADE SUPERIOR */}
      <div
        className={`w-full h-1/2 bg-[#050814] border-b-2 border-primary/70 shadow-[0_12px_50px_rgba(0,240,255,0.3)] transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-end items-center pb-6 px-5 relative ${
          isSplitting ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="cyber-grid-bg absolute inset-0 opacity-35 pointer-events-none" />

        <div className="hidden sm:block absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-dashed border-primary/25 animate-spin-slow pointer-events-none" />

        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[11px] font-mono tracking-widest uppercase text-slate-300 hover:text-primary border border-slate-700 hover:border-primary/60 px-3.5 py-2 rounded-lg bg-[#0A0F1C]/95 transition-colors z-20 active:scale-95"
        >
          [ Pular ]
        </button>

        <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-primary uppercase">
              GSB.SYS // BOOT SEQUENCE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider uppercase mb-4">
            Gustavo <span className="text-primary">Beserra</span>
          </h2>

          <div className="w-full h-2.5 bg-[#0A0F1C] rounded-full overflow-hidden border border-secondary/50 p-[2px]">
            <div
              className="h-full bg-gradient-to-r from-secondary via-primary to-[#00FF41] transition-all duration-200 rounded-full shadow-[0_0_18px_#00F0FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full flex justify-between text-[10px] font-mono text-slate-400 mt-2">
            <span>{progress < 100 ? 'LOADING_SYSTEM...' : 'ACCESS_GRANTED'}</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* METADE INFERIOR */}
      <div
        className={`w-full h-1/2 bg-[#050814] border-t-2 border-secondary/70 shadow-[0_-12px_50px_rgba(157,0,255,0.3)] transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-start items-center pt-6 px-5 relative ${
          isSplitting ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="cyber-grid-bg absolute inset-0 opacity-35 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#0A0F1C]/95 border border-primary/25 rounded-2xl p-3.5 sm:p-4 font-mono text-[10px] sm:text-[11px] space-y-2 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          {bootLogs.map((log, idx) => {
            const visible = progress >= log.threshold;
            return (
              <div
                key={idx}
                className={`flex items-start sm:items-center gap-2 transition-all duration-300 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold flex-shrink-0 ${
                    log.tag === 'OK'
                      ? 'bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/40'
                      : 'bg-primary/20 text-primary border border-primary/40'
                  }`}
                >
                  {log.tag}
                </span>
                <span className="text-slate-300 leading-snug text-left">{log.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. COMPONENTE DE REVELAÇÃO AO ROLAR A PÁGINA (INTERSECTION OBSERVER)
// ============================================================================
function CyberReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  flash = false
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform = {
    up: 'translate-y-7 scale-[0.99]',
    left: 'translate-y-5 md:translate-y-0 md:-translate-x-8',
    right: 'translate-y-5 md:translate-y-0 md:translate-x-8',
    scale: 'scale-95'
  }[direction] || 'translate-y-7';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? `opacity-100 translate-x-0 translate-y-0 scale-100 ${flash ? 'reveal-flash' : ''}`
          : `opacity-0 ${initialTransform}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 4. DIVISOR DECORATIVO DE CIRCUITO SVG (ADAPTADO PARA MOBILE E DESKTOP)
// ============================================================================
function CircuitDivider({ label = 'SYS_NODE' }) {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-2 select-none pointer-events-none">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/70 sm:hidden" />

        <svg className="hidden sm:block w-full h-6 overflow-visible" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path
            d="M0 12 L140 12 L155 4 L245 4 L260 12 L400 12"
            fill="none"
            stroke="rgba(0, 240, 255, 0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M0 12 L140 12 L155 4 L245 4 L260 12 L400 12"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeDasharray="60 340"
            className="circuit-pulse"
          />
          <circle cx="140" cy="12" r="2.5" fill="#9D00FF" />
          <circle cx="260" cy="12" r="2.5" fill="#00F0FF" />
        </svg>

        <span className="font-mono text-[9px] tracking-[0.22em] sm:tracking-[0.3em] text-primary/80 border border-primary/30 bg-[#050814] px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
          {label}
        </span>

        <svg className="hidden sm:block w-full h-6 overflow-visible" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path
            d="M0 12 L140 12 L155 20 L245 20 L260 12 L400 12"
            fill="none"
            stroke="rgba(157, 0, 255, 0.18)"
            strokeWidth="1.2"
          />
          <path
            d="M0 12 L140 12 L155 20 L245 20 L260 12 L400 12"
            fill="none"
            stroke="#9D00FF"
            strokeWidth="1.5"
            strokeDasharray="60 340"
            className="circuit-pulse-reverse"
          />
          <circle cx="140" cy="12" r="2.5" fill="#00F0FF" />
          <circle cx="260" cy="12" r="2.5" fill="#9D00FF" />
        </svg>

        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-secondary/40 to-secondary/70 sm:hidden" />
      </div>
    </div>
  );
}

// ============================================================================
// 5. SPOTLIGHT MAGNÉTICO & MOLDURA HUD 3D
// ============================================================================
function SpotlightCard({ children, className = '', accent = 'cyan' }) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowColor =
    accent === 'purple' ? 'rgba(157, 0, 255, 0.16)' : 'rgba(0, 240, 255, 0.16)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 hidden md:block"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 65%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function TiltHudFrame({ children, code = 'GSB // 2026', className = '' }) {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handleMouseMove = (e) => {
    if (!frameRef.current || window.innerWidth < 768) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 12,
      ry: (px - 0.5) * 12,
      gx: px * 100,
      gy: py * 100
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.rx === 0 && tilt.ry === 0 ? 'transform 0.5s ease' : 'transform 0.08s ease-out'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
      <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-secondary z-20 pointer-events-none" />
      <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-secondary z-20 pointer-events-none" />
      <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />
      <span className="absolute top-3 right-7 text-[9px] font-mono tracking-widest text-primary/90 bg-[#070B14]/85 px-2 py-0.5 rounded border border-primary/30 z-20 pointer-events-none">
        {code}
      </span>
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-35 transition-opacity hidden md:block"
        style={{
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(0,240,255,0.22), transparent 60%)`
        }}
      />
      {children}
    </div>
  );
}

// ============================================================================
// 6. TICKER DE ENGENHARIA
// ============================================================================
function TechTicker() {
  const items = [
    'ZERO TEMPLATES',
    'ARQUITETURA SOB MEDIDA',
    'ALTA PERFORMANCE',
    'REACT & TAILWIND',
    'INTEGRAÇÃO COM IA',
    'CÓDIGO LIMPO & ESCALÁVEL',
    'SEGURANÇA LGPD'
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#050814] border-y border-primary/20 py-2.5 select-none z-10">
      <div className="flex whitespace-nowrap animate-marquee gap-8 sm:gap-10 items-center">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.25em]">
            <span className="text-secondary">//</span>
            <span className={idx % 2 === 0 ? 'text-slate-300' : 'text-primary'}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 7. RÉGUA HUD LATERAL DE TELEMETRIA (DESKTOP)
// ============================================================================
function SideHudNavigator({ activeSection, scrollPercent, onJump }) {
  const sectors = [
    { id: 'topo', code: '00', label: 'INÍCIO' },
    { id: 'sobre', code: '01', label: 'SOBRE' },
    { id: 'projetos', code: '02', label: 'PROJETOS' },
    { id: 'simulador', code: '03', label: 'ESCOPO' },
    { id: 'contato', code: '04', label: 'CONTATO' }
  ];

  return (
    <aside
      aria-label="Navegação de telemetria"
      className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 select-none"
    >
      <div className="bg-[#0A0F1C]/85 backdrop-blur-md border border-primary/25 rounded-2xl p-3 shadow-[0_0_25px_rgba(0,0,0,0.6)] flex flex-col items-end gap-3">
        <div className="font-mono text-[9px] text-primary tracking-widest border-b border-secondary/30 pb-1.5 w-full text-right">
          DEPTH // {String(scrollPercent).padStart(2, '0')}%
        </div>

        <div className="flex flex-col gap-2.5 relative">
          {sectors.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onJump(sec.id)}
                className="group flex items-center justify-end gap-2.5 text-right focus:outline-none"
              >
                <span
                  className={`font-mono text-[9px] tracking-wider transition-all ${
                    isActive
                      ? 'text-primary font-bold translate-x-0 opacity-100'
                      : 'text-slate-500 group-hover:text-slate-300 opacity-75'
                  }`}
                >
                  {sec.code}_{sec.label}
                </span>
                <span
                  className={`transition-all rounded-full ${
                    isActive
                      ? 'w-3 h-3 bg-primary shadow-[0_0_10px_#00F0FF] ring-2 ring-primary/30'
                      : 'w-2 h-2 bg-slate-700 group-hover:bg-secondary'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

// ============================================================================
// 8. PALETA DE COMANDOS RÁPIDOS (CTRL + K)
// ============================================================================
function CommandPaletteModal({ isOpen, onClose, onJump, onCopyEmail, soundEnabled, onToggleSound, playTone }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    { id: 'sobre', label: 'Seção: Sobre Mim & Código', tag: 'SEC_01', action: () => onJump('sobre', 'perfil') },
    { id: 'pilares', label: 'Seção: Pilares & Comparativo', tag: 'SEC_01', action: () => onJump('sobre', 'pilares') },
    { id: 'stack', label: 'Seção: Arsenal Tecnológico', tag: 'SEC_01', action: () => onJump('sobre', 'stack') },
    { id: 'projetos', label: 'Seção: Projetos Desenvolvidos', tag: 'SEC_02', action: () => onJump('projetos', 'cards') },
    { id: 'processo', label: 'Seção: Como Trabalho & FAQ', tag: 'SEC_02', action: () => onJump('projetos', 'processo') },
    { id: 'simulador', label: 'Seção: Simulador de Escopo', tag: 'SEC_03', action: () => onJump('simulador') },
    { id: 'email', label: 'Copiar E-mail (gustavo.beserra29@gmail.com)', tag: 'COPIAR', action: onCopyEmail },
    {
      id: 'whatsapp',
      label: 'Abrir WhatsApp Direto (11 99895-4769)',
      tag: 'LINK',
      action: () => window.open('https://wa.me/5511998954769', '_blank')
    },
    {
      id: 'instagram',
      label: 'Abrir Instagram (@gustavo_s0uzaa)',
      tag: 'LINK',
      action: () => window.open('https://www.instagram.com/gustavo_s0uzaa/', '_blank')
    },
    {
      id: 'sound',
      label: soundEnabled ? 'Silenciar Efeitos Sonoros' : 'Ativar Efeitos Sonoros',
      tag: 'ÁUDIO',
      action: onToggleSound
    }
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[10001] bg-[#050814]/80 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0A0F1C] border border-primary/50 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-secondary/30 bg-[#050814]">
          <span className="text-primary mr-2.5 text-sm">&gt;_</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ir para seção ou executar ação..."
            className="w-full bg-transparent text-white text-base sm:text-sm outline-none placeholder-slate-500"
          />
          <button onClick={onClose} className="text-[10px] text-slate-400 border border-slate-700 px-2 py-1 rounded">
            ESC
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2.5 space-y-1">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playTone('tab');
                item.action();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs text-slate-200 hover:bg-primary/15 hover:text-primary transition-colors"
            >
              <span className="font-sans font-medium">{item.label}</span>
              <span className="text-[9px] text-secondary border border-secondary/30 px-2 py-0.5 rounded ml-2 flex-shrink-0">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 9. MODAL DE DETALHES DO PROJETO
// ============================================================================
function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[10001] bg-[#050814]/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0A0F1C] border-t sm:border border-primary/50 rounded-t-3xl sm:rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden text-left animate-fadeIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#050814] border-b border-secondary/30 font-mono sticky top-0 z-10">
          <span className="text-xs text-primary font-bold">{project.id} // ARCHITECTURAL_SPEC</span>
          <button
            onClick={onClose}
            className="text-xs text-slate-300 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg active:scale-95"
          >
            [ FECHAR ]
          </button>
        </div>

        <div className="p-5 sm:p-6 md:p-8 space-y-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.summary}</p>
          </div>

          <div className="bg-[#070B14] border border-primary/20 rounded-xl p-4">
            <span className="font-mono text-[10px] text-secondary uppercase block mb-1.5">
              ARQUITETURA TÉCNICA:
            </span>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{project.architecture}</p>
          </div>

          <ul className="space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <span className="text-[#00FF41] font-bold">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 pt-2 pb-2">
            <a
              href={project.repoUrl}
              className="matrix-glitch flex-1 text-center py-3.5 rounded-xl bg-[#070B14] border border-secondary/50 text-white text-xs sm:text-sm font-bold active:scale-[0.98]"
            >
              Repositório
            </a>
            <a
              href={project.demoUrl}
              className="matrix-glitch flex-1 text-center py-3.5 rounded-xl bg-primary text-[#070B14] text-xs sm:text-sm font-bold active:scale-[0.98]"
            >
              Demo Ao Vivo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: APP
// ============================================================================
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bootFinished, setBootFinished] = useState(false);

  // Estados de Rolagem (Barra de Progresso + Setor Ativo)
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('topo');

  // Estados das sub-vistas de cada bloco
  const [aboutTab, setAboutTab] = useState('perfil');
  const [codeTab, setCodeTab] = useState('stack');
  const [workTab, setWorkTab] = useState('cards');
  const [activePhase, setActivePhase] = useState(0);
  const [selectedFaq, setSelectedFaq] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');

  // Estados do Simulador de Escopo
  const [projectType, setProjectType] = useState('Landing Page de Alta Conversão');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'Design 100% Exclusivo',
    'Integração Direta WhatsApp'
  ]);
  const [clientName, setClientName] = useState('');

  // Modais e utilidades
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const { soundEnabled, setSoundEnabled, playTone } = useCyberAudio();

  // Monitoramento de Progresso de Rolagem e Seção Ativa
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))) : 0;
      setScrollPercent(pct);

      const sectionIds = ['topo', 'sobre', 'projetos', 'simulador', 'contato'];
      const offset = window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    playTone('click');
    setIsMenuOpen(!isMenuOpen);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('gustavo.beserra29@gmail.com');
      showToast('E-mail copiado: gustavo.beserra29@gmail.com');
    }
  };

  const jumpToSection = (sectionId, subTab) => {
    playTone('tab');
    if (sectionId === 'sobre' && subTab) setAboutTab(subTab);
    if (sectionId === 'projetos' && subTab) setWorkTab(subTab);
    setIsMenuOpen(false);
    if (sectionId === 'topo') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Atalho Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playTone('palette');
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsPaletteOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playTone]);

  // Dados estruturados e enxutos
  const codeFiles = {
    stack: {
      filename: 'gustavo.architecture.ts',
      lines: [
        { num: '01', code: 'export const engineer = {', color: 'text-secondary' },
        { num: '02', code: '  name: "Gustavo de Souza Beserra",', color: 'text-slate-200' },
        { num: '03', code: '  templates: false, // 100% autoral', color: 'text-primary' },
        { num: '04', code: '  stack: ["React", "Next", "Node", "IA"],', color: 'text-slate-200' },
        { num: '05', code: '  foco: "Performance & Automação"', color: 'text-[#00FF41]' },
        { num: '06', code: '};', color: 'text-secondary' }
      ]
    },
    manifesto: {
      filename: 'deploy.pipeline.json',
      lines: [
        { num: '01', code: '{', color: 'text-secondary' },
        { num: '02', code: '  "01_briefing": "Diagnóstico do negócio",', color: 'text-slate-200' },
        { num: '03', code: '  "02_design": "Interface 100% exclusiva",', color: 'text-primary' },
        { num: '04', code: '  "03_codigo": "Velocidade + LGPD"', color: 'text-[#00FF41]' },
        { num: '05', code: '}', color: 'text-secondary' }
      ]
    }
  };

  const arsenal = [
    { name: 'React & Vite', tag: 'FRONTEND', desc: 'Interfaces instantâneas e reativas.' },
    { name: 'Next.js & Tailwind', tag: 'UI & SEO', desc: 'Design exclusivo focado em conversão.' },
    { name: 'Node.js & NestJS', tag: 'BACKEND', desc: 'APIs escaláveis e regras de negócio.' },
    { name: 'PostgreSQL & Supabase', tag: 'DADOS', desc: 'Banco estruturado com segurança LGPD.' },
    { name: 'Python & Scripts', tag: 'AUTOMAÇÃO', desc: 'Automação de planilhas e processos.' },
    { name: 'IA & WhatsApp', tag: 'INTELIGÊNCIA', desc: 'Atendimento automatizado e fluxos com IA.' }
  ];

  const comparisons = [
    {
      metric: 'Velocidade',
      custom: 'Carregamento em milissegundos, sem plugins pesados.',
      template: 'Lento e carregado de scripts genéricos.'
    },
    {
      metric: 'Exclusividade',
      custom: 'Design 100% único pensado para a sua marca.',
      template: 'Layout repetido em dezenas de outros sites.'
    },
    {
      metric: 'Propriedade',
      custom: 'Código-fonte totalmente seu, sem aluguel mensal.',
      template: 'Preso à plataforma e limitações do tema.'
    }
  ];

  const phases = [
    {
      num: '01',
      title: 'Briefing',
      fullTitle: 'Briefing & Estratégia',
      desc: 'Mapeamos seus objetivos e funcionalidades essenciais antes de escrever código.'
    },
    {
      num: '02',
      title: 'Arquitetura',
      fullTitle: 'Arquitetura & UX',
      desc: 'Estruturo o fluxo e o visual sob medida com foco em conversão e clareza.'
    },
    {
      num: '03',
      title: 'Código & IA',
      fullTitle: 'Desenvolvimento',
      desc: 'Construção em React, Tailwind e Node com integrações de IA e WhatsApp.'
    },
    {
      num: '04',
      title: 'Deploy',
      fullTitle: 'Deploy & Escala',
      desc: 'Testes de velocidade, SEO técnico e publicação pronta para crescer.'
    }
  ];

  const faqs = [
    {
      cmd: 'prazo-entrega',
      question: 'Qual o prazo médio de entrega?',
      answer: 'Landing Pages levam de 5 a 10 dias úteis. Sistemas completos ou integrações com IA variam de 2 a 5 semanas.'
    },
    {
      cmd: 'propriedade-codigo',
      question: 'O código fica 100% comigo?',
      answer: 'Sim. Todo o projeto desenvolvido é de sua propriedade, sem mensalidades presas a construtores.'
    },
    {
      cmd: 'integracao-whatsapp-ia',
      question: 'Integra com WhatsApp e IA?',
      answer: 'Sim! Desde captação inteligente de leads até fluxos automatizados e atendimento com IA.'
    }
  ];

  useEffect(() => {
    const fullText = faqs[selectedFaq].answer;
    setTypedAnswer('');
    let idx = 0;
    const timer = setInterval(() => {
      idx += 2;
      setTypedAnswer(fullText.slice(0, idx));
      if (idx >= fullText.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [selectedFaq]);

  const projects = [
    {
      id: 'PRJ_01',
      title: 'Seu Novo Site',
      badge: 'DESTAQUE_01',
      summary: 'Substitua pelos sites e aplicações reais que você desenvolveu com arquitetura autoral.',
      stack: ['React', 'Tailwind', 'Vite'],
      architecture: 'SPA modular com carregamento ultra-rápido, SEO técnico e foco total em conversão.',
      highlights: ['Carregamento instantâneo', 'Design 100% exclusivo', 'Responsivo mobile-first'],
      repoUrl: '#',
      demoUrl: '#'
    },
    {
      id: 'PRJ_02',
      title: 'Sistema Web & WhatsApp',
      badge: 'FULLSTACK_IA',
      summary: 'Espaço reservado para seus sistemas com painel administrativo e automação de atendimento.',
      stack: ['Next.js', 'Node.js', 'Supabase'],
      architecture: 'Banco relacional estruturado, APIs seguras e conformidade LGPD.',
      highlights: ['Leads direto no WhatsApp', 'Painel de gestão', 'Alta escalabilidade'],
      repoUrl: '#',
      demoUrl: '#'
    }
  ];

  const scopeTypes = [
    { name: 'Landing Page de Alta Conversão', est: '5 a 10 dias', stack: 'React + Tailwind' },
    { name: 'Site Institucional Sob Medida', est: '10 a 15 dias', stack: 'Next.js + Tailwind' },
    { name: 'Sistema Web / CRM / SaaS', est: '3 a 5 semanas', stack: 'React + Node + SQL' },
    { name: 'Automação & Atendimento IA', est: '1 a 2 semanas', stack: 'Python + WhatsApp API' }
  ];

  const featuresList = [
    'Design 100% Exclusivo',
    'Integração Direta WhatsApp',
    'Agente / Chatbot com IA',
    'Painel Administrativo',
    'SEO Técnico Avançado',
    'Banco de Dados & Login'
  ];

  const toggleFeature = (feat) => {
    playTone('click');
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((item) => item !== feat) : [...prev, feat]
    );
  };

  const currentScopeObj = scopeTypes.find((t) => t.name === projectType) || scopeTypes[0];

  const whatsappMessage =
    `Olá, Gustavo! Vim pelo seu portfólio e montei um escopo:\n\n` +
    `${clientName ? `*Nome:* ${clientName}\n` : ''}` +
    `*Solução:* ${projectType}\n` +
    `*Módulos:* ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'A definir'}\n\n` +
    `Podemos conversar sobre esse projeto?`;

  const whatsappUrl = `https://wa.me/5511998954769?text=${encodeURIComponent(whatsappMessage)}`;

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
    .matrix-glitch { transition: all 0.25s ease; }
    @media (hover: hover) and (pointer: fine) {
      .matrix-glitch:hover {
        animation: matrix-teleport 0.8s infinite step-end;
        background-color: #000000 !important;
        border-color: #00FF41 !important;
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1) !important;
        color: #00FF41 !important;
      }
      .matrix-glitch:hover * { color: #00FF41 !important; border-color: #00FF41 !important; }
    }
    
    @keyframes text-break-1 {
      0%, 90% { transform: skewX(0deg); text-shadow: none; }
      91% { transform: skewX(8deg); text-shadow: 2px 0 #00F0FF, -2px 0 #9D00FF; }
      92% { transform: skewX(-8deg); text-shadow: -2px 0 #00F0FF, 2px 0 #9D00FF; }
      93%, 100% { transform: skewX(0deg); text-shadow: none; }
    }
    @keyframes text-break-2 {
      0%, 88% { transform: skewX(0deg); text-shadow: none; }
      89% { transform: skewX(-7deg); text-shadow: 2px 0 #9D00FF, -2px 0 #00FF41; }
      90% { transform: skewX(7deg); text-shadow: -2px 0 #9D00FF, 2px 0 #00FF41; }
      91%, 100% { transform: skewX(0deg); text-shadow: none; }
    }
    .glitch-text-1 { display: inline-block; animation: text-break-1 2.4s infinite linear; }
    .glitch-text-2 { display: inline-block; animation: text-break-2 2.9s infinite linear; }
    .glitch-text-3 { display: inline-block; animation: text-break-1 3.5s infinite linear reverse; }
    
    @keyframes border-break {
      0%, 94% { box-shadow: none; }
      95% { border-color: #00F0FF; box-shadow: inset 0 0 15px rgba(0, 240, 255, 0.3); }
      96% { border-color: #9D00FF; box-shadow: inset 0 0 15px rgba(157, 0, 255, 0.3); }
      97%, 100% { box-shadow: none; }
    }
    .glitch-border-1 { animation: border-break 4s infinite linear; }

    @keyframes pulse-whatsapp {
      0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
      70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
      100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
    }
    .whatsapp-float { animation: pulse-whatsapp 2.2s infinite; }

    @keyframes scanline-move {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(500%); }
    }
    .scanline-bar { animation: scanline-move 4.5s linear infinite; }

    @keyframes marquee-scroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-33.333%); }
    }
    .animate-marquee { animation: marquee-scroll 24s linear infinite; }
    .animate-marquee:hover { animation-play-state: paused; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse-slow {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    .animate-spin-slow { animation: spin-slow 24s linear infinite; }
    .animate-spin-reverse-slow { animation: spin-reverse-slow 32s linear infinite; }

    @keyframes float-y {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-7px); }
    }
    .animate-float { animation: float-y 4s ease-in-out infinite; }
    .animate-float-delayed { animation: float-y 4.6s ease-in-out 1.2s infinite; }

    @keyframes circuit-dash {
      0% { stroke-dashoffset: 400; }
      100% { stroke-dashoffset: 0; }
    }
    .circuit-pulse { animation: circuit-dash 3.2s linear infinite; }
    .circuit-pulse-reverse { animation: circuit-dash 3.8s linear infinite reverse; }

    @keyframes reveal-border-flash {
      0% { box-shadow: 0 0 0 rgba(0, 240, 255, 0); }
      35% { box-shadow: 0 0 24px rgba(0, 240, 255, 0.22); }
      100% { box-shadow: 0 0 0 rgba(0, 240, 255, 0); }
    }
    .reveal-flash { animation: reveal-border-flash 1.1s ease-out; }

    .cyber-grid-bg {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(157, 0, 255, 0.04) 1px, transparent 1px);
    }

    .nav-link { position: relative; color: #cbd5e1; transition: color 0.3s; }
    .nav-link:hover { color: #00F0FF; text-shadow: 0 0 8px rgba(0,240,255,0.4); }
    .nav-link::after {
      content: ''; position: absolute; width: 0; height: 2px;
      bottom: -4px; left: 0; background-color: #00F0FF;
      transition: width 0.3s ease; box-shadow: 0 0 8px #00F0FF;
    }
    .nav-link:hover::after { width: 100%; }
  `;

  return (
    <div id="topo" className="min-h-screen bg-[#070B14] relative overflow-x-hidden selection:bg-primary selection:text-[#070B14]">
      <style>{glitchStyles}</style>

      {/* ====================================================================
          BARRA DE PROGRESSO LASER SUPERIOR (ACOMPANHA A ROLAGEM)
      ==================================================================== */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#050814]/90 z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-secondary via-primary to-[#00FF41] transition-all duration-100 ease-out relative shadow-[0_0_12px_#00F0FF]"
          style={{ width: `${scrollPercent}%` }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#00F0FF,0_0_20px_#00FF41]" />
        </div>
      </div>

      {/* RÉGUA LATERAL DE TELEMETRIA (DESKTOP) */}
      <SideHudNavigator
        activeSection={activeSection}
        scrollPercent={scrollPercent}
        onJump={(id) => jumpToSection(id)}
      />

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed top-5 left-4 right-4 sm:left-auto sm:right-4 z-[10002] bg-[#050814] border border-[#00FF41] text-[#00FF41] font-mono text-xs px-4 py-3 rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.3)] animate-fadeIn text-center sm:text-left">
          ✓ {toastMsg}
        </div>
      )}

      {/* ABERTURA BOOT */}
      <BootOverlay onComplete={() => setBootFinished(true)} />

      {/* CASCATA DE CÓDIGO EM CANVAS */}
      <CodeCascadeCanvas />

      {/* GRADE ARQUITETÔNICA */}
      <div className="fixed inset-0 cyber-grid-bg pointer-events-none z-0" />

      {/* MODAIS GLOBAIS */}
      <CommandPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onJump={jumpToSection}
        onCopyEmail={handleCopyEmail}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((s) => !s)}
        playTone={playTone}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* HEADER ESTÁTICO NO TOPO (NÃO ACOMPANHA O SCROLL) */}
      <div className="relative w-full pt-[3px] md:pt-5 z-40 px-0 md:px-4 flex justify-center">
        <header className="w-full max-w-6xl bg-[#0A0F1C]/95 md:bg-[#0A0F1C]/85 backdrop-blur-xl border-b md:border border-secondary/30 md:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.65)] transition-all overflow-hidden relative">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[74px] md:h-[88px] gap-2">
              <button
                onClick={() => jumpToSection('topo')}
                className="flex items-center gap-2.5 sm:gap-3.5 group text-left min-w-0"
              >
                <img
                  src="/logo.png"
                  alt="GSB Logo"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                />
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-white font-bold text-sm sm:text-base lg:text-lg tracking-wide md:tracking-widest uppercase leading-tight truncate group-hover:text-primary transition-colors">
                    <span className="md:hidden">Gustavo Beserra</span>
                    <span className="hidden md:inline">Gustavo De Souza Beserra</span>
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-secondary text-[9.5px] sm:text-[11px] md:text-xs font-mono tracking-wider md:tracking-[0.2em] truncate">
                      ENGENHEIRO DE SOFTWARE
                    </span>
                    <span className="hidden lg:inline-flex items-center gap-1 text-[9px] font-mono text-[#00FF41] bg-[#00FF41]/10 border border-[#00FF41]/30 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                      ONLINE
                    </span>
                  </div>
                </div>
              </button>

              {/* NAVEGAÇÃO DESKTOP */}
              <div className="hidden md:flex items-center gap-6">
                <nav className="flex items-center space-x-6">
                  <button
                    onClick={() => jumpToSection('sobre', 'perfil')}
                    className={`nav-link text-xs font-semibold uppercase tracking-wide ${
                      activeSection === 'sobre' ? '!text-primary' : ''
                    }`}
                  >
                    Sobre
                  </button>
                  <button
                    onClick={() => jumpToSection('sobre', 'pilares')}
                    className="nav-link text-xs font-semibold uppercase tracking-wide"
                  >
                    Engenharia
                  </button>
                  <button
                    onClick={() => jumpToSection('projetos', 'cards')}
                    className={`nav-link text-xs font-semibold uppercase tracking-wide ${
                      activeSection === 'projetos' ? '!text-primary' : ''
                    }`}
                  >
                    Projetos
                  </button>
                  <button
                    onClick={() => jumpToSection('simulador')}
                    className={`nav-link text-xs font-semibold uppercase tracking-wide ${
                      activeSection === 'simulador' ? '!text-primary' : 'text-primary/90'
                    }`}
                  >
                    Simulador
                  </button>
                </nav>

                <div className="flex items-center gap-2">
                  <span className="hidden lg:inline-block font-mono text-[10px] text-slate-400 bg-[#070B14] border border-secondary/30 px-2 py-1.5 rounded-lg">
                    {String(scrollPercent).padStart(2, '0')}%
                  </span>

                  <button
                    onClick={() => {
                      playTone('palette');
                      setIsPaletteOpen(true);
                    }}
                    className="font-mono text-[10px] text-primary bg-[#070B14] hover:bg-primary/15 border border-primary/30 px-2.5 py-1.5 rounded-lg transition-colors"
                    title="Abrir Paleta de Comandos"
                  >
                    [CTRL+K]
                  </button>

                  <button
                    onClick={() => setSoundEnabled((prev) => !prev)}
                    className={`font-mono text-[10px] px-2.5 py-1.5 rounded-lg border transition-colors ${
                      soundEnabled
                        ? 'text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10'
                        : 'text-slate-500 border-slate-700 bg-[#070B14]'
                    }`}
                  >
                    {soundEnabled ? 'SFX:ON' : 'SFX:OFF'}
                  </button>
                </div>
              </div>

              {/* BOTÕES MOBILE */}
              <div className="md:hidden flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  className={`font-mono text-[10px] h-10 px-2.5 rounded-lg border transition-colors active:scale-95 ${
                    soundEnabled
                      ? 'text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10'
                      : 'text-slate-400 border-slate-700 bg-[#070B14]'
                  }`}
                  aria-label="Alternar áudio"
                >
                  {soundEnabled ? 'SFX' : 'MUTE'}
                </button>
                <button
                  onClick={toggleMenu}
                  className="text-primary hover:text-white transition-colors h-10 w-10 bg-primary/10 rounded-lg border border-primary/35 flex items-center justify-center active:scale-95"
                  aria-label="Abrir menu"
                >
                  {isMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-[#060913] border-t border-secondary/30 shadow-2xl animate-fadeIn">
              <div className="p-4 grid grid-cols-1 gap-2">
                <button
                  onClick={() => jumpToSection('sobre', 'perfil')}
                  className="w-full py-3 px-4 text-left font-mono text-xs tracking-wider uppercase text-slate-200 bg-[#0A0F1C] border border-primary/20 rounded-xl flex items-center justify-between active:scale-[0.99]"
                >
                  <span>01 // Sobre & Stack</span>
                  <span className="text-primary">→</span>
                </button>
                <button
                  onClick={() => jumpToSection('projetos', 'cards')}
                  className="w-full py-3 px-4 text-left font-mono text-xs tracking-wider uppercase text-slate-200 bg-[#0A0F1C] border border-primary/20 rounded-xl flex items-center justify-between active:scale-[0.99]"
                >
                  <span>02 // Projetos & Processo</span>
                  <span className="text-primary">→</span>
                </button>
                <button
                  onClick={() => jumpToSection('simulador')}
                  className="w-full py-3 px-4 text-left font-mono text-xs tracking-wider uppercase text-primary font-bold bg-primary/10 border border-primary/40 rounded-xl flex items-center justify-between active:scale-[0.99]"
                >
                  <span>03 // Simulador de Escopo</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => jumpToSection('contato')}
                  className="w-full py-3 px-4 text-left font-mono text-xs tracking-wider uppercase text-secondary bg-[#0A0F1C] border border-secondary/30 rounded-xl flex items-center justify-between active:scale-[0.99]"
                >
                  <span>04 // Contato Direto</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}
        </header>
      </div>

      <main className="pt-6 md:pt-12 relative z-10">
        {/* ====================================================================
            HERO SECTION (LAYOUT DEDICADO PARA MOBILE E DESKTOP)
        ==================================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-14 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-14 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/15 blur-[100px] rounded-full pointer-events-none z-0" />

          {/* MOBILE HERO (VERTICAL, LIMPO E COM PROPORÇÕES EQUILIBRADAS) */}
          <div className="flex md:hidden flex-col items-center text-center w-full gap-6 relative z-10">
            {/* Moldura HUD da Foto no Mobile */}
            <div
              className={`relative transition-all duration-700 ${
                bootFinished ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="absolute -inset-3 rounded-full border border-dashed border-primary/25 animate-spin-slow pointer-events-none" />
              <div className="w-44 h-48 sm:w-52 sm:h-56 relative rounded-2xl overflow-hidden border border-primary/60 shadow-[0_0_30px_rgba(0,240,255,0.22)]">
                <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary z-20" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-secondary z-20" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-secondary z-20" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary z-20" />
                <div className="scanline-bar absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-primary/25 to-transparent z-20 pointer-events-none" />
                <img src="/perfil.png" alt="Gustavo Beserra" className="object-cover w-full h-full" />
                <div className="absolute bottom-2 inset-x-2 bg-[#070B14]/85 backdrop-blur-md border border-primary/30 rounded-md py-1 px-2 flex items-center justify-center gap-1.5 z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                  <span className="font-mono text-[9px] text-primary tracking-wider">SP // BR • ONLINE</span>
                </div>
              </div>
            </div>

            {/* Texto Principal Mobile */}
            <div
              className={`space-y-3.5 max-w-md transition-all duration-700 delay-150 ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                ENGENHARIA SOB MEDIDA
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-[1.18]">
                Muito prazer, sou o <span className="text-primary">Gustavo.</span>
              </h1>

              <div className="inline-block border border-secondary/60 py-1.5 px-3.5 rounded-xl bg-secondary/10">
                <p className="text-secondary font-semibold text-xs sm:text-sm">
                  Construo ferramentas para problemas reais.
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                Esqueça templates prontos e genéricos. Desenvolvo experiências digitais do{' '}
                <span className="text-primary font-semibold">absoluto zero</span>, rápidas e exclusivas para o seu negócio.
              </p>
            </div>

            {/* Botões Mobile Largos e Confortáveis */}
            <div
              className={`flex flex-col sm:flex-row gap-3 w-full max-w-md transition-all duration-700 delay-300 ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <button
                onClick={() => jumpToSection('simulador')}
                className="w-full py-3.5 px-5 bg-primary text-[#070B14] font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.35)] active:scale-[0.98] transition-transform"
              >
                <span>Montar Meu Projeto</span>
                <span>→</span>
              </button>
              <a
                href="https://www.instagram.com/gustavo_s0uzaa/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTone('click')}
                className="w-full py-3.5 px-5 bg-[#0A0F1C]/90 text-white font-medium rounded-xl text-sm border border-secondary/60 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <span>Seguir no Instagram</span>
              </a>
            </div>
          </div>

          {/* DESKTOP HERO */}
          <div className="hidden md:flex flex-1 text-left w-full flex-col relative z-10">
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/30 font-mono text-xs text-primary tracking-widest">
                SYS.KERNEL // CUSTOM_SOFTWARE
              </span>
              <span className="font-mono text-[10px] text-slate-500">23.5505° S, 46.6333° W</span>
              <span className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent" />
            </div>

            <h1
              className={`text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 transition-all duration-700 delay-100 ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Muito prazer, sou o <span className="text-primary glitch-text-2">Gustavo.</span>
            </h1>

            <div
              className={`inline-block border border-secondary py-2 px-4 mb-6 rounded-xl bg-secondary/10 self-start transition-all duration-700 delay-200 ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-secondary font-semibold text-lg">
                Eu construo <span className="glitch-text-1">ferramentas</span> que resolvem <span className="glitch-text-3">problemas reais.</span>
              </p>
            </div>

            <p
              className={`text-base lg:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed transition-all duration-700 delay-300 ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Ao contrário de agências que te prendem a templates lentos e engessados, construo a sua presença digital do <span className="text-primary font-semibold">absoluto zero</span> — sob medida para escalar com alta performance e design único.
            </p>

            <div
              className={`flex flex-row gap-4 justify-start w-full transition-all duration-700 delay-[400ms] ${
                bootFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a
                href="https://www.instagram.com/gustavo_s0uzaa/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTone('click')}
                className="matrix-glitch relative px-8 py-4 bg-primary hover:bg-transparent text-[#070B14] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Seguir no Instagram</span>
              </a>

              <button
                onClick={() => jumpToSection('simulador')}
                className="matrix-glitch relative px-8 py-4 bg-[#0A0F1C]/75 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-3 border border-secondary shadow-[0_0_15px_rgba(157,0,255,0.2)]"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                <span>Montar Meu Projeto</span>
              </button>
            </div>
          </div>

          {/* FOTO DESKTOP COM ANÉIS ORBITAIS HOLOGRÁFICOS E BADGES FLUTUANTES */}
          <div
            className={`hidden md:flex flex-1 justify-end relative transition-all duration-1000 delay-300 ${
              bootFinished ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="absolute -inset-6 flex items-center justify-center pointer-events-none">
              <div className="w-[430px] h-[430px] rounded-full border border-dashed border-primary/25 animate-spin-slow" />
              <div className="absolute w-[470px] h-[470px] rounded-full border border-dotted border-secondary/25 animate-spin-reverse-slow" />
            </div>

            <div className="animate-float absolute -left-4 top-8 z-30 bg-[#050814]/90 backdrop-blur-md border border-primary/40 px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] font-mono text-[10px] text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>REACT // NEXT.JS</span>
            </div>

            <div className="animate-float-delayed absolute -left-6 bottom-14 z-30 bg-[#050814]/90 backdrop-blur-md border border-secondary/40 px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(157,0,255,0.25)] font-mono text-[10px] text-secondary flex items-center gap-2">
              <span className="text-[#00FF41]">⚡</span>
              <span>AI & AUTOMATION</span>
            </div>

            <TiltHudFrame
              code="GSB // 2026"
              className="w-[370px] lg:w-[400px] h-[440px] lg:h-[480px] rounded-2xl border border-primary/50 shadow-[0_0_40px_rgba(0,240,255,0.2)] z-10 glitch-border-1"
            >
              <div className="scanline-bar absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/20 to-transparent z-20 pointer-events-none" />
              <img src="/perfil.png" alt="Gustavo Beserra" className="object-cover w-full h-full" />
              <div className="absolute bottom-3 left-3 right-3 bg-[#070B14]/85 backdrop-blur-md border border-primary/30 rounded-lg px-3.5 py-2 flex items-center justify-between z-20">
                <span className="font-mono text-[10px] text-primary">STATUS: CUSTOM_BUILD_READY</span>
                <span className="font-mono text-[10px] text-secondary">SP // BR</span>
              </div>
            </TiltHudFrame>
          </div>
        </section>

        {/* TICKER DE ENGENHARIA */}
        <TechTicker />

        {/* ====================================================================
            BLOCO 01: SOBRE & ENGENHARIA (ABAS SIMÉTRICAS NO MOBILE)
        ==================================================================== */}
        <section id="sobre" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 scroll-mt-6">
          <CyberReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-secondary rotate-45 inline-block" />
                  <span className="font-mono text-[11px] sm:text-xs text-secondary tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                    01 // IDENTIDADE & ENGENHARIA
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Código Limpo, <span className="text-primary">Mente Focada.</span>
                </h2>
              </div>

              {/* Seletor simétrico: 3 colunas iguais no mobile, inline no desktop */}
              <div className="grid grid-cols-3 md:flex gap-1.5 sm:gap-2 bg-[#0A0F1C]/95 p-1.5 rounded-xl border border-secondary/35 w-full md:w-auto shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                {[
                  { id: 'perfil', mobileLabel: 'Perfil', desktopLabel: 'Perfil & Código' },
                  { id: 'pilares', mobileLabel: 'Diferencial', desktopLabel: 'Pilares & Diferencial' },
                  { id: 'stack', mobileLabel: 'Stack', desktopLabel: 'Stack Prática' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playTone('tab');
                      setAboutTab(tab.id);
                    }}
                    className={`px-2.5 sm:px-4 py-2.5 md:py-2 rounded-lg font-mono text-[11px] sm:text-xs transition-all text-center active:scale-95 ${
                      aboutTab === tab.id
                        ? 'bg-primary text-[#070B14] font-bold shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                        : 'text-slate-300 hover:text-primary'
                    }`}
                  >
                    <span className="md:hidden">{tab.mobileLabel}</span>
                    <span className="hidden md:inline">{tab.desktopLabel}</span>
                  </button>
                ))}
              </div>
            </div>
          </CyberReveal>

          {/* ABA 1: PERFIL & TERMINAL */}
          {aboutTab === 'perfil' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
              <CyberReveal direction="left" delay={80} className="lg:col-span-5 flex justify-center">
                <TiltHudFrame
                  code="DEV.SYS_2026"
                  className="w-full max-w-[320px] sm:max-w-[340px] rounded-2xl border border-secondary/50 shadow-[0_0_35px_rgba(157,0,255,0.2)]"
                >
                  <div className="scanline-bar absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-secondary/25 to-transparent z-20 pointer-events-none" />
                  <img
                    src="/Gustavo.ia.jpg"
                    alt="Gustavo programando"
                    className="w-full h-[270px] sm:h-[340px] object-cover"
                  />
                </TiltHudFrame>
              </CyberReveal>

              <CyberReveal direction="right" delay={140} className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  Mais do que escrever linhas de código, meu foco é construir sistemas inteligentes e automatizados que eliminam gargalos no dia a dia — unindo interfaces rápidas em <span className="text-primary font-semibold">React</span> com automações e <span className="text-secondary font-semibold">Inteligência Artificial</span>.
                </p>

                {/* Terminal Compacto Sem Corte Horizontal */}
                <div className="bg-[#050814]/95 border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.1)] font-mono">
                  <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#0A0F1C] border-b border-secondary/30 gap-2">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41]/80" />
                    </div>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button
                        onClick={() => {
                          playTone('click');
                          setCodeTab('stack');
                        }}
                        className={`px-2.5 sm:px-3 py-1 rounded text-[10px] sm:text-[11px] transition-colors ${
                          codeTab === 'stack'
                            ? 'bg-primary/20 text-primary border border-primary/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        architecture.ts
                      </button>
                      <button
                        onClick={() => {
                          playTone('click');
                          setCodeTab('manifesto');
                        }}
                        className={`px-2.5 sm:px-3 py-1 rounded text-[10px] sm:text-[11px] transition-colors ${
                          codeTab === 'manifesto'
                            ? 'bg-secondary/20 text-secondary border border-secondary/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        pipeline.json
                      </button>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 text-[11px] sm:text-xs md:text-sm space-y-1.5">
                    <div className="text-[10px] sm:text-[11px] text-slate-500 mb-2">// {codeFiles[codeTab].filename}</div>
                    {codeFiles[codeTab].lines.map((line) => (
                      <div key={line.num} className="flex items-start gap-2.5 sm:gap-4">
                        <span className="text-slate-600 select-none flex-shrink-0">{line.num}</span>
                        <span className={`${line.color} whitespace-pre-wrap break-words`}>{line.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CyberReveal>
            </div>
          )}

          {/* ABA 2: PILARES & COMPARATIVO */}
          {aboutTab === 'pilares' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <SpotlightCard
                  accent="purple"
                  className="bg-[#0A0F1C]/90 p-5 sm:p-6 md:p-7 rounded-2xl border border-secondary/40"
                >
                  <span className="font-mono text-[11px] text-primary block mb-1.5">01 // VELOCIDADE</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Alta Performance</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Carregamento em milissegundos com arquitetura moderna, sem o peso de temas prontos.
                  </p>
                </SpotlightCard>

                <SpotlightCard
                  accent="cyan"
                  className="bg-[#0A0F1C]/90 p-5 sm:p-6 md:p-7 rounded-2xl border border-primary/40"
                >
                  <span className="font-mono text-[11px] text-secondary block mb-1.5">02 // PROTEÇÃO</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Segurança & LGPD</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Captação de leads e estrutura de dados pensadas em conformidade com a LGPD.
                  </p>
                </SpotlightCard>

                <SpotlightCard
                  accent="purple"
                  className="bg-[#0A0F1C]/90 p-5 sm:p-6 md:p-7 rounded-2xl border border-secondary/40"
                >
                  <span className="font-mono text-[11px] text-primary block mb-1.5">03 // IDENTIDADE</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Design Exclusivo</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Interfaces desenhadas sob medida para posicionar sua marca e aumentar conversões.
                  </p>
                </SpotlightCard>
              </div>

              <div className="bg-[#0A0F1C]/90 border border-primary/25 rounded-2xl p-5 sm:p-6 md:p-8">
                <h4 className="text-base sm:text-lg font-bold text-white mb-5">
                  Sob Medida <span className="text-slate-500 font-normal">vs.</span>{' '}
                  <span className="text-rose-400">Templates Genéricos</span>
                </h4>
                <div className="space-y-4">
                  {comparisons.map((row) => (
                    <div
                      key={row.metric}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start md:items-center pb-4 border-b border-slate-800/80 last:border-none last:pb-0"
                    >
                      <div className="md:col-span-2 font-mono text-xs font-bold text-primary">
                        {row.metric}
                      </div>
                      <div className="md:col-span-5 text-xs sm:text-sm text-slate-200 flex items-start sm:items-center gap-2.5">
                        <span className="text-[#00FF41] font-bold flex-shrink-0">✓</span>
                        <span>{row.custom}</span>
                      </div>
                      <div className="md:col-span-5 text-xs sm:text-sm text-slate-500 flex items-start sm:items-center gap-2.5">
                        <span className="text-rose-400 font-bold flex-shrink-0">✕</span>
                        <span>{row.template}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: STACK PRÁTICA */}
          {aboutTab === 'stack' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn text-left">
              {arsenal.map((tech, idx) => (
                <SpotlightCard
                  key={tech.name}
                  accent={idx % 2 === 0 ? 'cyan' : 'purple'}
                  className="bg-[#0A0F1C]/90 border border-primary/25 hover:border-primary/60 rounded-2xl p-5 sm:p-6 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white">{tech.name}</h3>
                    <span className="font-mono text-[9px] sm:text-[10px] px-2.5 py-1 rounded bg-secondary/15 text-secondary border border-secondary/30 flex-shrink-0">
                      {tech.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{tech.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          )}
        </section>

        {/* DIVISOR DE CIRCUITO SVG ANIMADO */}
        <CircuitDivider label="SECTOR_02 // DEPLOY_NODES" />

        {/* ====================================================================
            BLOCO 02: PROJETOS & PROCESSO
        ==================================================================== */}
        <section
          id="projetos"
          className="bg-[#0A0F1C]/45 border-y border-secondary/20 py-14 md:py-24 mt-6 scroll-mt-6 backdrop-blur-sm relative"
        >
          <span className="hidden md:block absolute top-4 left-4 w-5 h-5 border-t border-l border-primary/40 pointer-events-none" />
          <span className="hidden md:block absolute top-4 right-4 w-5 h-5 border-t border-r border-secondary/40 pointer-events-none" />
          <span className="hidden md:block absolute bottom-4 left-4 w-5 h-5 border-b border-l border-secondary/40 pointer-events-none" />
          <span className="hidden md:block absolute bottom-4 right-4 w-5 h-5 border-b border-r border-primary/40 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CyberReveal direction="up">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-primary rotate-45 inline-block" />
                    <span className="font-mono text-[11px] sm:text-xs text-primary tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                      02 // ENTREGAS & METODOLOGIA
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    Projetos & <span className="text-secondary">Processo</span>
                  </h2>
                </div>

                {/* Seletor 50% / 50% no mobile */}
                <div className="grid grid-cols-2 md:flex gap-1.5 sm:gap-2 bg-[#070B14] p-1.5 rounded-xl border border-primary/30 w-full md:w-auto shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                  <button
                    onClick={() => {
                      playTone('tab');
                      setWorkTab('cards');
                    }}
                    className={`px-3 sm:px-4 py-2.5 md:py-2 rounded-lg font-mono text-[11px] sm:text-xs transition-all text-center active:scale-95 ${
                      workTab === 'cards'
                        ? 'bg-primary text-[#070B14] font-bold shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                        : 'text-slate-300 hover:text-primary'
                    }`}
                  >
                    <span className="md:hidden">Projetos</span>
                    <span className="hidden md:inline">Projetos Desenvolvidos</span>
                  </button>
                  <button
                    onClick={() => {
                      playTone('tab');
                      setWorkTab('processo');
                    }}
                    className={`px-3 sm:px-4 py-2.5 md:py-2 rounded-lg font-mono text-[11px] sm:text-xs transition-all text-center active:scale-95 ${
                      workTab === 'processo'
                        ? 'bg-secondary text-white font-bold shadow-[0_0_15px_rgba(157,0,255,0.35)]'
                        : 'text-slate-300 hover:text-secondary'
                    }`}
                  >
                    <span className="md:hidden">Processo & FAQ</span>
                    <span className="hidden md:inline">Como Trabalho & FAQ</span>
                  </button>
                </div>
              </div>
            </CyberReveal>

            {/* SUB-VISTA A: PROJETOS */}
            {workTab === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 text-left">
                {projects.map((proj, idx) => (
                  <CyberReveal key={proj.id} direction="up" delay={idx * 100} flash>
                    <SpotlightCard
                      accent="cyan"
                      className="h-full bg-[#070B14]/95 rounded-2xl border border-secondary/35 hover:border-primary transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-36 sm:h-40 bg-[#050814] cyber-grid-bg relative flex flex-col items-center justify-center border-b border-secondary/20">
                          <span className="absolute top-3 right-3 font-mono text-[10px] text-primary bg-[#070B14]/90 px-2.5 py-0.5 rounded border border-primary/30">
                            {proj.id}
                          </span>
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-primary/40 flex items-center justify-center mb-2 bg-primary/5">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                          </div>
                          <span className="text-primary font-mono text-[11px] sm:text-xs tracking-widest uppercase">
                            {proj.badge}
                          </span>
                        </div>

                        <div className="p-5 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{proj.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">{proj.summary}</p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {proj.stack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/30 px-2.5 py-1 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-2.5">
                        <button
                          onClick={() => {
                            playTone('tab');
                            setSelectedProject(proj);
                          }}
                          className="w-full py-3 rounded-xl bg-secondary/15 hover:bg-secondary/25 border border-secondary/40 text-secondary hover:text-white font-mono text-xs font-bold transition-colors active:scale-[0.98]"
                        >
                          [ Ver Arquitetura ]
                        </button>
                        <div className="flex gap-2.5 sm:gap-3">
                          <a
                            href={proj.repoUrl}
                            className="matrix-glitch flex-1 text-center text-xs font-medium text-white bg-[#0A0F1C] border border-secondary/40 py-3 rounded-xl active:scale-[0.98]"
                          >
                            Repo
                          </a>
                          <a
                            href={proj.demoUrl}
                            className="matrix-glitch flex-1 text-center text-xs font-bold text-[#070B14] bg-primary py-3 rounded-xl active:scale-[0.98]"
                          >
                            Demo
                          </a>
                        </div>
                      </div>
                    </SpotlightCard>
                  </CyberReveal>
                ))}

                {/* Card Instagram */}
                <CyberReveal direction="up" delay={200} flash>
                  <a
                    href="https://www.instagram.com/gustavo_s0uzaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full relative bg-[#070B14]/95 rounded-2xl border border-secondary/35 hover:border-secondary hover:shadow-[0_0_30px_rgba(157,0,255,0.25)] transition-all flex flex-col justify-center items-center p-7 sm:p-8 text-center group min-h-[260px] sm:min-h-[320px] active:scale-[0.99]"
                  >
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-secondary/10 border border-secondary/30 mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-9 h-9 sm:w-10 sm:h-10 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors mb-2">
                      Bastidores & Novos Projetos
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 max-w-xs">
                      Acompanhe entregas recentes e novidades no meu Instagram.
                    </p>
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">
                      @gustavo_s0uzaa →
                    </span>
                  </a>
                </CyberReveal>
              </div>
            )}

            {/* SUB-VISTA B: PROCESSO & FAQ TERMINAL */}
            {workTab === 'processo' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 animate-fadeIn text-left">
                <div className="lg:col-span-6 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {phases.map((p, idx) => (
                      <button
                        key={p.num}
                        onClick={() => {
                          playTone('click');
                          setActivePhase(idx);
                        }}
                        className={`p-3 rounded-xl border font-mono text-left transition-all active:scale-95 ${
                          activePhase === idx
                            ? 'bg-primary/15 border-primary text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                            : 'bg-[#070B14] border-secondary/25 text-slate-400 hover:border-primary/40'
                        }`}
                      >
                        <div className="text-[10px] text-primary font-bold">FASE {p.num}</div>
                        <div className="text-xs font-sans font-semibold truncate mt-1">{p.title}</div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#070B14]/95 border border-primary/30 rounded-2xl p-5 sm:p-6 md:p-7">
                    <span className="font-mono text-xs text-primary font-bold block mb-2">
                      ETAPA {phases[activePhase].num} // WORKFLOW
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">{phases[activePhase].fullTitle}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{phases[activePhase].desc}</p>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-[#050814]/95 border border-secondary/40 rounded-2xl p-5 sm:p-6 font-mono flex flex-col justify-between">
                  <div className="space-y-2 mb-4 sm:mb-5">
                    <div className="text-xs text-secondary font-bold mb-2">PERGUNTAS FREQUENTES // CLI</div>
                    {faqs.map((item, idx) => (
                      <button
                        key={item.cmd}
                        onClick={() => {
                          playTone('click');
                          setSelectedFaq(idx);
                        }}
                        className={`w-full text-left px-3.5 sm:px-4 py-3 rounded-xl text-xs transition-all flex items-center justify-between gap-2 active:scale-[0.99] ${
                          selectedFaq === idx
                            ? 'bg-secondary/20 border border-secondary text-white'
                            : 'bg-[#0A0F1C] border border-transparent text-slate-400 hover:text-primary'
                        }`}
                      >
                        <span className="font-sans font-medium">{item.question}</span>
                        <span className="text-primary flex-shrink-0">&gt;_</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#070B14] border border-primary/25 rounded-xl p-4 min-h-[115px]">
                    <div className="text-[11px] text-[#00FF41] mb-1.5">$ gsb --{faqs[selectedFaq].cmd}</div>
                    <p className="font-sans text-sm text-slate-200 leading-relaxed">
                      {typedAnswer}
                      <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* DIVISOR DE CIRCUITO SVG ANIMADO */}
        <div className="mt-6">
          <CircuitDivider label="SECTOR_03 // SCOPE_BUILDER" />
        </div>

        {/* ====================================================================
            BLOCO 03: SIMULADOR DE ESCOPO (OTIMIZADO PARA TOQUE E LEITURA)
        ==================================================================== */}
        <section id="simulador" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 scroll-mt-6">
          <CyberReveal direction="up">
            <div className="mb-8 md:mb-10 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary rotate-45 inline-block" />
                <span className="font-mono text-[11px] sm:text-xs text-primary tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                  03 // ORÇAMENTO INTERATIVO
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Monte o Escopo do <span className="text-primary">Seu Projeto</span>
              </h2>
            </div>
          </CyberReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 text-left">
            {/* Configurador */}
            <CyberReveal direction="left" delay={80} className="lg:col-span-7 space-y-6">
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-3">
                  1. TIPO DE SOLUÇÃO
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scopeTypes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => {
                        playTone('click');
                        setProjectType(t.name);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all active:scale-[0.99] ${
                        projectType === t.name
                          ? 'bg-primary/15 border-primary text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                          : 'bg-[#0A0F1C]/85 border-secondary/25 text-slate-300 hover:border-primary/40'
                      }`}
                    >
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="font-mono text-[11px] text-primary mt-1">{t.stack}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-3">
                  2. RECURSOS & INTEGRAÇÕES
                </label>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5">
                  {featuresList.map((feat) => {
                    const active = selectedFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`px-4 py-3 sm:py-2 rounded-xl text-xs font-medium border transition-all text-left sm:text-center active:scale-[0.98] ${
                          active
                            ? 'bg-secondary/25 border-secondary text-white shadow-[0_0_12px_rgba(157,0,255,0.25)]'
                            : 'bg-[#0A0F1C]/80 border-slate-700 text-slate-300 hover:border-secondary/50'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {feat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-2">
                  3. SEU NOME OU EMPRESA (OPCIONAL)
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: João Silva / Empresa X"
                  className="w-full bg-[#0A0F1C] border border-primary/30 focus:border-primary rounded-xl px-4 py-3.5 text-base md:text-sm text-white placeholder-slate-600 outline-none transition-colors"
                />
              </div>
            </CyberReveal>

            {/* Resumo & WhatsApp */}
            <CyberReveal direction="right" delay={140} flash className="lg:col-span-5">
              <div className="h-full bg-[#0A0F1C]/95 border border-primary/35 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between font-mono relative overflow-hidden">
                <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-primary/60" />
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-secondary/60" />

                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-secondary/30">
                    <span className="text-xs text-primary font-bold">SPEC_PREVIEW.JSON</span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#00FF41]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                      PRONTO
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] mb-1">STACK RECOMENDADA:</span>
                    <span className="text-primary font-bold text-sm">{currentScopeObj.stack}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] mb-1">PRAZO ESTIMADO:</span>
                    <span className="text-white text-sm">{currentScopeObj.est}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] mb-2">
                      MÓDULOS ({selectedFeatures.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFeatures.length > 0 ? (
                        selectedFeatures.map((f) => (
                          <span
                            key={f}
                            className="text-[10px] bg-secondary/15 text-secondary border border-secondary/30 px-2.5 py-1 rounded-md"
                          >
                            {f}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 text-xs">A definir no briefing</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-secondary/20">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTone('tab')}
                    className="matrix-glitch w-full py-4 px-5 rounded-xl bg-[#25D366] text-[#070B14] font-sans font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.35)] active:scale-[0.98]"
                  >
                    <span>Enviar Escopo no WhatsApp</span>
                    <span>→</span>
                  </a>
                  <p className="text-center text-[10px] text-slate-500 mt-2.5">
                    WhatsApp direto: (11) 99895-4769
                  </p>
                </div>
              </div>
            </CyberReveal>
          </div>
        </section>
      </main>

      {/* FOOTER COM ESPAÇO EXTRA PARA O BOTÃO FLUTUANTE NO MOBILE */}
      <footer id="contato" className="bg-[#050814]/95 border-t border-secondary/30 pt-12 pb-24 md:py-16 relative z-10">
        <CyberReveal direction="up" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Pronto para <span className="text-primary">escalar</span> o seu negócio?
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">
            Construa uma base digital sólida, rápida e 100% exclusiva.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-10">
            <a
              href="mailto:gustavo.beserra29@gmail.com"
              className="matrix-glitch flex items-center justify-start sm:justify-center gap-3.5 p-4 bg-[#0A0F1C] text-white rounded-2xl border border-secondary/40 text-left active:scale-[0.99]"
            >
              <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/30 text-primary flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-secondary font-mono uppercase">E-mail</p>
                <p className="font-medium text-xs truncate">gustavo.beserra29@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/gustavo-de-souza-beserra-8205641bb/"
              target="_blank"
              rel="noopener noreferrer"
              className="matrix-glitch flex items-center justify-start sm:justify-center gap-3.5 p-4 bg-[#0A0F1C] text-white rounded-2xl border border-secondary/40 text-left active:scale-[0.99]"
            >
              <div className="bg-[#0A66C2]/20 p-2.5 rounded-xl border border-[#0A66C2]/30 text-[#0A66C2] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-secondary font-mono uppercase">LinkedIn</p>
                <p className="font-medium text-xs">Conecte-se comigo</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/gustavo_s0uzaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="matrix-glitch flex items-center justify-start sm:justify-center gap-3.5 p-4 bg-[#0A0F1C] text-white rounded-2xl border border-secondary/40 text-left active:scale-[0.99]"
            >
              <div className="bg-secondary/15 p-2.5 rounded-xl border border-secondary/30 text-secondary flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-secondary font-mono uppercase">Instagram</p>
                <p className="font-medium text-xs">@gustavo_s0uzaa</p>
              </div>
            </a>
          </div>

          <p className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">
            © 2026 GUSTAVO DE SOUZA BESERRA // CONSTRUÍDO DO ZERO
          </p>
        </CyberReveal>
      </footer>

      {/* BOTÃO FLUTUANTE DO WHATSAPP (11 99895-4769) */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[9999]">
        <a
          href="https://wa.me/5511998954769?text=Olá,%20Gustavo!%20Vim%20pelo%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float matrix-glitch flex bg-[#25D366] text-[#070B14] p-3.5 md:p-4 rounded-full items-center justify-center group shadow-xl active:scale-95"
          aria-label="Falar no WhatsApp"
        >
          <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;