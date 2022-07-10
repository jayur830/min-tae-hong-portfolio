// Package
import { useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Row, Col, Space, Form, FormProps, Button } from 'antd';
import styled from 'styled-components';

// Global
import { nest, nvl } from '@root/utils';
import FormContent, { FormContentProps } from '@root/components/FormContent';

// Local
import { values } from './configs';
import { Provider, useForm, useOnFinish } from './Provider';

const Login: NextPage = () => {
	const router = useRouter();
	const form = useForm();
	const onFinish = useOnFinish();

	const addOn = useCallback((item: any) => {
		const key = nvl(item, 'key', '');

		if (key === 'submit') {
			return (
				<StyledFormItem>
					<Space align="center">
						<Button type="primary" htmlType="submit">
							로그인
						</Button>
						<Button onClick={() => router.back()}>뒤로가기</Button>
					</Space>
				</StyledFormItem>
			);
		}

		return null;
	}, []);

	const formProps: FormProps = {
		form,
		layout: 'vertical',
		autoComplete: 'off',
		onFinish,
	};

	const formContentProps: FormContentProps = {
		formItems: nvl(values, 'formItems', []),
		addOn,
	};

	return (
		<StyledRow justify="center" align="middle">
			<Col>
				<Form {...formProps}>
					<FormContent {...formContentProps} />
				</Form>
			</Col>
		</StyledRow>
	);
};

export default nest(Provider, Login);

const StyledRow = styled(Row)(({ theme }) => ({
	height: '100%',
}));

const StyledFormItem = styled(Form.Item)(({ theme }) => ({
	textAlign: 'center',
}));
