// Package
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import constate from 'constate';

// Global
import { nvl } from '@root/utils';
import AboutQuery from '@graphql/queries/getAbout.gql';
import CommentsQuery from '@graphql/queries/getComments.gql';
import CommentMutation from '@graphql/mutations/postComment.gql';

// Local

const useAbout = () => {
	const [isWriteComment, setWriteComment] = useState(false);

	const { data: about, loading: aboutLoading } = useQuery(AboutQuery);
	const aboutData = nvl(about, 'about', {});

	const { data: comments, loading: commentsLoading, refetch: commentsRefetch } = useQuery(CommentsQuery);
	const commentsData = nvl(comments, 'comments.comments', []);

	const [postComment] = useMutation(CommentMutation);

	return { isWriteComment, setWriteComment, aboutData, aboutLoading, commentsData, commentsLoading, commentsRefetch, postComment };
};

const [Provider, useWriteComment, useSetWriteComment, useAboutData, useAboutLoading, useCommentsData, useCommentsLoading, useCommentsRefetch, usePostComment] = constate(
	useAbout,
	value => value.isWriteComment,
	value => value.setWriteComment,
	value => value.aboutData,
	value => value.aboutLoading,
	value => value.commentsData,
	value => value.commentsLoading,
	value => value.commentsRefetch,
	value => value.postComment
);

export { Provider, useWriteComment, useSetWriteComment, useAboutData, useAboutLoading, useCommentsData, useCommentsLoading, useCommentsRefetch, usePostComment };
