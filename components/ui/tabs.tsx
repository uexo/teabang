"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = ({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) => {
  const [value, setValue] = React.useState(defaultValue);
  
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { value, setValue });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children, className, value, setValue }: { children: React.ReactNode; className?: string; value?: string; setValue?: (v: string) => void }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement, { currentValue: value, setValue });
      }
      return child;
    })}
  </div>
);

const TabsTrigger = ({ children, value: triggerValue, className, currentValue, setValue }: { children: React.ReactNode; value: string; className?: string; currentValue?: string; setValue?: (v: string) => void }) => (
  <button
    onClick={() => setValue?.(triggerValue)}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      currentValue === triggerValue && "bg-background text-foreground shadow-sm",
      className
    )}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value: contentValue, className, value: currentValue }: { children: React.ReactNode; value: string; className?: string; value?: string }) => {
  if (currentValue !== contentValue) return null;
  return (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
