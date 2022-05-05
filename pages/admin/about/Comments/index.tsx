// Package
import { useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import { Row, Col, Card, Table, TableProps, Button, Popconfirm, message } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { values } from '../configs';
import { assignKeys, nvl } from '@root/utils';

// Local
import { useCommentsData } from '../Provider';

const Comments: NextPage = () => {
	const commentsData = useCommentsData();

	const onRemove = useCallback(({ date, comment }: any) => {
		try {
			message.loading({
				key: 'loading',
				content: nvl(values, 'adminAboutCommentsValue.loadingText', ''),
			});
			/** TODO Implement */
			message.destroy('loading');
			message.success(nvl(values, 'adminAboutCommentsValue.infoText', ''));
		} catch (e) {
			message.destroy('loading');
			message.error(nvl(values, 'adminAboutCommentsValue.errorText', ''));
		}
	}, []);

	const getColumns = useCallback(() => {
		return nvl(values, 'adminAboutCommentsValue.columns', []).map((column: any) => {
			const key = nvl(column, 'key', '');

			if (key === 'option') {
				return {
					...column,
					render(_: any, record: any) {
						return (
							<Row gutter={[10, 0]}>
								<Col>
									<Popconfirm
										title={nvl(values, 'adminAboutCommentsValue.removeText', '')}
										onConfirm={() => {
											onRemove(record);
										}}>
										<Button>삭제</Button>
									</Popconfirm>
								</Col>
							</Row>
						);
					},
				};
			}

			return column;
		});
	}, []);
	const mergedColumns = useMemo(getColumns, [getColumns]);

	const tableProps: TableProps<any> = {
		bordered: true,
		columns: mergedColumns,
		dataSource: assignKeys(commentsData),
	};

	return (
		<Card title={<Title level={4}>댓글</Title>}>
			<Table {...tableProps} />
		</Card>
	);
};

export default Comments;
