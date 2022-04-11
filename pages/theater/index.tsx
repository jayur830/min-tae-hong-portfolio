// Package
import { NextPage } from 'next';
import { Col, Descriptions, Layout, Row, RowProps, Image as AntImage, Skeleton } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

// Global
import { nest, nvl } from '@root/utils';
import { values, DarkModeProps } from '@root/configs';
import { useDarkMode, useImgUri } from '@contexts/Provider';
import { Provider, useTheaterData } from '@contexts/theater/Provider';
import YearLine from '@components/YearLine';
import Image, { ImageProps } from '@components/Image';
import Carousel from '@components/Carousel';

// Local

const Theater: NextPage = () => {
	const isDarkMode = useDarkMode();
	const imgUri = useImgUri();
	const theaterData = useTheaterData();

	return (
		<StyledLayout dark-mode={isDarkMode.toString()}>
			{Object.keys(theaterData)
				.sort((a, b) => (a < b ? 1 : -1))
				.map((year, i) => (
					<Row key={i} justify="center">
						<Col xs={22} sm={22} lg={16}>
							<YearLine year={year} />
							{nvl(theaterData, year, []).map((theater: any, j: number) => {
								const { img, scenes, ...info } = theater;

								const rowProps: RowProps = {
									justify: 'center',
									align: 'middle',
								};

								const imageProps: ImageProps = {
									loading: nvl(img, 'filename', null) == null,
									src: `${imgUri}/${nvl(img, 'filename', '')}`,
									width: nvl(img, 'width', 0),
									height: nvl(img, 'height', 0),
									alt: 'Theater main image',
								};

								return (
									<Content key={j}>
										<StyledImageWrap {...rowProps}>
											<Col span={20}>
												<Image {...imageProps} />
											</Col>
										</StyledImageWrap>
										<Row {...rowProps}>
											<Col span={20}>
												<StyledDescriptions column={1} dark-mode={isDarkMode.toString()}>
													{values.theaterValue.descriptions
														.map(config => {
															if (!config.single) {
																if (nvl(info, config.name, []).length === 0) return null;
																return (
																	<Descriptions.Item key={config.name} label={config.label}>
																		{nvl(info, config.name, []).join(', ')}
																	</Descriptions.Item>
																);
															}

															if (nvl(info, config.name, null) == null) return null;
															return (
																<Descriptions.Item key={config.name} label={config.label}>
																	{nvl(info, config.name, '')}
																</Descriptions.Item>
															);
														})
														.filter(component => component != null)}
												</StyledDescriptions>
											</Col>
										</Row>
										<StyledCarouselWrap {...rowProps}>
											<Col span={20}>
												<Row gutter={[5, 0]} {...rowProps}>
													<Carousel>
														{scenes.map((scene: any, i: number) => {
															if (nvl(scene, 'filename', '') == null) {
																return <Skeleton.Image />;
															}

															return (
																<Col key={i} flex={1}>
																	<AntImage src={`${imgUri}/${nvl(scene, 'filename', '')}`} />
																</Col>
															);
														})}
													</Carousel>
												</Row>
											</Col>
										</StyledCarouselWrap>
									</Content>
								);
							})}
						</Col>
					</Row>
				))}
		</StyledLayout>
	);
};

export default nest(Provider, Theater);

const StyledLayout = styled(Layout)<DarkModeProps>(({ theme, ...props }) => ({
	backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.white,
	transition: 'background-color 0.3s ease',
}));

const StyledImageWrap = styled(Row)(({ theme }) => ({
	['&&']: {
		margin: '10px 0 30px',
		['.ant-col']: {
			display: theme.displayFlex,
			justifyContent: 'center',
		},
	},
}));

const StyledDescriptions = styled(Descriptions)<DarkModeProps>(({ theme, ...props }) => ({
	['.ant-descriptions-item']: {
		padding: 0,
		['.ant-descriptions-item-label, .ant-descriptions-item-content']: {
			color: props['dark-mode'] === 'true' ? theme.white : theme.black,
		},
	},
}));

const StyledCarouselWrap = styled(Row)(({ theme }) => ({
	margin: '50px 0 70px',
	['.ant-col']: {
		display: theme.displayFlex,
		justifyContent: 'center',
	},
}));
