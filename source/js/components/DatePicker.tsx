import { formatTimePeriod } from '../helpers/BookingHelper';
import { TimeSlot } from '../types/BookingTypes';

interface DatePickerInterface {
  availableDates: Record<string, TimeSlot[]>;
  date: { date: string; timeSlot: TimeSlot } | undefined;
  required: boolean;
  onDateSelected: (date: { date: string; timeSlot: TimeSlot }) => void;
}

const DatePicker = ({ availableDates, date, required, onDateSelected }: DatePickerInterface) => {
  const { date: selectedDate, timeSlot: selectedTime } = date ?? {};
  const dates = Object.keys(availableDates);
  const times = selectedDate ? availableDates[selectedDate] : [];

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onDateSelected({ date: event.target.value, timeSlot: { date: '', emails: [], endTime: '', startTime: '' } });
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDate) {
      onDateSelected({ date: selectedDate, timeSlot: JSON.parse(event.target.value) });
    }
  };

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
                {formatTimePeriod(time.date, time.startTime, time.endTime)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
