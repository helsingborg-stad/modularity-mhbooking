import { useEffect, useState } from 'react';
import { createBooking, getTimeSlots } from './services/BookingService';
import DatePicker from './DatePicker';
import { getAdministratorsBySharedMailbox } from './services/BookablesService';
import moment from 'moment';
import { consolidateTimeSlots } from './helpers/BookingHelper';

interface TextFieldInterface {
  onChange: (event: any) => void;
  value: string;
  id: string;
  label: string;
}
const TextField = ({ onChange, value, id, label }: TextFieldInterface) => 
<div className='c-field'>
  <label className='c-field__text--label'>
    {label}:
    <input type="text" id={id} name={label} onChange={onChange} value={value ?? ''}/><br/>
  </label>
</div>

function App() {
  const [availableDates, setAvailableDates] = useState<any>(undefined);
  const [selectedDate, setSelectedDate] = useState<any>(undefined);
  const [form, setForm] = useState<Record<string,any>>({});
  const [status, setStatus] = useState<string>('loading');
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
    const body = formToHTML(Object.values(form));
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
    setForm({...form, [id]: {value, name}});
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

  return (
    <div className="App">
      <link rel="stylesheet" id="styleguide-css" type="text/css"
            href="http://v2.styleguide.helsingborg.se/assets/dist/css/styleguide-css.min.css"
            media="all"></link>
      {status === 'loading' && (
        <p>
          Laddar formulär...
        </p>
      )}
      {status === 'ready' && (
        <div>
          <DatePicker availableDates={availableDates} date={selectedDate} onDateSelected={handleUpdateDate}/>
          <TextField label='Förnamn' id="firstname" onChange={updateForm} value={form["firstname"]?.value} />
          <TextField label='Efternamn' id="lastname" onChange={updateForm} value={form["lastname"]?.value} />
          <TextField label='Telefon' id="phone" onChange={updateForm} value={form["phone"]?.value} />
          <TextField label='E-post' id="email" onChange={updateForm} value={form["email"]?.value} />
          <TextField label='Övrig information' id="comment" onChange={updateForm} value={form["comment"]?.value} />
          <button 
            onClick={handleSubmit} 
            className="c-button c-button__filled c-button__filled--primary c-button--md ripple ripple--before">
            <span className="c-button__label">
              <span className="c-button__label-text">
                Skicka
              </span>
            </span>
          </button>
        </div>
      )}
      {status === 'sending' && (
        <p>
          Skickar...
        </p>
      )}
      {status === 'sent' && (
        <p>
          Din bokning har skickats.
        </p>
      )}
    </div>
  );
}

export default App;
