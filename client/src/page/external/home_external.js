import React from 'react'
import Navbar from '../../components/navbar'
import styled from 'styled-components'
import Tableexternal from './table-external'
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { IoIosDocument } from "react-icons/io";
import dayjs from 'dayjs'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import { GrView } from 'react-icons/gr'
import axios from 'axios';
import { Excel } from 'antd-table-saveas-excel'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Homepage = styled.div`
    
    .border-table{
        background-color: #F0F3F3;
        width: 100%;
        padding: 20px;

        .group-internal{
            background-color: #FFFF;
            padding: 20px 10px;
            
        
            .head-table{
                .box-flex{
                    display: flex;
                    align-items: center;

                    .text-dash{
                        width: 10%;
        
                        .head-db{
                            color: #3F4254;
                            font-weight: bold;
                        }
                        .text-dash{
                            font-size: 12px;
                            font-weight: 600;
                            color: #B5B5C3;
                            width: 100%;
                        }

                        .btn-full{
                            border: none;
                            font-size: 12px;
                            width: 135px;
                            cursor: pointer;
                            color: #084A49;
                            font-weight: bold;
                            border-radius: 5px;
                            padding: 3px;

                            .addview{
                                font-size: 15px;
                                margin: 0 auto;
                                position: relative;
                                top: 3px;
                                right:4px;
                            }

                        }
                    }

                    
                    
                    .body-card{
                        width: 90%;
                    }
                }

                

                .btn-add{
                    display: flex;
                    position: relative;
                    top: 40px;
                    left: -10px;
                   
                    .btn-inter{
                        &:hover{
                            background-color: #084A49;
                        }
                        background-color: #e4e3e3;
                        margin-left: 15px;
                        border: none;
                        border-radius: 5px;
                        color: #FFF;
                        padding: 7px 10px;
                        font-weight: bold;
                        cursor: pointer;
                    

                        .add{
                            font-size: 20px;
                            position: relative;
                            top: 5px;
                            margin-right: 5px;
                        }
                    }

                    .btn-two{
                        color: #FBF6F0;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        padding: 3px 10px;
                        margin-left: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .add-head{
                            font-size: 30px;
                            color: #084A49;
                        }
                    }
                }
            }
        }

        
    }

`

const Cardcomponent = styled.div`
    .group-box{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        
        .box1, .box2, .box3, .box4, .box5, .boxaa{
            width: 15%;
            background-color: #084A49;
            opacity: 0.9;
            color: #FFFF;
            border-radius: 5px;

            .border-groub-box1{
                display: flex;

                .left-box1{
                    width: 60%;
                    .number{
                        font-size: 38px;
                        font-weight: bold;
                        margin-left: 30px;
                    }
                    .status{
                        margin-left: 30px;
                        position: relative;
                        top: -5px;
                        font-weight: bold;
                    }
                }
                .right-box1{
                    width: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .icon-box1{
                        font-size: 60px;
                        opacity: 0.5;
                    }
                }

            }

            .box-month{
                width: 100%;

                .totalhead{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .msg-head{
                        width: 60%;
                        text-align: center;
                        font-weight: bold;
                        position: relative;
                        left: 3px;
                    }
                    .msg-number{
                        width: 40%;
                        font-size: 37px;
                        font-weight: bold;
                        position: relative;
                        left: 25px;
                        top: -2px;
                    }
                }
          

                .group-month{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    left: 10px;
                    top: -5px;

                    .prev,.next{
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        opacity: 0.8;
                        font-size: 23px;
                        font-weight: bold;
                    }
                }
            }

        }
    }
    
`

export default function HomeExternal() {
    const [interdata, setInterdata] = useState([])
    const [currentDate, setCurrentDate] = useState(dayjs())
    const [reportData, setReportData] = useState(null)


    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }


    useEffect(() => {
        const init = async () => {

            let params = {
                month: currentDate.format('MM'),
                year: currentDate.format('YYYY'),
            }

            try {
                let datareport = await axios.get(process.env.REACT_APP_API + '/report-external',
                    { params: params, withCredentials: true })
                console.log(datareport)
                if (datareport?.data?.status) {
                    setReportData(datareport.data.data)
                }




                let dataexternal = await axios.get(process.env.REACT_APP_API + '/external',
                    { params: params, withCredentials: true })
                console.log('data=>', dataexternal)
                if (dataexternal?.data?.status) {
                    setInterdata(dataexternal.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        init();
    }, [currentDate])


    const handleClick = async () => {
        try {
            let excel_internal = interdata

            let excelColumn = [
                {
                    title: 'เลขที่หนังสือออก',
                    dataIndex: 'number_book',
                },
                {
                    title: 'เรื่อง',
                    dataIndex: 'detail',
                },
                {
                    title: 'ออกโดย',
                    dataIndex: 'issued',
                },
                {
                    title: 'ผู้ลงนาม',
                    dataIndex: 'authorized_signatory',
                    width: 150,
                },
                {
                    title: 'ถึง',
                    dataIndex: 'receive',
                },
                {
                    title: 'MDY',
                    dataIndex: 'date_doc',
                },
                {
                    title: 'หมายเหตุ',
                    dataIndex: 'remark',
                },
                {
                    title: 'ที่เก็บเอกสาร',
                    dataIndex: 'location',
                },
                {
                    title: 'ลงนาม',
                    dataIndex: 'esign',
                },
                {
                    title: 'imgage',
                    dataIndex: 'img_external',
                },
            ]

            const excel = new Excel()
            excel
                .addSheet('report_external')
                .addColumns(excelColumn)
                .addDataSource(excel_internal)
                .saveAs('report-external.xlsx')
        } catch (error) {
            console.error(error)
        }
    }

    const items = [
        {
            key: 'inm',
            label: <NavLink to='/home-document'>INTERNAL-MEMO</NavLink>,
        },
        {
            key: 'ind',
            label: <NavLink to='/home-internaldoc'>INTERNAL-DOC</NavLink>,
        },
    ];

    return (
        <Homepage>
            <Navbar />
            <div className='border-table'>
                <div className='group-internal'>
                    <div className='head-table'>
                        <div className='box-flex'>
                            <div className='text-dash'>
                                <div className='head-db'>
                                    EXTERNAL-DOC
                                </div>
                                <div className='text-dash'>
                                    Table ˃ External
                                </div>
                                <div className=''>
                                    <NavLink to={'/full-external'}>
                                        <button className='btn-full'>
                                            <GrView className="addview" />
                                            Full-External
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                            <div className='body-card'>
                                <Cardcomponent>
                                    <div className='group-box'>
                                        <div className='box1'>
                                            <div className='border-groub-box1'>
                                                <div className='left-box1'>
                                                    <div className='number'>
                                                        {reportData?.chase || 0}
                                                    </div>
                                                    <div className='status' >
                                                        CHASE
                                                    </div>
                                                </div>
                                                <div className='right-box1'>
                                                    <IoIosDocument className='icon-box1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='box2'>
                                            <div className='border-groub-box1'>
                                                <div className='left-box1'>
                                                    <div className='number'>
                                                        {reportData?.rway || 0}
                                                    </div>
                                                    <div className='status' >
                                                        RWAY
                                                    </div>
                                                </div>
                                                <div className='right-box1'>
                                                    <IoIosDocument className='icon-box1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='box3'>
                                            <div className='border-groub-box1'>
                                                <div className='left-box1'>
                                                    <div className='number'>
                                                        {reportData?.cmt || 0}
                                                    </div>
                                                    <div className='status' >
                                                        COURT
                                                    </div>
                                                </div>
                                                <div className='right-box1'>
                                                    <IoIosDocument className='icon-box1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='box4'>
                                            <div className='border-groub-box1'>
                                                <div className='left-box1'>
                                                    <div className='number'>
                                                        {reportData?.cfam || 0}
                                                    </div>
                                                    <div className='status' >
                                                        CFAM
                                                    </div>
                                                </div>
                                                <div className='right-box1'>
                                                    <IoIosDocument className='icon-box1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='boxaa'>
                                            <div className='border-groub-box1'>
                                                <div className='left-box1'>
                                                    <div className='number'>
                                                        {reportData?.aa || 0}
                                                    </div>
                                                    <div className='status' >
                                                        AA
                                                    </div>
                                                </div>
                                                <div className='right-box1'>
                                                    <IoIosDocument className='icon-box1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='box5'>
                                            <div className='box-month'>
                                                <div className='totalhead'>
                                                    <div className='msg-head'>
                                                        Total All Month
                                                    </div>
                                                    <div className='msg-number'>
                                                        {reportData?.total || 0}
                                                    </div>
                                                </div>
                                                <div className='group-month'>
                                                    <div
                                                        className="prev"
                                                        onClick={() => {
                                                            setCurrentDate(currentDate.subtract(1, 'month'))
                                                        }}>
                                                        {<BsFillArrowLeftSquareFill />}
                                                    </div>
                                                    <span style={{ fontWeight: "bold" }}>
                                                        {currentDate.format('MMMM')} {currentDate.format('YYYY')}
                                                    </span>
                                                    <div
                                                        className="next"
                                                        onClick={() => {
                                                            setCurrentDate(currentDate.add(1, 'month'))
                                                        }}>
                                                        {<BsFillArrowRightSquareFill />}
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Cardcomponent >
                            </div>

                        </div>


                        <div className='btn-add'>
                            <NavLink to={'/fromext-chase/CHASE'}>
                                <button className='btn-inter'>
                                    <IoMdAddCircle className='add' />
                                    CHASE
                                </button>
                            </NavLink>
                            <NavLink to={'/fromext-rway/RWAY'}>
                                <button className='btn-inter'>
                                    <IoMdAddCircle className='add' />
                                    RWAY
                                </button>
                            </NavLink>

                            <NavLink to={'/fromext-cmt/CMT'}>
                                <button className='btn-inter'>
                                    <IoMdAddCircle className='add' />
                                    CMT
                                </button>
                            </NavLink>

                            <NavLink to={'/fromext-cfam/CFAM'}>
                                <button className='btn-inter'>
                                    <IoMdAddCircle className='add' />
                                    CFAM
                                </button>
                            </NavLink>

                            <NavLink to={'/fromext-aa/AA'}>
                                <button className='btn-inter'>
                                    <IoMdAddCircle className='add' />
                                    AA
                                </button>
                            </NavLink>

                            <div>
                                <div className="btn-two" onClick={handleClick}>
                                    <RiFileExcel2Fill className="add-head" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <Tableexternal data={interdata} setData={setInterdata} key='1' onChange={onChange} />
                        <br />
                    </div>
                </div>
            </div>
        </Homepage>

    )
}
