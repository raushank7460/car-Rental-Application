import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ProceduralSupercar } from './ProceduralSupercar';
import { RotateCw, Maximize2, Minimize2, Sparkles, Eye } from 'lucide-react';

export const CAR_COLORS = [
  { name: 'Obsidian Black', hex: '#111317', bg: 'bg-[#111317]' },
  { name: 'Pearl White', hex: '#f8fafc', bg: 'bg-[#f8fafc]' },
  { name: 'Rosso Corsa Red', hex: '#ff2238', bg: 'bg-[#ff2238]' },
  { name: 'Yas Marina Blue', hex: '#0ea5e9', bg: 'bg-[#0ea5e9]' },
  { name: 'Quicksilver', hex: '#94a3b8', bg: 'bg-[#94a3b8]' },
  { name: 'Emerald Green', hex: '#059669', bg: 'bg-[#059669]' },
  { name: 'Liquid Gold', hex: '#eab308', bg: 'bg-[#eab308]' },
];

export const CarCanvas = ({
  initialColor = '#ff2238',
  interactive = true,
  autoRotateDefault = true,
  height = 'h-[480px]',
  showControls = true,
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const setCameraView = (type) => {
    if (!controlsRef.current) return;
    if (type === 'front') {
      controlsRef.current.object.position.set(3.8, 1.8, 4.2);
    } else if (type === 'side') {
      controlsRef.current.object.position.set(5.5, 1.4, 0);
    } else if (type === 'rear') {
      controlsRef.current.object.position.set(-3.8, 1.8, -4.2);
    } else if (type === 'top') {
      controlsRef.current.object.position.set(0, 7.5, 0.5);
    }
    controlsRef.current.target.set(0, 0.4, 0);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} rounded-2xl overflow-hidden glass-panel border border-white/10 group select-none ${
        isFullscreen ? 'h-screen w-screen rounded-none z-50 fixed inset-0' : ''
      }`}
    >
      {/* 3D Canvas */}
      <Canvas shadows className="cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[4.5, 2.2, 5.2]} fov={45} />

        {/* Studio Lighting Setup */}
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[6, 8, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Cool Rim Backlight */}
        <spotLight position={[-6, 6, -5]} intensity={3} color="#00f0ff" />
        {/* Warm Side Light */}
        <spotLight position={[5, 4, -4]} intensity={2} color="#ffaa44" />
        {/* Soft Under-Glow */}
        <pointLight position={[0, -0.2, 0]} intensity={1.5} color={selectedColor} distance={4} />

        {/* Procedural Supercar */}
        <ProceduralSupercar color={selectedColor} isSpinning={false} />

        {/* Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={interactive}
          enableRotate={interactive}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={0.1}
          autoRotate={isAutoRotating}
          autoRotateSpeed={1.8}
        />
      </Canvas>

      {/* Floating Controls Overlay */}
      {showControls && (
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            title="Toggle Auto-Rotation"
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              isAutoRotating
                ? 'bg-brand-red text-white border-brand-red shadow-glow'
                : 'bg-dark-850/80 text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2.5 rounded-xl bg-dark-850/80 text-slate-300 border border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Camera Angle Presets & Interactive Hints */}
      {showControls && (
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-dark-900/80 border border-white/10 text-slate-300 backdrop-blur-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            360° Studio
          </span>

          <div className="hidden sm:flex items-center gap-1 bg-dark-900/80 border border-white/10 p-1 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setCameraView('front')}
              className="text-[11px] px-2.5 py-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Front 3/4
            </button>
            <button
              onClick={() => setCameraView('side')}
              className="text-[11px] px-2.5 py-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => setCameraView('rear')}
              className="text-[11px] px-2.5 py-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Rear
            </button>
            <button
              onClick={() => setCameraView('top')}
              className="text-[11px] px-2.5 py-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Top
            </button>
          </div>
        </div>
      )}

      {/* Real-time Color Picker Palette Bar */}
      {showControls && (
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-dark-900/90 border border-white/10 backdrop-blur-md pointer-events-auto shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-400 ml-1 mr-1 hidden sm:inline" />
            <span className="text-xs font-medium text-slate-300 mr-2 hidden md:inline">Paint:</span>
            {CAR_COLORS.map((col) => (
              <button
                key={col.hex}
                onClick={() => setSelectedColor(col.hex)}
                title={col.name}
                className={`relative w-6 h-6 rounded-full transition-transform ${col.bg} ${
                  selectedColor === col.hex
                    ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-dark-950'
                    : 'hover:scale-110 opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] text-slate-400 bg-dark-900/80 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md pointer-events-auto hidden sm:block">
            Drag to Rotate • Scroll to Zoom
          </div>
        </div>
      )}
    </div>
  );
};
