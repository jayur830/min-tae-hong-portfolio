// Package
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import ContactQuery from '@graphql/queries/getContact.gql';

// Local

const useContact = () => {
	const { data: contact } = useQuery(ContactQuery);
	const contactData = nvl(contact, 'contact', {});

	return { contactData };
};

const [Provider, useContactData] = constate(useContact, value => value.contactData);

export { Provider, useContactData };
