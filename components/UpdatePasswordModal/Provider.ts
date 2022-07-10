// Package
import { useCallback, useMemo } from 'react';
import constate from 'constate';
import { useMutation } from '@apollo/client';
import { Modal, Form, message } from 'antd';
import crypto from 'crypto';

// Global
import { useSetVisibleUpdatePasswordModal } from '@root/contexts/Provider';
import UpdatePassword from '@root/graphql/mutations/updateSecret.gql';
import { values } from './configs';
import { nvl } from '@root/utils';
import { FormItemUnionType } from '../FormContent/configs';
import { Rule } from 'antd/lib/form';

// Local

const useUpdatePasswordModal = () => {
	const setVisibleUpdatePasswordModal = useSetVisibleUpdatePasswordModal();

	const [form] = Form.useForm();

	const [updatePassword] = useMutation(UpdatePassword);

	const onOk = useCallback(() => {
		form.submit();
	}, []);

	const onCancel = useCallback(() => {
		setVisibleUpdatePasswordModal(false);
	}, []);

	const onFinish = useCallback((fields: any) => {
		Modal.confirm({
			centered: true,
			width: 'fit-content',
			title: nvl(values, 'messages.confirm', ''),
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'messages.loading', ''),
					});

					const { password } = fields;
					const newPassword = crypto.createHash('sha256').update(password).digest('hex');

					await updatePassword({ variables: { newPassword } });

					message.destroy('loading');
					message.success(nvl(values, 'messages.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'messages.error', ''));
				} finally {
					setVisibleUpdatePasswordModal(false);
				}
			},
		});
	}, []);

	const formItems = useMemo(() => {
		return nvl(values, 'formItems', []).map((item: FormItemUnionType) => {
			const key = nvl(item, 'key', '');

			if (key === 'passwordConfirm') {
				return {
					...item,
					rules: [
						{
							validator(_: Rule, value: string) {
								if (value == null || value === '') {
									return Promise.reject('비밀번호 확인을 입력해주세요.');
								}

								if (form.getFieldValue('password') !== value) {
									return Promise.reject('입력하신 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
								}

								return Promise.resolve();
							},
						},
					],
				};
			}

			return item;
		});
	}, []);

	return { form, onOk, onCancel, onFinish, formItems };
};

const [Provider, useForm, useOnOk, useOnCancel, useOnFinish, useFormItems] = constate(
	useUpdatePasswordModal,
	value => value.form,
	value => value.onOk,
	value => value.onCancel,
	value => value.onFinish,
	value => value.formItems
);

export { Provider, useForm, useOnOk, useOnCancel, useOnFinish, useFormItems };
