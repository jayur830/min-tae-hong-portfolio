// Package
import { useCallback, useMemo } from 'react';
import constate from 'constate';
import { useMutation, MutationHookOptions } from '@apollo/client';
import { Modal, Form, message } from 'antd';

// Global
import { nvl } from '@root/utils';
import AboutQuery from '@root/graphql/queries/getAbout.gql';
import UpdateMutation from '@root/graphql/mutations/updateAboutImg.gql';

// Local
import { values } from '../configs';
import { useSetVisibleImageUploadModal } from '../Provider';

const useImageUploadModal = () => {
	const setVisibleImageUploadModal = useSetVisibleImageUploadModal();

	const [form] = Form.useForm();

	const updateMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { updated } }) {
				const cachedData = nvl(cache.readQuery({ query: AboutQuery }), 'about', {});
				cache.writeQuery({
					query: AboutQuery,
					data: {
						about: {
							...cachedData,
							img: updated,
						},
					},
				});
			},
		};
	}, []);

	const [updateImg] = useMutation(UpdateMutation, updateMutationOptions);

	const onOk = useCallback(() => {
		form.submit();
	}, []);

	const onCancel = useCallback(() => {
		setVisibleImageUploadModal(false);
	}, []);

	const onFinish = useCallback((fields: any) => {
		Modal.confirm({
			centered: true,
			width: 'fit-content',
			title: nvl(values, 'adminAboutImageUploadModalValue.messages.confirm', ''),
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminAboutImageUploadModalValue.messages.loading', ''),
					});

					await updateImg({
						variables: {
							input: nvl(fields, 'img', null),
						},
					});

					message.destroy('loading');
					message.success(nvl(values, 'adminAboutImageUploadModalValue.messages.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminAboutImageUploadModalValue.messages.error', ''));
				} finally {
					setVisibleImageUploadModal(false);
				}
			},
		});
	}, []);

	const onValuesChange = useCallback((changedValues: any) => {
		if (changedValues.img) {
			changedValues.img.then((img: any) => {
				form.setFieldsValue({ img });
			});
		}
	}, []);

	return { form, onOk, onCancel, onFinish, onValuesChange };
};

const [Provider, useForm, useOnOk, useOnCancel, useOnFinish, useOnValuesChange] = constate(
	useImageUploadModal,
	value => value.form,
	value => value.onOk,
	value => value.onCancel,
	value => value.onFinish,
	value => value.onValuesChange
);

export { Provider, useForm, useOnOk, useOnCancel, useOnFinish, useOnValuesChange };
