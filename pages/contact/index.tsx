import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useCommon } from "../Provider";
import { Provider, useContact } from "./Provider";

const Contact: NextPage = () => {
    const common = useCommon();
    const contact = useContact();

    return (
        <section className="contact">
            <div>
                <div>
                    <table>
                        {common.windowWidth > 1120 ? (
                            <tbody>
                                <tr>
                                    <td className="font-smoothing">EMAIL.</td>
                                    <td className="font-smoothing">{contact.email}</td>
                                </tr>
                            </tbody>
                        ): (
                            <tbody>
                                <tr>
                                    <td className="font-smoothing">
                                        EMAIL.<br />
                                        {contact.email}
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <div>
                <div>
                    <Image src={"/" + contact.img.filename} width={contact.img.width} height={contact.img.height} draggable={false} alt="Index" />
                </div>
            </div>
        </section>
    );
};

export default () => (
    <Provider>
        <Contact />
    </Provider>
);
