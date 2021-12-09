import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";

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
        </section>
    );
};

export default Contact;
