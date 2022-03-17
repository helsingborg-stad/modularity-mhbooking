import { formatTimePeriod } from '../../helpers/BookingHelper';
import { TimeSlot } from '../../types/BookingTypes';
import { Select } from '../';

interface DatePickerInterface {
  availableDates: Record<string, TimeSlot[]>;
  date: { date: string; timeSlot: TimeSlot } | undefined;
  required: boolean;
  onDateSelected: (date: { date: string; timeSlot: TimeSlot }) => void;
}

export const DatePicker = ({ availableDates, date, required, onDateSelected }: DatePickerInterface) => {
  const { date: selectedDate, timeSlot: selectedTime } = date ?? { date: '' };

  const dates = Object.keys(availableDates).map((value) => ({ value, label: value }));

  const times = (selectedDate ? availableDates[selectedDate] : []).map((timeslot) => ({
    value: JSON.stringify(timeslot),
    label: formatTimePeriod(timeslot.date, timeslot.startTime, timeslot.endTime),
  }));

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
          <Select
            value={selectedDate}
            id="selectDate"
            label="Datum"
            options={[{ label: 'Välj datum', value: '' }, ...dates]}
            required={required}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="o-grid-6@md">
        <div className="form-group">
          <Select
            value={JSON.stringify(selectedTime)}
            id="selectTime"
            label="Tid"
            options={[{ label: 'Välj tid', value: '' }, ...times]}
            required={required}
            onChange={handleTimeChange}
          />
        </div>
      </div>
    </>
  );
};
