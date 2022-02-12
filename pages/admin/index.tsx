import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useSelector } from "react-redux";

const Index: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);

    return (
        <section className="home">
            {commonState.windowWidth > 1120 ?
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <Image src="/photo1.png" width={1000} height={667} draggable={false} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Image src="/photo2.png" width={498} height={747} draggable={false} />
                            </td>
                            <td>
                                <Image src="/photo3.png" width={498} height={747} draggable={false} />
                            </td>
                        </tr>
                    </tbody>
                </table> :
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <Image src="/photo1.png" width={1000} height={667} draggable={false} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Image src="/photo2.png" width={1000} height={1500} draggable={false} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Image src="/photo3.png" width={1000} height={1500} draggable={false} />
                            </td>
                        </tr>
                    </tbody>
                </table>}
        </section>
    );
};

export default Index;
