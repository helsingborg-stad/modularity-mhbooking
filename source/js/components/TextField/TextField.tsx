import { HTMLInputTypeAttribute } from 'react';
interface TextFieldInterface {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
}
export const TextField = ({ onChange, value, id, label, type, required }: TextFieldInterface) => (
  <div className="form-group">
    <label className="c-field__text--label">{label}</label>
    <div className="c-field c-field--text c-field--md c-field--radius-md">
      <div className="c-field__inner c-field__inner--text">
        <input type={type} id={id} name={label} onChange={onChange} value={value ?? ''} required={required} />
        <br />
      </div>
    </div>
  </div>
);
