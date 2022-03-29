import { renderHook, act } from '@testing-library/react-hooks';
import { useBookingForm } from '../BookingForm';

it('shall have a inital empty state', () => {
  const { result } = renderHook(() => useBookingForm());

  expect(result.current.formData).toEqual({
    firstname: {
      value: '',
    },
    lastname: {
      value: '',
    },
    email: {
      value: '',
    },
    phone: {
      value: '',
    },
    comment: {
      value: '',
    },
    remoteMeeting: {
      value: false,
    },
    date: {
      value: '',
    },
  });
});

it('updates date & timeSlot state when calling handleDateChange', () => {
  const { result } = renderHook(() => useBookingForm());

  act(() => {
    result.current.handleDateChange({
      date: '2022-03-29',
      timeSlot: {
        date: '2022-03-29',
        emails: ['email@email.com'],
        endTime: '09:00',
        startTime: '08:00',
      },
    });
  });

  expect(result.current.formData).toEqual(expect.objectContaining({ date: { value: '2022-03-29' } }));
  expect(result.current.formData).toEqual(
    expect.objectContaining({
      timeSlot: { date: '2022-03-29', emails: ['email@email.com'], endTime: '09:00', startTime: '08:00' },
    }),
  );
});

it('updates state when calling handleTextFieldChange', () => {
  const { result } = renderHook(() => useBookingForm());

  act(() => {
    result.current.handleTextFieldChange({
      target: {
        id: 'firstname',
        value: 'Example',
        name: 'Name',
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.formData).toEqual(expect.objectContaining({ firstname: { value: 'Example', name: 'Name' } }));
});

it('updates state when calling handleCheckboxChange', () => {
  const { result } = renderHook(() => useBookingForm());

  act(() => {
    result.current.handleCheckboxChange({
      target: {
        id: 'remoteMeeting',
        checked: true,
        name: 'Connect remote',
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.formData).toEqual(
    expect.objectContaining({ remoteMeeting: { value: true, name: 'Connect remote' } }),
  );
});
