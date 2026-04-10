import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- THE HARMONIC ENGINE ---
let audioCtx = null;
const initAudio = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
};

const playSoftMallet = (freq, duration = 0.4, volume = 0.06) => {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
};

const playPortfolioPayoff = (startFreq) => {
  initAudio();
  const sweep = [startFreq, startFreq * 1.25, startFreq * 1.5, startFreq * 1.87, startFreq * 2];
  sweep.forEach((f, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(f, audioCtx.currentTime + (i * 0.05));
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime + (i * 0.05));
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i * 0.05) + 0.4);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + (i * 0.05));
    osc.stop(audioCtx.currentTime + (i * 0.05) + 0.4);
  });
};

const playResetGlissando = (fromFreq) => {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.setValueAtTime(fromFreq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(261.63, audioCtx.currentTime + 0.8);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + 0.8);
};

const playDashboardSparkle = () => {
  initAudio();
  [1046.50, 1318.51, 1567.98, 2093.00].forEach((f, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime + (i * 0.07));
    gain.gain.setValueAtTime(0.07, audioCtx.currentTime + (i * 0.07));
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i * 0.07) + 0.8);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + (i * 0.07));
    osc.stop(audioCtx.currentTime + (i * 0.07) + 0.8);
  });
};

const playHeavyDrop = () => {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.setValueAtTime(280, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.7);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.7);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + 0.7);
};

const scaleBases = [523.25, 783.99, 1174.66, 1760.00, 2637.02];
const majorIntervals = [0, 2, 4, 5, 7, 9, 11];

const initialCookies = [
  { id: 'heist', title: 'TOKEN HEIST', stats: '4 Projects • 2.7M Tokens • RESITRCTED by Gemini Free API key page', backColor: '#2A1B0E', highlight: true, startX: "25%", startY: "25%" },
  { id: 'sci', title: 'SCIENCE OLYMPIAD', stats: '🥇 Multiple Golds • 12+ Medals', backColor: '#1A0F05', startX: "75%", startY: "25%" },
  { id: 'oski', title: 'OSKI SORTING TRASH CAN', stats: 'CAD • Arduino • 3D Printing • IoT', backColor: '#2A1B0E', startX: "20%", startY: "75%" },
  { id: 'content', title: 'CONTENT CREATION', stats: '2M+ Reach • 10K+ Typical Reels', backColor: '#2A1B0E', startX: "80%", startY: "75%" },
  { id: 'foozi', title: 'FOOZI / OPENCLAW', stats: 'Built in 2 Weeks • Portfolio Portal', backColor: '#0F0F0F', startX: "50%", startY: "15%", isPortal: true }, 
  { id: 'pcg', title: 'PCG STARTUP PROJECTS', stats: 'GTM • Onboarding • UX • Startup Ops', backColor: '#2A1B0E', startX: "40%", startY: "80%" },
  { id: 'byoglo', title: 'BYOGLO', stats: 'Prototype • Packaging • Pricing', backColor: '#2A1B0E', startX: "55%", startY: "50%" }
];

export default function CookieJar() {
  const jarRef = useRef(null);
  const [zIndexMap, setZIndexMap] = useState({});
  const [topZ, setTopZ] = useState(100);
  const [flippedCookies, setFlippedCookies] = useState(new Set());
  const [pitchCounter, setPitchCounter] = useState(0);
  const [dwellTime, setDwellTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDwellTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentFreq = (count) => {
    const scaleIdx = Math.floor(count / 7);
    const noteIdx = count % 7;
    if (scaleIdx >= scaleBases.length) return null;
    const base = scaleBases[scaleIdx];
    const freq = base * Math.pow(2, majorIntervals[noteIdx] / 12);
    return freq;
  };

  const handleFlipLogic = (id) => {
    initAudio();
    const freq = getCurrentFreq(pitchCounter);
    if (!freq) {
      playResetGlissando(3000);
      setPitchCounter(0);
      playSoftMallet(scaleBases[0]);
    } else {
      playSoftMallet(freq);
      setPitchCounter(prev => prev + 1);
    }
    setFlippedCookies(prev => new Set(prev).add(id));
  };

  const bringToFront = (id) => {
    initAudio();
    setTopZ(prev => prev + 1);
    setZIndexMap(prev => ({ ...prev, [id]: topZ + 1 }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-[#0D0703] relative text-white" onClick={initAudio}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#251810_0%,_#0D0703_100%)] opacity-95" />
      
      <div className="relative z-10 w-full max-w-[95vw] h-[95vh] flex flex-col items-center justify-center">
        {/* LID */}
        <div className="relative w-full h-[15vh] mb-[-2vh] z-[1000] flex flex-col items-center justify-end pointer-events-none">
           <div className="w-[10vw] max-w-[100px] h-[5vh] rounded-t-full bg-white/20 border-t-2 border-x-2 border-white/30 mb-[-2px]" />
           <div className="relative w-full h-[12vh] rounded-t-[4vw] bg-white/10 border-x-[1vw] border-t-[1vw] border-white/40 shadow-2xl backdrop-blur-3xl flex flex-col items-center justify-center px-4">
              <h1 className="text-[5vw] md:text-[4vw] lg:text-[3.5rem] font-semibold tracking-tight uppercase leading-none drop-shadow-2xl">VIVIAN YANG</h1>
              <span className="text-[1.5vw] md:text-[1vw] lg:text-[0.7rem] font-medium tracking-[0.35em] text-stone-300 uppercase mt-[1vh]">Billionaire Bumblebee</span>
           </div>
        </div>

        {/* JAR BODY */}
        <div ref={jarRef} className="relative w-full h-[75vh] bg-white/[0.04] border-[1.5vw] border-white/20 rounded-b-[10vw] rounded-t-[1vw] shadow-2xl overflow-hidden"
          style={{ backdropFilter: 'blur(100px) saturate(160%) contrast(110%)' }}>
          
          <div className="absolute top-0 left-1/4 w-32 h-full bg-white/5 -skew-x-12 z-[9999] pointer-events-none" style={{ mixBlendMode: 'overlay' }} />

          <AnimatePresence>
            {flippedCookies.size === initialCookies.length && (
              <motion.div 
                key="secret-file"
                initial={{ opacity: 0, scale: 0.5, y: "-100%", x: "-50%", top: "30%", left: "55%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%", top: "50%", left: "50%" }}
                onAnimationStart={playHeavyDrop}
                className="absolute w-[85vw] max-w-[340px] h-[180px] z-[200] p-5 flex flex-col justify-between backdrop-blur-3xl rounded-xl shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.06) 100%)', border: '2px solid rgba(255,255,255,0.2)' }}
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/15 flex items-center justify-center border-2 border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                       <span className="text-[16px] font-mono text-yellow-500 font-bold">?</span>
                    </div>
                    <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase">SYSTEM_CORE_LOGS</span>
                 </div>
                 <p className="text-[10px] font-mono text-stone-300 leading-relaxed mt-2 p-3 bg-white/5 rounded-md">// ARCHITECTURE: THE_HIVE<br/>// STATUS: S-TIER_SIGNAL</p>
                 <button 
                  onClick={(e) => { e.stopPropagation(); playDashboardSparkle(); window.location.href = '/'; }}
                  className="mt-4 px-6 py-2.5 bg-yellow-500 text-black text-[10px] font-black uppercase rounded-md self-start"
                 >
                   BACK TO PORTFOLIO →
                 </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative w-full h-full z-20">
            {initialCookies.map((c, index) => (
              <motion.div
                key={c.id}
                drag dragConstraints={jarRef} dragElastic={0} dragMomentum={false} layout
                initial={{ top: "-50%", left: c.startX, opacity: 0 }}
                animate={{ 
                  top: c.startY, 
                  left: c.startX, 
                  opacity: 1, 
                  rotate: (c.isPortal) ? [0, 5, -5, 5, -5, 0, 0, 0, 0, 0] : 0 
                }}
                transition={{ 
                  top: { type: "spring", stiffness: 35, damping: 14, delay: index * 0.3 },
                  rotate: { repeat: Infinity, duration: 3, times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.4, 0.6, 0.8, 1] }
                }}
                onDragStart={() => bringToFront(c.id)}
                className="absolute w-[20vw] h-[20vw] max-w-[280px] max-h-[280px] min-w-[150px] min-h-[150px] cursor-grab active:cursor-grabbing"
                style={{ zIndex: zIndexMap[c.id] || 20 + index, marginLeft: 'clamp(-140px, -10vw, -75px)', marginTop: 'clamp(-140px, -10vw, -75px)' }}
              >
                <Cookie 
                    data={c} 
                    dwellTime={dwellTime}
                    onFlip={() => handleFlipLogic(c.id)} 
                    onPortfolioClick={() => {
                        const freq = getCurrentFreq(pitchCounter) || 523.25;
                        playSoftMallet(freq); 
                        playPortfolioPayoff(freq);
                        setPitchCounter(prev => prev + 1);
                    }} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Cookie({ data, onFlip, onPortfolioClick, dwellTime }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const chips = useMemo(() => generateSovereignChips(), []);
  const isSovereignActive = dwellTime > 10;

  return (
    <motion.div
      className={`w-full h-full relative preserve-3d rounded-full transition-shadow duration-500 cursor-pointer ${data.highlight ? 'shadow-[0_0_5vw_rgba(210,180,140,0.4)]' : 'shadow-[0_4vh_10vh_rgba(0,0,0,0.8)]'}`}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      onClick={() => { setIsFlipped(!isFlipped); onFlip(); }}
    >
      <div className="absolute inset-0 backface-hidden rounded-full border-[1.2vw] border-black/5 bg-[#D2B48C] overflow-hidden">
         <div className="relative w-full h-full">
           {chips.map((chip, i) => (
             <div key={i} className="absolute bg-[#3C2F2F] rounded-sm" 
                  style={{ top: `${chip.y}%`, left: `${chip.x}%`, width: chip.size, height: chip.size, transform: `rotate(${chip.rot}deg)` }} 
             />
           ))}
         </div>
      </div>

      <div className="absolute inset-0 backface-hidden rounded-full flex flex-col items-center justify-center text-white p-[8%] text-center ring-[1.5vw] ring-white/10"
           style={{ backgroundColor: data.backColor, transform: 'rotateY(180deg)' }}>
        
        {data.isPortal ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="font-semibold text-[#E7C89A] text-[1.35vw] mb-[2vh] uppercase tracking-tight">{data.stats}</p>
            <motion.button
              animate={{ 
                backgroundColor: isSovereignActive ? '#800000' : '#C5A059',
                color: isSovereignActive ? '#FCD34D' : '#000000', // Yellow text for maroon background
                boxShadow: isSovereignActive ? '0 0 20px rgba(212,179,117,0.6)' : '0 0 0px rgba(0,0,0,0)'
              }}
              onClick={(e) => { e.stopPropagation(); onPortfolioClick(); window.location.href = '/'; }}
              className="px-[4vw] py-[2vh] rounded-full text-[10px] font-black uppercase border-2 border-[#D4B375] transition-all duration-1000"
            >
              PORTFOLIO →
            </motion.button>
            <h4 className="font-semibold uppercase mt-[2.5vh] opacity-90 tracking-wide">{data.title}</h4>
          </div>
        ) : (
          <>
            <>
              <p className="font-semibold text-[#E7C89A] text-[1.35vw] mb-[2vh] tracking-tight">{data.stats}</p>
              <div className="h-[1px] w-[30%] bg-white/10 mb-[2.5vh] rounded-full" />
              <h4 className="font-semibold text-[1.35vw] uppercase tracking-wide">{data.title}</h4>
            </>
          </>
        )}
      </div>
    </motion.div>
  );
}

const generateSovereignChips = () => {
  const basePositions = [{ cx: 35, cy: 25, isMega: true }, { cx: 70, cy: 35, isMega: false }, { cx: 40, cy: 75, isMega: true }, { cx: 20, cy: 55, isMega: false }, { cx: 65, cy: 70, isMega: false }];
  return basePositions.map(chip => ({
    x: chip.cx + (Math.random() * 6 - 3), y: chip.cy + (Math.random() * 6 - 3),
    rot: Math.random() * 30 - 15, size: chip.isMega ? '18%' : '11%'
  }));
};