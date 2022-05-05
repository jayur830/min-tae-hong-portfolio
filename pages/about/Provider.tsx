// Package
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import constate from 'constate';

// Global
import { nvl } from '@root/utils';
import AboutQuery from '@root/graphql/queries/getAbout.gql';
import CommentsQuery from '@root/graphql/queries/getComments.gql';
import CommentMutation from '@root/graphql/mutations/postComment.gql';
import { About } from '@root/graphql/scheme';

// Local

const useAbout = () => {
	const [isWriteComment, setWriteComment] = useState<boolean>(false);
	const [visibleInfoModal, setVisibleInfoModal] = useState<boolean>(false);

	const { data: about, loading: aboutLoading } = useQuery<About>(AboutQuery);
	const aboutData = nvl(about, 'about', {});

	const { data: comments, loading: commentsLoading, refetch: commentsRefetch } = useQuery<About>(CommentsQuery);
	const commentsData = nvl(comments, 'comments.comments', []);

	const [postComment] = useMutation(CommentMutation);

	return { isWriteComment, setWriteComment, visibleInfoModal, setVisibleInfoModal, aboutData, aboutLoading, commentsData, commentsLoading, commentsRefetch, postComment };
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
	usePostComment,
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
	value => value.postComment
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
	usePostComment,
};
