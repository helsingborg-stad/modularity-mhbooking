interface GridElementProps {
  children: React.ReactChild | React.ReactChild[];
  width: number;
}
export const GridElement = ({ children, width }: GridElementProps) => (
  <div className={`o-grid-${width}@md`}>{children}</div>
);
