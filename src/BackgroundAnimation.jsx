import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Neural network simulation
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a radial gradient for the background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      if (isDark) {
        gradient.addColorStop(0, '#001a33');
        gradient.addColorStop(1, '#000000');
      } else {
        gradient.addColorStop(0, '#e6f0ff'); // Lighter blue
        gradient.addColorStop(1, '#b3d1ff'); // Slightly darker blue
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Add mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          particle.x += dx * 0.01;
          particle.y += dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 64, 255, 0.5)'; // Darker blue for light theme
        ctx.fill();
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 1 - (distance / connectionDistance);
            ctx.strokeStyle = isDark 
              ? `rgba(0, 255, 255, ${alpha * 0.2})`
              : `rgba(0, 64, 255, ${alpha * 0.2})`; // Darker blue for light theme
            ctx.stroke();
          }
        }
      }

      // Draw glow effect around mouse
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2);
      const mouseGradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 50
      );
      if (isDark) {
        mouseGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        mouseGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      } else {
        mouseGradient.addColorStop(0, 'rgba(0, 64, 255, 0.3)'); // Darker blue for light theme
        mouseGradient.addColorStop(1, 'rgba(0, 64, 255, 0)');
      }
      ctx.fillStyle = mouseGradient;
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);  

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]); // Add isDark to the dependency array

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default BackgroundAnimation;
