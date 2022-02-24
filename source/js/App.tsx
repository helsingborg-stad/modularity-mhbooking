import { useEffect, useState, FormEvent } from "react";
import { createBooking, getTimeSlots } from "./services/BookingService";
import { getAdministratorsBySharedMailbox } from "./services/BookablesService";
import moment from "moment";
import { consolidateTimeSlots } from "./helpers/BookingHelper";
import { DatePicker, TextField, Button, Notice } from "./components";

interface GridRowProps {
  children: React.ReactChild | React.ReactChild[];
  modFormField?: boolean;
}
const GridRow = ({ children, modFormField }: GridRowProps) => (
  <div className={`o-grid${modFormField && " mod-form-field"}`}>{children}</div>
);

interface GridElementProps {
  children: React.ReactChild | React.ReactChild[];
  width: number;
}
const GridElement = ({ children, width }: GridElementProps) => (
  <div className={`o-grid-${width}@md`}>{children}</div>
);

interface BoxContentProps {
  children: React.ReactChild | React.ReactChild[];
}
const BoxContent = ({ children }: BoxContentProps) => (
  <div className="box-content modularity-validation mod-form">{children}</div>
);

type StatusType = "loading" | "ready" | "sending" | "sent" | "error";

const coerceError = (error: unknown): Error => {
  return typeof error === "string" ? new Error(error) : (error as Error);
};

function App() {
  const [availableDates, setAvailableDates] = useState<any>(undefined);
  const [selectedDate, setSelectedDate] = useState<any>(undefined);
  const [formAnswers, setFormAnswers] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<StatusType>("loading");
  const [errors, setErrors] = useState<string[]>([]);
  const sharedMailbox = "datatorget_testgrupp@helsingborgdemo.onmicrosoft.com";

  const handleUpdateDate = (date: any) => {
    setSelectedDate(date);
  };

  const formToHTML = (form: any) =>
    form.reduce(
      (prev: string, item: any) => prev + `<p>${item.name}: ${item.value}</p>`,
      ""
    );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const { emails, startTime, endTime, date } = selectedDate.time;
    const startDate = `${date}T${startTime}`;
    const endDate = `${date}T${endTime}`;
    const body = formToHTML(Object.values(formAnswers));
    setStatus("sending");
    try {
      await createBooking(
        [emails[0]],
        startDate,
        endDate,
        undefined,
        undefined,
        "Volontärsamtal",
        undefined,
        body
      );
      setStatus("sent");
    } catch (error: unknown) {
      setErrors([...errors, coerceError(error)?.message]);
      setStatus("ready");
    }
  };

  const updateForm = (event: any) => {
    const { id, value, name } = event.target;
    setFormAnswers({ ...formAnswers, [id]: { value, name } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setStatus("ready");
      } catch (error: unknown) {
        setErrors([...errors, coerceError(error)?.message]);
        setStatus("error");
      }
    };
    void fetchData();
  }, []);

  const content: Record<StatusType, JSX.Element> = {
    loading: <p>Laddar formulär...</p>,
    sending: <p>Skickar...</p>,
    sent: <p>Din bokning har skickats.</p>,
    ready: (
      <div className="u-margin__top--1">
        <div>
          {errors.map((error) => {
            return (
              <Notice key={error} iconName="error" type="danger">
                {error}
              </Notice>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="c-form">
          {/* Date picker */}
          <GridRow modFormField>
            <DatePicker
              availableDates={availableDates}
              date={selectedDate}
              onDateSelected={handleUpdateDate}
              required
            />
          </GridRow>

          {/* Name and lastname */}
          <GridRow modFormField>
            <GridElement width={6}>
              <TextField
                label="Förnamn"
                id="firstname"
                onChange={updateForm}
                value={formAnswers["firstname"]?.value}
                type="text"
                required
              />
            </GridElement>
            <GridElement width={6}>
              <TextField
                label="Efternamn"
                id="lastname"
                onChange={updateForm}
                value={formAnswers["lastname"]?.value}
                type="text"
                required
              />
            </GridElement>
          </GridRow>

          {/* Email and phone */}
          <GridRow modFormField>
            <GridElement width={6}>
              <TextField
                label="E-post"
                id="email"
                onChange={updateForm}
                value={formAnswers["email"]?.value}
                type="email"
                required
              />
            </GridElement>
            <GridElement width={6}>
              <TextField
                label="Telefon"
                id="phone"
                onChange={updateForm}
                value={formAnswers["phone"]?.value}
                type="tel"
              />
            </GridElement>
          </GridRow>

          {/* Comment */}
          <GridRow modFormField>
            <GridElement width={12}>
              <TextField
                label="Övrig information"
                id="comment"
                onChange={updateForm}
                value={formAnswers["comment"]?.value}
                type="text"
              />
            </GridElement>
          </GridRow>

          {/* Submit button */}
          <GridRow>
            <GridElement width={12}>
              <Button
                className="u-margin__top--1"
                type="submit"
                label="Skicka"
              />
            </GridElement>
          </GridRow>
        </form>
      </div>
    ),
    error: (
      <div>
        {errors.map((error) => {
          return (
            <div className="u-margin__top--1">
              <Notice key={error} iconName="error" type="danger">
                {error}
              </Notice>
            </div>
          );
        })}
      </div>
    ),
  };

  return <BoxContent>{content[status]}</BoxContent>;
}

export default App;
