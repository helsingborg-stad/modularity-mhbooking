import { FormEventHandler } from 'react';
import { Button, DatePicker, GridElement, GridRow, TextField } from '.';

interface FormInterface {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  availableDates: Record<string, any[]>;
  selectedDate: Record<string, any>;
  handleUpdateDate: (date: Record<string, string>) => void;
  updateForm: (event: any) => void;
  formAnswers: Record<string, any>;
}

const Form = ({
  handleSubmit,
  availableDates,
  selectedDate,
  handleUpdateDate,
  updateForm,
  formAnswers,
}: FormInterface) => (
  <div>
    <div className="u-margin__top--1">
      <form onSubmit={handleSubmit} className="c-form">
        {/* Date picker */}
        <GridRow modFormField>
          <DatePicker availableDates={availableDates} date={selectedDate} onDateSelected={handleUpdateDate} required />
        </GridRow>

        {/* Name and lastname */}
        <GridRow modFormField>
          <GridElement width={6}>
            <TextField
              label="Förnamn"
              id="firstname"
              onChange={updateForm}
              value={formAnswers.firstname?.value}
              type="text"
              required
            />
          </GridElement>
          <GridElement width={6}>
            <TextField
              label="Efternamn"
              id="lastname"
              onChange={updateForm}
              value={formAnswers.lastname?.value}
              type="text"
              required
            />
          </GridElement>
        </GridRow>

        {/* Email and phone */}
        <GridRow modFormField>
          <GridElement width={6}>
            <TextField
              label="E-post"
              id="email"
              onChange={updateForm}
              value={formAnswers.email?.value}
              type="email"
              required
            />
          </GridElement>
          <GridElement width={6}>
            <TextField label="Telefon" id="phone" onChange={updateForm} value={formAnswers.phone?.value} type="tel" />
          </GridElement>
        </GridRow>

        {/* Comment */}
        <GridRow modFormField>
          <GridElement width={12}>
            <TextField
              label="Övrig information"
              id="comment"
              onChange={updateForm}
              value={formAnswers.comment?.value}
              type="text"
            />
          </GridElement>
        </GridRow>

        {/* Submit button */}
        <GridRow>
          <GridElement width={12}>
            <Button className="u-margin__top--1" type="submit" label="Skicka" />
          </GridElement>
        </GridRow>
      </form>
    </div>
  </div>
);

export default Form;
