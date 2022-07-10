// Package
import { useCallback, useMemo } from 'react';
import constate from 'constate';
import { Modal, Form, message } from 'antd';

// Global
import { nvl } from '@root/utils';
import AboutQuery from '@root/graphql/queries/getAbout.gql';
import UpdateMutation from '@root/graphql/mutations/UpdateAboutMetadata.gql';

// Local
import { values } from '../configs';
import { useSetVisibleInfoModal, useAboutData } from '../Provider';
import { MutationHookOptions, useMutation } from '@apollo/client';

const useAboutInfoModal = () => {
	const setVisibleInfoModal = useSetVisibleInfoModal();
	const aboutData = useAboutData();

	const data = useMemo(() => [nvl(aboutData, 'name', ''), nvl(aboutData, 'metadata', []).map(({ __typename, ...etc }: any) => etc)], [aboutData]);

	const [form] = Form.useForm();

	const updateMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(
				cache,
				{
					data: {
						updated: { name, metadata },
					},
				}
			) {
				const cachedData = nvl(cache.readQuery({ query: AboutQuery }), 'about', {});
				cache.writeQuery({
					query: AboutQuery,
					data: {
						about: {
							...cachedData,
							name,
							metadata,
						},
					},
				});
			},
		};
	}, []);

	const [updateMetadata] = useMutation(UpdateMutation, updateMutationOptions);

	const onOk = useCallback(() => {
		form.submit();
	}, [form]);

	const onCancel = useCallback(() => {
		setVisibleInfoModal(false);
	}, [form]);

	const onFinish = useCallback(
		(fields: any) => {
			Modal.confirm({
				centered: true,
				title: nvl(values, 'adminAboutInfoModalValue.confirm', ''),
				async onOk() {
					try {
						message.loading({
							key: 'loading',
							content: nvl(values, 'adminAboutInfoModalValue.loading', ''),
						});

						const input = {
							name: nvl(fields, 'name', ''),
							metadata: nvl(fields, 'metadata', []).map(({ label, value }: any) => ({ label, value })),
						};

						await updateMetadata({ variables: { input } });

						message.destroy('loading');
						message.success(nvl(values, 'adminAboutInfoModalValue.success', ''));
					} catch (e) {
						message.destroy('loading');
						message.success(nvl(values, 'adminAboutInfoModalValue.error', ''));
					} finally {
						setVisibleInfoModal(false);
					}
				},
			});
		},
		[form]
	);

	return { form, onOk, onCancel, onFinish, data };
};

const [Provider, useForm, useOnOk, useOnCancel, useOnFinish, useData] = constate(
	useAboutInfoModal,
	value => value.form,
	value => value.onOk,
	value => value.onCancel,
	value => value.onFinish,
	value => value.data
);

export { Provider, useForm, useOnOk, useOnCancel, useOnFinish, useData };
