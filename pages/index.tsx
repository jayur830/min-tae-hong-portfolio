import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
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
                                <img src="/api/img/photo1.png" width={1000} alt="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="/api/img/photo2.png" width={498} alt="" />
                            </td>
                            <td>
                                <img src="/api/img/photo3.png" width={498} alt="" />
                            </td>
                        </tr>
                    </tbody>
                </table> :
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <img src="/api/img/photo1.png" alt="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="/api/img/photo2.png" alt="" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="/api/img/photo3.png" alt="" />
                            </td>
                        </tr>
                    </tbody>
                </table>}
        </section>
    );
};

export default Index;
