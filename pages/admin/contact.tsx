// Package
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import Image from "next/image";

// Global
import { uploadImage } from "@root/hooks/uploadImage";
import BlackButton from "@components/BlackButton";

// Local

const Contact: NextPage = () => {
	const commonState = useSelector((state: any) => state.common);
	const contactState = useSelector((state: any) => state.contact);

	const dispatch = useDispatch();

	const [email, setEmail] = useState(contactState.email);
	const [imgFile, setImgFile] = useState(null);
	const [editEmail, setEditEmail] = useState(false);
	const [editImg, setEditImg] = useState(false);

	const commitEmail = useCallback(
		(_id: string, email: string) => {
			fetch(`/api/admin/contact/setEmail?_id=${_id}&email=${email}`);
			dispatch({ type: "SET_CONTACT_DATA", payload: { email } });
			setEditEmail(false);
		},
		[dispatch, setEditEmail]
	);

	const commitImgFile = useCallback(
		(_id: string, img: { filename: string; width: number; height: number }, file: File) => {
			fetch("/api/admin/contact/setImgFile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					_id,
					img,
				}),
			});
			uploadImage(file);
			dispatch({ type: "SET_CONTACT_DATA", payload: { img } });
			setEditImg(false);
		},
		[dispatch]
	);

	return (
		<section className="contact">
			<div>
				<div>
					<table>
						{commonState.windowWidth > 1120 ? (
							<tbody>
								{editEmail ? (
									<tr>
										<td className="font-smoothing">EMAIL.</td>
										<td className="font-smoothing">
											<input
												type="text"
												defaultValue={contactState.email}
												onKeyUp={(e: any) => {
													if (e.key === "Enter") commitEmail(contactState._id, e.target.value);
													else setEmail(e.target.value);
												}}
											/>
										</td>
										<td className="font-smoothing">
											<BlackButton onClick={() => commitEmail(contactState._id, email)}>등록</BlackButton>
											<BlackButton onClick={() => setEditEmail(false)}>취소</BlackButton>
										</td>
									</tr>
								) : (
									<tr>
										<td className="font-smoothing">EMAIL.</td>
										<td className="font-smoothing">{contactState.email}</td>
										<td className="font-smoothing">
											<BlackButton onClick={() => setEditEmail(true)}>편집</BlackButton>
										</td>
									</tr>
								)}
							</tbody>
						) : (
							<tbody>
								{editEmail ? (
									<tr>
										<td className="font-smoothing">
											EMAIL.
											<br />
											<input
												type="text"
												defaultValue={contactState.email}
												onKeyUp={(e: any) => {
													if (e.key === "Enter") commitEmail(contactState._id, e.target.value);
													else setEmail(e.target.value);
												}}
											/>
											<br />
											<BlackButton onClick={() => commitEmail(contactState._id, email)}>등록</BlackButton>
											<BlackButton onClick={() => setEditEmail(false)}>취소</BlackButton>
										</td>
									</tr>
								) : (
									<tr>
										<td className="font-smoothing">
											EMAIL.
											<br />
											{contactState.email}
											<br />
											<BlackButton onClick={() => setEditEmail(true)}>편집</BlackButton>
										</td>
									</tr>
								)}
							</tbody>
						)}
					</table>
				</div>
			</div>
			<div>
				<div>
					<Image src={"/" + contactState.img.filename} width={contactState.img.width} height={contactState.img.height} draggable={false} alt="Contact" />
					<br />
					{editImg ? (
						<>
							<input
								type="file"
								onChange={e => {
									if (e.target.files && e.target.files.length > 0) setImgFile(e.target.files[0] as any);
								}}
							/>
							<br />
							<BlackButton
								onClick={() => {
									const _URL = window.URL || window.webkitURL;
									const img = new window.Image();
									const src = _URL.createObjectURL(imgFile as any);
									img.onload = () => {
										_URL.revokeObjectURL(src);
										let [width, height] = [img.width, img.height];
										if (width > 500) {
											height = Math.round((height * 500) / width);
											width = 500;
										} else if (height > 600) {
											width = Math.round((width * 600) / height);
											height = 600;
										}
										commitImgFile(
											contactState._id,
											{
												filename: (imgFile as any).name,
												width,
												height,
											},
											imgFile as any
										);
										setEditImg(false);
									};
									img.src = src;
								}}>
								등록
							</BlackButton>
							<BlackButton
								onClick={() => {
									setImgFile(null);
									setEditImg(false);
								}}>
								취소
							</BlackButton>
						</>
					) : (
						<input type="button" defaultValue="편집" onClick={() => setEditImg(true)} />
					)}
					{/*<BlackButton onClick={() => setEditImg(true)}>편집</BlackButton>}*/}
				</div>
			</div>
		</section>
	);
};

export default Contact;
