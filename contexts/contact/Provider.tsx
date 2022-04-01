// Package
import { useEffect, useState } from "react";
import constate from "constate";

// Global
import { Contact } from "@root/types";

// Local

const ContactContext = () => {
	const [contact, setContact] = useState<Contact>({
		email: "",
		img: {
			filename: "",
			width: 0,
			height: 0,
		},
	});
	useEffect(() => {
		fetch("/api/contact/data")
			.then((response) => response.json())
			.then(setContact);
	}, [setContact]);

	return {
		contact,
		setContact,
	};
};

const [Provider, useContact, useSetContact] = constate(
	ContactContext,
	(value) => value.contact,
	(value) => value.setContact
);

export { Provider, useContact, useSetContact };