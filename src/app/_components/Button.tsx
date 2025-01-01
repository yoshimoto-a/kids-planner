import { ReactNode, ComponentPropsWithRef, forwardRef } from "react";

type Variant =
  | "text-blue"
  | "text-red"
  | "text-black"
  | "text-white"
  | "bg-gray"
  | "bg-beige";

interface Props extends Omit<ComponentPropsWithRef<"button">, "className"> {
  variant: Variant;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant, children, ...props }, ref) => {
    const className = () => {
      switch (variant) {
        case "text-blue":
          return "text-blue-500";
        case "text-red":
          return "text-red-500";
        case "text-black":
          return "text-black";
        case "text-white":
          return "text-white";
        case "bg-gray":
          return "bg-gray text-white";
        case "bg-beige":
          return "bg-beige text-white";
        default:
          return "";
      }
    };
    return (
      <button
        ref={ref}
        {...props}
        className={`rounded-md px-4 py-2 ${className()}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
