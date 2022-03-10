import { formatTimePeriod } from '../BookingHelper';

it('returns time period in hours and minutes', () => {
  const period = formatTimePeriod('2022-03-10', '07:00:00+01:00', '08:00:00+01:00');

  expect(period).toBe('07:00-08:00');
});
