import moment from 'moment';
import { AdministratorDetails, BookingItem, BookingRequest, TimeSlotDataType } from '../types/BookingTypes';
import { convertGraphDataToBookingItem } from '../helpers/BookingHelper';
import { get, patch, post, remove } from '../helpers/ApiRequest';
import { subject } from '../helpers/AppParameters';

type BookableItem = {
  name: string;
  sharedMailbox: string;
  address: string;
  formId: string;
};

const defaultErrorMessage = 'Något gick fel.';

const getBooking = async (bookingId: string): Promise<Record<string, unknown>> => {
  const response = await get(`/booking/${encodeURIComponent(bookingId)}`);
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const success = response?.data?.data?.attributes;
  if (success) return success;
  throw new Error(defaultErrorMessage);
};

const createBooking = async (body: BookingRequest): Promise<Record<string, unknown>> => {
  const response = await post('/booking', body);
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const booked = response?.data?.data;
  if (booked) return booked;
  throw new Error(defaultErrorMessage);
};

const cancelBooking = async (bookingId: string): Promise<Record<string, unknown>> => {
  const response = await remove(`/booking/${encodeURIComponent(bookingId)}`);
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const success = response?.data?.data;
  if (success) return success;
  throw new Error(defaultErrorMessage);
};

const updateBooking = async (
  bookingId: string,
  requiredAttendees: string[],
  startTime: string,
  endTime: string,
  optionalAttendees?: string[],
  referenceCode?: string,
  location?: string,
  message?: string,
): Promise<Record<string, unknown>> => {
  const body = {
    requiredAttendees,
    startTime: moment(startTime).format(),
    endTime: moment(endTime).format(),
    optionalAttendees,
    referenceCode,
    location,
    body: `Du har fått en bokning ifrån Mitt Helsingborg. Klicka på Acceptera för att bekräfta bokningen.\n\n${message}`,
    subject: subject,
  };

  const response = await patch(`/booking/${encodeURIComponent(bookingId)}`, body);
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const booked = response?.data?.data;
  if (booked) return booked;
  throw new Error('updateBooking: Response does not contain data.data');
};

const searchBookings = async (referenceCode: string, startTime: string, endTime: string): Promise<BookingItem[]> => {
  const response = await post(`/booking/search`, {
    referenceCode,
    startTime,
    endTime,
  });
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const bookings = response?.data?.data?.attributes;
  if (!bookings) {
    throw new Error('searchBookings: Response does not contain data.data.attributes');
  }

  return bookings.map(convertGraphDataToBookingItem).filter((item: BookingItem) => item.status !== 'Declined');
};

const getHistoricalAttendees = async (referenceCode: string, startTime: string, endTime: string): Promise<string[]> => {
  const response = await get(`/booking/getHistoricalAttendees/${referenceCode}`, undefined, { startTime, endTime });
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const timeSlots = response?.data?.data?.attributes;
  if (timeSlots) return timeSlots;
  throw new Error(defaultErrorMessage);
};

const getTimeSlots = async (attendees: string[], startTime: string, endTime: string): Promise<TimeSlotDataType> => {
  const response = await get(`/booking/getTimeSlots`, undefined, {
    attendees: JSON.stringify(attendees),
    startTime,
    endTime,
  });

  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const timeSlots = response?.data?.data;
  if (timeSlots) return timeSlots;
  throw new Error(defaultErrorMessage);
};

const getAdministratorDetails = async (email: string): Promise<AdministratorDetails> => {
  const response = await get(`/booking/getAdministratorDetails/${email}`);
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }

  const success = response?.data?.data?.attributes;
  if (success) return success;
  throw new Error(defaultErrorMessage);
};

const getBookables = async (): Promise<BookableItem[]> => {
  const response = await get('/bookables');
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }
  const bookables = response?.data?.data as BookableItem[];
  if (bookables) return bookables;
  throw new Error(defaultErrorMessage);
};

const getAdministratorsBySharedMailbox = async (sharedMailbox: string): Promise<string[]> => {
  const response = await get(`/bookables/getAdministratorsByEmail/${sharedMailbox}`);
  if (response?.status !== 200) {
    throw new Error(response?.data.data.detail || defaultErrorMessage);
  }
  const admins = response?.data?.data?.attributes;
  if (admins) return admins;
  throw new Error(defaultErrorMessage);
};

export {
  getBooking,
  createBooking,
  cancelBooking,
  updateBooking,
  searchBookings,
  getHistoricalAttendees,
  getTimeSlots,
  getAdministratorDetails,
  getBookables,
  getAdministratorsBySharedMailbox,
};
