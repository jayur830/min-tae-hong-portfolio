// Package
import { useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import { Row, Col, Descriptions, DescriptionsProps, RowProps, Layout, Comment, Avatar, CommentProps, Tooltip, Typography, Button, Form, ButtonProps, FormItemProps, FormProps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';

// Global
import { values, DarkModeProps } from '@root/configs';
import { nest, nvl } from '@root/utils';
import { useImgUri, useDarkMode } from '@root/contexts/Provider';
import Image, { ImageProps } from '@root/components/Image';

// Local
import { Provider, useWriteComment, useSetWriteComment, useAboutData, useAboutLoading, useCommentsData, useCommentsRefetch, usePostComment } from './Provider';

const About: NextPage = () => {
	const isDarkMode = useDarkMode();
	const imgUri = useImgUri();
	const [form] = Form.useForm();
	const isWriteComment = useWriteComment();
	const setWriteComment = useSetWriteComment();
	const aboutData = useAboutData();
	const loading = useAboutLoading();
	const commentsData = useCommentsData();
	const commentsRefetch = useCommentsRefetch();
	const postComment = usePostComment();

	const onWriteComment = useCallback(() => {
		setWriteComment(true);
	}, []);

	const onCancelWriteComment = useCallback(() => {
		setWriteComment(false);
	}, []);

	const onFinish = useCallback(async ({ comment }: any) => {
		const { data: isPostedComment } = await postComment({
			variables: {
				comment,
				date: dayjs().format('YYYY.MM.DD HH:mm:ss'),
			},
		});
		if (isPostedComment) {
			setWriteComment(false);
			commentsRefetch();
		}
	}, []);

	const commentContent = useMemo(() => {
		const formProps: FormProps = {
			form,
			layout: 'vertical',
			autoComplete: 'off',
			onFinish,
		};

		const formItemProps: FormItemProps = {
			name: 'comment',
			required: nvl(values, 'aboutValue.required', false),
			rules: nvl(values, 'aboutValue.rules', []),
			initialValue: nvl(values, 'aboutValue.initialValue', ''),
		};

		const cancelButtonProps: ButtonProps = {
			type: nvl(values, 'aboutValue.comments.buttons.cancel.type', 'default'),
			className: isDarkMode ? 'dark-mode' : '',
			onClick: onCancelWriteComment,
		};

		const submitButtonProps: ButtonProps = {
			type: nvl(values, 'aboutValue.comments.buttons.submit.type', 'default'),
			htmlType: 'submit',
			className: isDarkMode ? 'dark-mode' : '',
		};

		return (
			<Form {...formProps}>
				<Form.Item {...formItemProps}>
					<TextArea />
				</Form.Item>
				<Form.Item>
					<Row justify="end" gutter={[5, 0]}>
						<Col>
							<Button {...cancelButtonProps}>{nvl(values, 'aboutValue.comments.buttons.cancel.label', '')}</Button>
						</Col>
						<Col>
							<Button {...submitButtonProps}>{nvl(values, 'aboutValue.comments.buttons.submit.label', '')}</Button>
						</Col>
					</Row>
				</Form.Item>
			</Form>
		);
	}, [form, isDarkMode]);

	const imageProps: ImageProps = {
		loading,
		src: `${imgUri}/${nvl(aboutData, 'img.filename', '')}`,
		width: nvl(aboutData, 'img.width', 0),
		height: nvl(aboutData, 'img.height', 0),
		layout: 'intrinsic',
		alt: 'About',
	};

	const writeButtonProps: ButtonProps = {
		type: nvl(values, 'aboutValue.comments.buttons.write.type', 'default'),
		className: isDarkMode ? 'dark-mode' : '',
		onClick: onWriteComment,
	};

	return (
		<StyledLayout dark-mode={`${isDarkMode}`}>
			<StyledAboutContent {...rowProps}>
				<Col xs={24} sm={24} md={12} lg={8}>
					<StyledDescriptions {...descriptionsProps} dark-mode={`${isDarkMode}`}>
						<Descriptions.Item key={0} label="NAME.">
							{nvl(aboutData, 'name', '')}
						</Descriptions.Item>
						{nvl(aboutData, 'metadata', []).map(({ label, value }: any, i: number) => (
							<Descriptions.Item key={i + 1} label={`${label}.`}>
								{value}
							</Descriptions.Item>
						))}
					</StyledDescriptions>
				</Col>
				<Col xs={23} sm={23} md={11} lg={8}>
					<Image {...imageProps} />
				</Col>
			</StyledAboutContent>
			<StyledAboutCommentsWrap {...rowProps}>
				<Col xs={22} sm={22} lg={15}>
					<StyledCommentsTitle level={4} dark-mode={`${isDarkMode}`}>
						Comments
					</StyledCommentsTitle>
					{commentsData.map(({ comment, date }: any, i: number) => {
						const commentProps: CommentProps = {
							avatar: <Avatar icon={<UserOutlined />} />,
							content: comment,
							datetime: (
								<Tooltip title={date}>
									<Typography.Text>{date}</Typography.Text>
								</Tooltip>
							),
						};

						return <StyledComment key={i} {...commentProps} dark-mode={`${isDarkMode}`} />;
					})}
					{isWriteComment ? (
						<Row>
							<Col span={24}>
								<Comment avatar={<Avatar icon={<UserOutlined />} />} content={commentContent} />
							</Col>
						</Row>
					) : (
						<StyledCommentButton {...writeButtonProps}>{nvl(values, 'aboutValue.comments.buttons.write.label', '')}</StyledCommentButton>
					)}
				</Col>
			</StyledAboutCommentsWrap>
		</StyledLayout>
	);
};

export default nest(Provider, About);

const rowProps: RowProps = {
	justify: 'center',
	align: 'middle',
	gutter: [50, 0],
};

const descriptionsProps: DescriptionsProps = {
	bordered: true,
	column: 1,
	colon: false,
};

const StyledLayout = styled(Layout)<DarkModeProps>(({ theme, ...props }) => ({
	justifyContent: 'center',
	backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.white,
	transition: 'background-color 0.3s ease',
}));

const StyledAboutContent = styled(Row)(({ theme }) => ({
	margin: '50px 0',
	[`@media screen and (max-width: ${theme.mobileSize})`]: {
		flexDirection: 'column-reverse',
	},
}));

const StyledDescriptions = styled(Descriptions)<DarkModeProps>(({ theme, ...props }) => ({
	['&&']: {
		['.ant-descriptions-view']: {
			backgroundColor: 'transparent',
			border: theme.none,
			['tr, th, td']: {
				backgroundColor: 'transparent',
				color: props['dark-mode'] === 'true' ? theme.white : theme.black,
				border: theme.none,
			},
		},
	},
}));

const StyledCommentsTitle = styled(Typography.Title)<DarkModeProps>(({ theme, ...props }) => ({
	['&&']: {
		color: props['dark-mode'] === 'true' ? theme.white : theme.black,
		marginBottom: 30,
	},
}));

const StyledAboutCommentsWrap = styled(Row)(({ theme }) => ({
	margin: '10px 0 60px',
}));

const StyledComment = styled(Comment)<DarkModeProps>(({ theme, ...props }) => ({
	padding: '16px 0 24px',
	['*']: {
		color: props['dark-mode'] === 'true' ? theme.white : theme.black,
	},
}));

const StyledCommentButton = styled(Button)(({ theme }) => ({
	float: 'right',
}));
