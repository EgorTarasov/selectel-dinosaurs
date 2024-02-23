import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export const Text = {
  H4: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h4 className={cn("text-xl", className)} {...props}></h4>
  ),
  H3: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h3 className={cn("text-2xl", className)} {...props}></h3>
  ),
  Large: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h2 className={cn("text-lg", className)} {...props}></h2>
  ),
  UiMedium: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-base font-medium", className)} {...props}></p>
  )
};
