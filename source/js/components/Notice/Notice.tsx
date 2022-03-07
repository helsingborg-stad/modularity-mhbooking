interface NoticeProps {
  children: React.ReactChild | React.ReactChild[];
  iconName: string;
  type: 'success' | 'info' | 'danger' | 'warning';
}

export const Notice = ({ children, iconName, type = 'info' }: NoticeProps) => (
  <div className={`u-margin__bottom--1 c-notice c-notice--${type}`}>
    <span className="c-notice__icon">
      <i className="c-icon c-icon--size-md material-icons" translate="no" role="img">
        {iconName}
      </i>
    </span>
    <span className="c-notice__message">{children}</span>
  </div>
);
