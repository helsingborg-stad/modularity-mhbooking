import { TimeSlot, FormData } from '../../types/BookingTypes';
import { buildBookingRequest } from '../BookingService';

const timeSlotMock: TimeSlot = {
  startTime: '07:00:00',
  endTime: '08:00:00',
  emails: ['test@test.se'],
  date: '2022-03-09',
};

const formDataMock = (): FormData => {
  return {
    firstname: {
      value: 'Test',
      name: 'Förnamn',
    },
    lastname: {
      value: 'Test',
      name: 'Efternamn',
    },
    email: {
      value: 'user@test.se',
      name: 'Email',
    },
    phone: {
      value: '123456',
      name: 'Telefon',
    },
    comment: {
      value: 'No comment',
      name: 'Övrigt',
    },
    remoteMeeting: {
      value: false,
      name: 'Jag vill ansluta digitalt',
    },
  };
};

describe('buildBookingRequest ', () => {
  it('transforms remoteMeeting value to "Nej" when given false', () => {
    const formData = formDataMock();
    formData.remoteMeeting.value = false;

    const requestData = buildBookingRequest(timeSlotMock, formData);

    expect(requestData.body).toEqual(
      '<body><p>Du har fått en bokning. Klicka på Acceptera för att bekräfta bokningen.</p><p>Förnamn: Test</p><p>Efternamn: Test</p><p>Email: user@test.se</p><p>Telefon: 123456</p><p>Övrigt: No comment</p><p>Jag vill ansluta digitalt: Nej</p></body>',
    );
  });

  it('transforms remoteMeeting value to "Ja" when given true', () => {
    const formData = formDataMock();
    formData.remoteMeeting.value = true;

    const requestData = buildBookingRequest(timeSlotMock, formData);

    expect(requestData.body).toEqual(
      '<body><p>Du har fått en bokning. Klicka på Acceptera för att bekräfta bokningen.</p><p>Förnamn: Test</p><p>Efternamn: Test</p><p>Email: user@test.se</p><p>Telefon: 123456</p><p>Övrigt: No comment</p><p>Jag vill ansluta digitalt: Ja</p></body>',
    );
  });

  it('does not include value in body when name is undefined', () => {
    const formData = formDataMock();
    formData.comment.name = undefined;

    const requestData = buildBookingRequest(timeSlotMock, formData);

    expect(requestData.body).toEqual(
      '<body><p>Du har fått en bokning. Klicka på Acceptera för att bekräfta bokningen.</p><p>Förnamn: Test</p><p>Efternamn: Test</p><p>Email: user@test.se</p><p>Telefon: 123456</p><p>Jag vill ansluta digitalt: Nej</p></body>',
    );
  });
});
