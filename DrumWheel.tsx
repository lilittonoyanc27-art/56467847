import React, { useRef, useState, useEffect } from 'react';
import { playWheelTick } from './sound';
import { RotateCw, Sparkles, Award } from 'lucide-react';

export interface WheelSector {
  id: number;
  label: string;
  type: 'points' | 'prize' | 'chance' | 'plus' | 'bankrupt' | 'double';
  value: number;
  color: string;
  textColor: string;
}

export const WHEEL_SECTORS: WheelSector[] = [
  { id: 0, label: '500', type: 'points', value: 500, color: '#f59e0b', textColor: '#ffffff' },
  { id: 1, label: 'ПРИЗ 🎁', type: 'prize', value: 1000, color: '#ec4899', textColor: '#ffffff' },
  { id: 2, label: '250', type: 'points', value: 250, color: '#3b82f6', textColor: '#ffffff' },
  { id: 3, label: '+БУКВА 🔤', type: 'plus', value: 300, color: '#10b981', textColor: '#ffffff' },
  { id: 4, label: '750', type: 'points', value: 750, color: '#8b5cf6', textColor: '#ffffff' },
  { id: 5, label: 'БАНКРОТ ⚡️', type: 'bankrupt', value: 0, color: '#1f2937', textColor: '#ef4444' },
  { id: 6, label: '400', type: 'points', value: 400, color: '#06b6d4', textColor: '#ffffff' },
  { id: 7, label: 'ШАНС 🍀', type: 'chance', value: 500, color: '#84cc16', textColor: '#ffffff' },
  { id: 8, label: '1000', type: 'points', value: 1000, color: '#eab308', textColor: '#000000' },
  { id: 9, label: '300', type: 'points', value: 300, color: '#6366f1', textColor: '#ffffff' },
  { id: 10, label: 'x2 ОЧКИ 🌟', type: 'double', value: 0, color: '#f97316', textColor: '#ffffff' },
  { id: 11, label: '600', type: 'points', value: 600, color: '#14b8a6', textColor: '#ffffff' },
];

interface DrumWheelProps {
  onSpinEnd: (sector: WheelSector) => void;
  canSpin: boolean;
  disabledReason?: string;
  lastSector?: WheelSector | null;
}

export const DrumWheel: React.FC<DrumWheelProps> = ({
  onSpinEnd,
  canSpin,
  disabledReason,
  lastSector,
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const lastTickAngleRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const numSectors = WHEEL_SECTORS.length;
  const sectorAngle = 360 / numSectors;

  const spin = () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    // Choose a random winning sector
    const targetSectorIndex = Math.floor(Math.random() * numSectors);
    
    // Pointer is at the top (270 degrees in standard canvas or 0 degrees in SVG top)
    // To land on sector index i at top (angle 270 deg or -90 deg):
    // Center angle of sector i: i * sectorAngle + sectorAngle / 2
    const sectorCenter = targetSectorIndex * sectorAngle + sectorAngle / 2;
    
    // Add 4-7 full rotations + alignment to top
    const fullSpins = (4 + Math.floor(Math.random() * 3)) * 360;
    // Current rotation normalized
    const currentRot = rotation;
    // We want the wheel rotation R such that: (270 - (R % 360) + 360) % 360 lands inside the target sector
    // Or in SVG where top is 0° (or 270°):
    // If top is -90° (270°), the angle under the pointer is: (270 - finalAngle) % 360
    const targetAngle = fullSpins + (360 - sectorCenter - 90);
    const totalRotation = currentRot + (targetAngle - (currentRot % 360) + 360);

    const startTime = performance.now();
    const duration = 4000; // 4 seconds spin
    const startAngle = currentRot;
    const changeInAngle = totalRotation - startAngle;

    lastTickAngleRef.current = startAngle;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + changeInAngle * easeOut;
      setRotation(currentAngle);

      // Play tick sound when passing each sector boundary
      if (Math.abs(currentAngle - lastTickAngleRef.current) >= sectorAngle) {
        playWheelTick();
        lastTickAngleRef.current = currentAngle;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setRotation(totalRotation);
        onSpinEnd(WHEEL_SECTORS[targetSectorIndex]);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Compute SVG slice path
  const radius = 170;
  const center = 190;

  const getCoordinatesForPercent = (percent: number) => {
    const x = center + radius * Math.cos(2 * Math.PI * percent);
    const y = center + radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Drum Frame / Studio aesthetic */}
      <div className="relative p-3 rounded-full bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 shadow-[0_15px_35px_rgba(0,0,0,0.45)] border-4 border-amber-300/60">
        
        {/* Top Pointer arrow indicator */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-red-600 animate-pulse" />
          <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-white -mt-1 shadow-sm" />
        </div>

        {/* SVG Wheel */}
        <div className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] relative">
          <svg
            viewBox="0 0 380 380"
            className="w-full h-full transform transition-transform"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <defs>
              <radialGradient id="centerGem" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#854d0e" />
              </radialGradient>
              <filter id="innerGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feOffset in="blur" dx="0" dy="2" result="offset" />
                <feComposite in="SourceGraphic" in2="offset" operator="over" />
              </filter>
            </defs>

            {/* Slices */}
            {WHEEL_SECTORS.map((sector, i) => {
              const startAngleDeg = i * sectorAngle;
              const endAngleDeg = (i + 1) * sectorAngle;
              const startPercent = startAngleDeg / 360;
              const endPercent = endAngleDeg / 360;

              const [startX, startY] = getCoordinatesForPercent(startPercent);
              const [endX, endY] = getCoordinatesForPercent(endPercent);

              // SVG arc
              const largeArcFlag = sectorAngle > 180 ? 1 : 0;
              const pathData = [
                `M ${center} ${center}`,
                `L ${startX} ${startY}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                'Z',
              ].join(' ');

              const textAngle = startAngleDeg + sectorAngle / 2;
              const textRad = (textAngle * Math.PI) / 180;
              const textDist = radius * 0.68;
              const textX = center + textDist * Math.cos(textRad);
              const textY = center + textDist * Math.sin(textRad);

              return (
                <g key={sector.id}>
                  <path
                    d={pathData}
                    fill={sector.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  {/* Brass sector pins */}
                  <circle
                    cx={startX}
                    cy={startY}
                    r="3.5"
                    fill="#fef08a"
                    stroke="#854d0e"
                    strokeWidth="1"
                  />
                  {/* Text on sector */}
                  <text
                    x={textX}
                    y={textY}
                    fill={sector.textColor}
                    fontSize={sector.label.length > 6 ? '11' : '15'}
                    fontWeight="800"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                    style={{
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                      fontFamily: 'system-ui, sans-serif',
                    }}
                  >
                    {sector.label}
                  </text>
                </g>
              );
            })}

            {/* Central hub - classic Pole Chudes gold dome */}
            <circle
              cx={center}
              cy={center}
              r="44"
              fill="url(#centerGem)"
              stroke="#ffffff"
              strokeWidth="4"
              filter="url(#innerGlow)"
            />
            <circle
              cx={center}
              cy={center}
              r="22"
              fill="#713f12"
              stroke="#fef08a"
              strokeWidth="2"
            />
            <text
              x={center}
              y={center + 1}
              fill="#fef08a"
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="central"
              letterSpacing="1"
            >
              ПОЛЕ
            </text>
          </svg>
        </div>
      </div>

      {/* Controls & Last Sector Result */}
      <div className="mt-5 flex flex-col items-center gap-3 w-full max-w-sm">
        <button
          onClick={spin}
          disabled={!canSpin || isSpinning}
          className={`w-full py-3.5 px-6 rounded-2xl font-black text-lg tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
            canSpin && !isSpinning
              ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-amber-500/40 hover:shadow-amber-400/60 ring-2 ring-yellow-200 cursor-pointer animate-pulse'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed shadow-none'
          }`}
        >
          <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
          {isSpinning ? 'Барабан вращается...' : 'Крутить барабан!'}
        </button>

        {disabledReason && !isSpinning && (
          <p className="text-xs text-amber-300/90 bg-amber-950/60 px-3.5 py-1.5 rounded-full border border-amber-500/30 text-center font-medium">
            💡 {disabledReason}
          </p>
        )}

        {lastSector && !isSpinning && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-amber-400/40 rounded-xl shadow-md text-amber-300 text-sm font-semibold animate-fade-in">
            <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>Выпал сектор: <strong className="text-white font-extrabold">{lastSector.label}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};
