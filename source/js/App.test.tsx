import { render, waitFor } from '@testing-library/react';
import App from './App';
import { getTimeSlots } from './services/BookingService';
import { getAdministratorsBySharedMailbox } from './services/BookablesService';

jest.mock('./services/BookingService');
jest.mock('./services/BookablesService');

const mockedGetTimeSlots = jest.mocked(getTimeSlots);
const mockedAdministratorsBySharedMailbox = jest.mocked(getAdministratorsBySharedMailbox);

it('shows a error if there are no available times', async () => {
  mockedGetTimeSlots.mockResolvedValueOnce({
    'mail@mail': {},
  });
  mockedAdministratorsBySharedMailbox.mockResolvedValueOnce(['mail@mail']);

  const { getByText } = render(<App />);
  const error = await waitFor(() => getByText(/Det finns inga lediga tider att boka/i));

  expect(error).toBeVisible();
});
