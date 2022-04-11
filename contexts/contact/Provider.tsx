// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import ContactQuery from '@graphql/queries/getContact.gql';

// Local

const useContact = () => {
	const { data: contact, loading: contactLoading } = useQuery(ContactQuery);
	const contactData = nvl(contact, 'contact', {});

	return { contactData, contactLoading };
};

const [Provider, useContactData, useContactLoading] = constate(
	useContact,
	value => value.contactData,
	value => value.contactLoading
);

export { Provider, useContactData, useContactLoading };
