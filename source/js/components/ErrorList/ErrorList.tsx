import { Notice } from '..';

interface ErrorListProps {
  errors: string[];
}
export const ErrorList = ({ errors }: ErrorListProps) => (
  <div>
    {errors.map((error) => {
      return (
        <div key={error} className="u-margin__top--1">
          <Notice iconName="error" type="info">
            {error}
          </Notice>
        </div>
      );
    })}
  </div>
);
