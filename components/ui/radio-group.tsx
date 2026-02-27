"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const RadioGroup = ({ children, value, onValueChange, className }: { children: React.ReactNode; value?: string; onValueChange?: (v: string) => void; className?: string }) => {
  return (
    <div className={cn("grid gap-2", className)} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            selectedValue: value,
            onSelect: onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

const RadioGroupItem = ({ children, value, id, selectedValue, onSelect, className }: { children?: React.ReactNode; value: string; id?: string; selectedValue?: string; onSelect?: (v: string) => void; className?: string }) => {
  const isSelected = selectedValue === value;
  
  return (
    <div 
      className={cn("flex items-center", className)}
      onClick={() => onSelect?.(value)}
    >
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          isSelected && "border-transparent bg-primary"
        )}
      >
        {isSelected && (
          <svg className="h-full w-full p-0.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
          </svg>
        )}
      </button>
      {children && <label htmlFor={id} className="ml-2">{children}</label>}
    </div>
  );
};

export { RadioGroup, RadioGroupItem };
