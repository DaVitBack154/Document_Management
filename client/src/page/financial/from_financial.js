import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Form, Input, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import swal from 'sweetalert2';
import moment from 'moment'


const FormItUser = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F2F6F6;
    display: flex;
    align-items: center;
    .group-form{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        margin: 0 auto;
        width: 1300px;

        .head_it{
            background-color: #015352;
            margin-bottom: 20px;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            color: #F2F6F6;
        }

        .ticket{
            width: 200px;
            width: fit-content;
            margin-left: 15px;
            padding: 7px 10px;
            border-radius: 10px;
            background-color: #113D3C;
            color: #F2F6F6;
            font-weight: bold;
        }

        .ant-form{
        display: flex;
        }

        .ant-form-item{
        margin: 0 auto;
        margin-top: 20px;
     
            .ant-form-item-label{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;

            background-color:#113D3C;
                label{
                    
                    &::before{
                    display: none;
                    }
                    padding: 0px 10px;
                    color: #FFF;
                    font-weight: bold;
                }
            }
        }
        
        .form-item-row1{
            width: 48%;
        }
        .form-item-row1-approve{
            width: 98%;
        }



        .form-item-row3{
            width: 98%;
            textarea{
            height: 100px;
            }
        }
       
        .form-button{
            width: 100%;
            margin: 40px 0px;
            .button-submit{
                margin-left: 20px;
                padding: 5px 15px;
                border: none;
                background-color: #113D3C;
                color: #FFFF;
                font-weight: bold;
                border-radius: 10px;
                cursor: pointer;
            }
            .button-back{
                margin-left: 20px;
                padding: 5px 15px;
                border: none;
                background-color: #113D3C;
                color: #FFFF;
                font-weight: bold;
                border-radius: 10px;
                cursor: pointer;
            }
        }

    }

`

export default function Fromfinancial() {

    const [form] = Form.useForm()
    const history = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const init = async () => {
            try {
                let regisDoc = await axios.get(process.env.REACT_APP_API + '/financial-get/' + id, { withCredentials: true })
                if (regisDoc.data.status) {
                    let data = regisDoc.data.data
                    data.year_doc = data.year_doc ? moment(data.year_doc) : moment()
                    data.date_doc = data.date_doc ? moment(data.date_doc) : moment()
                    data.approve_doc = data.approve_doc ? moment(data.approve_doc) : moment()
                    form.setFieldsValue(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }, [])


    const onFinish = async (value) => {
        value.year_doc = moment(value.year_doc).format('YYYY')
        value.date_doc = moment(value.date_doc).format('YYYY-MM-DD')
        value.approve_doc = moment(value.approve_doc).format('YYYY-MM-DD')
        try {
            let result = null
            if (id) {
                result = await axios.put(process.env.REACT_APP_API + '/financial-update/' + id, value, { withCredentials: true })
            } else {
                result = await axios.post(process.env.REACT_APP_API + '/financial-insert/', value, { withCredentials: true })
            }
            if (result.data.status) {
                swal.fire({
                    title: "",
                    text: result.data.message,
                    icon: 'success',
                    confirmButtonText: "X"
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            history("/home-financial")
                        }
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormItUser>
            <div className='group-form'>
                <div className='head_it'>
                    งบการเงิน
                </div>
                <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">

                    <Form.Item
                        className='form-item-row1'
                        label="บริษัท"
                        name={'company'}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ปี"
                        name={'year_doc'}
                    >
                        <DatePicker picker="year" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ประจำไตรมาส/ปี"
                        name={'quarter'}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="วันที่"
                        name={'date_doc'}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1-approve'
                        label="อนมุติ/วันที่"
                        name={'approve_doc'}
                    >
                        <DatePicker />
                    </Form.Item>


                    <Form.Item className='form-button'>
                        <button className="button-submit" type="submit">
                            ➤ SAVE
                        </button>
                        <button className="button-back" onClick={() => {
                            history('/home-financial')
                        }}>
                            ➤ HOME
                        </button>
                    </Form.Item>

                </Form>
            </div>
        </FormItUser>
    )
}
