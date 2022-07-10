// Package
import { NextPage } from 'next';
import { Row, RowProps, Col, Descriptions } from 'antd';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { nest, nvl } from '@root/utils';
import { useImgUri, useDarkMode } from '@root/contexts/Provider';
import Image, { ImageProps } from '@root/components/Image';

// Local
import { Provider, useContactData, useContactLoading } from './Provider';

const Contact: NextPage = () => {
	const isDarkMode = useDarkMode();
	const imgUri = useImgUri();
	const contactData = useContactData();
	const loading = useContactLoading();

	const rowProps: RowProps = {
		justify: 'center',
		align: 'middle',
		gutter: [50, 50],
	};

	const imageProps: ImageProps = {
		loading,
		src: `${imgUri}/${nvl(contactData, 'img.filename', '')}`,
		width: nvl(contactData, 'img.width', 0),
		height: nvl(contactData, 'img.height', 0),
		alt: 'Contact',
	};

	return (
		<StyledRow {...rowProps}>
			<Col sm={24} md={12} lg={12}>
				<StyledDescriptions colon={false} dark-mode={isDarkMode.toString()}>
					<Descriptions.Item label="EMAIL.">{nvl(contactData, 'email', '')}</Descriptions.Item>
				</StyledDescriptions>
			</Col>
			<Col xs={22} sm={22} md={12} lg={12}>
				<Image {...imageProps} layout="intrinsic" />
			</Col>
		</StyledRow>
	);
};

export default nest(Provider, Contact);

const StyledRow = styled(Row)(({ theme }) => ({
	['&&']: {
		[`@media screen and (max-width: ${theme.mobileSize})`]: {
			flexDirection: 'column-reverse',
		},
	},
}));

const StyledDescriptions = styled(Descriptions)<DarkModeProps>(({ theme, ...props }) => ({
	['.ant-descriptions-view']: {
		width: 'fit-content',
		['> table']: {
			width: theme.inherit,
			['*']: {
				color: props['dark-mode'] === 'true' ? theme.white : theme.black,
			},
		},
	},
}));
