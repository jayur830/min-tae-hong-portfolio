// Package
import { NextPage } from 'next';
import { Col, Descriptions, Layout, Row, RowProps, Image as AntImage, Skeleton } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

// Global
import { nest, nvl } from '@root/utils';
import { values, DarkModeProps } from '@root/configs';
import { useDarkMode, useImgUri } from '@contexts/Provider';
import { Provider, useMoviesData, useMoviesLoading } from '@contexts/movies/Provider';
import YearLine from '@components/YearLine';
import Image, { ImageProps } from '@components/Image';
import Carousel from '@components/Carousel';

// Local

const Movies: NextPage = () => {
	const isDarkMode = useDarkMode();
	const imgUri = useImgUri();
	const moviesData = useMoviesData();
	const loading = useMoviesLoading();

	return (
		<StyledLayout dark-mode={isDarkMode.toString()}>
			{Object.keys(moviesData)
				.sort((a, b) => (a < b ? 1 : -1))
				.map((year, i) => (
					<Row key={i} justify="center">
						<Col xs={22} sm={22} lg={16}>
							<YearLine year={year} />
							{nvl(moviesData, year, []).map((movie: any, j: number) => {
								const { img, video, scenes, ...info } = movie;

								const rowProps: RowProps = {
									justify: 'center',
									align: 'middle',
								};

								const imageProps: ImageProps = {
									loading,
									src: `${imgUri}/${nvl(img, 'filename', '')}`,
									width: nvl(img, 'width', 0),
									height: nvl(img, 'height', 0),
									alt: 'Movies main image',
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
													{values.moviesValue.descriptions
														.map(config => {
															if (loading) return null;
															if (!config.single) {
																return (
																	<Descriptions.Item key={config.name} label={config.label}>
																		{nvl(info, config.name, []).join(', ')}
																	</Descriptions.Item>
																);
															}

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
															if (loading) return <Skeleton.Image />;

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

export default nest(Provider, Movies);

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
