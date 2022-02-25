interface DatePickerInterface {
  availableDates: Record<string, any[]>;
  date: Record<string, any>;
  required: boolean;
  onDateSelected: (date: Record<string, string>) => void;
}

const DatePicker = ({ availableDates, date, required, onDateSelected }: DatePickerInterface) => {
  const { date: selectedDate, time: selectedTime } = date ?? {};
  const dates = Object.keys(availableDates);
  const times = selectedDate ? availableDates[selectedDate] : [];

  const handleDateChange = (event: any) => {
    onDateSelected({ date: event.target.value });
  };

  const handleTimeChange = (event: any) => {
    onDateSelected({ date: selectedDate, time: JSON.parse(event.target.value) });
  };

  const formatTime = (t: any) =>
    `${t.startTime.substring(0, t.startTime.indexOf('+'))}-${t.endTime.substring(0, t.startTime.indexOf('+'))}`;

  return (
    <>
      <div className="o-grid-6@md">
        <div className="form-group">
          <label htmlFor="selectDate">
            Datum
            <br />
          </label>
          <select
            id="selectDate"
            value={selectedDate}
            onChange={handleDateChange}
            className="c-select"
            required={required}>
            <option value={''} key={'default'}>
              Välj datum
            </option>
            {dates.map((dateValue) => (
              <option key={dateValue}>{dateValue}</option>
            ))}
          </select>
          <br />
        </div>
      </div>
      <div className="o-grid-6@md">
        <div className="form-group">
          <label htmlFor="selectTime">
            Tid
            <br />
          </label>
          <select
            id="selectTime"
            value={JSON.stringify(selectedTime)}
            onChange={handleTimeChange}
            className="c-select"
            required={required}>
            <option value={''} key={'default'}>
              Välj tid
            </option>
            {times.map((time) => (
              <option value={JSON.stringify(time)} key={JSON.stringify(time)}>
                {formatTime(time)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
