interface GridElementProps {
  children: React.ReactChild | React.ReactChild[];
  width: number;
}
const GridElement = ({ children, width }: GridElementProps) => <div className={`o-grid-${width}@md`}>{children}</div>;

export default GridElement;
