
import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
  isDarkMode: boolean;
}

const Globe: React.FC<GlobeProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  // Configuration based on theme
  const baseColor = isDarkMode ? [0.1, 0.1, 0.1] : [0.9, 0.9, 0.9];
  const glowColor = isDarkMode ? [0.15, 0.15, 0.15] : [0.8, 0.8, 0.8];
  const markerColor = [214 / 255, 0, 0]; // Audi Red #D60000

  // Rotation speed control
  const rotationSpeed = useRef(0.003);

  const handleMouseEnter = () => {
    rotationSpeed.current = 0.0005; // Slow down significantly
  };

  const handleMouseLeave = () => {
    rotationSpeed.current = 0.003; // Resume normal speed
  };

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: isDarkMode ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      opacity: 1,
      markers: [
        // China (Approximate)
        { location: [31.2304, 121.4737], size: 0.1 },
        // Namibia (Windhoek)
        { location: [-22.5609, 17.0658], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        state.phi = phi + r;
        phi += rotationSpeed.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [isDarkMode, r]);

  return (
    <div 
      className="w-full h-full relative flex items-center justify-center overflow-hidden cursor-move"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', maxWidth: '600px', aspectRatio: 1 }}
        />
    </div>
  );
};

export default Globe;
