interface ConfirmationInterface {
  text: string;
}
const Confirmation = ({ text }: ConfirmationInterface) => (
  <div>
    <p>{text}</p>
  </div>
);

export default Confirmation;
