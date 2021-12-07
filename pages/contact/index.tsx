import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";
import Image from "next/image";
import { useSelector } from "react-redux";

const style = css`
    section.contact {
        display: flex;
        margin: 0;
            
        > div {                
            &:first-child {
                flex: 5;
                display: table;
                
                > div {
                    display: table-cell;
                    vertical-align: middle;
                    
                    table {
                        width: 100px;
                        margin: 0 250px 0 auto;
                        
                        td {
                            font-size: 18px;
                            text-align: left;
                            padding: 30px 20px;
                        }
                    }
                }
            }
            
            &:last-child {
                flex: 4;
                display: table;
                text-align: left;
                width: 100%;
                
                > div {
                    display: table-cell;
                    vertical-align: middle;
                }
            }
        }
    }
`;

type ContactData = {
    email: string,
    tel: string,
    img: {
        filename: string,
        width: number,
        height: number
    }
};

const Contact: NextPage = () => {
    const contactState = useSelector((state: any) => state.contact);

    return (
        <section className="contact">
            <div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>EMAIL.</td>
                            <td>{contactState.email}</td>
                        </tr>
                        <tr>
                            <td>TEL.</td>
                            <td>{contactState.tel}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div>
                    <Image src={"/api/img/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} />
                </div>
            </div>
            <style jsx>{style}</style>
        </section>
    );
};

export default Contact;
