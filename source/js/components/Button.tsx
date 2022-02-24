interface ButtonInterface {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  type: "button" | "submit" | "reset" | undefined;
}
const Button = ({
  onClick,
  label,
  type,
  className,
}: ButtonInterface & React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick ? onClick : undefined}
    type={type}
    className={`c-button c-button__filled c-button__filled--primary c-button--md ripple ripple--before ${className}`}
  >
    <span className="c-button__label">
      <span className="c-button__label-text">{label}</span>
    </span>
  </button>
);

export default Button;
