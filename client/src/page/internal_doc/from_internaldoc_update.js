import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Form, Input, DatePicker, Select } from 'antd';
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import swal from 'sweetalert2'
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

        .img-doc{
            width: 98%;
        }
        .number-book{
            display: flex;
            justify-content: start;
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
        .img-up{
            width: 300px;
            flex-direction: column;
            display: table-column;
            position: relative;
            left: 15px;
        }

    }

`

export default function FrominternaldocUpdate() {

    const [form] = Form.useForm()
    const history = useNavigate();
    const [fileName, setFileName] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const init = async () => {
            try {
                let Internalmemo = await axios.get(process.env.REACT_APP_API + '/internaldoc-get/' + id, { withCredentials: true })
                if (Internalmemo.data.status) {
                    let data = Internalmemo.data.data
                    data.date_doc = data.date_doc ? moment(data.date_doc) : moment()
                    form.setFieldsValue(data)
                    setFileName(data?.img_internal_doc)
                }
                console.log('tet', Internalmemo)

            } catch (error) {
                console.log(error)
            }
        }
        init()
    }, [])


    const onFinish = async (value) => {
        console.log("values => ", value)
        value.img_internal_doc = fileName

        try {

            let result = await axios.put(process.env.REACT_APP_API + '/internaldoc-update/' + id, value, { withCredentials: true })
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
                            history("/home-internaldoc")
                        }
                    })
            } else {
                swal
                    .fire({
                        title: "",
                        text: result.data.message,
                        icon: "error",
                        confirmButtonText: "X",
                    })
                    .then((result) => {
                    });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormItUser>
            <div className='group-form'>
                <div className='head_it'>
                    INTERNALDOC{/* INTERNAL MEMO - {id.type_data} */}
                </div>
                <Form className="it-form-wrapper" form={form} onFinish={onFinish} layout="inline" size="large">

                    <Form.Item className="number-book" name={'number_book'} label={'Document-No'}>
                        <Input readOnly />
                    </Form.Item>

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
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ผู้เตรียม/ร่าง"
                        name={'issued'}
                    >
                        <Input placeholder="กรุณากรอกข้อมูล" />
                    </Form.Item>

                    <Form.Item
                        className='form-item-row1'
                        label="ผู้มีอำนาจลงนาม"
                        name={'authorized_signatory'}
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
                            history('/home-internal-doc')
                        }}>
                            ➤ HOME
                        </button>
                    </Form.Item>

                </Form>
            </div>
        </FormItUser>
    )
}
