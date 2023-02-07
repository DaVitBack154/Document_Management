import styled from "styled-components";

export const NavbarComponent = styled.div`
    width: 100%;
    background-color: #113D3D;
    
  .group-box-nav{
    display: flex;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .box1{
        width: 70%;
        display: flex;
        .logo-img{
            margin-left: 30px;
            display: flex;
            align-items: center;
        }
        .text-dash{
            background-color: #015352;
            opacity: 0.6;
            margin-left: 15px;
            width: 200px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            color: #FFFF;
            position: relative;
            top: 12px;
            border-radius: 5px;
        }
    }
    .box2{
        width: 30%;
        display: flex;
        justify-content: end;

        .comment{
            display: flex;
            align-items: center;
            margin-right: 30px;
            .profile{
                display: flex;
                .name-profile{
                    font-size: 15px;
                    color: #FFFF;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    margin-right: 25px;

                    .btn-out{
                        margin-left: 10px;

                        .logout{
                            font-size: 25px;
                            display: flex;
                            align-items: center;
                            color: #f22121;
                            cursor: pointer;
                        }

                    }
                }
            }
            .btn-comment{
                background-color: #015352;
                color: #FFFF;
                border-radius: 5px;
                padding: 8px;
                border: none;
                margin-left: 10px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0.7;

                .logo-login{
                    font-size: 20px;
                    margin-right: 3px;
                }
            }
            .group-in-out{
                width: 120px;
                border: none;
                margin-left: 15px;
               

                .textshow{
                width: 100%;;
                background-color: #015352;
                opacity: 0.6;
                font-size: 15px;
                font-weight: bold;
                color: #FFFF;
                text-align: center;
                border-radius: 3px;
                }

                .logout{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: none;
                    padding: 3px;
                    background-color: #015352;
                    opacity: 0.6;
                    cursor: pointer;
                    border-radius: 3px;

                    .logouticon{
                        font-size: 20px;
                        margin: 0 auto;
                        color: #FFFF;
                    }
                }
            }
        }

        .user-login{
            width: 45px;
            height: 45px;
            margin: 10px 10px;
            border-radius: 50%;
            .img-user{
                position: relative;
                top: -5px;
            }
        }
    }
  }
    
`