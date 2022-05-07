// Package
import { useEffect, useState } from 'react';
import constate from 'constate';

// Global
import { nvl } from '@root/utils';

// Local
import { useAboutData } from '../Provider';

const useAboutInfoModal = () => {
	const aboutData = useAboutData();
	const [formData, setFormData] = useState<any>(null);

	useEffect(() => {
		setFormData({
			name: nvl(aboutData, 'name', ''),
			metadata: nvl(aboutData, 'metadata', []).map(({ __typename, ...etc }: any) => etc),
		});
	}, [aboutData]);

	return { formData, setFormData };
};

const [Provider, useFormData, useSetFormData] = constate(
	useAboutInfoModal,
	value => value.formData,
	value => value.setFormData
);

export { Provider, useFormData, useSetFormData };
