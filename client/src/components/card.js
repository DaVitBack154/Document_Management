import React from 'react'
import styled from "styled-components"
import { IoIosDocument } from "react-icons/io";
import dayjs from 'dayjs'
import { useEffect, useState } from "react";
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import { HiDocumentText } from 'react-icons/hi'



const Cardcomponent = styled.div`
    .group-box{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        
        .box1, .box2, .box3, .box4, .box5{
            width: 16%;
            border: 1px solid black;
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
                    }
                    .msg-number{
                        width: 40%;
                        font-size: 37px;
                        font-weight: bold;
                        text-align: center;
                    }
                }
          

                .group-month{
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;

                    .prev,.next{
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        opacity: 0.8;
                        font-size: 17px;
                    }
                }
            }

        }
    }
    
`

export default function Card() {

    const [currentDate, setCurrentDate] = useState(dayjs())

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }

    useEffect(() => {
        const init = async () => {
            let params = {
                month: currentDate.format('MM'),
                year: currentDate.format('YYYY'),
            }
        }


    }, [])


    return (
        <Cardcomponent>
            <div className='group-box'>
                <div className='box1'>
                    <div className='border-groub-box1'>
                        <div className='left-box1'>
                            <div className='number'>
                                2
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
                                2
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
                                2
                            </div>
                            <div className='status' >
                                cmt
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
                                2
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

                <div className='box5'>
                    <div className='box-month'>
                        <div className='totalhead'>
                            <div className='msg-head'>
                                Total All Month
                            </div>
                            <div className='msg-number'>
                                2
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
                            <span>
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

    )
}
