import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, DatePicker, Select } from 'antd';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert2';
import moment from 'moment';

const FormItUser = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f2f6f6;
  display: flex;
  align-items: center;
  .group-form {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 0 auto;
    width: 1300px;

    .head_it {
      background-color: #015352;
      margin-bottom: 20px;
      padding: 15px;
      text-align: center;
      font-weight: bold;
      color: #f2f6f6;
    }

    .ticket {
      width: 200px;
      width: fit-content;
      margin-left: 15px;
      padding: 7px 10px;
      border-radius: 10px;
      background-color: #113d3c;
      color: #f2f6f6;
      font-weight: bold;
    }

    .ant-form {
      display: flex;
    }

    .ant-form-item {
      margin: 0 auto;
      margin-top: 20px;

      .ant-form-item-label {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;

        background-color: #113d3c;
        label {
          &::before {
            display: none;
          }
          padding: 0px 10px;
          color: #fff;
          font-weight: bold;
        }
      }
    }

    .form-item-row1 {
      width: 48%;
    }

    .img-doc {
      width: 98%;
    }

    .form-item-row3 {
      width: 98%;
      textarea {
        height: 100px;
      }
    }

    .form-button {
      width: 100%;
      margin: 40px 0px;
      .button-submit {
        margin-left: 20px;
        padding: 5px 15px;
        border: none;
        background-color: #113d3c;
        color: #ffff;
        font-weight: bold;
        border-radius: 10px;
        cursor: pointer;
      }
      .button-back {
        margin-left: 20px;
        padding: 5px 15px;
        border: none;
        background-color: #113d3c;
        color: #ffff;
        font-weight: bold;
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .img-up {
      width: 250px;
    }
  }
`;

export default function FromRegisDoc() {
  const [form] = Form.useForm();
  const history = useNavigate();
  const { id } = useParams();
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        let regisDoc = await axios.get(
          process.env.REACT_APP_API + '/regisdoc-get/' + id,
          { withCredentials: true }
        );
        if (regisDoc.data.status) {
          let data = regisDoc.data.data;
          data.year_doc = data.year_doc ? moment(data.year_doc) : moment();
          data.date_doc = data.date_doc ? moment(data.date_doc) : moment();
          form.setFieldsValue(data);
          setFileName(data?.image);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const onFinish = async (value) => {
    value.image = fileName;
    value.year_doc = moment(value.year_doc).format('YYYY');
    value.date_doc = moment(value.date_doc).format('YYYY-MM-DD');
    try {
      let result = null;
      if (id) {
        result = await axios.put(
          process.env.REACT_APP_API + '/regisdoc-update/' + id,
          value,
          { withCredentials: true }
        );
      } else {
        result = await axios.post(
          process.env.REACT_APP_API + '/regisdoc-insert/',
          value,
          { withCredentials: true }
        );
      }
      if (result.data.status) {
        swal
          .fire({
            title: '',
            text: result.data.message,
            icon: 'success',
            confirmButtonText: 'X',
          })
          .then((result) => {
            if (result.isConfirmed) {
              history('/home-regis-doc');
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormItUser>
      <div className="group-form">
        <div className="head_it">เอกสารทางทะเบียน</div>
        <Form
          className="it-form-wrapper"
          form={form}
          onFinish={onFinish}
          layout="inline"
          size="large"
        >
          <Form.Item className="form-item-row1" label="บริษัท" name={'company'}>
            <Input placeholder="กรุณากรอกข้อมูล" />
          </Form.Item>

          <Form.Item
            className="form-item-row1"
            label="ประเภทเอกสาร"
            name={'type_doc'}
          >
            <Select className="" placeholder="กรุณาเลือก">
              <Select.Option value={'tyd1'}>
                ใบสำคัญแสดงการจดทะเบียน
              </Select.Option>
              <Select.Option value={'tyd2'}>หนังสือรับรอง</Select.Option>
              <Select.Option value={'tyd3'}>
                บัญชีรายชื่อผู้ถือหุ้น
              </Select.Option>
              <Select.Option value={'tyd4'}>หนังสือบริคณห์สนธิ</Select.Option>
              <Select.Option value={'tyd5'}>ข้อบังคับ</Select.Option>
              <Select.Option value={'tyd6'}>
                สมุดทะเบียนผู้ถือหุ้น
              </Select.Option>
              <Select.Option value={'tyd7'}>ใบหุ้น</Select.Option>
              <Select.Option value={'tyd8'}>
                อื่น ๆ (ตรงอื่น ๆ สามารถให้ระบุประเภทเอกสารเอง)
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="form-item-row1" label="ปี" name={'year_doc'}>
            <DatePicker picker="year" />
          </Form.Item>

          <Form.Item
            className="form-item-row1"
            label="เลขที่เอกสาร"
            name={'number_doc'}
          >
            <Input placeholder="เลขที่เอกสาร" />
          </Form.Item>

          <Form.Item
            className="form-item-row1"
            label="วันที่ออกเอกสาร"
            name={'date_doc'}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            className="form-item-row1"
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

          <Form.Item className="img-doc" label={'อัพโหลดรูปภาพ'}>
            <input
              type={'file'}
              onChange={async (e) => {
                try {
                  let formData = new FormData();
                  formData.append('image', e.target.files[0]);

                  let resUpload = await axios.post(
                    process.env.REACT_APP_API + '/upload/repair',
                    formData,
                    { withCredentials: true }
                  );
                  if (resUpload?.data?.status) {
                    setFileName(resUpload?.data?.data?.filename);
                    swal.fire({
                      title: '',
                      text: resUpload?.data?.message,
                      icon: 'success',
                      confirmButtonText: 'X',
                    });
                  } else {
                    swal.fire({
                      title: '',
                      text: resUpload?.data?.message,
                      icon: 'error',
                      confirmButtonText: 'X',
                    });
                  }
                } catch (error) {
                  if (error.response.status === 401) {
                    window.location.href = '/login';
                  }
                }
              }}
            />
          </Form.Item>
          {fileName && (
            <div className="image-repair">
              <img
                className="img-up"
                src={'http://localhost:5001/public/image/repair/' + fileName}
              />
            </div>
          )}

          <Form.Item className="form-button">
            <button className="button-submit" type="submit">
              ➤ SAVE
            </button>
            <button
              className="button-back"
              onClick={() => {
                history('/home-regis-doc');
              }}
            >
              ➤ HOME
            </button>
          </Form.Item>
        </Form>
      </div>
    </FormItUser>
  );
}
