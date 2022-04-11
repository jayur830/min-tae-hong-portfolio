// Package
import { CSSProperties } from 'react';
import { default as NextImage } from 'next/image';
import { ImageProps as NextImageProps } from 'next/image';
import { Skeleton } from 'antd';

// Global

// Local

export interface ImageProps {
	loading: boolean;
	src: string;
	width?: number | string;
	height?: number | string;
	layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | 'raw';
	alt?: string;
}

const Image = ({ loading, src, width, height, layout, alt }: ImageProps) => {
	const imageProps: NextImageProps = { src, width, height, layout, alt };
	const skeletonInlineStyle: CSSProperties = { width, height };

	return loading ? <Skeleton.Image style={skeletonInlineStyle} /> : <NextImage {...imageProps} />;
};

export default Image;
