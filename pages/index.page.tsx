// Package
import type { NextPage } from 'next';
import { Row, Col, RowProps, ColProps } from 'antd';

// Global
import { nest, nvl } from '@root/utils';
import Image, { ImageProps } from '@root/components/Image';
import styled from 'styled-components';
import { useImgUri } from '@root/contexts/Provider';

// Local
import { Provider, useHomeData, useHomeLoading } from './Provider';

const Home: NextPage = () => {
	const imgUri = useImgUri();
	const homeData = useHomeData();
	const loading = useHomeLoading();

	const rowProps: RowProps = {
		justify: 'center',
		align: 'middle',
	};

	const colProps: ColProps = {
		xs: 24,
		sm: 24,
		md: 12,
		lg: 12,
	};

	return (
		<Row {...rowProps}>
			<Col {...colProps}>
				<Row {...rowProps} gutter={[40, 20]}>
					{homeData.map((obj: { filename: string; width: number; height: number }, i: number) => {
						const imageProps: ImageProps = {
							loading,
							src: `${imgUri}/${nvl(obj, 'filename', '')}`,
							width: obj.width,
							height: obj.height,
							layout: 'intrinsic',
							alt: 'Home',
						};

						const imageColProps: ColProps = {
							xs: 23,
							sm: 23,
							md: i === 0 ? 24 : 12,
							lg: i === 0 ? 24 : 12,
						};

						return (
							<StyledCol key={i} {...imageColProps}>
								<Image {...imageProps} />
							</StyledCol>
						);
					})}
				</Row>
			</Col>
		</Row>
	);
};

export default nest(Provider, Home);

const StyledCol = styled(Col)(({ theme }) => ({
	textAlign: 'center',
}));
