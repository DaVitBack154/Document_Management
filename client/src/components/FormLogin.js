import { Form, Input } from 'antd'
import axios from 'axios'
import swal from 'sweetalert2'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaUnlockAlt } from 'react-icons/fa'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

const FormLoginComponent = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .border-flex {
    width: 100%;

    .img-chase {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      font-weight: bold;
    }
  }
`
const FormComponent = styled(Form)`
  background-color: #fff;

  .input-login {
    border-radius: 10px;
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: start;
  }
  .icon-login {
    font-size: 20px;
    margin-right: 10px;
  }
  .button-login {
    border-radius: 10px;
    padding: 8px;
    background-color: #015352;
    color: #ffff;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
`

export default function FormLogin() {
  const [form] = Form.useForm()
  const history = useNavigate();

  const onFinish = async (values) => {
    let resp = await axios.post(process.env.REACT_APP_API + '/login', values, { withCredentials: true })
    console.log('resp=>', resp)

    if (!resp.data.status) {
      swal.fire({
        title: '',
        text: resp.data.message,
        icon: 'error',
        confirmButtonText: 'X'
      })
    } else {
      console.log(resp.data.data)
      localStorage.setItem('token', resp.data.token)
      if (resp?.data?.data?.role === '1') {
        history('/home-document')
      }
    }
  }

  return (
    <FormLoginComponent className="sing-in">
      <div className="border-flex">
        <div className="img-chase">
          <img src="/chase.png" width={230} alt="" />
        </div>

        <h1 className="title">Sign in</h1>
        <FormComponent className="login-form-wrapper" form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name={'username'}
            rules={[
              {
                required: true,
                message: 'Please input your username !'
              }
            ]}>
            <Input className="input-login" prefix={<BsFillPersonCheckFill className="icon-login" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[
              {
                required: true,
                message: 'Please input your password !'
              }
            ]}>
            <Input className="input-login" prefix={<FaUnlockAlt className="icon-login" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <button className="button-login" type="submit">
              Login
            </button>
          </Form.Item>
        </FormComponent>
      </div>
    </FormLoginComponent>
  )
}
