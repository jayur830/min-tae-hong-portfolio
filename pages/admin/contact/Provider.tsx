// Package
import { useState } from 'react';
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
import { nvl } from '@root/utils';
import { Contact } from '@root/graphql/scheme';
import ContactQuery from '@root/graphql/queries/getContact.gql';

// Local

const useContact = () => {
	const [editEmail, setEditEmail] = useState<boolean>(false);
	const [visibleImageUploadModal, setVisibleImageUploadModal] = useState<boolean>(false);
	const [visiblePreviewModal, setVisiblePreviewModal] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>('');

	const { data: contact, loading: contactLoading } = useQuery<{ contact: Contact }>(ContactQuery);
	const contactData = nvl(contact, 'contact', {});

	return {
		editEmail,
		setEditEmail,
		visibleImageUploadModal,
		setVisibleImageUploadModal,
		visiblePreviewModal,
		setVisiblePreviewModal,
		previewImage,
		setPreviewImage,
		contactData,
		contactLoading,
	};
};

const [
	Provider,
	useEditEmail,
	useSetEditEmail,
	useVisibleImageUploadModal,
	useSetVisibleImageUploadModal,
	useVisiblePreviewModal,
	useSetVisiblePreviewModal,
	usePreviewImage,
	useSetPreviewImage,
	useContactData,
	useContactLoading,
] = constate(
	useContact,
	value => value.editEmail,
	value => value.setEditEmail,
	value => value.visibleImageUploadModal,
	value => value.setVisibleImageUploadModal,
	value => value.visiblePreviewModal,
	value => value.setVisiblePreviewModal,
	value => value.previewImage,
	value => value.setPreviewImage,
	value => value.contactData,
	value => value.contactLoading
);

export {
	Provider,
	useEditEmail,
	useSetEditEmail,
	useVisibleImageUploadModal,
	useSetVisibleImageUploadModal,
	useVisiblePreviewModal,
	useSetVisiblePreviewModal,
	usePreviewImage,
	useSetPreviewImage,
	useContactData,
	useContactLoading,
};
