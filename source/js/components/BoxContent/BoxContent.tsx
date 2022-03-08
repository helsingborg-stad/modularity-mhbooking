interface BoxContentProps {
  children: React.ReactChild | React.ReactChild[];
}
export const BoxContent = ({ children }: BoxContentProps) => (
  <div className="box-content modularity-validation mod-form">{children}</div>
);
