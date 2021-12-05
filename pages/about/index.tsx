import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

import css from "styled-jsx/css";

const style = css`
    section.about {
        margin: 150px 0;
        
        > div {
            &:first-child {
                display: flex;
            
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
            
            &:last-child {
                padding: 50px calc(50% - 600px) 10px calc(50% - 600px);
                
                > h2 {
                    text-align: left;
                    margin-bottom: 20px;
                }
            }
        }
    }
`;

type AboutData = {
    name: string,
    birth: string,
    info: string,
    img: {
        filename: string,
        width: number,
        height: number
    },
    comments: {
        user: string,
        comment: string
    }[]
}

const About: NextPage = () => {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [info, setInfo] = useState("");
    const [img, setImg] = useState({
        filename: "",
        width: 0,
        height: 0
    });
    const [comments, setComments] = useState([
        {
            user: "",
            comment: ""
        }
    ]);

    useEffect(() => {
        fetch("/api/about")
            .then(data => data.json())
            .then((data: AboutData) => {
                setName(data.name);
                setBirthday(data.birth);
                setInfo(data.info);
                setImg(data.img);
                setComments(data.comments);
            });
    }, []);

    return (
        <section className="about">
            <div>
                <div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}>{name}</td>
                            </tr>
                            <tr>
                                <td>BIRTH.</td>
                                <td>{birthday}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><p>{info}</p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <Image src={"/api/img/" + img.filename} width={img.width} height={img.height} draggable={false} />
                </div>
            </div>
            <div>
                <h2>Comments</h2>
            </div>
            <style jsx>{style}</style>
        </section>
    );
};

export default About;
