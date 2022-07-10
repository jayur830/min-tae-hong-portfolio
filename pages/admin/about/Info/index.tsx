// Package
import { useCallback } from 'react';
import { NextPage } from 'next';
import { Card, Descriptions, DescriptionsProps, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { nvl } from '@root/utils';

// Local
import { useAboutData, useSetVisibleInfoModal } from '../Provider';

const Info: NextPage = () => {
	const aboutData = useAboutData();
	const setVisibleInfoModal = useSetVisibleInfoModal();

	const onShowInfoModal = useCallback(() => {
		setVisibleInfoModal(true);
	}, []);

	return (
		<Card
			title={<Title level={4}>정보</Title>}
			extra={
				<Button type="primary" onClick={onShowInfoModal}>
					수정
				</Button>
			}>
			<Descriptions {...descriptionsProps}>
				<Descriptions.Item label="NAME.">{nvl(aboutData, 'name', '')}</Descriptions.Item>
				{nvl(aboutData, 'metadata', []).map((obj: any, i: number) => (
					<Descriptions.Item key={i} label={obj.label}>
						{obj.value}
					</Descriptions.Item>
				))}
			</Descriptions>
		</Card>
	);
};

export default Info;

const descriptionsProps: DescriptionsProps = {
	bordered: true,
	column: 1,
	labelStyle: {
		textAlign: 'right',
		padding: '10px 18px',
	},
	contentStyle: {
		padding: '10px 18px',
	},
};
