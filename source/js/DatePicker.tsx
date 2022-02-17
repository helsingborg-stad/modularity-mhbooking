interface DatePickerInterface {
  availableDates: Record<string, any[]>;
  date: Record<string, any>;
  onDateSelected: (date: Record<string, string>) => void;
}

const DatePicker = ({ availableDates, date, onDateSelected }: DatePickerInterface) => {
  const { date: selectedDate, time: selectedTime } = date ?? {};
  const dates = Object.keys(availableDates);
  const times = selectedDate ? availableDates[selectedDate] : [];

  const handleDateChange = (event: any) => {
    onDateSelected({ date: event.target.value });
  }

  const handleTimeChange = (event: any) => {
    onDateSelected({ date: selectedDate, time: JSON.parse(event.target.value) });
  }

  const formatTime = (t: any) => `${t.startTime.substring(0, t.startTime.indexOf("+"))}-${t.endTime.substring(0, t.startTime.indexOf("+"))}`
  
  return (
    <div className="c-dropdown">
      <label className='c-field__text--label'>
        Datum:<br/>
      </label>
      <select value={selectedDate} onChange={handleDateChange}>
        <option value={""} key={'default'}>Välj datum</option>
        {dates.map((date) => <option key={date}>{date}</option>)}
      </select>
      <br />
      <label className='c-field__text--label'>
        Tid:<br/>
      </label>
      <select value={JSON.stringify(selectedTime)} onChange={handleTimeChange}>
        <option value={""} key={'default'}>Välj tid</option>
        {times.map((time) => <option value={JSON.stringify(time)} key={JSON.stringify(time)}>{formatTime(time)}</option>)}
      </select>
    </div>
  );
}

export default DatePicker;
