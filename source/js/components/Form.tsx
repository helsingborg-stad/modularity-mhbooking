import { FormEventHandler } from 'react';

import { Button, DatePicker, GridElement, GridRow, TextField } from '.';

import { TimeSlot, FormData } from '../types/BookingTypes';

interface FormInterface {
  availableDates: Record<string, TimeSlot[]>;
  selectedDate: { date: string; timeSlot: TimeSlot } | undefined;
  formData: FormData;
  onDateSelected: (date: { date: string; timeSlot: TimeSlot }) => void;
  updateForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}
const Form = ({ handleSubmit, availableDates, selectedDate, onDateSelected, updateForm, formData }: FormInterface) => (
  <div className="u-margin__top--1">
    <form onSubmit={handleSubmit} className="c-form">
      {/* Date picker */}
      <GridRow modFormField>
        <DatePicker availableDates={availableDates} date={selectedDate} onDateSelected={onDateSelected} required />
      </GridRow>

      {/* Name and lastname */}
      <GridRow modFormField>
        <GridElement width={6}>
          <TextField
            label="Förnamn"
            id="firstname"
            onChange={updateForm}
            value={formData.firstname?.value}
            type="text"
            required
          />
        </GridElement>
        <GridElement width={6}>
          <TextField
            label="Efternamn"
            id="lastname"
            onChange={updateForm}
            value={formData.lastname?.value}
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
            value={formData.email?.value}
            type="email"
            required
          />
        </GridElement>
        <GridElement width={6}>
          <TextField label="Telefon" id="phone" onChange={updateForm} value={formData.phone?.value} type="tel" />
        </GridElement>
      </GridRow>

      {/* Comment */}
      <GridRow modFormField>
        <GridElement width={12}>
          <TextField
            label="Övrig information"
            id="comment"
            onChange={updateForm}
            value={formData.comment?.value}
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
);

export default Form;
