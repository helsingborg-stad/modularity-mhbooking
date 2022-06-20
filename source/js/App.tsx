import { useEffect, useState, FormEvent } from 'react';
import dayjs from 'dayjs';

import { createBooking, getAdministratorDetails, getTimeSlots, getAdministratorsBySharedMailbox, getUser } from './api';

import {
  BoxContent,
  Button,
  Confirmation,
  DatePicker,
  ErrorList,
  Form,
  GridElement,
  GridRow,
  Loader,
  TextField,
} from './components';

import { TimeSlot } from './types/BookingTypes';

import {
  consolidateTimeSlots,
  buildBookingRequest,
  roundUpDateToNearestQuarter,
  coerceError,
} from './helpers/BookingHelper';
import { sharedMailbox } from './helpers/AppParameters';
import { useBookingForm } from './hooks/BookingForm';

enum StatusType {
  loading,
  ready,
  sending,
  sent,
  error,
}

function App() {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusType>(StatusType.loading);
  const [administratorName, setAdministratorName] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<Record<string, TimeSlot[]>>({});
  const { formData, handleDateChange, handleTextFieldChange } = useBookingForm();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setStatus(StatusType.sending);
    const requestData = buildBookingRequest(formData);
    try {
      await createBooking(requestData);
      const administratorDetails = await getAdministratorDetails(requestData.organizationRequiredAttendees[0]);
      setAdministratorName(administratorDetails.DisplayName);
      setStatus(StatusType.sent);
    } catch (error: unknown) {
      setErrors((currentErrors) => [...currentErrors, coerceError(error)?.message]);
      setStatus(StatusType.ready);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailsResponse = await getAdministratorsBySharedMailbox(sharedMailbox);
        const now = roundUpDateToNearestQuarter(new Date());
        const fromDate = dayjs(now).format();
        const toDate = dayjs(now).add(6, 'months').format();
        const timeSlotData = await getTimeSlots(emailsResponse, fromDate, toDate);
        const dates = consolidateTimeSlots(timeSlotData);
        const { email, mobilePhone, firstName, lastName } = await getUser();

        formData.firstname.value = firstName;
        formData.lastname.value = lastName;
        formData.email.value = email;
        formData.phone.value = mobilePhone;

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
  }, [formData.email, formData.firstname, formData.lastname, formData.phone]);

  const content: Record<StatusType, JSX.Element> = {
    [StatusType.loading]: <Loader text="Laddar formulär..." />,
    [StatusType.sending]: <Loader text="Skickar..." />,
    [StatusType.sent]: (
      <Confirmation
        administratorName={administratorName}
        userEmail={formData.email.value}
        date={formData.date.value}
        startTime={formData.timeSlot?.startTime}
        endTime={formData.timeSlot?.endTime}
      />
    ),
    [StatusType.ready]: (
      <Form handleSubmit={handleSubmit}>
        <ErrorList errors={errors} />

        {/* Date picker */}
        <GridRow modFormField>
          <DatePicker
            availableDates={availableDates}
            value={{ date: formData.date.value, timeSlot: formData.timeSlot }}
            onDateSelected={handleDateChange}
            required
          />
        </GridRow>

        {/* Comment */}
        <GridRow modFormField>
          <GridElement width={12}>
            <TextField
              label="Kommentar"
              id="comment"
              onChange={handleTextFieldChange}
              value={formData.comment?.value}
              type="text"
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
