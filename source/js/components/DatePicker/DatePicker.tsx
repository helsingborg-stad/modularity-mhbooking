import { formatTimePeriod } from '../../helpers/BookingHelper';
import { TimeSlot } from '../../types/BookingTypes';

interface DatePickerInterface {
  availableDates: Record<string, TimeSlot[]>;
  date: { date: string; timeSlot: TimeSlot } | undefined;
  required: boolean;
  onDateSelected: (date: { date: string; timeSlot: TimeSlot }) => void;
}

export const DatePicker = ({ availableDates, date, required, onDateSelected }: DatePickerInterface) => {
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
          <div className="c-select c-select--md c-field">
            <label htmlFor="selectDate">Datum</label>
            <div className="u-position--relative">
              <select id="selectDate" value={selectedDate} onChange={handleDateChange} required={required}>
                <option value={''} key={'default'} className="c-select__option">
                  Välj datum
                </option>
                {dates.map((dateValue) => (
                  <option key={dateValue} className="c-select__option">
                    {dateValue}
                  </option>
                ))}
              </select>
              <i className="c-icon c-select__icon c-icon--size-md material-icons" translate="no" role="img">
                expand_more
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className="o-grid-6@md">
        <div className="form-group">
          <div className="c-select c-select--md c-field">
            <label htmlFor="selectTime">Tid</label>
            <div className="u-position--relative">
              <select
                id="selectTime"
                value={JSON.stringify(selectedTime)}
                onChange={handleTimeChange}
                className="c-select"
                required={required}>
                <option value={''} key={'default'} className="c-select__option">
                  Välj tid
                </option>
                {times.map((time) => (
                  <option value={JSON.stringify(time)} key={JSON.stringify(time)} className="c-select__option">
                    {formatTimePeriod(time.date, time.startTime, time.endTime)}
                  </option>
                ))}
              </select>
              <i className="c-icon c-select__icon c-icon--size-md material-icons" translate="no" role="img">
                expand_more
              </i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
