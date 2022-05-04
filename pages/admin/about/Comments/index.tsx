// Package
import { NextPage } from 'next';
import { useCallback, useMemo } from 'react';
import { Row, Col, Card, Table, TableProps, Button } from 'antd';
import Title from 'antd/lib/typography/Title';

// Global
import { values } from '@root/configs';
import { assignKeys, nvl } from '@root/utils';

// Local
import { useCommentsData } from '../Provider';

const Comments: NextPage = () => {
	const commentsData = useCommentsData();

	const getColumns = useCallback(() => {
		return nvl(values, 'aboutValue.admin.columns', []).map((column: any) => {
			if (nvl(column, 'key', '') === 'option') {
				return {
					...column,
					render() {
						return (
							<Row gutter={[10, 0]}>
								<Col>
									<Button>수정</Button>
								</Col>
								<Col>
									<Button>삭제</Button>
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
		<Card title={<Title level={4}>Comments</Title>}>
			<Table {...tableProps} />
		</Card>
	);
};

export default Comments;
