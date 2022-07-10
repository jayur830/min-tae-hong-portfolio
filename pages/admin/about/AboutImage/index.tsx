// Package
import { NextPage } from 'next';
import { Card, Button, CardProps, ButtonProps } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { nvl } from '@root/utils';
import Image, { ImageProps } from '@root/components/Image';
import { useImgUri } from '@root/contexts/Provider';

// Local
import { useSetVisibleImageUploadModal, useAboutData, useAboutLoading } from '../Provider';

const AboutImage: NextPage = () => {
	const imgUri = useImgUri();
	const setVisibleImageUploadModal = useSetVisibleImageUploadModal();
	const aboutData = useAboutData();
	const loading = useAboutLoading();

	const uploadButtonProps: ButtonProps = {
		type: 'primary',
		onClick() {
			setVisibleImageUploadModal(true);
		},
	};

	const cardProps: CardProps = {
		title: <Title level={4}>대표 이미지</Title>,
		extra: <Button {...uploadButtonProps}>수정</Button>,
	};

	const imageProps: ImageProps = {
		loading: loading || nvl(aboutData, 'img.filename', '') === '',
		src: `${imgUri}/${nvl(aboutData, 'img.filename', '')}`,
		width: nvl(aboutData, 'img.width', 0),
		height: nvl(aboutData, 'img.height', 0),
		layout: 'intrinsic',
		alt: 'About',
	};

	return (
		<Card {...cardProps}>
			<Image {...imageProps} />
		</Card>
	);
};

export default AboutImage;
