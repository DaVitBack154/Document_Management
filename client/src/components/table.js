import { useState } from "react";
import { Table as AntdTable } from "antd";
import { Input } from "antd";
import styled from "styled-components";
import { useEffect } from "react";

const InputSerach = styled(Input.Search)`
  width: 300px;
`

const TableComponent = styled(AntdTable)`

  .ant-table-thead > tr > th {
    font-size: 12px;
  }

  .ant-table-tbody > tr > td{
    font-size: 10px;
  }

  .ant-table-thead > tr > th {
    font-weight: bold;
    /* background-color: black;
    color: #ffff; */
    font-size: 12px;
    white-space: nowrap;
  }

  .ant-table-thead .ant-table-cell {
    text-align: center;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover {
    /* background-color: #000; */
  }

  .table-search-input{
    color: gray;
  }
`

// const TabletotalRows = styled.div`
//     font-size:18px;
//     position: absolute;
//     bottom: -335px;
// `;


export default function Table(props) {
  const [filterWord, setFilterWord] = useState(null);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (filterWord) {
      let filterData = props.dataSource.filter((entry) => {
        let objKey = Object.keys(entry)
          .map((key) =>
            entry[key] !== null &&
              entry[key] !== true &&
              entry[key] !== false &&
              entry[key].toString().includes(filterWord) &&
              props.columns.some((o) => o.dataIndex)
              ? key
              : null
          )
          .filter((item) => item);

        if (objKey.length > 0) return entry;
        return null;
      });

      setFilterData(filterData);
    }
  }, [props.columns, props.dataSource, filterWord]);

  return (
    <>
      <div className="Search" id={props.id} style={{ width: '100%', display: "flex", justifyContent: 'end', padding: '8px' }}>
        {props.topLeftButton ? props.topLeftButton : <></>}
        <InputSerach
          className={'table-search-input'}
          placeholder="Search"
          onChange={(e) => {
            let value = e.target.value;
            if (value === "") value = null;
            setFilterWord(value);
          }}
        />
      </div>

      <TableComponent
        className={'table ' + (props.className ? props.className : '')}
        rowKey={"id"}
        dataSource={filterWord ? filterData : props.dataSource}
        scroll={{ x: true }}
        columns={props.columns}
        pagination={
          {
            defaultPageSize: 20,
            showSizeChanger: true,
            pageSizeOptions: ['20', '30', '40', '50', '100']
          }
        }
        bordered
      />
      {/* <TabletotalRows className={'table-total-rows'}>รายการทั้งหมด : {props.dataSource.length} Row</TabletotalRows> */}
    </>
  );
}
