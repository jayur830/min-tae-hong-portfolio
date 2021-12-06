import React from "react";
import { NextPage } from "next";
import Image from "next/image";

import css from "styled-jsx/css";
import { useSelector } from "react-redux";

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
    const aboutState = useSelector((state: any) => state.about);

    return (
        <section className="about">
            <div>
                <div>
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}>{aboutState.name}</td>
                            </tr>
                            <tr>
                                <td>BIRTH.</td>
                                <td>{aboutState.birth}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}><p>{aboutState.info}</p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <Image src={"/api/img/" + aboutState.img.filename} width={aboutState.img.width} height={aboutState.img.height} draggable={false} />
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
