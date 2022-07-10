// Package
import { useState, useCallback, useMemo } from 'react';
import constate from 'constate';
import { MutationHookOptions, useMutation, useQuery } from '@apollo/client';
import { message, Modal } from 'antd';

// Global
import { nvl } from '@root/utils';
import { Movies } from '@root/graphql/scheme';
import MoviesQuery from '@root/graphql/queries/getMovies.gql';
import RemoveMutation from '@root/graphql/mutations/removeMovies.gql';
import RemoveByYearMutation from '@root/graphql/mutations/removeByYearMovies.gql';

// Local
import { values } from './configs';

const useMovies = () => {
	const [visibleModifyModal, setVisibleModifyModal] = useState<boolean>(false);
	const [selectedData, setSelectedData] = useState<any>(null);
	const [visiblePreviewModal, setVisiblePreviewModal] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>('');

	const { data: movies, loading: moviesLoading } = useQuery<{ movies: Movies }>(MoviesQuery);
	const moviesData = useMemo(() => {
		return nvl(movies, 'movies', []).reduce((result: any, movie: any) => {
			const { year, img, video, scenes, ...etc } = movie;
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
						video: video
							? {
									filename: nvl(video, 'filename', ''),
									width: nvl(video, 'width', 0),
									height: nvl(video, 'height', 0),
							  }
							: null,
					},
				],
			};
		}, {});
	}, [movies]);

	const removeMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed: removedId } }) {
				const cachedList = nvl(cache.readQuery({ query: MoviesQuery }), 'movies', []);
				cache.writeQuery({
					query: MoviesQuery,
					data: {
						movies: cachedList.filter(({ id }: Movies) => id !== removedId),
					},
				});
			},
		};
	}, []);

	const removeByYearMutationOptions = useMemo((): MutationHookOptions => {
		return {
			update(cache, { data: { removed: removedYear } }) {
				const cachedList = nvl(cache.readQuery({ query: MoviesQuery }), 'movies', []);
				cache.writeQuery({
					query: MoviesQuery,
					data: {
						movies: cachedList.filter(({ year }: Movies) => year !== removedYear),
					},
				});
			},
		};
	}, []);

	const [removeMovies] = useMutation(RemoveMutation, removeMutationOptions);
	const [removeByYearMovies] = useMutation(RemoveByYearMutation, removeByYearMutationOptions);

	const onRemoveByYear = useCallback((year: number) => {
		Modal.confirm({
			centered: true,
			title: nvl(values, 'adminMoviesSubmitModalValue.messages.removeByYear.confirm', ''),
			width: 'fit-content',
			bodyStyle: { whiteSpace: 'pre-line' },
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminMoviesSubmitModalValue.messages.removeByYear.loading', ''),
					});

					await removeByYearMovies({ variables: { year } });

					message.destroy('loading');
					message.success(nvl(values, 'adminMoviesSubmitModalValue.messages.removeByYear.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminMoviesSubmitModalValue.messages.removeByYear.error', ''));
				}
			},
		});
	}, []);

	const onRemove = useCallback((id: string) => {
		Modal.confirm({
			centered: true,
			title: nvl(values, 'adminMoviesSubmitModalValue.messages.remove.confirm', ''),
			width: 'fit-content',
			async onOk() {
				try {
					message.loading({
						key: 'loading',
						content: nvl(values, 'adminMoviesSubmitModalValue.messages.remove.loading', ''),
					});

					await removeMovies({ variables: { id } });

					message.destroy('loading');
					message.success(nvl(values, 'adminMoviesSubmitModalValue.messages.remove.success', ''));
				} catch (e) {
					message.destroy('loading');
					message.error(nvl(values, 'adminMoviesSubmitModalValue.messages.remove.error', ''));
				}
			},
		});
	}, []);

	return {
		moviesData,
		moviesLoading,
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
	useMoviesData,
	useMoviesLoading,
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
	useMovies,
	value => value.moviesData,
	value => value.moviesLoading,
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
	useMoviesData,
	useMoviesLoading,
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
