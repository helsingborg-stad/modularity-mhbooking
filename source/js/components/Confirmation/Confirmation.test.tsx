import { render } from '@testing-library/react';
import { Confirmation } from '.';

const mockedProps = {
  administratorName: 'Firstname Lastname',
  userEmail: 'user@email.se',
  date: '2022-03-07',
  startTime: '08:00:00+00:00',
  endTime: '09:00:00+00:00',
};

it('renders a title', () => {
  const { container } = render(<Confirmation {...mockedProps} />);

  const element = container.querySelector('p.c-typography__variant--h1');

  expect(element).toHaveTextContent('Tack för din bokning!');
});

it('informs user on who to meet', () => {
  const { getByText } = render(<Confirmation {...mockedProps} />);

  const element = getByText(/Du har bokat tid med Firstname Lastname följande tid:/i);

  expect(element).toBeVisible();
});

it('informs user about time and date', () => {
  const { getByText } = render(<Confirmation {...mockedProps} />);

  const element = getByText(/08:00-09:00 den 2022-03-07/i);

  expect(element).toBeVisible();
});

it('informs user that a confirmation mail has been sent', () => {
  const { getByText } = render(<Confirmation {...mockedProps} />);

  const element = getByText('En bokningsbekräftelse har skickats till user@email.se');

  expect(element).toBeVisible();
});
