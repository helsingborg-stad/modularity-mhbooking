interface TextFieldInterface {
  onChange: (event: any) => void;
  value: string;
  id: string;
  label: string;
}
const TextField = ({ onChange, value, id, label }: TextFieldInterface) => 
<div className='form-group'>
    <label className='c-field__text--label'>
      {label}
    </label>
  <div className='c-field c-field--text c-field--md c-field--radius-md'>
    <div className='c-field__inner c-field__inner--text'>
      <input type='text' id={id} name={label} onChange={onChange} value={value ?? ''}/><br/>
    </div>
  </div>
</div>

export default TextField;
