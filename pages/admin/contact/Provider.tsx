// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import ContactQuery from '@root/graphql/queries/getContact.gql';
import { Contact } from '@root/graphql/scheme';
import { useState } from 'react';

// Local

const useContact = () => {
	const [editEmail, setEditEmail] = useState<boolean>(false);

	const { data: contact, loading: contactLoading } = useQuery<{ contact: Contact }>(ContactQuery);
	const contactData = nvl(contact, 'contact', {});

	return { contactData, contactLoading, editEmail, setEditEmail };
};

const [Provider, useContactData, useContactLoading, useEditEmail, useSetEditEmail] = constate(
	useContact,
	value => value.contactData,
	value => value.contactLoading,
	value => value.editEmail,
	value => value.setEditEmail
);

export { Provider, useContactData, useContactLoading, useEditEmail, useSetEditEmail };
