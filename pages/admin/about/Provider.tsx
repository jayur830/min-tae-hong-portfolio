// Package
import { useMemo, useState } from 'react';
import { useQuery, useMutation, MutationHookOptions } from '@apollo/client';
import constate from 'constate';

// Global
import { nvl } from '@root/utils';
import { About, AboutComment } from '@root/graphql/scheme';
import AboutQuery from '@root/graphql/queries/getAbout.gql';
import CommentsQuery from '@root/graphql/queries/getComments.gql';
import RemoveCommentMutation from '@root/graphql/mutations/removeAboutComment.gql';

// Local

const useAbout = () => {
	const [isWriteComment, setWriteComment] = useState<boolean>(false);
	const [visibleInfoModal, setVisibleInfoModal] = useState<boolean>(false);
	const [visibleImageUploadModal, setVisibleImageUploadModal] = useState<boolean>(false);
	const [visiblePreviewModal, setVisiblePreviewModal] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>('');

	const { data: about, loading: aboutLoading } = useQuery<{ about: About }>(AboutQuery);
	const aboutData = nvl(about, 'about', {});

	const { data: comments, loading: commentsLoading, refetch: commentsRefetch } = useQuery<{ comments: About }>(CommentsQuery);
	const commentsData = nvl(comments, 'comments.comments', []);

	const removeCommentMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed } }) {
				const cachedData = nvl(cache.readQuery({ query: CommentsQuery }), 'comments', {});
				cache.writeQuery({
					query: CommentsQuery,
					data: {
						comments: {
							...cachedData,
							comments: nvl(cachedData, 'comments', []).filter(({ id }: AboutComment) => id !== removed),
						},
					},
				});
			},
		};
	}, []);

	const [removeComment] = useMutation(RemoveCommentMutation, removeCommentMutationOptions);

	return {
		isWriteComment,
		setWriteComment,
		visibleInfoModal,
		setVisibleInfoModal,
		visibleImageUploadModal,
		setVisibleImageUploadModal,
		visiblePreviewModal,
		setVisiblePreviewModal,
		previewImage,
		setPreviewImage,
		aboutData,
		aboutLoading,
		commentsData,
		commentsLoading,
		commentsRefetch,
		removeComment,
	};
};

const [
	Provider,
	useWriteComment,
	useSetWriteComment,
	useVisibleInfoModal,
	useSetVisibleInfoModal,
	useVisibleImageUploadModal,
	useSetVisibleImageUploadModal,
	useVisiblePreviewModal,
	useSetVisiblePreviewModal,
	usePreviewImage,
	useSetPreviewImage,
	useAboutData,
	useAboutLoading,
	useCommentsData,
	useCommentsLoading,
	useCommentsRefetch,
	useRemoveComment,
] = constate(
	useAbout,
	value => value.isWriteComment,
	value => value.setWriteComment,
	value => value.visibleInfoModal,
	value => value.setVisibleInfoModal,
	value => value.visibleImageUploadModal,
	value => value.setVisibleImageUploadModal,
	value => value.visiblePreviewModal,
	value => value.setVisiblePreviewModal,
	value => value.previewImage,
	value => value.setPreviewImage,
	value => value.aboutData,
	value => value.aboutLoading,
	value => value.commentsData,
	value => value.commentsLoading,
	value => value.commentsRefetch,
	value => value.removeComment
);

export {
	Provider,
	useWriteComment,
	useSetWriteComment,
	useVisibleInfoModal,
	useSetVisibleInfoModal,
	useVisibleImageUploadModal,
	useSetVisibleImageUploadModal,
	useVisiblePreviewModal,
	useSetVisiblePreviewModal,
	usePreviewImage,
	useSetPreviewImage,
	useAboutData,
	useAboutLoading,
	useCommentsData,
	useCommentsLoading,
	useCommentsRefetch,
	useRemoveComment,
};
