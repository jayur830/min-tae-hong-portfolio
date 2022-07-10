// Package
import { Fragment, useEffect } from 'react';
import { Row, Col, Form, FormProps, Input } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global

// Local
import { useForm, useOnFinish, useData } from '../Provider';

export default function FormContents() {
	const form = useForm();
	const onFinish = useOnFinish();
	const [name, metadata] = useData();

	useEffect(() => {
		form.resetFields();
	}, []);

	const formProps: FormProps = {
		form,
		layout: 'vertical',
		autoComplete: 'off',
		onFinish,
	};

	return (
		<Form {...formProps}>
			<Row gutter={[15, 10]}>
				<Col span={8}>NAME.</Col>
				<Col span={14}>
					<Form.Item name="name" initialValue={name}>
						<Input />
					</Form.Item>
				</Col>
				<Form.List name="metadata" initialValue={metadata}>
					{(fields, { add, remove }) => (
						<>
							{fields.map((_: any, i: number) => (
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
							))}
							<StyledFooterCol span={24}>
								<PlusCircleOutlined onClick={add} />
							</StyledFooterCol>
						</>
					)}
				</Form.List>
			</Row>
		</Form>
	);
}

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
