/* eslint-disable react/prop-types */
// import { Mic, MicOff, Volume2, VolumeX, Sun, Moon, Settings } from 'lucide-react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

// Card Component
const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded-lg shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Alert Dialog Components
const AlertDialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

const AlertDialogContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`mx-4 p-6 rounded-lg shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDialogHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const AlertDialogTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 
      className={`text-xl font-semibold ${className}`} 
      {...props}
    >
      {children}
    </h2>
  );
};

const AlertDialogDescription = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardContent, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription };

export const Slider = React.forwardRef(({ id, min, max, step, value, onValueChange, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      ref={ref}
      className="relative flex items-center select-none touch-none w-full h-5 focus:outline-none"
      {...props}
    >
      <SliderPrimitive.Track className="bg-gray-300 dark:bg-gray-700 relative grow rounded-full h-1.5">
        <SliderPrimitive.Range className="bg-blue-500 absolute rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="bg-white dark:bg-gray-900 block w-4 h-4 rounded-full shadow-md transition-transform duration-100 will-change-transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = 'Slider';