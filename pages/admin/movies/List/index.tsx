// Package
import { useCallback, useMemo } from 'react';
import { Row, Col, Card, CardProps, Descriptions, Space, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { nvl } from '@root/utils';

// Local
import { values } from '../configs';
import { useMoviesData, useSetVisibleModifyModal, useSetSelectedData, useOnRemoveByYear, useOnRemove } from '../Provider';

export default function List() {
	const moviesData = useMoviesData();
	const setVisibleModifyModal = useSetVisibleModifyModal();
	const setSelectedData = useSetSelectedData();
	const onRemoveByYear = useOnRemoveByYear();
	const onRemove = useOnRemove();

	const onShowModifyModal = useCallback((data: any) => {
		setVisibleModifyModal(true);
		setSelectedData(data);
	}, []);

	const getContents = useCallback(() => {
		return Object.keys(moviesData)
			.reverse()
			.map(year => {
				return {
					year,
					contents: nvl(moviesData, year, []).map(({ __typename, ...etc }: any) => etc),
				};
			});
	}, [moviesData]);
	const contents = useMemo(getContents, [getContents]);

	return (
		<Row justify="end" gutter={[0, 15]}>
			<Col>
				<Button type="primary" onClick={() => setVisibleModifyModal(true)}>
					추가
				</Button>
			</Col>
			{contents.map(({ year, contents }, i: number) => {
				const cardProps: CardProps = {
					title: <Title level={4}>{year}</Title>,
					extra: <Button onClick={() => onRemoveByYear(+year)}>삭제</Button>,
				};

				return (
					<Col key={i} span={24}>
						<Card {...cardProps}>
							<Row justify="center" gutter={[0, 15]}>
								{contents.map((item: any, j: number) => {
									const cardProps: CardProps = {
										title: nvl(item, 'title', ''),
										extra: (
											<Space>
												<Button type="primary" onClick={() => onShowModifyModal({ ...item, year: +year })}>
													수정
												</Button>
												<Button onClick={() => onRemove(item.id)}>삭제</Button>
											</Space>
										),
									};

									return (
										<Col key={j} span={24}>
											<Card {...cardProps}>
												<Row gutter={[15, 0]}>
													<Col span={12}>
														<Descriptions column={1}>
															{nvl(values, 'adminMoviesModifyModalValue.descriptions', []).map(({ key, label }: any) => {
																if (['title', 'img', 'scenes'].includes(key)) {
																	return null;
																}

																if (key === 'actors') {
																	return (
																		nvl(item, `${key}.length`, 0) && (
																			<Descriptions.Item key={key} label={label}>
																				{nvl(item, key, []).join(', ')}
																			</Descriptions.Item>
																		)
																	);
																}

																if (key === 'awards') {
																	return (
																		nvl(item, `${key}.length`, 0) && (
																			<Descriptions.Item key={key} label={label} contentStyle={{ whiteSpace: 'pre-line' }}>
																				{nvl(item, key, []).join('\n')}
																			</Descriptions.Item>
																		)
																	);
																}

																return (
																	<Descriptions.Item key={key} label={label}>
																		{nvl(item, key, '')}
																	</Descriptions.Item>
																);
															})}
														</Descriptions>
													</Col>
													<Col span={12}></Col>
												</Row>
											</Card>
										</Col>
									);
								})}
								<Col>
									<StyledPlusOutlined onClick={() => setVisibleModifyModal(true)} />
								</Col>
							</Row>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}

const StyledPlusOutlined = styled(PlusOutlined)(({ theme }) => ({
	fontSize: 24,
	transition: 'all 0.2s ease',
	cursor: 'pointer',
	[':hover']: {
		color: theme.grey4,
	},
}));
