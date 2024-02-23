import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const IconInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { leftIcon?: React.ReactElement }
>(({ leftIcon: LeftIcon, className, ...props }, ref) => {
  return (
    <div className="relative">
      <Input ref={ref} className={cn(LeftIcon && "pl-10", className)} {...props} />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-foreground *:w-4 *:h-4">
        {LeftIcon}
      </div>
    </div>
  );
});

export { Input, IconInput };
