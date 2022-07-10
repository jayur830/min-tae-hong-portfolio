// Package
import { useCallback, useMemo } from 'react';
import constate from 'constate';
import { MutationHookOptions, useMutation } from '@apollo/client';
import { Modal, Form, message } from 'antd';

// Global
import { nvl } from '@root/utils';
import { Theaters } from '@root/graphql/scheme';
import TheatersQuery from '@root/graphql/queries/getTheaters.gql';
import CreateMutation from '@root/graphql/mutations/createTheaters.gql';
import UpdateMutation from '@root/graphql/mutations/updateTheaters.gql';

// Local
import { values } from '../configs';
import { useSetVisibleModifyModal, useSelectedData, useSetSelectedData } from '../Provider';

const useModifyModal = () => {
	const setVisibleModifyModal = useSetVisibleModifyModal();
	const selectedData = useSelectedData();
	const setSelectedData = useSetSelectedData();

	const modalType = useMemo(() => (selectedData ? 'update' : 'create'), [selectedData]);

	const [form] = Form.useForm();

	const createMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { created } }) {
				const cachedList = nvl(cache.readQuery({ query: TheatersQuery }), 'theaters', []);
				cache.writeQuery({
					query: TheatersQuery,
					data: {
						theaters: [...cachedList, created],
					},
				});
			},
		};
	}, []);

	const updateMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { updated } }) {
				const cachedList = nvl(cache.readQuery({ query: TheatersQuery }), 'theaters', []);
				cache.writeQuery({
					query: TheatersQuery,
					data: {
						theaters: cachedList.map((item: Theaters) => {
							if (nvl(item, 'id', '') === nvl(updated, 'id', '')) {
								return {
									...item,
									...updated,
								};
							}

							return item;
						}),
					},
				});
			},
		};
	}, []);

	const [createTheaters] = useMutation(CreateMutation, createMutationOptions);
	const [updateTheaters] = useMutation(UpdateMutation, updateMutationOptions);

	const onOk = useCallback(() => {
		form.submit();
	}, [form]);

	const onCancel = useCallback(() => {
		setVisibleModifyModal(false);
	}, []);

	const afterClose = useCallback(() => {
		setSelectedData(null);
	}, []);

	const onFinish = useCallback(
		(fields: any) => {
			Modal.confirm({
				centered: true,
				title: nvl(values, `adminTheatersSubmitModalValue.messages.${modalType}.confirm`, ''),
				async onOk() {
					try {
						message.loading({
							key: 'loading',
							content: nvl(values, `adminTheatersSubmitModalValue.messages.${modalType}.loading`, ''),
						});

						if (modalType === 'update') {
							await updateTheaters({
								variables: {
									updateTheatersInput: {
										...fields,
										id: nvl(selectedData, 'id', ''),
									},
								},
							});
						} else {
							await createTheaters({
								variables: {
									createTheatersInput: fields,
								},
							});
						}

						message.destroy('loading');
						message.success(nvl(values, `adminTheatersSubmitModalValue.messages.${modalType}.success`, ''));
					} catch (e) {
						message.destroy('loading');
						message.error(nvl(values, `adminTheatersSubmitModalValue.messages.${modalType}.error`, ''));
					} finally {
						setVisibleModifyModal(false);
						setSelectedData(null);
					}
				},
			});
		},
		[selectedData]
	);

	const onValuesChange = useCallback((changedValues: { [name: string]: any }) => {
		if (changedValues.img) {
			changedValues.img.then((img: any) => {
				form.setFieldsValue({ img });
			});
		} else if (changedValues.scenes) {
			const oldScenes = changedValues.scenes.slice(0, changedValues.scenes.length - 1);
			changedValues.scenes[changedValues.scenes.length - 1].then((scene: any) => {
				form.setFieldsValue({ scenes: [...oldScenes, scene] });
			});
		}
	}, []);

	return { modalType, form, onOk, onCancel, afterClose, onFinish, onValuesChange };
};

const [Provider, useModalType, useForm, useOnOk, useOnCancel, useAfterClose, useOnFinish, useOnValuesChange] = constate(
	useModifyModal,
	value => value.modalType,
	value => value.form,
	value => value.onOk,
	value => value.onCancel,
	value => value.afterClose,
	value => value.onFinish,
	value => value.onValuesChange
);

export { Provider, useModalType, useForm, useOnOk, useOnCancel, useAfterClose, useOnFinish, useOnValuesChange };
