// Package
import { useState, useCallback, useMemo } from 'react';
import constate from 'constate';
import { MutationHookOptions, useMutation, useQuery } from '@apollo/client';
import { message, Modal } from 'antd';

// Global
import { nvl } from '@root/utils';
import { Dramas } from '@root/graphql/scheme';
import DramasQuery from '@root/graphql/queries/getDramas.gql';
import RemoveMutation from '@root/graphql/mutations/removeDramas.gql';
import RemoveByYearMutation from '@root/graphql/mutations/removeByYearDramas.gql';

// Local
import { values } from './configs';

const useDramas = () => {
	const [visibleModifyModal, setVisibleModifyModal] = useState<boolean>(false);
	const [selectedData, setSelectedData] = useState<any>(null);
	const [visiblePreviewModal, setVisiblePreviewModal] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>('');

	const { data: dramas, loading: dramasLoading } = useQuery<{ dramas: Dramas }>(DramasQuery);
	const dramasData = useMemo(() => {
		return nvl(dramas, 'dramas', []).reduce((result: any, drama: any) => {
			const { year, img, scenes, ...etc } = drama;
			if (!(year in result))
				result = {
					...result,
					[year]: [],
				};

			return {
				...result,
				[year]: [
					...result[year],
					{
						...etc,
						scenes,
						img: img
							? {
									filename: nvl(img, 'filename', ''),
									width: nvl(img, 'width', 0),
									height: nvl(img, 'height', 0),
							  }
							: null,
					},
				],
			};
		}, {});
	}, [dramas]);

	const removeMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed: removedId } }) {
				const cachedList = nvl(cache.readQuery({ query: DramasQuery }), 'dramas', []);
				cache.writeQuery({
					query: DramasQuery,
					data: {
						dramas: cachedList.filter(({ id }: Dramas) => id !== removedId),
					},
				});
			},
		};
	}, []);

	const removeByYearMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed: removedYear } }) {
				const cachedList = nvl(cache.readQuery({ query: DramasQuery }), 'dramas', []);
				cache.writeQuery({
					query: DramasQuery,
					data: {
						dramas: cachedList.filter(({ year }: Dramas) => year !== removedYear),
					},
				});
			},
		};
	}, []);

	const [removeDramas] = useMutation(RemoveMutation, removeMutationOptions);
	const [removeByYearDramas] = useMutation(RemoveByYearMutation, removeByYearMutationOptions);

	const onRemoveByYear = useCallback((year: number) => {
		Modal.confirm({
			centered: true,
			title: nvl(values, 'adminDramasSubmitModalValue.messages.removeByYear.confirm', ''),
			width: 'fit-content',
			bodyStyle: { whiteSpace: 'pre-line' },
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminDramasSubmitModalValue.messages.removeByYear.loading', ''),
					});

					await removeByYearDramas({ variables: { year } });

					message.destroy('loading');
					message.success(nvl(values, 'adminDramasSubmitModalValue.messages.removeByYear.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminDramasSubmitModalValue.messages.removeByYear.error', ''));
				}
			},
		});
	}, []);

	const onRemove = useCallback((id: string) => {
		Modal.confirm({
			centered: true,
			title: nvl(values, 'adminDramasSubmitModalValue.messages.remove.confirm', ''),
			width: 'fit-content',
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminDramasSubmitModalValue.messages.remove.loading', ''),
					});

					await removeDramas({ variables: { id } });

					message.destroy('loading');
					message.success(nvl(values, 'adminDramasSubmitModalValue.messages.remove.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminDramasSubmitModalValue.messages.remove.error', ''));
				}
			},
		});
	}, []);

	return {
		dramasData,
		dramasLoading,
		visibleModifyModal,
		setVisibleModifyModal,
		selectedData,
		setSelectedData,
		visiblePreviewModal,
		setVisiblePreviewModal,
		previewImage,
		setPreviewImage,
		onRemoveByYear,
		onRemove,
	};
};

const [
	Provider,
	useDramasData,
	useDramasLoading,
	useVisibleModifyModal,
	useSetVisibleModifyModal,
	useSelectedData,
	useSetSelectedData,
	useVisiblePreviewModal,
	useSetVisiblePreviewModal,
	usePreviewImage,
	useSetPreviewImage,
	useOnRemoveByYear,
	useOnRemove,
] = constate(
	useDramas,
	value => value.dramasData,
	value => value.dramasLoading,
	value => value.visibleModifyModal,
	value => value.setVisibleModifyModal,
	value => value.selectedData,
	value => value.setSelectedData,
	value => value.visiblePreviewModal,
	value => value.setVisiblePreviewModal,
	value => value.previewImage,
	value => value.setPreviewImage,
	value => value.onRemoveByYear,
	value => value.onRemove
);

export {
	Provider,
	useDramasData,
	useDramasLoading,
	useVisibleModifyModal,
	useSetVisibleModifyModal,
	useSelectedData,
	useSetSelectedData,
	useVisiblePreviewModal,
	useSetVisiblePreviewModal,
	usePreviewImage,
	useSetPreviewImage,
	useOnRemoveByYear,
	useOnRemove,
};
