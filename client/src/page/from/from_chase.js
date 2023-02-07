import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Form, Input, DatePicker, Select } from 'antd';
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import swal from 'sweetalert2'


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

        .img-doc{
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

export default function Fromchase() {

    const [form] = Form.useForm()
    const history = useNavigate();
    const param = useParams()
    const [fileName, setFileName] = useState(null)
    const [lastnumber, setLastnumber] = useState(null)
    const [oldBook, setOldBook] = useState('')
    const [newBook, setNewBook] = useState('')
    const [typedata, setTypeData] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const init = async () => {

            let lastNumber = await axios.get(process.env.REACT_APP_API + '/internalmemo/lastnumberbook',
                { headers: { withCredentials: true }, params: { type_data: param.type } })
            if (lastNumber.data.status === true) {
                await setLastnumber(lastNumber.data.data[0])
                await setTypeData(lastNumber.data.data[0].type_data)
                await setRefresh(true);
            }
            await setOldBook(lastNumber.data.data[0].number_book)
            await newNameBook();
        }
        init()
    }, [newBook, refresh])

    const newNameBook = async () => {
        try {
            let checkDate = await lastnumber.date_doc.split('T')[0].split('-').join('/').slice(0, -3);
            let checkNewDate = new Date().toISOString().split('T')[0].split('-').join('/').slice(0, -3);
            let checkType = await lastnumber.type_data;
            let currentName = await checkType + '/' + checkDate;
            let checkName = await checkType + '/' + checkNewDate;
            console.log(currentName, checkName)

            if (currentName === checkName) {
                let numberSlice = await parseInt(oldBook.slice(-3));
                let newName = await numberSlice + 1;
                let numberBook = await String(newName).padStart(3, '0');
                let nameSlice = await oldBook.slice(0, -3);
                let result = await nameSlice.toUpperCase() + numberBook;
                await setNewBook(result);
                await console.log('test', result);
            } else {
                let numberBook = await String('1').padStart(3, '0');
                let result = await checkName + '/' + numberBook;
                await setNewBook(result);
                await console.log('test', result);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const onFinish = async (value) => {
        const data = { ...value, type_data: typedata, number_book: newBook, img_internal_memo: fileName }
        console.log(data);
        //value.number_book = newBook;
        console.log("values => ", value)
        let result = await axios.post(process.env.REACT_APP_API + '/internalmemo-insert', data,
            { withCredentials: true })
        console.log(result.data.status)
        if (result.data.status) {
            swal.fire({
                title: "",
                text: result.data.message,
                icon: 'success',
                confirmButtonText: "X"
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        history("/home-document")
                    }
                })
        }
    }

    return (
        <FormItUser>
            <div className='group-form'>
                <div className='head_it'>
                    INTERNAL MEMO - {param.type}
                </div>
                <div className='ticket'>{newBook}</div>
                <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">

                    <Form.Item
                        className='form-item-row3'
                        name={'detail'}
                        style={{ height: 100 }}
                        label={'เรื่อง'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกข้อมูล',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ผู้เตรียม/นำเสนอ"
                        name={'issued'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกข้อมูล',
                            },
                        ]}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ผู้อนุมัติ"
                        name={'receive'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกข้อมูล',
                            },
                        ]}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="MDY"
                        name={'date_doc'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณาแจ้งวันที่',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="หมายเหตุ"
                        name={'remark'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกข้อมูล',
                            },
                        ]}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ที่เก็บเอกสาร"
                        name={'location'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกข้อมูล',
                            },
                        ]}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ลงนาม"
                        name={'esign'}
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกข้อมูล',
                            },
                        ]}>
                        <Select className="" placeholder="กรุณาเลือก">
                            <Select.Option value={'wet_ink'}>wet_ink</Select.Option>
                            <Select.Option value={'e-signature'}>e-signature</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item className="img-doc" label={'อัพโหลดรูปภาพ'}>
                        <input
                            type={'file'}
                            onChange={async (e) => {
                                try {
                                    let formData = new FormData()
                                    formData.append('image', e.target.files[0])

                                    let resUpload = await axios.post(process.env.REACT_APP_API + '/upload/repair', formData, { withCredentials: true })
                                    if (resUpload?.data?.status) {
                                        setFileName(resUpload?.data?.data?.filename)
                                        swal.fire({
                                            title: '',
                                            text: resUpload?.data?.message,
                                            icon: 'success',
                                            confirmButtonText: 'X'
                                        })
                                    } else {
                                        swal.fire({
                                            title: '',
                                            text: resUpload?.data?.message,
                                            icon: 'error',
                                            confirmButtonText: 'X'
                                        })
                                    }
                                } catch (error) {
                                    if (error.response.status === 401) {
                                        window.location.href = '/login'
                                    }
                                }
                            }}
                        />
                    </Form.Item>
                    {fileName && (
                        <div className="image-repair">
                            <img className="img-up" src={'http://localhost:5001/public/image/repair/' + fileName} />
                        </div>
                    )}


                    <Form.Item className='form-button'>
                        <button className="button-submit" type="submit">
                            ➤ SAVE
                        </button>
                        <button className="button-back" onClick={() => {
                            history('/home-document')
                        }}>
                            ➤ HOME
                        </button>
                    </Form.Item>

                </Form>
            </div>
        </FormItUser>
    )
}
