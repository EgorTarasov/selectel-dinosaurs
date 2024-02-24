import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export const Text = {
  H4: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h4 className={cn("text-xl font-semibold", className)} {...props}></h4>
  ),
  H3: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h3 className={cn("text-2xl", className)} {...props}></h3>
  ),
  Large: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <h2 className={cn("text-lg", className)} {...props}></h2>
  ),
  UiMedium: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-base font-medium", className)} {...props}></p>
  ),
  SubleSemi: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-sm font-semibold", className)} {...props}></p>
  ),
  Subtle: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-sm", className)} {...props}></p>
  ),
  Small: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-sm leading-4 font-medium", className)} {...props}></p>
  ),
  UI: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-base", className)} {...props}></p>
  ),
  Detail: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-xs leading-5 font-medium", className)} {...props}></p>
  ),
  Error: ({ className, ...props }: HTMLProps<HTMLHeadingElement>): JSX.Element => (
    <p className={cn("text-sm text-red-500 text-center", className)} {...props}></p>
  )
};
