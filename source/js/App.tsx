import { useEffect, useState, FormEvent } from 'react';
import { createBooking, getTimeSlots } from './services/BookingService';
import { getAdministratorsBySharedMailbox } from './services/BookablesService';
import moment from 'moment';
import { consolidateTimeSlots } from './helpers/BookingHelper';
import { Confirmation, ErrorList, Form, Loader } from './components';
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

function App() {
  const [availableDates, setAvailableDates] = useState<any>(undefined);
  const [selectedDate, setSelectedDate] = useState<any>(undefined);
  const [formAnswers, setFormAnswers] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<StatusType>('loading');
  const [errors, setErrors] = useState<string[]>([]);
  const sharedMailbox = 'datatorget_testgrupp@helsingborgdemo.onmicrosoft.com';

  const handleUpdateDate = (date: any) => {
    setSelectedDate(date);
  };

  const formToHTML = (form: any) =>
    form.reduce((prev: string, item: any) => prev + `<p>${item.name}: ${item.value}</p>`, '');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const { emails, startTime, endTime, date } = selectedDate.time;
    const startDate = `${date}T${startTime}`;
    const endDate = `${date}T${endTime}`;
    const body = formToHTML(Object.values(formAnswers));
    setStatus('sending');
    try {
      await createBooking([emails[0]], startDate, endDate, undefined, undefined, 'Volontärsamtal', undefined, body);
      setStatus('sent');
    } catch (error: unknown) {
      setErrors([...errors, coerceError(error)?.message]);
      setStatus('ready');
    }
  };

  const updateForm = (event: any) => {
    const { id, value, name } = event.target;
    setFormAnswers({ ...formAnswers, [id]: { value, name } });
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
    sent: <Confirmation text="Din bokning har skickats" />,
    ready: (
      <>
        <ErrorList errors={errors} />
        <Form
          availableDates={availableDates}
          formAnswers={formAnswers}
          handleSubmit={handleSubmit}
          handleUpdateDate={handleUpdateDate}
          selectedDate={selectedDate}
          updateForm={updateForm}
        />
      </>
    ),
    error: <ErrorList errors={errors} />,
  };

  return <BoxContent>{content[status]}</BoxContent>;
}

export default App;
