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

	const { data: about } = useQuery(AboutQuery);
	const aboutData = nvl(about, 'about', {});

	return { isWriteComment, setWriteComment, aboutData };
};

const [Provider, useWriteComment, useSetWriteComment, useAboutData] = constate(
	useAbout,
	value => value.isWriteComment,
	value => value.setWriteComment,
	value => value.aboutData
);

export { Provider, useWriteComment, useSetWriteComment, useAboutData };
