import React, { useCallback, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useImgUpload } from "../../hooks/useImgUpload";

const Contact: NextPage = () => {
    const commonState = useSelector((state: any) => state.common);
    const contactState = useSelector((state: any) => state.contact);

    const dispatch = useDispatch();

    const [email, setEmail] = useState(contactState.email);
    const [tel, setTel] = useState(contactState.tel);
    const [imgFile, setImgFile] = useState(null);
    const [editEmail, setEditEmail] = useState(false);
    const [editTel, setEditTel] = useState(false);
    const [editImg, setEditImg] = useState(false);

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

    const commitImgFile = useCallback((_id: string, img: { filename: string, width: number, height: number }, file: File) => {
        fetch("/api/admin/contact/setImgFile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id,
                img
            })
        });
        useImgUpload(file);
        dispatch({ type: "SET_CONTACT_DATA", payload: { img } });
        setEditImg(false);
    }, [dispatch]);

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
                    <Image src={"/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} alt="Contact" />
                    <br />
                    {editImg ?
                        <>
                            <input type="file" onChange={e => {
                                if (e.target.files && e.target.files.length > 0)
                                    setImgFile(e.target.files[0] as any);
                            }} />
                            <br />
                            <input type="button" defaultValue="등록" onClick={() => {
                                const _URL = window.URL || window.webkitURL;
                                const img = new window.Image();
                                const src = _URL.createObjectURL(imgFile as any);
                                img.onload = () => {
                                    _URL.revokeObjectURL(src);
                                    let [width, height] = [img.width, img.height];
                                    if (width > 500) {
                                        height = Math.round(height * 500 / width);
                                        width = 500;
                                    } else if (height > 600) {
                                        width = Math.round(width * 600 / height);
                                        height = 600;
                                    }
                                    commitImgFile(contactState._id, {
                                        filename: (imgFile as any).name,
                                        width,
                                        height
                                    }, imgFile as any);
                                    setEditImg(false);
                                };
                                img.src = src;
                            }} />
                            <input type="button" defaultValue="취소" onClick={() => {
                                setImgFile(null);
                                setEditImg(false);
                            }} />
                        </> :
                        <input type="button" defaultValue="편집" onClick={() => setEditImg(true)} />
                    }
                </div>
            </div>
        </section>
    );
};

export default Contact;
