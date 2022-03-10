interface CheckboxInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label: string;
}
export const Checkbox = ({
  onChange,
  label,
  id,
  checked,
}: CheckboxInterface & React.HTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="c-option c-option__checkbox">
      <input
        type="checkbox"
        className="c-option__checkbox--hidden-box"
        id={id}
        aria-checked={checked}
        tabIndex={0}
        onChange={onChange}
        checked={checked}
        name={label}
      />
      <label htmlFor={id} className="c-option__checkbox--label">
        <span className="c-option__checkbox--label-box"></span>
        <span className="c-option__checkbox--label-text">{label}</span>
      </label>
    </div>
  );
};
