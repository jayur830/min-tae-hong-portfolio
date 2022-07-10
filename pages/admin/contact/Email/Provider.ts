// Package
import { useCallback, useMemo } from 'react';
import constate from 'constate';
import { MutationHookOptions, useMutation } from '@apollo/client';
import { Form, message } from 'antd';

// Global
import { nvl } from '@root/utils';
import ContactQuery from '@root/graphql/queries/getContact.gql';
import UpdateEmailMutation from '@root/graphql/mutations/updateContactEmail.gql';

// Local
import { values } from '../configs';
import { useSetEditEmail } from '../Provider';

const useEmail = () => {
	const setEditEmail = useSetEditEmail();

	const [form] = Form.useForm();

	const updateEmailMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { updated } }) {
				const cachedData = nvl(cache.readQuery({ query: ContactQuery }), 'contact', {});
				cache.writeQuery({
					query: ContactQuery,
					data: {
						contact: {
							...cachedData,
							email: updated,
						},
					},
				});
			},
		};
	}, []);

	const [updateEmail] = useMutation(UpdateEmailMutation, updateEmailMutationOptions);

	const onChangeEditMode = useCallback(() => {
		setEditEmail(state => !state);
	}, []);

	const onFinish = useCallback(async ({ email }: any) => {
		try {
			message.loading({
				key: 'loading',
				content: nvl(values, 'messages.email.loading', ''),
			});

			await updateEmail({ variables: { email } });

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
