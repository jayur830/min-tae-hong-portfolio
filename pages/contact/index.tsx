import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";

const Contact: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);
    const contactState = useSelector((state: any) => state.contact);

    return (
        <section className="contact">
            <div>
                <div>
                    <table>
                        {commonState.windowWidth > 1120 ? (
                            <tbody>
                                <tr>
                                    <td className="font-smoothing">EMAIL.</td>
                                    <td className="font-smoothing">{contactState.email}</td>
                                </tr>
                            </tbody>
                        ): (
                            <tbody>
                                <tr>
                                    <td className="font-smoothing">
                                        EMAIL.<br />
                                        {contactState.email}
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <div>
                <div>
                    <Image src={"/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} alt="Index" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
