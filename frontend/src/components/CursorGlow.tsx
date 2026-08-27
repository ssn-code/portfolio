import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseMoveEvent) => {
      // Set target coordinates
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-700 hidden md:block ${
        isHovering ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute w-[350px] h-[350px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)',
        }}
      />
    </div>
  );
}

// Inline fallback for Event matching
interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}
