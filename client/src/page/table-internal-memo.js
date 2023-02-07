import { useEffect, useState } from 'react'
import Table from '../components/table'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { AiTwotoneEdit } from 'react-icons/ai'
import { AiFillFile } from 'react-icons/ai'
import { useSelector } from 'react-redux';


const ButtonComponent = styled.div`

  &.button-status-Not-Approve{
    border: 1px solid red;
    color: red;
    display: flex;
    justify-content: center;
    font-weight: 700;
    padding: 3px;
    border-radius: 5px;
  }

  &.button-status-Approve{
    background-color: green;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }

  &.button-status-Pending{
    background-color: #0069D9;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }

  &.button-status-Reject{
    background-color: gray;
    color: #FFFF;
    display: flex;
    justify-content: center;
    font-weight: bold;
    padding: 3px;
    border-radius: 5px;
  }

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
`

export default function TableInternalMemo(props) {
    const [columns, setColumns] = useState(null)
    const account = useSelector((state) => state.account)


    useEffect(() => {
        const init = async () => {
            let column = [
                {
                    fixed: 'left',
                    title: '',
                    dataIndex: '',
                    width: 50,
                    render: (_, record) => (
                        <NavLink to={'/from-internal-update/' + record.id}>
                            <ButtonComponent className={'button-edit'}>
                                <AiTwotoneEdit />
                            </ButtonComponent>
                        </NavLink>
                    )
                },
                {
                    title: 'เลขที่หนังสือออก',
                    dataIndex: 'number_book',
                    width: 80,
                },
                {
                    title: 'เรื่อง',
                    dataIndex: 'detail',
                    width: 400,
                },
                {
                    title: 'ผู้เตรียม/นำเสนอ',
                    dataIndex: 'issued',
                    width: 150,
                },
                {
                    title: 'ผู้อนุมัติ',
                    dataIndex: 'receive',
                    width: 150,
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
                    align: 'center',
                    width: 40,
                },
                {
                    title: 'ลงนาม',
                    dataIndex: 'esign',
                    align: 'center',
                },
                {
                    title: 'ไฟล์เอกสาร',
                    dataIndex: 'img_internal_memo',
                    align: 'center',
                    width: 50,
                    render: (_, record) =>
                        record.img_internal_memo && (
                            <a href={'http://localhost:5001/public/image/repair/' + record.img_internal_memo} target="__blank">
                                <AiFillFile style={{
                                    fontSize: "30px",
                                    color: '#90ADAD'
                                }} />
                            </a>
                        )
                },
            ]
            setColumns(column)
        }

        init()
    }, [account, props.data])

    return (
        <>
            <Table
                dataSource={props.data}
                columns={columns}
            />
        </>
    )
}
