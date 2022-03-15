import { render, waitFor } from '@testing-library/react';
import App from './App';
import { getTimeSlots, getAdministratorsBySharedMailbox } from './api';

jest.mock('./api');

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
