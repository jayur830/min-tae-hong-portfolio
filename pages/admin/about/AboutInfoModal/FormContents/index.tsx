// Package
import { Fragment, useEffect } from 'react';
import { NextPage } from 'next';
import { Row, Col, Form, FormInstance, Input } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global

// Local
import { useFormData } from '../Provider';

interface Props {
	form: FormInstance<any>;
}

const FormContents: NextPage<Props> = ({ form }) => {
	const formData = useFormData();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(formData);
	}, [form, formData]);

	return (
		<Row gutter={[15, 10]}>
			<Col span={8}>NAME.</Col>
			<Col span={14}>
				<Form.Item name="name">
					<Input />
				</Form.Item>
			</Col>
			<Form.List name="metadata">
				{(fields, { add, remove }) => {
					return (
						<>
							{fields.map((_: any, i: number) => {
								return (
									<Fragment key={i}>
										<Col span={8}>
											<StyledFormItem name={[i, 'label']}>
												<Input />
											</StyledFormItem>
										</Col>
										<Col span={14}>
											<StyledFormItem name={[i, 'value']}>
												<Input />
											</StyledFormItem>
										</Col>
										<Col span={2}>
											<StyledRemoveIcon onClick={() => remove(i)} />
										</Col>
									</Fragment>
								);
							})}
							<StyledFooterCol span={24}>
								<PlusCircleOutlined onClick={add} />
							</StyledFooterCol>
						</>
					);
				}}
			</Form.List>
		</Row>
	);
};

export default FormContents;

const StyledFormItem = styled(Form.Item)(({ theme }) => ({
	marginBottom: 0,
}));

const StyledRemoveIcon = styled(MinusCircleOutlined)(({ theme }) => ({
	fontSize: 18,
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	[':hover']: {
		color: theme.grey3,
	},
	[':active']: {
		color: theme.grey4,
	},
}));

const StyledFooterCol = styled(Col)(({ theme }) => ({
	textAlign: 'center',
	['.anticon']: {
		fontSize: 32,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		[':hover']: {
			color: theme.grey3,
		},
		[':active']: {
			color: theme.grey4,
		},
	},
}));
