import { Notice } from '.';

interface ErrorListProps {
  errors: string[];
}
const ErrorList = ({ errors }: ErrorListProps) => (
  <div>
    {errors.map((error) => {
      return (
        <div className="u-margin__top--1">
          <Notice key={error} iconName="error" type="danger">
            {error}
          </Notice>
        </div>
      );
    })}
  </div>
);

export default ErrorList;
