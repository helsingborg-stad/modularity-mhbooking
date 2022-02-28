interface GridRowProps {
  children: React.ReactChild | React.ReactChild[];
  modFormField?: boolean;
}

const GridRow = ({ children, modFormField }: GridRowProps) => (
  <div className={`o-grid${modFormField && ' mod-form-field'}`}>{children}</div>
);

export default GridRow;
