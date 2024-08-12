import React, { useEffect, useRef } from 'react';

interface AthleteTrackProps {
  percentage: number; // A number between 0 and 100
}

const AthleteTrack: React.FC<AthleteTrackProps> = ({ percentage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.devicePixelRatio = 2;

    // Track dimensions
    const radius = 36.5 * 2.5; // Scaled radius for the semicircles
    const straightLength = 84.39 * 2.5; // Scaled length for the straight sections

    const totalLength = 2 * Math.PI * radius + 2 * straightLength;

    // Calculate athlete position based on percentage
    const distance = (percentage / 100) * totalLength;

    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 2;

    // Draw the top semicircle
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      radius + ctx.lineWidth,
      radius,
      Math.PI,
      2 * Math.PI,
    );
    ctx.stroke();

    // Draw the "Start" text
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      'Start',
      canvas.width / 2 - radius - 20,
      radius + ctx.lineWidth - 10,
    );

    // Draw the left vertical straight
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - radius, radius + ctx.lineWidth);
    ctx.lineTo(
      canvas.width / 2 - radius,
      radius + ctx.lineWidth + straightLength,
    );
    ctx.stroke();

    // Draw the bottom semicircle
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      radius + ctx.lineWidth + straightLength,
      radius,
      0,
      Math.PI,
    );
    ctx.stroke();

    // Draw the right vertical straight
    ctx.beginPath();
    ctx.moveTo(
      canvas.width / 2 + radius,
      radius + ctx.lineWidth + straightLength,
    );
    ctx.lineTo(canvas.width / 2 + radius, radius + ctx.lineWidth);
    ctx.stroke();

    // Determine the athlete's position
    ctx.fillStyle = 'red';
    let x, y;

    if (distance <= Math.PI * radius) {
      // Top semicircle
      const angle = Math.PI + distance / radius;
      x = canvas.width / 2 + radius * Math.cos(angle);
      y = radius + ctx.lineWidth + radius * Math.sin(angle);
    } else if (distance <= Math.PI * radius + straightLength) {
      // Left vertical straight
      x = canvas.width / 2 + radius;
      y = radius + ctx.lineWidth + (distance - Math.PI * radius);
    } else if (distance <= 2 * Math.PI * radius + straightLength) {
      // Bottom semicircle
      const angle = (distance - Math.PI * radius - straightLength) / radius;
      x = canvas.width / 2 + radius * Math.cos(angle);
      y = radius + ctx.lineWidth + straightLength + radius * Math.sin(angle);
    } else {
      // Right vertical straight
      x = canvas.width / 2 - radius;
      y =
        radius +
        ctx.lineWidth +
        straightLength -
        (distance - 2 * Math.PI * radius - straightLength);
    }

    // Draw the athlete's position
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }, [percentage]);

  return <canvas ref={canvasRef} width={250} height={500} />;
};

export default AthleteTrack;
