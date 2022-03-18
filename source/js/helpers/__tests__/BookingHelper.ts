import { TimeSlot, FormData } from '../../types/BookingTypes';
import {
  formatTimePeriod,
  consolidateTimeSlots,
  buildBookingRequest,
  roundUpDateToNearestQuarter,
} from '../BookingHelper';

const formData: FormData = {
  firstname: {
    value: 'firstname',
    name: 'Förnamn',
  },
  lastname: {
    value: 'lastname',
    name: 'Efternamn',
  },
  email: {
    value: 'user@email.com',
    name: 'Email',
  },
  phone: {
    value: '123',
    name: 'Telefon',
  },
  comment: {
    value: 'comment',
    name: 'Övrigt',
  },
  remoteMeeting: {
    value: false,
    name: 'Jag vill ansluta digitalt',
  },
};

describe('formatTimePeriod', () => {
  it('returns time period in hours and minutes', () => {
    const period = formatTimePeriod('2022-03-10', '07:00:00+01:00', '08:00:00+01:00');

    expect(period).toBe('07:00-08:00');
  });
});

describe('consolidateTimeSlots', () => {
  it('merges user timeslots into a common data structure', () => {
    const timeSlots = {
      'email@email.com': {
        '2022-03-16': [
          {
            startTime: '07:00:0000:00',
            endTime: '08:00:0000:00',
          },
        ],
        '2022-03-17': [
          {
            startTime: '07:00:0000:00',
            endTime: '08:00:0000:00',
          },
        ],
      },
      'email2@email.com': {
        '2022-03-16': [
          {
            startTime: '07:00:0000:00',
            endTime: '08:00:0000:00',
          },
        ],
      },
    };

    const period = consolidateTimeSlots(timeSlots);

    expect(period).toEqual({
      '2022-03-16': [
        {
          date: '2022-03-16',
          emails: ['email@email.com', 'email2@email.com'],
          endTime: '08:00:0000:00',
          startTime: '07:00:0000:00',
        },
      ],
      '2022-03-17': [
        {
          date: '2022-03-17',
          emails: ['email@email.com'],
          endTime: '08:00:0000:00',
          startTime: '07:00:0000:00',
        },
      ],
    });
  });
});

describe('buildBookingRequest', () => {
  it('maps formdata to booking request body', () => {
    const timeSlot: TimeSlot = {
      date: '2022-03-17',
      startTime: '07:00:0000:00',
      endTime: '08:00:0000:00',
      emails: ['email@email.com'],
    };

    const bookingRequest = buildBookingRequest(timeSlot, formData);

    expect(bookingRequest).toEqual({
      date: '2022-03-17',
      endTime: '2022-03-17T08:00:0000:00',
      externalRequiredAttendees: ['user@email.com'],
      formData: {
        comment: {
          name: 'Övrigt',
          value: 'comment',
        },
        email: {
          name: 'Email',
          value: 'user@email.com',
        },
        firstname: {
          name: 'Förnamn',
          value: 'firstname',
        },
        lastname: {
          name: 'Efternamn',
          value: 'lastname',
        },
        phone: {
          name: 'Telefon',
          value: '123',
        },
        remoteMeeting: {
          name: 'Jag vill ansluta digitalt',
          value: false,
        },
      },
      organizationRequiredAttendees: ['email@email.com'],
      remoteMeeting: false,
      startTime: '2022-03-17T07:00:0000:00',
      subject: 'Volontärsamtal',
    });
  });
});

describe('roundUpDateToNearestQuarter', () => {
  it.each([
    ['2022-03-18T15:26:00.000Z', '2022-03-18T15:30:00.000Z'],
    ['2022-03-18T15:31:00.000Z', '2022-03-18T15:45:00.000Z'],
    ['2022-03-18T15:46:00.000Z', '2022-03-18T16:00:00.000Z'],
    ['2022-03-18T16:02:00.000Z', '2022-03-18T16:15:00.000Z'],
  ])('rounds up %s to %s', (value, expected) => {
    const dateString = roundUpDateToNearestQuarter(new Date(value)).toISOString();

    expect(dateString).toBe(expected);
  });
});
