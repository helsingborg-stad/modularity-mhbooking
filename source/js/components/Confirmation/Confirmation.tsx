import { formatTimePeriod } from '../../helpers/BookingHelper';

export interface ConfirmationInterface {
  administratorName: string;
  userEmail: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}
export const Confirmation = ({
  administratorName,
  userEmail,
  date = '',
  startTime = '',
  endTime = '',
}: ConfirmationInterface) => (
  <div>
    <p className="c-typography c-typography__variant--h1">Tack för din bokning!</p>
    <p>Du har bokat tid med {administratorName} följande tid:</p>
    <p>
      {formatTimePeriod(date, startTime, endTime)} den {date}
    </p>
    <p>En bokningsbekräftelse har skickats till {userEmail}</p>
  </div>
);
