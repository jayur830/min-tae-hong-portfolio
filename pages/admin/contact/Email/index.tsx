// Package
import { NextPage } from 'next';
import { Row, Col, Card, CardProps, Button, Input, Form } from 'antd';

// Global
import { nvl } from '@root/utils';

// Local
import { useContactData, useEditEmail, useSetEditEmail } from '../Provider';
import { useCallback, useEffect } from 'react';
import Text from 'antd/lib/typography/Text';

const Email: NextPage = () => {
	const [form] = Form.useForm();
	const contactData = useContactData();
	const editEmail = useEditEmail();
	const setEditEmail = useSetEditEmail();

	useEffect(() => {
		if (editEmail) {
			form.resetFields();
			form.setFieldsValue({ email: nvl(contactData, 'email', '') });
		}
	}, [editEmail]);

	const onChangeEditMode = useCallback(() => {
		setEditEmail(state => !state);
	}, []);

	const onModifyEmail = useCallback(() => {
		/** TODO Implement */
		setEditEmail(false);
	}, []);

	const cardProps: CardProps = {
		title: '이메일',
		extra: (
			<Row gutter={[10, 0]}>
				{editEmail ? (
					<>
						<Col>
							<Button onClick={onChangeEditMode}>취소</Button>
						</Col>
						<Col>
							<Button type="primary" onClick={onModifyEmail}>
								확인
							</Button>
						</Col>
					</>
				) : (
					<Col>
						<Button onClick={onChangeEditMode}>수정</Button>
					</Col>
				)}
			</Row>
		),
	};

	return (
		<Card {...cardProps}>
			{editEmail ? (
				<Form form={form} autoComplete="off">
					<Form.Item name="email">
						<Input />
					</Form.Item>
				</Form>
			) : (
				<Text>{nvl(contactData, 'email', '')}</Text>
			)}
		</Card>
	);
};

export default Email;
