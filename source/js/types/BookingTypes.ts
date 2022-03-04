export type TimeSpan = {
  startTime: string;
  endTime: string;
};

export type TimeSlot = {
  startTime: string;
  endTime: string;
  emails: string[];
  date: string;
};

export type Administrator = {
  title: string;
  department: string;
  jobTitle: string;
  email: string;
  phone: string;
};

export type BookingItem = {
  date: string;
  time: { startTime: string; endTime: string };
  title: string;
  status: string;
  administrator: Administrator;
  addressLines: string[];
  referenceCode: string;
  body: string;
  id: string;
};

export type GraphData = {
  BookingId: string;
  Subject: string;
  Body: string;
  Location: string;
  ReferenceCode: string;
  StartTime: string;
  EndTime: string;
  Attendees: {
    Email: string;
    Type: string;
    Status: string;
  }[];
};

export type AdministratorDetails = {
  DisplayName: string;
  Email: string;
  Department?: string;
  JobTitle?: string;
};

export type BookingRequest = {
  requiredAttendees: string[];
  startTime: string;
  endTime: string;
  date: string;
  optionalAttendees?: string[];
  referenceCode?: string;
  subject?: string;
  location?: string;
  message?: string;
};

export type FormData = {
  firstname: {
    value: string;
  };
  lastname: {
    value: string;
  };
  email: {
    value: string;
  };
  phone: {
    value: string;
  };
  comment: {
    value: string;
  };
};

export type TimeSlotDataType = Record<string, Record<string, TimeSpan[]>>;
