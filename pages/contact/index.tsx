import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";
import Image from "next/image";

const style = css`
    section.contact {
        display: flex;
        margin: 210px 0;
            
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
                text-align: left;
                width: 100%;
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
    const [email, setEmail] = useState("");
    const [tel, seTel] = useState("");
    const [img, setImg] = useState({
        filename: "",
        width: 0,
        height: 0
    });

    useEffect(() => {
        fetch("/api/contact")
            .then(data => data.json())
            .then((data: ContactData) => {
                setEmail(data.email);
                seTel(data.tel);
                setImg(data.img);
            });
    }, []);

    return (
        <section className="contact">
            <div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>EMAIL.</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>TEL.</td>
                            <td>{tel}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Image src={"/api/img/" + img.filename} width={img.width} height={img.height} />
            </div>
            <style jsx>{style}</style>
        </section>
    );
};

export default Contact;
