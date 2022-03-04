export interface ConfirmationInterface {
  administratorName: string;
  userEmail: string;
  date: string;
  startTime: string;
  endTime: string;
}
const Confirmation = ({ administratorName, userEmail, date, startTime, endTime }: ConfirmationInterface) => (
  <div>
    <p className="c-typography__variant--h1">Tack för din bokning!</p>
    <p>Du har bokat tid med {administratorName} följande tid:</p>
    <p>
      {startTime.substring(0, 5)} - {endTime.substring(0, 5)} den {date}
    </p>
    <p>En bokningsbekräftelse har skickats till {userEmail}</p>
  </div>
);

export default Confirmation;
