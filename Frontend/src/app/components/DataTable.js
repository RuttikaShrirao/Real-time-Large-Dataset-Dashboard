import { FixedSizeList as List } from 'react-window';

const DataTable = ({ data }) => (
  <List
    height={400}
    itemCount={data.length}
    itemSize={35}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        {data[index].name} - {data[index].value}
      </div>
    )}
  </List>
);

export default DataTable;
