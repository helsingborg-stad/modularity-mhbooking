interface ButtonInterface {
  onClick: (event: any) => void;
  label: string;
}
const Button = ({ onClick, label }: ButtonInterface) => 
<button 
  onClick={onClick} 
  className="c-button c-button__filled c-button__filled--primary c-button--md ripple ripple--before">
  <span className="c-button__label">
    <span className="c-button__label-text">
      {label}
    </span>
  </span>
</button>

export default Button;