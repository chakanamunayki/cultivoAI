"use client";

import React, { useRef, useEffect } from 'react';
import { VisualizerMode } from './voice-visualizer-types';

interface VisualizerCanvasProps {
  mode: VisualizerMode;
  frequencyData: Uint8Array;
  source: 'mic' | 'ai' | 'idle';
  isActive: boolean;
}

type Palette = {
  stops: readonly [string, string, string];
  glow: string;
  base: string;
};

const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({ mode, frequencyData, source, isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Persistent state for particles
  const particlesRef = useRef<Array<{
    x: number; y: number;
    vx: number; vy: number;
    life: number;
    color: string;
    size: number;
  }>>([]);

  // Persistent state for "peak" bars (slow fall effect)
  const barPeaksRef = useRef<number[]>(new Array(64).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;

    // Color Palettes - ADAPTED FOR BRUTALIST DESIGN
    const getPalette = (): Palette => {
      if (source === 'ai') {
        return {
          stops: ['#00BCD4', '#00BCD4', '#00BCD4'], // Emerald -> Dark Emerald -> Mint
          glow: 'rgba(5, 150, 105, 0.6)',
          base: '#00BCD4'
        };
      } else if (source === 'mic') {
        return {
          stops: ['#F59E0B', '#D97706', '#FBBF24'], // Amber shades
          glow: 'rgba(245, 158, 11, 0.55)',
          base: '#D97706'
        };
      } else {
        return {
          stops: ['#18181B', '#52525B', '#A1A1AA'], // Charcoal -> Muted -> Light gray
          glow: 'rgba(24, 24, 27, 0.18)',
          base: '#18181B'
        };
      }
    };

    const render = () => {
      time += 0.015;
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;
      const palette = getPalette();

      // Clear Screen
      ctx.clearRect(0, 0, width, height);

      // Analyze Audio Data
      let sum = 0;
      for (let i = 0; i < frequencyData.length; i++) {
        sum += frequencyData[i] ?? 0;
      }
      const avgVolume = frequencyData.length > 0 ? sum / frequencyData.length : 0;

      // Normalized volume (0.0 to 1.0) with a boost for visibility
      const vol = Math.min(1, avgVolume / 100);
      const energy = Math.pow(vol, 1.5); // Non-linear response for punchiness

      // --- RENDER MODES ---

      if (mode === VisualizerMode.ORB) {
        // "PLASMA SPHERE" EFFECT
        ctx.translate(cx, cy);

        // Use additive blending for that "glowing energy" look
        ctx.globalCompositeOperation = 'screen';

        const baseRad = 70;

        // 1. Outer Aura (Glow)
        // A large, soft radial gradient that pulsates with volume
        const auraGrad = ctx.createRadialGradient(0, 0, baseRad * 0.8, 0, 0, baseRad * 2.5 + energy * 100);
        auraGrad.addColorStop(0, palette.glow);
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(0, 0, baseRad * 3, 0, Math.PI * 2);
        ctx.fill();

        // 2. Liquid Shells (The "Blob")
        // Draw 3 distinct layers of turbulent noise moving in opposite directions
        for (let layer = 0; layer < 3; layer++) {
            ctx.beginPath();
            const direction = layer % 2 === 0 ? 1 : -1;
            const roughness = 8 + (energy * 20);

            for (let i = 0; i <= 360; i += 3) {
                const rad = (i * Math.PI) / 180;
                // Complex Superposition: Base Radius + Expansion + Sine Wave 1 + Sine Wave 2
                const r = baseRad + (energy * 35) +
                          Math.sin(rad * (4 + layer) + time * (2 + layer) * direction) * (10 + energy * 15) +
                          Math.cos(rad * (10 - layer) - time * direction) * roughness;

                const x = r * Math.cos(rad);
                const y = r * Math.sin(rad);

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.closePath();

            // Layer styles
            if (layer === 0) {
                 // Inner shell: Solid, dark base
                 ctx.fillStyle = palette.base;
                 ctx.globalAlpha = 0.8;
                 ctx.fill();
             } else if (layer === 1) {
                  // Middle shell: Semi-transparent main color
                 ctx.fillStyle = palette.stops[1] ?? palette.base;
                  ctx.globalAlpha = 0.5;
                  ctx.fill();
             } else {
                  // Outer shell: Wireframe/Outline accent
                 ctx.strokeStyle = palette.stops[0] ?? palette.base;
                  ctx.lineWidth = 2;
                  ctx.globalAlpha = 0.6;
                  ctx.stroke();
             }
        }

        // 3. Inner Nucleus (Bright Center)
        // This is the "heart" of the AI
        const coreRad = 25 + (energy * 25);
        ctx.beginPath();
        ctx.arc(0, 0, coreRad, 0, Math.PI * 2);
         const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRad);
         coreGrad.addColorStop(0, '#ffffff'); // White hot center
         coreGrad.addColorStop(0.4, palette.stops[2] ?? palette.base);
         coreGrad.addColorStop(1, palette.base);
         ctx.fillStyle = coreGrad;
         ctx.globalAlpha = 1;
         ctx.fill();

        // 4. Orbital Rings (Tech feel)
        ctx.globalCompositeOperation = 'source-over'; // Switch back to normal blending for crisp lines
        ctx.lineWidth = 1;

        // Draw 3 distinct orbits
        for (let r = 0; r < 3; r++) {
            ctx.beginPath();
            // Rotate the entire context for this ring
            ctx.rotate(time * (0.1 * (r + 1)) * (r % 2 === 0 ? 1 : -1));

            const ringX = baseRad * (1.8 + r * 0.4) + (energy * 40);
             const ringY = baseRad * (0.6 + r * 0.1);

             ctx.ellipse(0, 0, ringX, ringY, 0, 0, Math.PI * 2);
             ctx.strokeStyle = palette.stops[r % palette.stops.length] ?? palette.base;
             ctx.globalAlpha = 0.15 + (energy * 0.3); // Rings become more visible with volume
             ctx.stroke();

            // Add a small "satellite" particle on the ring
            const satAngle = time * (1.5 + r * 0.5);
            const sx = ringX * Math.cos(satAngle);
            const sy = ringY * Math.sin(satAngle);
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#fff';
            ctx.arc(sx, sy, 2 + (energy * 2), 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Reset rotation for next ring
            ctx.rotate(- (time * (0.1 * (r + 1)) * (r % 2 === 0 ? 1 : -1)));
        }

        // Restore context
        ctx.translate(-cx, -cy);
        ctx.globalAlpha = 1;
      }
      else if (mode === VisualizerMode.WAVEFORM) {
        // "NEON STRING" EFFECT
        // Draw center line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.moveTo(0, cy);
        ctx.lineTo(width, cy);
        ctx.stroke();

        const waves = 5;
        for (let k = 0; k < waves; k++) {
            ctx.beginPath();
             const progress = k / waves;
             // Gradient color for each wave
             const colorIdx = Math.floor(progress * (palette.stops.length - 1));
             ctx.strokeStyle = palette.stops[colorIdx] ?? palette.base;
             ctx.lineWidth = 2;

            // Glow only on the main wave
            if (k === 2) {
              ctx.shadowBlur = 15;
              ctx.shadowColor = palette.glow;
            } else {
              ctx.shadowBlur = 0;
            }

            // Phase shift
            const offset = (k * Math.PI * 2) / waves;

            for (let x = 0; x < width; x += 3) {
                // Map x to frequency index
                const dataIdx = Math.floor((x / width) * frequencyData.length);
                const freq = frequencyData[dataIdx] || 0;

                // Amplitude calc
                const amp = (freq / 255) * 150 * energy;

                // Wave math
                const y = cy +
                    Math.sin(x * 0.02 + time * 3 + offset) *
                    amp *
                    Math.sin((x / width) * Math.PI); // Windowing (taper ends)

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
      }
      else if (mode === VisualizerMode.BARS) {
        // "SYMMETRIC SYNTH" EFFECT
        const barCount = 40; // Number of bars on ONE side
        const barWidth = (width * 0.6) / (barCount * 2);
        const spacing = 4;
        const centerSpacing = 10;

        // Ensure barPeaks array is correct size
        if (barPeaksRef.current.length !== barCount) {
            barPeaksRef.current = new Array(barCount).fill(0);
        }

        for (let i = 0; i < barCount; i++) {
            // Get frequency for this bar (distribute across spectrum)
            // Focus on 0 to 70% of the spectrum array for better visuals
            const dataIdx = Math.floor((i / barCount) * (frequencyData.length * 0.7));
            const freq = frequencyData[dataIdx] ?? 0;
            const barHeight = (freq / 255) * (height * 0.4);

            // Peak drop logic
            const currentPeak = barPeaksRef.current[i] ?? 0;
            if (barHeight > currentPeak) {
                barPeaksRef.current[i] = barHeight;
            } else {
                barPeaksRef.current[i] = currentPeak * 0.95; // Decay
            }

            const xRight = cx + centerSpacing + i * (barWidth + spacing);
            const xLeft = cx - centerSpacing - (i + 1) * (barWidth + spacing);

            // Create gradient
            const gradient = ctx.createLinearGradient(0, cy - barHeight, 0, cy + barHeight);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.5, palette.stops[i % palette.stops.length] ?? palette.base);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;

            // Draw Right
            ctx.fillRect(xRight, cy - barHeight / 2, barWidth, barHeight);
            // Draw Left (Mirrored)
            ctx.fillRect(xLeft, cy - barHeight / 2, barWidth, barHeight);

            // Draw Peaks
            ctx.fillStyle = '#fff';
            const peakH = 2;
            const peak = barPeaksRef.current[i] ?? 0;
            const peakYTop = cy - peak / 2 - 6;
            const peakYBot = cy + peak / 2 + 4;

            ctx.globalAlpha = 0.5;
            ctx.fillRect(xRight, peakYTop, barWidth, peakH);
            ctx.fillRect(xLeft, peakYTop, barWidth, peakH);

            ctx.fillRect(xRight, peakYBot, barWidth, peakH);
            ctx.fillRect(xLeft, peakYBot, barWidth, peakH);
            ctx.globalAlpha = 1.0;
        }
      }
      else if (mode === VisualizerMode.PARTICLES) {
        // "WARP SPEED" EFFECT

        // Spawn particles
        // More volume = more particles
        const spawnRate = Math.floor(energy * 4) + 1;

        for (let i = 0; i < spawnRate; i++) {
           const angle = Math.random() * Math.PI * 2;
           // Random spread from center
           const dist = Math.random() * 20;
           const x = cx + Math.cos(angle) * dist;
           const y = cy + Math.sin(angle) * dist;

           const speed = 2 + Math.random() * 3 + (energy * 5);

           const particleColor =
             palette.stops[Math.floor(Math.random() * palette.stops.length)] ?? palette.base;

           particlesRef.current.push({
               x, y,
               vx: Math.cos(angle) * speed,
               vy: Math.sin(angle) * speed,
               life: 1.0,
               color: particleColor,
               size: Math.random() * 3 + 1
           });
         }

        // Render Particles
        ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow

         for (let i = particlesRef.current.length - 1; i >= 0; i--) {
             const p = particlesRef.current[i];
             if (!p) continue;

             // Physics
             p.x += p.vx;
             p.y += p.vy;

            // AI Swirl Effect modification
            if (source === 'ai') {
                p.x += Math.sin(time * 2 + p.y * 0.01) * 2;
                p.y += Math.cos(time * 2 + p.x * 0.01) * 2;
            }

            p.life -= 0.015;
            p.size *= 0.99; // Shrink

            if (p.life <= 0) {
                particlesRef.current.splice(i, 1);
            } else {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Trail
                if (energy > 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = p.size;
                    ctx.stroke();
                }
            }
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;

        // Central Energy Core
        ctx.shadowBlur = 40;
        ctx.shadowColor = palette.glow;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(cx, cy, 10 + energy * 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [mode, isActive, source, frequencyData]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default VisualizerCanvas;
