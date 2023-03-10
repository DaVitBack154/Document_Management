import { useEffect, useState } from 'react'
import Table from '../../components/table'
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
                        <NavLink to={'/from-external-update/' + record.id}>
                            <ButtonComponent className={'button-edit'}>
                                <AiTwotoneEdit />
                            </ButtonComponent>
                        </NavLink>
                    )
                },
                {
                    title: '????????????????????????????????????????????????',
                    dataIndex: 'number_book',
                    width: 80,
                },
                {
                    title: '??????????????????',
                    dataIndex: 'detail',
                    width: 400,
                },
                {
                    title: '???????????????????????????/????????????',
                    dataIndex: 'issued',
                    width: 150,
                },
                {
                    title: '?????????????????????????????????????????????',
                    dataIndex: 'authorized_signatory',
                    width: 150,
                },
                {
                    title: '??????????????????',
                    dataIndex: 'receive',
                    width: 150,
                },
                {
                    title: '??????????????????',
                    dataIndex: 'date_doc',
                    width: 100,
                },
                {
                    title: '????????????????????????',
                    dataIndex: 'remark',
                },
                {
                    title: '???????????????????????????????????????',
                    dataIndex: 'location',
                    align: 'center',
                    width: 40,
                },
                {
                    title: '???????????????',
                    dataIndex: 'esign',
                    align: 'center',
                },
                {
                    title: '??????????????????????????????',
                    dataIndex: 'img_external',
                    align: 'center',
                    width: 50,
                    render: (_, record) =>
                        record.img_external && (
                            <a href={'http://localhost:5001/public/image/repair/' + record.img_external} target="__blank">
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
