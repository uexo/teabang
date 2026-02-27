"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [isOpen, setIsOpen] = React.useState(open || false);

  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
    onOpenChange?.(value);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            isOpen,
            onOpenChange: handleOpenChange,
          });
        }
        return child;
      })}
    </>
  );
};

const SheetTrigger = ({ children, asChild, onOpenChange }: { children: React.ReactNode; asChild?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const handleClick = () => onOpenChange?.(true);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
    });
  }

  return <div onClick={handleClick}>{children}</div>;
};

const SheetContent = ({ children, side = "right", className, isOpen, onOpenChange }: { children: React.ReactNode; side?: "left" | "right"; className?: string; isOpen?: boolean; onOpenChange?: (open: boolean) => void }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "fixed top-0 z-50 h-full w-3/4 max-w-sm bg-background p-6 shadow-lg transition-transform duration-300",
          side === "left" ? "left-0" : "right-0",
          className
        )}
      >
        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </>
  );
};

export { Sheet, SheetTrigger, SheetContent };
