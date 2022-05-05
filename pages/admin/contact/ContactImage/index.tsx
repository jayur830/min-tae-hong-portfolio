// Package
import { NextPage } from 'next';
import { Card, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { nvl } from '@root/utils';
import Image, { ImageProps } from '@root/components/Image';
import { useImgUri } from '@root/contexts/Provider';

// Local
import { useContactData, useContactLoading } from '../Provider';

const ContactImage: NextPage = () => {
	const imgUri = useImgUri();
	const contactData = useContactData();
	const loading = useContactLoading();

	const imageProps: ImageProps = {
		loading,
		src: `${imgUri}/${nvl(contactData, 'img.filename', '')}`,
		width: nvl(contactData, 'img.width', 0),
		height: nvl(contactData, 'img.height', 0),
		layout: 'intrinsic',
		alt: 'About',
	};

	return (
		<Card title={<Title level={4}>대표 이미지</Title>} extra={<Button type="primary">수정</Button>}>
			<Image {...imageProps} />
		</Card>
	);
};

export default ContactImage;
