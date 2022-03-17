import { APP_ENDPOINT, APP_SHARED_MAILBOX, APP_SUBJECT, ROOT_ELEMENT_APP_ID } from '../constants';

const getAppParameter = (parameter: string): string => {
  return document.getElementById(ROOT_ELEMENT_APP_ID)?.attributes.getNamedItem(parameter)?.nodeValue ?? '';
};

export const subject = getAppParameter(APP_SUBJECT);
export const baseUrl = getAppParameter(APP_ENDPOINT);
export const sharedMailbox = getAppParameter(APP_SHARED_MAILBOX);
