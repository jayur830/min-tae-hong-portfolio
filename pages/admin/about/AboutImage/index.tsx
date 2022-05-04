// Package
import { NextPage } from 'next';
import { Card, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { nvl } from '@root/utils';
import Image, { ImageProps } from '@root/components/Image';
import { useImgUri } from '@root/contexts/Provider';

// Local
import { useAboutData, useAboutLoading } from '../Provider';

const AboutImage: NextPage = () => {
	const imgUri = useImgUri();
	const aboutData = useAboutData();
	const loading = useAboutLoading();

	const imageProps: ImageProps = {
		loading,
		src: `${imgUri}/${nvl(aboutData, 'img.filename', '')}`,
		width: nvl(aboutData, 'img.width', 0),
		height: nvl(aboutData, 'img.height', 0),
		layout: 'intrinsic',
		alt: 'About',
	};

	return (
		<Card title={<Title level={4}>Image</Title>} extra={<Button type="primary">수정</Button>}>
			<Image {...imageProps} />
		</Card>
	);
};

export default AboutImage;
