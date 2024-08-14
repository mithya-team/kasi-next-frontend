import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import liveRunImage from '../../../public/images/live-run.png';

interface AthleteTrackProps {
  percentage: number; // A number between 0 and 100
  rep?: number;
  lap?: number;
}

const AthleteTrack: React.FC<AthleteTrackProps> = ({
  percentage,
  rep = 0,
  lap = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Track dimensions
    const radius = 36.5 * 2.5; // Scaled radius for the semicircles
    const straightLength = 84.39 * 2.5; // Scaled length for the straight sections

    const totalLength = 2 * Math.PI * radius + 2 * straightLength;
    const distance = (percentage / 100) * totalLength;

    // Colors
    const trackColor = '#6B7280';
    const coveredColor = '#ffffff';
    const insideTrackColor = 'rgba(107, 114, 128, 0.2)';

    //#region  //*=========== Inside field color fill ===========
    // Fill the inside of the track with color
    ctx.fillStyle = insideTrackColor;
    ctx.beginPath();

    // Top semicircle
    ctx.arc(
      canvas.width / 2,
      radius + ctx.lineWidth / 2,
      radius,
      Math.PI, // Start angle
      2 * Math.PI, // End angle
      false, // Clockwise direction
    );

    // Left vertical straight line (moving down)
    ctx.lineTo(
      canvas.width / 2 - radius,
      radius + ctx.lineWidth / 2 + straightLength,
    );

    // Bottom semicircle
    ctx.arc(
      canvas.width / 2,
      radius + ctx.lineWidth / 2 + straightLength,
      radius,
      0, // Start angle
      Math.PI, // End angle
      false, // Clockwise direction
    );

    // Right vertical straight line (moving up)
    ctx.lineTo(canvas.width / 2 + radius, radius + ctx.lineWidth / 2);

    // Fill the rectangular part between the semicircles
    ctx.moveTo(canvas.width / 2 - radius, radius + ctx.lineWidth / 2);
    ctx.lineTo(
      canvas.width / 2 - radius,
      radius + ctx.lineWidth / 2 + straightLength,
    );
    ctx.lineTo(
      canvas.width / 2 + radius,
      radius + ctx.lineWidth / 2 + straightLength,
    );
    ctx.lineTo(canvas.width / 2 + radius, radius + ctx.lineWidth / 2);
    ctx.closePath();
    ctx.fill();

    //#endregion  //*======== Inside field color fill ===========

    // Draw the entire track in trackColor
    ctx.strokeStyle = trackColor;
    ctx.lineWidth = 4; // Set track width to 4px

    // Draw the top semicircle (reversed direction)
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      radius + ctx.lineWidth / 2,
      radius,
      Math.PI, // Start angle
      2 * Math.PI, // End angle
      false, // Clockwise direction
    );
    ctx.stroke();

    // Draw the left vertical straight
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - radius, radius + ctx.lineWidth / 2);
    ctx.lineTo(
      canvas.width / 2 - radius,
      radius + ctx.lineWidth / 2 + straightLength,
    );
    ctx.stroke();

    // Draw the bottom semicircle (from left to right)
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      radius + ctx.lineWidth / 2 + straightLength,
      radius,
      0, // Start angle
      Math.PI, // End angle
      false, // Clockwise direction
    );
    ctx.stroke();

    // Draw the right vertical straight
    ctx.beginPath();
    ctx.moveTo(
      canvas.width / 2 + radius,
      radius + ctx.lineWidth / 2 + straightLength,
    );
    ctx.lineTo(canvas.width / 2 + radius, radius + ctx.lineWidth / 2);
    ctx.stroke();

    // Draw covered track in coveredColor
    ctx.strokeStyle = coveredColor;

    // Covered top semicircle (corrected direction: right to left)
    let coveredDistance = distance;

    if (coveredDistance <= Math.PI * radius) {
      const angle = 2 * Math.PI - coveredDistance / radius;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        radius + ctx.lineWidth / 2,
        radius,
        2 * Math.PI, // Start angle at the top right
        angle, // End angle moving left
        true, // Counter-clockwise direction
      );
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        radius + ctx.lineWidth / 2,
        radius,
        Math.PI,
        2 * Math.PI,
        false, // Clockwise direction
      );
      ctx.stroke();
      coveredDistance -= Math.PI * radius;

      // Covered left vertical straight
      if (coveredDistance <= straightLength) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - radius, radius + ctx.lineWidth / 2);
        ctx.lineTo(
          canvas.width / 2 - radius,
          radius + ctx.lineWidth / 2 + coveredDistance,
        );
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - radius, radius + ctx.lineWidth / 2);
        ctx.lineTo(
          canvas.width / 2 - radius,
          radius + ctx.lineWidth / 2 + straightLength,
        );
        ctx.stroke();
        coveredDistance -= straightLength;

        // Covered bottom semicircle (from left to right)
        if (coveredDistance <= Math.PI * radius) {
          const angle = coveredDistance / radius;
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            radius + ctx.lineWidth / 2 + straightLength,
            radius,
            Math.PI, // Start angle (left side)
            Math.PI - angle, // End angle
            true, // Clockwise direction
          );
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            radius + ctx.lineWidth / 2 + straightLength,
            radius,
            0, // Start angle (right side)
            Math.PI, // End angle (left side)
            false, // Clockwise direction
          );
          ctx.stroke();
          coveredDistance -= Math.PI * radius;

          // Covered right vertical straight
          ctx.beginPath();
          ctx.moveTo(
            canvas.width / 2 + radius,
            radius + ctx.lineWidth / 2 + straightLength,
          );
          ctx.lineTo(
            canvas.width / 2 + radius,
            radius + ctx.lineWidth / 2 + straightLength - coveredDistance,
          );
          ctx.stroke();
        }
      }
    }

    // Determine the athlete's position
    let x: number, y: number;

    if (distance <= Math.PI * radius) {
      // Top semicircle (right to left)
      const angle = 2 * Math.PI - distance / radius;
      x = canvas.width / 2 + radius * Math.cos(angle);
      y = radius + ctx.lineWidth / 2 + radius * Math.sin(angle);
    } else if (distance <= Math.PI * radius + straightLength) {
      // Left vertical straight
      x = canvas.width / 2 - radius;
      y = radius + ctx.lineWidth / 2 + (distance - Math.PI * radius);
    } else if (distance <= 2 * Math.PI * radius + straightLength) {
      const angle = (distance - Math.PI * radius - straightLength) / radius;
      x = canvas.width / 2 - radius * Math.cos(angle);
      y =
        radius + ctx.lineWidth / 2 + straightLength + radius * Math.sin(angle);
    } else {
      // Right vertical straight
      x = canvas.width / 2 + radius;
      y =
        radius +
        ctx.lineWidth / 2 +
        straightLength -
        (distance - 2 * Math.PI * radius - straightLength);
    }

    // Draw the athlete's position using the image
    ctx.drawImage(
      img,
      x - 20, // Adjust the position if needed
      y - 20, // Adjust the position if needed
      40, // Adjust size if needed
      40, // Adjust size if needed
    );
  }, [percentage]);

  return (
    <div className='w-full h-full relative'>
      <canvas ref={canvasRef} width={288} height={600} />
      <Image
        ref={imgRef}
        src={liveRunImage}
        width={40}
        height={40}
        style={{ visibility: 'hidden' }}
        alt='Live Run Icon'
      />

      {/* Start Section */}
      <div
        className='absolute -top-2.5 -right-3 flex items-center space-x-2'
        style={{
          transform: `translateY(${36.5 * 2.5}px)`,
        }}
      >
        <SvgIcon name='flag' />
        <span className='text-white'>Start</span>
        <div className='h-[1px] bg-white w-8'></div>
      </div>

      {/* Centered Rep and Lap info */}
      <div className='absolute -right-10 font-secondary text-center font-semibold inset-0 text-green-400 flex flex-col justify-center items-center'>
        <Typo level='h3'>{`Rep ${rep}`}</Typo>
        <Typo level='h3'>{`Lap ${lap}`}</Typo>
      </div>
    </div>
  );
};

export default AthleteTrack;
