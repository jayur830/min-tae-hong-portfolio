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
                            <td className="font-smoothing">EMAIL.</td>
                            <td className="font-smoothing">{contactState.email}</td>
                        </tr>
                        <tr>
                            <td className="font-smoothing">TEL.</td>
                            <td className="font-smoothing">{contactState.tel}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div>
                    {/*<Image src={"/api/img/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} />*/}
                    <img src={"/api/img/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
