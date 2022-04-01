// Package
import React from "react";
import { NextPage } from "next";
import Image from "next/image";

// Global
import { useCommon } from "@contexts/Provider";
import { Provider, useContact } from "@contexts/contact/Provider";

// Local

const Consumer: NextPage = () => {
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
						) : (
							<tbody>
								<tr>
									<td className="font-smoothing">
										EMAIL.
										<br />
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
					<Image src={"/api/file/" + contact.img.filename} width={contact.img.width} height={contact.img.height} draggable={false} alt="Index" />
				</div>
			</div>
		</section>
	);
};

const Contact = () => (
	<Provider>
		<Consumer />
	</Provider>
);

export default Contact;
