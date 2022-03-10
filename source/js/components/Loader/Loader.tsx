interface LoaderProps {
  text: string;
}
export const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="u-display--flex u-flex-direction--column u-align-items--center u-padding__top--10 u-padding__bottom--10">
      <div
        className="c-loader c-loader__circular--color--black c-loader__circular c-loader__circular--md"
        aria-busy="true"
        role="progressbar"></div>
      <p className="u-margin__top--5">{text}</p>
    </div>
  );
};
