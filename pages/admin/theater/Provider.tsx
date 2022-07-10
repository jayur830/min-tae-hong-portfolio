// Package
import { useState, useCallback, useMemo } from 'react';
import constate from 'constate';
import { MutationHookOptions, useMutation, useQuery } from '@apollo/client';
import { message, Modal } from 'antd';

// Global
import { nvl } from '@root/utils';
import { Theaters } from '@root/graphql/scheme';
import TheatersQuery from '@root/graphql/queries/getTheaters.gql';
import RemoveMutation from '@root/graphql/mutations/removeTheaters.gql';
import RemoveByYearMutation from '@root/graphql/mutations/removeByYearTheaters.gql';

// Local
import { values } from './configs';

const useTheaters = () => {
	const [visibleModifyModal, setVisibleModifyModal] = useState<boolean>(false);
	const [selectedData, setSelectedData] = useState<any>(null);
	const [visiblePreviewModal, setVisiblePreviewModal] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>('');

	const { data: theaters, loading: theatersLoading } = useQuery<{ theaters: Theaters }>(TheatersQuery);
	const theatersData = useMemo(() => {
		return nvl(theaters, 'theaters', []).reduce((result: any, theater: any) => {
			const { year, img, scenes, ...etc } = theater;
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
	}, [theaters]);

	const removeMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed: removedId } }) {
				const cachedList = nvl(cache.readQuery({ query: TheatersQuery }), 'theaters', []);
				cache.writeQuery({
					query: TheatersQuery,
					data: {
						theaters: cachedList.filter(({ id }: Theaters) => id !== removedId),
					},
				});
			},
		};
	}, []);

	const removeByYearMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed: removedYear } }) {
				const cachedList = nvl(cache.readQuery({ query: TheatersQuery }), 'theaters', []);
				cache.writeQuery({
					query: TheatersQuery,
					data: {
						theaters: cachedList.filter(({ year }: Theaters) => year !== removedYear),
					},
				});
			},
		};
	}, []);

	const [removeTheaters] = useMutation(RemoveMutation, removeMutationOptions);
	const [removeByYearTheaters] = useMutation(RemoveByYearMutation, removeByYearMutationOptions);

	const onRemoveByYear = useCallback((year: number) => {
		Modal.confirm({
			centered: true,
			title: nvl(values, 'adminTheatersSubmitModalValue.messages.removeByYear.confirm', ''),
			width: 'fit-content',
			bodyStyle: { whiteSpace: 'pre-line' },
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminTheatersSubmitModalValue.messages.removeByYear.loading', ''),
					});

					await removeByYearTheaters({ variables: { year } });

					message.destroy('loading');
					message.success(nvl(values, 'adminTheatersSubmitModalValue.messages.removeByYear.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminTheatersSubmitModalValue.messages.removeByYear.error', ''));
				}
			},
		});
	}, []);

	const onRemove = useCallback((id: string) => {
		Modal.confirm({
			centered: true,
			title: nvl(values, 'adminTheatersSubmitModalValue.messages.remove.confirm', ''),
			width: 'fit-content',
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminTheatersSubmitModalValue.messages.remove.loading', ''),
					});

					await removeTheaters({ variables: { id } });

					message.destroy('loading');
					message.success(nvl(values, 'adminTheatersSubmitModalValue.messages.remove.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminTheatersSubmitModalValue.messages.remove.error', ''));
				}
			},
		});
	}, []);

	return {
		theatersData,
		theatersLoading,
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
	useTheatersData,
	useTheatersLoading,
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
	useTheaters,
	value => value.theatersData,
	value => value.theatersLoading,
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
	useTheatersData,
	useTheatersLoading,
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
