import React from 'react'
import Navbar from '../../components/navbar'
import styled from 'styled-components'
import Tableexternal from './table-external'
import { useEffect, useState } from "react";
import { AiFillHome } from 'react-icons/ai'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Excel } from 'antd-table-saveas-excel'
import { RiFileExcel2Fill } from 'react-icons/ri'

const HomepageFull = styled.div`
    
    .border-table{
        background-color: #F0F3F3;
        width: 100%;
        padding: 20px;

        .group-internal{
            background-color: #FFFF;
            padding: 0px 10px;
            
        
            .head-table{
                .box-flex{
                    display: flex;
                    align-items: center;
                    position: relative;
                    top: 40px;

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
                    }
                    .btn-home{
                        background-color: #084A49;
                        color: #FFF;
                        border: none;
                        cursor: pointer;
                        padding: 3px;
                        border-radius: 5px;
                        width: 130px;
                        .home{
                            margin-right: 7px;
                        }
                    }

                    .add-head{
                        font-size: 30px;
                        margin-left: 20px;
                        color: #084A49;
                        cursor: pointer;
                    }
                }

                

                .btn-add{
                    position: relative;
                    top: 35px;
                    left: -10px;
                   
                    .btn-inter{
                        background-color: #084A49;
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
                }
            }
        }

        
    }

`



export default function Fullexternal() {
    const [externaldata, setExternaldata] = useState([])

    useEffect(() => {
        const init = async () => {
            try {
                let dataexternal = await axios.get(process.env.REACT_APP_API + '/external-alldata',
                    { withCredentials: true })
                console.log('data=>', dataexternal)
                if (dataexternal?.data?.status) {
                    setExternaldata(dataexternal.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        init();
    }, [])

    const handleClick = async () => {
        try {
            let excel_internal = externaldata

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
                    title: 'ผู้เตรียม/ร่าง',
                    dataIndex: 'issued',
                },
                {
                    title: 'ผู้มีอำนาจลงนาม',
                    dataIndex: 'authorized_signatory',
                    width: 150,
                },
                {
                    title: 'ส่งถึง',
                    dataIndex: 'receive',
                },
                {
                    title: 'วันที่',
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
            ]

            const excel = new Excel()
            excel
                .addSheet('report_externalfull')
                .addColumns(excelColumn)
                .addDataSource(excel_internal)
                .saveAs('report-externalfull.xlsx')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <HomepageFull>
            <Navbar />
            <div className='border-table'>
                <div className='group-internal'>
                    <div className='head-table'>
                        <div className='box-flex'>
                            <div className='text-dash'>
                                <div className='head-db'>
                                    EXTERNAL
                                </div>
                                <div className='text-dash'>
                                    Table ˃ External-Doc
                                </div>
                            </div>
                            <div>
                                <NavLink to={'/home-external'}>
                                    <button className='btn-home'>
                                        <AiFillHome className='home' />
                                        BACK
                                    </button>
                                </NavLink>
                            </div>
                            <div>
                                <div className="btn-two" onClick={handleClick}>
                                    <RiFileExcel2Fill className="add-head" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Tableexternal data={externaldata} setData={setExternaldata} key='1' />
                        <br />
                    </div>
                </div>
            </div>
        </HomepageFull>
    )
}
