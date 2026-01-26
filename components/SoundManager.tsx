
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Activity, Zap, MousePointer2 } from 'lucide-react';

const SoundManager: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const interactiveOscRef = useRef<OscillatorNode | null>(null);
  const interactiveGainRef = useRef<GainNode | null>(null);
  const interactiveFilterRef = useRef<BiquadFilterNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.6, ctx.currentTime);
      master.connect(ctx.destination);
      audioContextRef.current = ctx;
      mainGainRef.current = master;

      // Initialize the interactive "sliding" oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start();
      
      interactiveOscRef.current = osc;
      interactiveGainRef.current = gain;
      interactiveFilterRef.current = filter;
    }
  }, []);

  const playComplexPulse = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.1, gain: number = 0.1, detune: number = 0) => {
    if (isMuted || !audioContextRef.current || !mainGainRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    const oscs = [0, 2, 7, 12].map(interval => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      
      const f = freq * Math.pow(2, interval / 12);
      osc.frequency.setValueAtTime(f, now);
      osc.type = type;
      osc.detune.setValueAtTime(detune + (Math.random() * 10 - 5), now);
      
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(gain / (interval === 0 ? 1 : 4), now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      
      osc.connect(g);
      g.connect(mainGainRef.current!);
      return osc;
    });

    oscs.forEach(o => {
      o.start(now);
      o.stop(now + duration);
    });
  }, [isMuted]);

  const playSound = (type: 'hover' | 'click' | 'init' | 'access') => {
    if (isMuted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    if (type === 'hover') {
      playComplexPulse(1200, 'sine', 0.08, 0.04, 5);
      playComplexPulse(2400, 'triangle', 0.04, 0.02, 10);
    } else if (type === 'click') {
      playComplexPulse(110, 'square', 0.15, 0.12);
      playComplexPulse(880, 'sine', 0.05, 0.08);
      
      const bufferSize = ctx.sampleRate * 0.02;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      const ng = ctx.createGain();
      noise.buffer = buffer;
      ng.gain.setValueAtTime(0.05, now);
      ng.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      noise.connect(ng);
      ng.connect(mainGainRef.current!);
      noise.start(now);
    } else if (type === 'init') {
      [0, 100, 250].forEach((delay, i) => {
        setTimeout(() => {
          playComplexPulse(220 * (i + 1), 'triangle', 0.6, 0.1, 2);
        }, delay);
      });
    } else if (type === 'access') {
      playComplexPulse(440, 'sine', 0.4, 0.05);
      setTimeout(() => playComplexPulse(659.25, 'sine', 0.4, 0.05), 100);
      setTimeout(() => playComplexPulse(880, 'sine', 0.4, 0.05), 200);
    }
  };

  // Handle cursor-based "sliding music"
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMuted || !audioContextRef.current || !interactiveOscRef.current || !interactiveGainRef.current || !interactiveFilterRef.current) return;
      
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      const xPercent = e.clientX / window.innerWidth;
      const yPercent = e.clientY / window.innerHeight;

      // Frequency sliding (based on X)
      // A pleasing range: 110Hz to 440Hz
      const freq = 110 + (xPercent * 330);
      interactiveOscRef.current.frequency.setTargetAtTime(freq, now, 0.05);

      // Filter cutoff & Gain modulation (based on Y)
      const cutoff = 400 + (yPercent * 2000);
      interactiveFilterRef.current.frequency.setTargetAtTime(cutoff, now, 0.1);
      
      // Gain is very subtle, max 0.02 to avoid annoyance
      const targetGain = 0.005 + ((1 - yPercent) * 0.015);
      interactiveGainRef.current.gain.setTargetAtTime(targetGain, now, 0.1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMuted]);

  // Generative "Data Stream" Background
  useEffect(() => {
    if (!isMuted && audioContextRef.current) {
      let step = 0;
      const scale = [55, 65.41, 73.42, 82.41, 98];
      
      const tick = () => {
        if (isMuted) return;
        if (step % 8 === 0) playComplexPulse(scale[0], 'sine', 0.8, 0.03);
        if (Math.random() > 0.8) {
          const note = scale[Math.floor(Math.random() * scale.length)] * 8;
          playComplexPulse(note, 'sine', 0.15, 0.015, 15);
        }
        step = (step + 1) % 32;
        intervalRef.current = window.setTimeout(tick, 150);
      };
      tick();
      return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
    }
  }, [isMuted, playComplexPulse]);

  // Global listeners for UI sounds
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.tech-frame')) {
        playSound('click');
      }
    };
    const handleGlobalHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.tech-frame')) {
        playSound('hover');
      }
    };
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('mouseover', handleGlobalHover);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('mouseover', handleGlobalHover);
    };
  }, [isMuted]);

  const toggleMute = () => {
    initAudio();
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    // Fade interactive gain in/out
    if (interactiveGainRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      interactiveGainRef.current.gain.setTargetAtTime(newMuted ? 0 : 0.01, now, 0.2);
    }

    if (!newMuted) {
      setTimeout(() => playSound('init'), 50);
    }
  };

  return (
    <div className="fixed bottom-10 left-10 z-[100] flex items-center gap-6">
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.15, rotate: isMuted ? 0 : 5 }}
        whileTap={{ scale: 0.9 }}
        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all tech-frame backdrop-blur-2xl ${
          isMuted 
            ? 'border-white/10 bg-black/60 text-zinc-500 hover:text-white' 
            : 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-[0_0_40px_rgba(0,242,255,0.4)]'
        }`}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </motion.button>
      
      {!isMuted && (
        <motion.div 
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-cyan-500/20 px-6 py-3 rounded-full tech-frame"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mono text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
              <MousePointer2 size={12} className="animate-pulse" />
              INTERACTIVE_SONAR_SYNC
            </div>
            <div className="flex gap-1.5 mt-1.5 items-center h-6">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [4, Math.random() * 20 + 4, 4],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 0.2 + (i * 0.05), 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-1 bg-cyan-400/80 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
          <div className="mono text-[8px] text-cyan-500/60 font-black uppercase leading-none">
            CURSOR_SLIDE<br/>DETECTION
          </div>
        </motion.div>
      )}
      
      <AnimatePresence>
        {isMuted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-14 left-0 whitespace-nowrap mono text-[10px] text-cyan-400/70 font-black tracking-[0.3em] bg-black/80 px-5 py-2 tech-frame border border-cyan-400/20 shadow-[0_0_20px_rgba(0,242,255,0.1)] flex items-center gap-3"
          >
            <Zap size={12} fill="currentColor" />
            CONNECT_SONIC_INTERFACE
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoundManager;
