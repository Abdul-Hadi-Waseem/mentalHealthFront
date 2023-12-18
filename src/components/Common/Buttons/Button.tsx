import { MouseEventHandler } from "react";

interface propsType {
  title?: string;
  onClick?: MouseEventHandler;
  className?: string;
  variant?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button = ({
  onClick,
  title,
  className,
  variant,
  disabled,
  type,
}: propsType) => {
  return (
    <button
      onClick={onClick}
      className={`${
        variant === "secondary" ? "secondary-btn" : variant === "danger" ? "danger-btn" : "primary-btn"
      } ${className} ${disabled ? "disabled-btn" : ""}`}
      disabled={disabled}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
