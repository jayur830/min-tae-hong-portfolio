// Package
import { useMemo, useState } from 'react';
import { useQuery, useMutation, MutationHookOptions } from '@apollo/client';
import constate from 'constate';

// Global
import { nvl } from '@root/utils';
import { About } from '@root/graphql/scheme';
import AboutQuery from '@root/graphql/queries/getAbout.gql';
import CommentsQuery from '@root/graphql/queries/getComments.gql';
import CreateCommentMutation from '@root/graphql/mutations/createAboutComment.gql';

// Local

const useAbout = () => {
	const [isWriteComment, setWriteComment] = useState<boolean>(false);
	const [visibleInfoModal, setVisibleInfoModal] = useState<boolean>(false);

	const { data: about, loading: aboutLoading } = useQuery<About>(AboutQuery);
	const aboutData = nvl(about, 'about', {});

	const { data: comments, loading: commentsLoading, refetch: commentsRefetch } = useQuery<About>(CommentsQuery);
	const commentsData = nvl(comments, 'comments.comments', []);

	const createCommentMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { created } }) {
				const cachedData = nvl(cache.readQuery({ query: CommentsQuery }), 'comments', {});
				cache.writeQuery({
					query: CommentsQuery,
					data: {
						comments: {
							...cachedData,
							comments: [...nvl(cachedData, 'comments', []), created],
						},
					},
				});
			},
		};
	}, []);

	const [createComment] = useMutation(CreateCommentMutation, createCommentMutationOptions);

	return { isWriteComment, setWriteComment, visibleInfoModal, setVisibleInfoModal, aboutData, aboutLoading, commentsData, commentsLoading, commentsRefetch, createComment };
};

const [
	Provider,
	useWriteComment,
	useSetWriteComment,
	useVisibleInfoModal,
	useSetVisibleInfoModal,
	useAboutData,
	useAboutLoading,
	useCommentsData,
	useCommentsLoading,
	useCommentsRefetch,
	useCreateComment,
] = constate(
	useAbout,
	value => value.isWriteComment,
	value => value.setWriteComment,
	value => value.visibleInfoModal,
	value => value.setVisibleInfoModal,
	value => value.aboutData,
	value => value.aboutLoading,
	value => value.commentsData,
	value => value.commentsLoading,
	value => value.commentsRefetch,
	value => value.createComment
);

export {
	Provider,
	useWriteComment,
	useSetWriteComment,
	useVisibleInfoModal,
	useSetVisibleInfoModal,
	useAboutData,
	useAboutLoading,
	useCommentsData,
	useCommentsLoading,
	useCommentsRefetch,
	useCreateComment,
};
