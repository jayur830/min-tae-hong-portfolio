import React, { useCallback, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const Contact: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);
    const contactState = useSelector((state: any) => state.contact);

    const dispatch = useDispatch();

    const [email, setEmail] = useState(contactState.email);
    const [tel, setTel] = useState(contactState.tel);
    const [editEmail, setEditEmail] = useState(false);
    const [editTel, setEditTel] = useState(false);

    const commitEmail = useCallback((_id: string, email: string) => {
        fetch(`/api/admin/contact/setEmail?_id=${_id}&email=${email}`);
        dispatch({ type: "SET_CONTACT_DATA", payload: { email } });
        setEditEmail(false);
    }, [dispatch, setEditEmail]);

    const commitTel = useCallback((_id: string, tel: string) => {
        fetch(`/api/admin/contact/setTel?_id=${_id}&tel=${tel}`);
        dispatch({ type: "SET_CONTACT_DATA", payload: { tel } });
        setEditTel(false);
    }, [dispatch, setEditTel]);

    return (
        <section className="contact">
            <div>
                <div>
                    <table>
                        {commonState.windowWidth > 1120 ? (
                            <tbody>
                                {editEmail ?
                                    <tr>
                                        <td className="font-smoothing">EMAIL.</td>
                                        <td className="font-smoothing">
                                            <input type="text" defaultValue={contactState.email} onKeyUp={(e: any) => {
                                                if (e.key === "Enter") commitEmail(contactState._id, e.target.value);
                                                else setEmail(e.target.value);
                                            }} />
                                        </td>
                                        <td className="font-smoothing">
                                            <input type="button" value="등록" onClick={() => commitEmail(contactState._id, email)} />
                                            <input type="button" value="취소" onClick={() => setEditEmail(false)} />
                                        </td>
                                    </tr> :
                                    <tr>
                                        <td className="font-smoothing">EMAIL.</td>
                                        <td className="font-smoothing">{contactState.email}</td>
                                        <td className="font-smoothing">
                                            <input type="button" value="편집" onClick={() => setEditEmail(true)} />
                                        </td>
                                    </tr>}
                                {editTel ?
                                    <tr>
                                        <td className="font-smoothing">TEL.</td>
                                        <td className="font-smoothing">
                                            <input type="text" defaultValue={contactState.tel} onKeyUp={(e: any) => {
                                                if (e.key === "Enter") commitTel(contactState._id, e.target.value);
                                                else setTel(e.target.value);
                                            }} />
                                        </td>
                                        <td className="font-smoothing">
                                            <input type="button" value="등록" onClick={() => commitTel(contactState._id, tel)} />
                                            <input type="button" value="취소" onClick={() => setEditTel(false)} />
                                        </td>
                                    </tr> :
                                    <tr>
                                        <td className="font-smoothing">TEL.</td>
                                        <td className="font-smoothing">{contactState.tel}</td>
                                        <td className="font-smoothing">
                                            <input type="button" value="편집" onClick={() => setEditTel(true)} />
                                        </td>
                                    </tr>}
                            </tbody>
                        ): (
                            <tbody>
                                {editEmail ?
                                    <tr>
                                        <td className="font-smoothing">
                                            EMAIL.<br />
                                            <input type="text" defaultValue={contactState.email} onKeyUp={(e: any) => {
                                                if (e.key === "Enter") commitEmail(contactState._id, e.target.value);
                                                else setEmail(e.target.value);
                                            }} />
                                            <br />
                                            <input type="button" value="등록" onClick={() => commitEmail(contactState._id, email)} />
                                            <input type="button" value="취소" onClick={() => setEditEmail(false)} />
                                        </td>
                                    </tr> :
                                    <tr>
                                        <td className="font-smoothing">
                                            EMAIL.<br />
                                            {contactState.email}<br />
                                            <input type="button" value="편집" onClick={() => setEditEmail(true)} />
                                        </td>
                                    </tr>}
                                {editTel ?
                                    <tr>
                                        <td className="font-smoothing">
                                            TEL.<br />
                                            <input type="text" defaultValue={contactState.tel} onKeyUp={(e: any) => {
                                                if (e.key === "Enter") commitTel(contactState._id, e.target.value);
                                                else setTel(e.target.value);
                                            }} />
                                            <br />
                                            <input type="button" value="등록" onClick={() => commitTel(contactState._id, tel)} />
                                            <input type="button" value="취소" onClick={() => setEditTel(false)} />
                                        </td>
                                    </tr> :
                                    <tr>
                                        <td className="font-smoothing">
                                            TEL.<br />
                                            {contactState.tel}<br />
                                            <input type="button" value="편집" onClick={() => setEditTel(true)} />
                                        </td>
                                    </tr>}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <div>
                <div>
                    <Image src={"/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} />
                </div>
            </div>
        </section>
    );
};

export default Contact;
