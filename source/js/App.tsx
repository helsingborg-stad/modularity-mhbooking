import { useEffect, useState } from 'react';
import { createBooking, getTimeSlots } from './services/BookingService';
import { getAdministratorsBySharedMailbox } from './services/BookablesService';
import moment from 'moment';
import { consolidateTimeSlots } from './helpers/BookingHelper';
import {DatePicker, TextField, Button} from './components'; 

interface GridRowProps { children: React.ReactChild | React.ReactChild[]; modFormField?: boolean; }
const GridRow = ({children, modFormField}: GridRowProps) => <div className={`o-grid${modFormField && ' mod-form-field'}`}>{children}</div>

interface GridElementProps { children: React.ReactChild | React.ReactChild[]; width: number; }
const GridElement = ({children, width}: GridElementProps) => <div className={`o-grid-${width}@md`}>{children}</div>

interface BoxContentProps { children: React.ReactChild | React.ReactChild[]; }
const BoxContent = ({children}: BoxContentProps) => <div className='box-content modularity-validation mod-form'>{children}</div>

type StatusType = 'loading' | 'ready' | 'sending' | 'sent';

function App() {
  const [availableDates, setAvailableDates] = useState<any>(undefined);
  const [selectedDate, setSelectedDate] = useState<any>(undefined);
  const [formAnswers, setFormAnswers] = useState<Record<string,any>>({});
  const [status, setStatus] = useState<StatusType>('loading');
  const sharedMailbox = "datatorget_testgrupp@helsingborgdemo.onmicrosoft.com";

  const handleUpdateDate = (date: any) => {
    setSelectedDate(date);
  }

  const formToHTML = (form: any) => form.reduce((prev: string, item: any) => prev + `<p>${item.name}: ${item.value}</p>`, '');

  const handleSubmit = async () => {
    console.log(selectedDate.time);
    const {emails, startTime, endTime, date} = selectedDate.time;
    const startDate = `${date}T${startTime}`;
    const endDate = `${date}T${endTime}`;
    const body = formToHTML(Object.values(formAnswers));
    setStatus('sending');
    try {
      await createBooking(
        [emails[0]],
        startDate,
        endDate,
        undefined,
        undefined,
        'Volontärsamtal',
        undefined,
        body
      ); 
      setStatus('sent');
    } catch (error) {
      console.log(error);
      setStatus('ready');
    }
  }

  const updateForm = (event: any) => {
    const { id, value, name } = event.target;
    setFormAnswers({...formAnswers, [id]: {value, name}});
  }

  useEffect(() => {
    const fetchData = async () => {
      const emailsResponse = await getAdministratorsBySharedMailbox(
        sharedMailbox
      );
      const timeSlotData = await getTimeSlots(
        emailsResponse,
        moment().format(),
        moment().add(6, "months").format()
      );
      const dates = consolidateTimeSlots(timeSlotData);
      setAvailableDates(dates);
      setStatus('ready');
    };
    void fetchData();
  }, []);

  const content: Record<StatusType, JSX.Element> = {
    'loading': (<p>Laddar formulär...</p>),
    'sending': (<p>Skickar...</p>),
    'sent': (<p>Din bokning har skickats.</p>),
    'ready': (
      <>
        {/* Date picker */}
        <GridRow modFormField>
          <DatePicker availableDates={availableDates} date={selectedDate} onDateSelected={handleUpdateDate}/>
        </GridRow>

        {/* Name and lastname */}
        <GridRow modFormField>
          <GridElement width={6}>
            <TextField label='Förnamn' id="firstname" onChange={updateForm} value={formAnswers["firstname"]?.value} />
          </GridElement>
          <GridElement width={6}>
            <TextField label='Efternamn' id="lastname" onChange={updateForm} value={formAnswers["lastname"]?.value} />
          </GridElement>
        </GridRow>

        {/* Email and phone */}
        <GridRow modFormField>
          <GridElement width={6}>
            <TextField label='E-post' id="email" onChange={updateForm} value={formAnswers["email"]?.value} />
          </GridElement>
          <GridElement width={6}>
            <TextField label='Telefon' id="phone" onChange={updateForm} value={formAnswers["phone"]?.value} />
          </GridElement>
        </GridRow>

        {/* Comment */}
        <GridRow modFormField>
          <GridElement width={12}>
            <TextField label='Övrig information' id="comment" onChange={updateForm} value={formAnswers["comment"]?.value} />
          </GridElement>
        </GridRow>

        {/* Submit button */}
        <GridRow>
          <GridElement width={12}>
            <Button onClick={handleSubmit} label='Skicka' />
          </GridElement>
        </GridRow>
      </>),
  }

  return (
    <BoxContent>
      {content[status]}
    </BoxContent>
  );
}

export default App;
