// Package
import { useCallback } from 'react';
import { NextPage } from 'next';
// import Image, { ImageProps } from 'next/image';
import { Row, Col, Descriptions, DescriptionsProps, RowProps, Layout, Comment, Avatar, CommentProps, Tooltip, Typography, Button, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { nest, nvl } from '@root/utils';
import { useImgUri, useDarkMode } from '@contexts/Provider';
import { Provider, useWriteComment, useSetWriteComment, useAboutData } from '@contexts/about/Provider';
import Image, { ImageProps } from '@components/Image';

// Local

const About: NextPage = () => {
	const isDarkMode = useDarkMode();
	const imgUri = useImgUri();
	const [form] = Form.useForm();
	const isWriteComment = useWriteComment();
	const setWriteComment = useSetWriteComment();
	const aboutData = useAboutData();

	const onWriteComment = useCallback(() => {
		setWriteComment(true);
	}, []);

	const onCancelWriteComment = useCallback(() => {
		setWriteComment(false);
	}, []);

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

	const imageProps: ImageProps = {
		loading: aboutData == null,
		src: `${imgUri}/${nvl(aboutData, 'img.filename', '')}`,
		width: nvl(aboutData, 'img.width', 0),
		height: nvl(aboutData, 'img.height', 0),
		layout: 'intrinsic',
		alt: 'About',
	};

	return (
		<StyledLayout dark-mode={isDarkMode.toString()}>
			<StyledAboutContent {...rowProps}>
				<Col xs={24} sm={24} md={12} lg={8}>
					<StyledDescriptions {...descriptionsProps} dark-mode={isDarkMode.toString()}>
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
			<StyledAboutCommentsWrap {...rowProps} dir="column">
				<Col xs={22} sm={22} lg={15}>
					<StyledCommentsTitle level={4} dark-mode={isDarkMode.toString()}>
						Comments
					</StyledCommentsTitle>
					{nvl(aboutData, 'comments', []).map(({ comment, date }: any, i: number) => {
						const commentProps: CommentProps = {
							avatar: <Avatar icon={<UserOutlined />} />,
							content: comment,
							datetime: (
								<Tooltip title={date}>
									<Typography.Text>{date}</Typography.Text>
								</Tooltip>
							),
						};

						return <StyledComment key={i} {...commentProps} dark-mode={isDarkMode.toString()} />;
					})}
					{isWriteComment ? (
						<Row>
							<Col span={24}>
								<Comment
									avatar={<Avatar icon={<UserOutlined />} />}
									content={
										<Form form={form} layout="vertical" autoComplete="off">
											<Form.Item name="comment">
												<TextArea />
											</Form.Item>
											<Form.Item>
												<Row justify="end" gutter={[5, 0]}>
													<Col>
														<Button onClick={onCancelWriteComment} className={isDarkMode ? 'dark-mode' : ''}>
															취소
														</Button>
													</Col>
													<Col>
														<Button type="primary" htmlType="submit" className={isDarkMode ? 'dark-mode' : ''}>
															등록
														</Button>
													</Col>
												</Row>
											</Form.Item>
										</Form>
									}
								/>
							</Col>
						</Row>
					) : (
						<StyledCommentButton type="primary" onClick={onWriteComment} className={isDarkMode ? 'dark-mode' : ''}>
							댓글 쓰기
						</StyledCommentButton>
					)}
				</Col>
			</StyledAboutCommentsWrap>
		</StyledLayout>
	);
};

export default nest(Provider, About);

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
