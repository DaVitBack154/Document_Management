import { NavbarComponent } from './navbar.style';
import React, { useEffect } from 'react';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setAccount } from '../store/AccoutReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';

export default function Navbar() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const history = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        let token = localStorage.getItem('token');
        const header = `Authorization: Bearer ${token}`;
        let userdata = await axios.get(process.env.REACT_APP_API + '/profile', {
          withCredentials: true,
          headers: header,
        });
        console.log('userdata=>', userdata);
        if (userdata?.data?.status) {
          dispatch(setAccount(userdata.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const items = [
    {
      key: '1',
      label: <NavLink to="/home-regis-doc">เอกสารทางทะเบียน</NavLink>,
    },
    {
      key: '2',
      label: <NavLink to="/home-certificate">ใบอนุญาต/หนังสือรับรอง</NavLink>,
    },
    {
      key: '3',
      label: <NavLink to="/home-financial">งบการเงิน</NavLink>,
    },
    {
      key: '4',
      label: <NavLink to="/home-docmeet">เอกสารการประชุม</NavLink>,
    },
    {
      key: '5',
      label: <NavLink to="/home-organization">โครงสร้างองค์กร</NavLink>,
    },
    {
      key: '6',
      label: <NavLink to="/home-docpower">คู่มือการมอบอำนาจอนุมัติ</NavLink>,
    },
    {
      key: '7',
      label: <NavLink to="/home-rulecard">กฎบัตร/ขอบเขตอำนาจหน้าที่</NavLink>,
    },
    {
      key: '8',
      label: <NavLink to="/home-ethics">จรรยาบรรณธุรกิจ/นโยบาย</NavLink>,
    },
    {
      key: '9',
      label: <NavLink to="/home-manual">ระเบียบ/คู่มือ</NavLink>,
    },
    {
      key: '10',
      label: <NavLink to="/home-document">INTERNAL-MEMO</NavLink>,
    },
    {
      key: '11',
      label: <NavLink to="/home-external">EXTERNAL-DOC</NavLink>,
    },
    {
      key: '12',
      label: <NavLink to="/home-internaldoc">INTERNAL-DOC</NavLink>,
    },
    {
      key: '13',
      label: <NavLink to="/home-docout">เอกสารที่ได้รับจากภายนอก</NavLink>,
    },
    {
      key: '14',
      label: <NavLink to="/home-sealcom">การประทับตราบริษัท</NavLink>,
    },
    {
      key: '15',
      label: <NavLink to="/home-property">ทรัพย์สิน</NavLink>,
    },
  ];

  const onClick = ({ key }) => {
    localStorage.clear();
    history('/');
  };

  return (
    <NavbarComponent>
      <div className="group-box-nav">
        <div className="box1">
          <div className="logo-img">
            <img src="/logo-chase.png" width={200}></img>
          </div>
          <div className="text-dash">
            {/* <div>Document-Management</div> */}
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: '#FFFF' }}>
                  Document-Management
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="box2">
          <div className="user-login">
            <img src="/ty2.png" alt="" width={50} className="img-user" />
          </div>
          <div className="comment">
            <div className="profile">
              <div>
                <img src="/profile.png" width={50} alt="" />
              </div>
              <div className="name-profile">
                <div>{account?.profile?.username}</div>
                <div className="btn-out" onClick={onClick}>
                  <IoMdLogOut className="logout" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarComponent>
  );
}
