/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export const VoiceVisualizer = ({ isActive, lineColor = "#3b82f6" }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startVisualization();
    } else {
      stopVisualization();
    }

    return () => {
      stopVisualization();
    };
  }, [isActive]);

  const startVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      draw();
    } catch (error) {
      console.error("Error accessing microphone for visualizer:", error);
    }
  };

  const stopVisualization = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    animationIdRef.current = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);

    // Iron Man HUD Style Settings
    const primaryColor = lineColor; // Cyan/Blue
    const glowColor = lineColor; // "#00f0ff"

    // 1. Draw Center Line (Horizon)
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.strokeStyle = `${primaryColor}20`; // Very faint line
    ctx.lineWidth = 1;
    ctx.stroke();

    // 2. Main Waveform Visualization
    const centerY = height / 2;

    // Glow Effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = glowColor;

    // We want symmetry from the center
    // Focus on the vocal range (lower-mid frequencies)
    const relevantData = dataArray.slice(0, 40);
    const totalBars = 30; // Number of bars to draw
    const step = Math.floor(relevantData.length / totalBars) || 1;
    const barGap = 4;

    // Center X
    const cx = width / 2;

    // Draw mirrored from center
    for (let i = 0; i < totalBars; i++) {
      const dataIndex = i * step;
      const value = relevantData[dataIndex];
      const percent = value / 255;
      // Make the movement more dramatic
      const barH = Math.max(4, percent * (height * 0.8));

      // Right side bar
      const xRight = cx + i * (6 + barGap) + 2;
      drawRoundedBar(ctx, xRight, centerY, 6, barH, primaryColor);

      // Left side bar
      const xLeft = cx - i * (6 + barGap) - 8;
      drawRoundedBar(ctx, xLeft, centerY, 6, barH, primaryColor);
    }
  };

  const drawRoundedBar = (ctx, x, centerY, width, height, color) => {
    // Create gradient for the bar body
    const gradient = ctx.createLinearGradient(
      0,
      centerY - height / 2,
      0,
      centerY + height / 2
    );
    gradient.addColorStop(0, `${color}00`); // Fade out at top
    gradient.addColorStop(0.2, color);
    gradient.addColorStop(0.8, color);
    gradient.addColorStop(1, `${color}00`); // Fade out at bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(x, centerY - height / 2, width, height);

    // Caps (Segments) to give it that "Tech" feel
    // Only draw caps if bar is tall enough
    if (height > 10) {
      ctx.fillStyle = "#ffffffCC"; // Bright white highlight
      // Top Cap
      ctx.fillRect(x, centerY - height / 2, width, 2);
      // Bottom Cap
      ctx.fillRect(x, centerY + height / 2 - 2, width, 2);

      // Center "Tech" mark
      if (height > 20) {
        ctx.fillStyle = `${color}88`;
        ctx.fillRect(x + 1, centerY - 1, width - 2, 2);
      }
    }
  };

  return (
    <canvas ref={canvasRef} width={300} height={60} className="w-full h-full" />
  );
};
