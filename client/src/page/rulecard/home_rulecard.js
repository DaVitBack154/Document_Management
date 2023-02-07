import React from 'react';
import Navbar from '../../components/navbar';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import Table from '../../components/table';
import axios from 'axios';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiFillFile } from 'react-icons/ai';

const Homepage = styled.div`
  .border-table {
    background-color: #f0f3f3;
    width: 100%;
    padding: 20px;

    .group-internal {
      background-color: #ffff;
      padding: 20px 20px;

      .head-table {
        .box-flex {
          display: flex;
          align-items: center;

          .text-dash {
            width: 100%;

            .head-db {
              color: #3f4254;
              font-weight: bold;
            }
            .text-dash {
              font-size: 12px;
              font-weight: 600;
              color: #b5b5c3;
              width: 100%;
            }
          }
        }

        .btn-add {
          display: flex;
          position: relative;
          top: 40px;
          left: -10px;

          .btn-inter {
            background-color: #084a49;
            margin-left: 15px;
            border: none;
            border-radius: 5px;
            color: #fff;
            padding: 7px 10px;
            font-weight: bold;
            cursor: pointer;

            .add {
              font-size: 20px;
              position: relative;
              top: 5px;
              margin-right: 5px;
            }
          }

          .btn-two {
            color: #fbf6f0;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            padding: 3px 10px;
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            .add-head {
              font-size: 30px;
              color: #084a49;
            }
          }
        }
      }
    }
  }
`;

const ButtonComponent = styled.div`
  &.button-edit {
    background-color: #ffca2c;
    border: none;
    color: #fff;
    font-size: 14px;
    border-radius: 50px;
    text-align: center;
    padding: 10px 15px;
    /* padding: 20px; */
  }
`;

export default function Homerulecard() {
  const [data, setData] = useState(null);

  //หัวข้อ ข้อความ
  const column = [
    {
      fixed: 'left',
      title: '',
      dataIndex: '',
      width: 50,
      render: (_, record) => (
        <NavLink to={'/fromrulecard/' + record.id}>
          <ButtonComponent className={'button-edit'}>
            <AiTwotoneEdit />
          </ButtonComponent>
        </NavLink>
      ),
    },
    {
      title: 'บริษัท',
      dataIndex: 'company',
    },
    {
      title: 'ปี',
      dataIndex: 'year_doc',
    },
    {
      title: 'กฎบัตร/ขอบเขตอำนาจหน้าที่',
      dataIndex: 'scope_pow',
    },
    {
      title: 'วันที่มีผลบังคับใช้/ปรับปรุงแก้ไขล่าสุด',
      dataIndex: 'date_doc',
    },
    {
      title: 'อนุมัติวันที่',
      dataIndex: 'date_approve',
    },
  ];

  useEffect(() => {
    const init = async () => {
      let regisdoc = await axios.get(process.env.REACT_APP_API + '/rulecard', {
        withCredentials: true,
      });
      if (regisdoc?.data?.status) {
        setData(regisdoc.data.data);
      }
    };
    init();
  }, []);

  // const handleClick = async () => {
  //     try {
  //         let excel_internal = interdata

  //         let excelColumn = [
  //             {
  //                 title: 'เลขที่หนังสือออก',
  //                 dataIndex: 'number_book',
  //             },
  //             {
  //                 title: 'เรื่อง',
  //                 dataIndex: 'detail',
  //             },
  //             {
  //                 title: 'ออกโดย',
  //                 dataIndex: 'issued',
  //             },
  //             {
  //                 title: 'ถึง',
  //                 dataIndex: 'receive',
  //             },
  //             {
  //                 title: 'MDY',
  //                 dataIndex: 'date_doc',
  //             },
  //             {
  //                 title: 'หมายเหตุ',
  //                 dataIndex: 'remark',
  //             },
  //             {
  //                 title: 'ที่เก็บเอกสาร',
  //                 dataIndex: 'location',
  //             },
  //             {
  //                 title: 'ลงนาม',
  //                 dataIndex: 'esign',
  //             },
  //             {
  //                 title: 'ลงนาม',
  //                 dataIndex: 'img_internal_memo',
  //             },
  //             // {
  //             //     title: 'ไฟล์เอกสาร',
  //             //     dataIndex: 'img_internal_memo',
  //             //     render: (_, record) =>
  //             //         record.img_internal_memo && (
  //             //             <a href={'http://localhost:5001/public/image/repair/' + record.img_internal_memo} target="__blank">
  //             //                 DOC
  //             //             </a>
  //             //         )
  //             // },
  //         ]

  //         const excel = new Excel()
  //         excel
  //             .addSheet('report_internal')
  //             .addColumns(excelColumn)
  //             .addDataSource(excel_internal)
  //             .saveAs('report-internal.xlsx')
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }

  // const items = [
  //     {
  //         key: 'ex',
  //         label: <NavLink to='/home-external'>EXTERNAL-DOC</NavLink>,
  //     },
  //     {
  //         key: 'ind',
  //         label: <NavLink to='/home-internaldoc'>INTERNAL-DOC</NavLink>,
  //     },
  // ];

  return (
    <Homepage>
      <Navbar />
      <div className="border-table">
        <div className="group-internal">
          <div className="head-table">
            <div className="box-flex">
              <div className="text-dash">
                <div className="head-db">กฎบัตร/ขอบเขตอำนาจหน้าที่</div>
                <div className="text-dash">
                  Table ˃ กฎบัตร/ขอบเขตอำนาจหน้าที่
                </div>
              </div>
            </div>

            <div className="btn-add">
              <NavLink to={'/fromrulecard'}>
                <button className="btn-inter">
                  <IoMdAddCircle className="add" />
                  เพิ่มข้อมูล
                </button>
              </NavLink>
            </div>
          </div>
          <div>
            <Table columns={column} dataSource={data} />;
            <br />
          </div>
        </div>
      </div>
    </Homepage>
  );
}
