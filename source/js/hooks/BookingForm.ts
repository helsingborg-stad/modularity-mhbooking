import { useState } from 'react';

import { TimeSlot, FormData } from '../types/BookingTypes';

const initialFormData: FormData = {
  firstname: {
    value: '',
  },
  lastname: {
    value: '',
  },
  email: {
    value: '',
  },
  phone: {
    value: '',
  },
  comment: {
    value: '',
  },
  remoteMeeting: {
    value: false,
  },
  date: {
    value: '',
  },
};

export function useBookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleDateChange = ({ date, timeSlot }: { date: string; timeSlot: TimeSlot }) => {
    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        date: { value: date },
        timeSlot,
      };
    });
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = event.target;
    setFormData((currentFormData) => {
      return { ...currentFormData, [id]: { value, name } };
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked, name } = event.target;
    setFormData((currentFormData) => {
      return { ...currentFormData, [id]: { value: checked, name } };
    });
  };

  return {
    formData,
    handleDateChange,
    handleCheckboxChange,
    handleTextFieldChange,
  };
}
