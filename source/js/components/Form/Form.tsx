import { FormEventHandler } from 'react';

interface FormInterface {
  children: React.ReactChild | React.ReactChild[];
  handleSubmit: FormEventHandler<HTMLFormElement>;
}
export const Form = ({ handleSubmit, children }: FormInterface) => (
  <div className="u-margin__top--1">
    <form onSubmit={handleSubmit} className="c-form">
      {children}
    </form>
  </div>
);
