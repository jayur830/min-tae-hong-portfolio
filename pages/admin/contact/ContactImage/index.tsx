// Package
import { NextPage } from 'next';
import { Card, CardProps, Button, ButtonProps } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { nvl } from '@root/utils';
import Image, { ImageProps } from '@root/components/Image';
import { useImgUri } from '@root/contexts/Provider';

// Local
import { useSetVisibleImageUploadModal, useContactData, useContactLoading } from '../Provider';

const ContactImage: NextPage = () => {
	const imgUri = useImgUri();
	const setVisibleImageUploadModal = useSetVisibleImageUploadModal();
	const contactData = useContactData();
	const loading = useContactLoading();

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
		loading: loading || nvl(contactData, 'img.filename', '') === '',
		src: `${imgUri}/${nvl(contactData, 'img.filename', '')}`,
		width: nvl(contactData, 'img.width', 0),
		height: nvl(contactData, 'img.height', 0),
		layout: 'intrinsic',
		alt: 'About',
	};

	return (
		<Card {...cardProps}>
			<Image {...imageProps} />
		</Card>
	);
};

export default ContactImage;
