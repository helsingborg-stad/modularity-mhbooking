import { useEffect, useState, FormEvent } from 'react';
import moment from 'moment';

import { buildBookingRequest, createBooking, getAdministratorDetails, getTimeSlots } from './services/BookingService';
import { getAdministratorsBySharedMailbox } from './services/BookablesService';

import {
  Button,
  Confirmation,
  ConfirmationInterface,
  DatePicker,
  ErrorList,
  Form,
  GridElement,
  GridRow,
  Loader,
  TextField,
} from './components';

import { TimeSlot, FormData } from './types/BookingTypes';

import { consolidateTimeSlots } from './helpers/BookingHelper';

interface BoxContentProps {
  children: React.ReactChild | React.ReactChild[];
}
const BoxContent = ({ children }: BoxContentProps) => (
  <div className="box-content modularity-validation mod-form">{children}</div>
);

type StatusType = 'loading' | 'ready' | 'sending' | 'sent' | 'error';

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
};

function App() {
  const [availableDates, setAvailableDates] = useState<Record<string, TimeSlot[]>>({});
  const [selectedDate, setSelectedDate] = useState<{ date: string; timeSlot: TimeSlot }>();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [confirmationData, setConfirmationData] = useState<ConfirmationInterface>();
  const [status, setStatus] = useState<StatusType>('loading');
  const [errors, setErrors] = useState<string[]>([]);
  const sharedMailbox = 'datatorget_testgrupp@helsingborgdemo.onmicrosoft.com';

  const onDateSelected = (date: { date: string; timeSlot: TimeSlot }) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setStatus('sending');
    if (selectedDate?.timeSlot.emails[0]) {
      const requestData = buildBookingRequest(selectedDate.timeSlot, formData);
      try {
        await createBooking(requestData);
        const administratorDetails = await getAdministratorDetails(selectedDate.timeSlot.emails[0]);
        setConfirmationData({
          administratorName: administratorDetails.DisplayName,
          userEmail: formData.email.value,
          date: selectedDate.date,
          startTime: selectedDate.timeSlot.startTime,
          endTime: selectedDate.timeSlot.endTime,
        });
        setStatus('sent');
      } catch (error: unknown) {
        setErrors((currentErrors) => [...currentErrors, coerceError(error)?.message]);
        setStatus('ready');
      }
    }
  };

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = event.target;
    setFormData((currentFormData) => {
      return { ...currentFormData, [id]: { value, name } };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailsResponse = await getAdministratorsBySharedMailbox(sharedMailbox);
        const timeSlotData = await getTimeSlots(emailsResponse, moment().format(), moment().add(6, 'months').format());
        const dates = consolidateTimeSlots(timeSlotData);
        setAvailableDates(dates);
        setStatus('ready');
      } catch (error: unknown) {
        setErrors((state) => [...state, coerceError(error)?.message]);
        setStatus('error');
      }
    };
    void fetchData();
  }, []);

  const content: Record<StatusType, JSX.Element> = {
    loading: <Loader text="Laddar formulär..." />,
    sending: <Loader text="Skickar..." />,
    sent: <Confirmation {...confirmationData!} />,
    ready: (
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
            <Button className="u-margin__top--2" type="submit" label="Skicka" />
          </GridElement>
        </GridRow>
      </Form>
    ),
    error: <ErrorList errors={errors} />,
  };

  return <BoxContent>{content[status]}</BoxContent>;
}

export default App;
