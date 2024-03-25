"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type SizeTypes = "small" | "medium" | "large";

type SwitchProps = {
  size?: SizeTypes;
} & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

const getSize = (size: SizeTypes) => {
  const sizeMap = {
    small: {
      root: "h-4",
      thumb: "h-3",
    },
    medium: {
      root: "h-5",
      thumb: "h-4",
    },
    large: {
      root: "h-6",
      thumb: "h-5",
    },
  };

  return sizeMap[size];
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "medium", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
      getSize(size).root
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        getSize(size).thumb
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
