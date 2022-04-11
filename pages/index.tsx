// Package
import type { NextPage } from 'next';
import { Row, Col, RowProps, ColProps } from 'antd';

// Global
import { nest, nvl } from '@root/utils';
import { useImgUri } from '@contexts/Provider';
import { Provider, useHomeData } from '@contexts/home/Provider';
import Image, { ImageProps } from '@components/Image';
import styled from 'styled-components';

// Local

const Home: NextPage = () => {
	const imgUri = useImgUri();
	const homeData = useHomeData();

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
							loading: nvl(obj, 'filename', null) == null,
							src: `${imgUri}/${nvl(obj, 'filename', '')}`,
							width: obj.width,
							height: obj.height,
							layout: 'intrinsic',
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
