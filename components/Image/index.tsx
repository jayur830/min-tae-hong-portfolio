// Package
import { CSSProperties, useEffect, useState } from 'react';
import { StaticImageData, default as NextImage, ImageProps as NextImageProps } from 'next/image';
import { Skeleton } from 'antd';

// Global
import NotFountImage from '@root/public/not_found.png';

// Local

export interface ImageProps {
	loading: boolean;
	src: string;
	width?: number | string;
	height?: number | string;
	layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | 'raw';
	alt?: string;
}

const Image = ({ loading, width, height, ...props }: ImageProps) => {
	const [imgSrc, setImgSrc] = useState<string | StaticImageData>('');

	useEffect(() => {
		setImgSrc(loading ? '' : props.src);
	}, [loading]);

	if (loading) {
		const skeletonInlineStyle: CSSProperties = { width, height };
		return <Skeleton.Image style={skeletonInlineStyle} />;
	}

	if (imgSrc === '') {
		return null;
	}

	const imageProps: NextImageProps = {
		...props,
		src: imgSrc,
		width,
		height,
		onError() {
			setImgSrc(NotFountImage);
		},
	};

	return <NextImage {...imageProps} />;
};

export default Image;
