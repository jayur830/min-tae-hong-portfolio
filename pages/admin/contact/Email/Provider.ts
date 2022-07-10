// Package
import { useCallback } from 'react';
import constate from 'constate';
import { Form, message } from 'antd';

// Global
import { nvl } from '@root/utils';

// Local
import { values } from '../configs';
import { useSetEditEmail } from '../Provider';

const useEmail = () => {
	const setEditEmail = useSetEditEmail();

	const [form] = Form.useForm();

	const onChangeEditMode = useCallback(() => {
		setEditEmail(state => !state);
	}, []);

	const onFinish = useCallback(({ email }: any) => {
		try {
			message.loading({
				key: 'loading',
				content: nvl(values, 'messages.email.loading', ''),
			});

			/** TODO Implement */

			message.destroy('loading');
			message.success(nvl(values, 'messages.email.success', ''));
		} catch (e) {
			message.destroy('loading');
			message.error(nvl(values, 'messages.email.error', ''));
		} finally {
			setEditEmail(false);
		}
	}, []);

	return { form, onChangeEditMode, onFinish };
};

const [Provider, useForm, useOnChangeEditMode, useOnFinish] = constate(
	useEmail,
	value => value.form,
	value => value.onChangeEditMode,
	value => value.onFinish
);

export { Provider, useForm, useOnChangeEditMode, useOnFinish };
