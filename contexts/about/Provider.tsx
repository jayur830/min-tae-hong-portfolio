// Package
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import constate from 'constate';

// Global
import { nvl } from '@root/utils';
import AboutQuery from '@graphql/queries/getAbout.gql';

// Local

const useAbout = () => {
	const [isWriteComment, setWriteComment] = useState(false);

	const { data: about, loading: aboutLoading } = useQuery(AboutQuery);
	const aboutData = nvl(about, 'about', {});

	return { isWriteComment, setWriteComment, aboutData, aboutLoading };
};

const [Provider, useWriteComment, useSetWriteComment, useAboutData, useAboutLoading] = constate(
	useAbout,
	value => value.isWriteComment,
	value => value.setWriteComment,
	value => value.aboutData,
	value => value.aboutLoading
);

export { Provider, useWriteComment, useSetWriteComment, useAboutData, useAboutLoading };
