import { useEffect, useState, FormEvent } from 'react';
import moment from 'moment';

import { createBooking, getAdministratorDetails, getTimeSlots, getAdministratorsBySharedMailbox } from './api';

import {
  BoxContent,
  Button,
  Confirmation,
  Checkbox,
  DatePicker,
  ErrorList,
  Form,
  GridElement,
  GridRow,
  Loader,
  TextField,
} from './components';

import { TimeSlot, FormData } from './types/BookingTypes';

import { consolidateTimeSlots, buildBookingRequest, roundUpDateToNearestQuarter } from './helpers/BookingHelper';
import { sharedMailbox } from './helpers/AppParameters';

enum StatusType {
  loading,
  ready,
  sending,
  sent,
  error,
}

const coerceError = (error: unknown): Error => {
  return typeof error === 'string' ? new Error(error) : (error as Error);
};

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
};

function App() {
  const [availableDates, setAvailableDates] = useState<Record<string, TimeSlot[]>>({});
  const [selectedDate, setSelectedDate] = useState<{ date: string; timeSlot: TimeSlot }>();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [administratorName, setAdministratorName] = useState<string>('');
  const [status, setStatus] = useState<StatusType>(StatusType.loading);
  const [errors, setErrors] = useState<string[]>([]);

  const onDateSelected = (date: { date: string; timeSlot: TimeSlot }) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setStatus(StatusType.sending);
    if (selectedDate?.timeSlot.emails[0]) {
      const requestData = buildBookingRequest(selectedDate.timeSlot, formData);
      try {
        await createBooking(requestData);
        const administratorDetails = await getAdministratorDetails(requestData.organizationRequiredAttendees[0]);
        setAdministratorName(administratorDetails.DisplayName);
        setStatus(StatusType.sent);
      } catch (error: unknown) {
        setErrors((currentErrors) => [...currentErrors, coerceError(error)?.message]);
        setStatus(StatusType.ready);
      }
    }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailsResponse = await getAdministratorsBySharedMailbox(sharedMailbox);
        const fromDate = moment(roundUpDateToNearestQuarter(new Date())).format();
        const toDate = moment().add(6, 'months').format();
        const timeSlotData = await getTimeSlots(emailsResponse, fromDate, toDate);
        const dates = consolidateTimeSlots(timeSlotData);

        if (Object.keys(dates).length === 0) {
          throw new Error('Det finns inga lediga tider att boka.');
        }

        setAvailableDates(dates);
        setStatus(StatusType.ready);
      } catch (error: unknown) {
        setErrors((state) => [...state, coerceError(error)?.message]);
        setStatus(StatusType.error);
      }
    };
    void fetchData();
  }, []);

  const content: Record<StatusType, JSX.Element> = {
    [StatusType.loading]: <Loader text="Laddar formulär..." />,
    [StatusType.sending]: <Loader text="Skickar..." />,
    [StatusType.sent]: (
      <Confirmation
        administratorName={administratorName}
        userEmail={formData.email.value}
        date={selectedDate?.date}
        startTime={selectedDate?.timeSlot.startTime}
        endTime={selectedDate?.timeSlot.endTime}
      />
    ),
    [StatusType.ready]: (
      <Form handleSubmit={handleSubmit}>
        <ErrorList errors={errors} />

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
              onChange={handleTextFieldChange}
              value={formData.firstname?.value}
              type="text"
              required
            />
          </GridElement>
          <GridElement width={6}>
            <TextField
              label="Efternamn"
              id="lastname"
              onChange={handleTextFieldChange}
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
              onChange={handleTextFieldChange}
              value={formData.email?.value}
              type="email"
              required
            />
          </GridElement>
          <GridElement width={6}>
            <TextField
              label="Telefon"
              id="phone"
              onChange={handleTextFieldChange}
              value={formData.phone?.value}
              type="tel"
            />
          </GridElement>
        </GridRow>

        {/* Comment */}
        <GridRow modFormField>
          <GridElement width={12}>
            <TextField
              label="Övrig information"
              id="comment"
              onChange={handleTextFieldChange}
              value={formData.comment?.value}
              type="text"
            />
          </GridElement>
        </GridRow>

        <GridRow modFormField>
          <GridElement width={12}>
            <Checkbox
              label="Jag vill ansluta till mötet digitalt"
              id="remoteMeeting"
              onChange={handleCheckboxChange}
              checked={formData.remoteMeeting.value}
            />
          </GridElement>
        </GridRow>

        {/* Submit button */}
        <GridRow>
          <GridElement width={12}>
            <Button className="u-margin__top--5" type="submit" label="Skicka" />
          </GridElement>
        </GridRow>
      </Form>
    ),
    [StatusType.error]: <ErrorList errors={errors} />,
  };

  return <BoxContent>{content[status]}</BoxContent>;
}

export default App;
