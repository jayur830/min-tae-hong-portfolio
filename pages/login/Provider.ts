// Package
import { useMutation } from '@apollo/client';
import { Form, message } from 'antd';
import constate from 'constate';
import { useCallback } from 'react';

// Global
import LoginMutation from '@root/graphql/mutations/login.gql';
import { useRouter } from 'next/router';

// Local

const uselogin = () => {
	const router = useRouter();

	const [form] = Form.useForm();

	const [login] = useMutation(LoginMutation);

	const onFinish = useCallback(async (fields: any) => {
		const {
			data: { auth },
		} = await login({ variables: fields });
		if (auth) {
			localStorage.setItem('mthp_authentication', 'true');
			router.push('/admin');
		} else {
			message.error('비밀번호가 맞지 않습니다. 다시 시도해주세요.');
		}
	}, []);

	return { form, onFinish };
};

const [Provider, useForm, useOnFinish] = constate(
	uselogin,
	value => value.form,
	value => value.onFinish
);

export { Provider, useForm, useOnFinish };
