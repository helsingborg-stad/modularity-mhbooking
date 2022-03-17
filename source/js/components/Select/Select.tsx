import { HtmlHTMLAttributes } from 'react';

interface SelectInterface {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

export const Select = ({
  onChange,
  id,
  label,
  value,
  options,
  required = false,
}: SelectInterface & HtmlHTMLAttributes<HTMLSelectElement>) => (
  <div className="c-select c-select--md c-field">
    <label htmlFor={id}>{label}</label>
    <div className="u-position--relative">
      <select id={id} value={value} onChange={onChange} required={required}>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="c-select__option">
            {option.label}
          </option>
        ))}
      </select>
      <i className="c-icon c-select__icon c-icon--size-md material-icons" translate="no" role="img">
        expand_more
      </i>
    </div>
  </div>
);
