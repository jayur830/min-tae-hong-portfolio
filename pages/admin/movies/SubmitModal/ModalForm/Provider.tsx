import { useState, useCallback, useMemo, createElement } from 'react';
import ReactDOM from 'react-dom';
import constate from 'constate';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import { getBase64, nvl } from '@root/utils';
import { FormItemUnionType } from '@root/components/FormContent/configs';

import { values, UploadItemType, ListItemType } from '../../configs';
import { useSetPreviewImage, useSetVisiblePreviewModal } from '../../Provider';
import { message } from 'antd';
import { createPortal } from 'react-dom';

function useFormContents() {
	const setPreviewImage = useSetPreviewImage();
	const setVisiblePreviewModal = useSetVisiblePreviewModal();

	const [imageFile, setImageFile] = useState<UploadFile | null>(null);
	const [videoFile, setVideoFile] = useState<UploadFile | null>(null);
	const [sceneFileList, setSceneFileList] = useState<UploadFile[]>([]);

	const onPreview = useCallback(async file => {
		if (!file.url && !file.preview) {
			file.preview = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
			});
		}

		setPreviewImage(file.url || file.preview);
		setVisiblePreviewModal(true);
	}, []);

	const getImageValue = useCallback(e => {
		return new Promise(resolve => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(e.target.files[0]);
			fileReader.onload = () => {
				const image = new Image();
				image.src = fileReader.result as string;
				image.onload = () => {
					resolve({
						filename: e.target.files[0].name,
						width: image.width,
						height: image.height,
					});
				};
			};
		});
	}, []);

	const getVideoValue = useCallback(e => {
		return new Promise(resolve => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(e.target.files[0]);
			fileReader.onload = () => {
				const video = document.createElement('video');
				video.src = fileReader.result as string;
				video.onloadedmetadata = function () {
					resolve({
						filename: e.target.files[0].name,
						width: video.videoWidth,
						height: video.videoHeight,
					});
				};
			};
		});
	}, []);

	const formItems = useMemo(() => {
		return nvl(values, 'adminMoviesSubmitModalValue.formItems', []).map((item: FormItemUnionType | UploadItemType | ListItemType) => {
			const key = nvl(item, 'key', '');

			if (key === 'img') {
				return {
					...item,
					props: {
						...nvl(item, 'props', {}),
						fileList: imageFile ? [imageFile] : [],
						onPreview,
						async onChange({ file }: UploadChangeParam) {
							if (imageFile && imageFile.uid === file.uid) {
								setImageFile(null);
							} else if (!nvl(file, 'type', '').includes('image')) {
								message.error('이미지만 추가하세요.');
							} else {
								const base64 = (await getBase64(nvl(file, 'originFileObj', null))) as string;
								setImageFile({
									uid: '-1',
									name: nvl(file, 'name', ''),
									status: 'done',
									url: base64,
								});
							}
						},
					},
				};
			}

			if (key === 'video') {
				return {
					...item,
					props: {
						...nvl(item, 'props', {}),
						fileList: videoFile ? [videoFile] : [],
						onPreview,
						async onChange({ file }: UploadChangeParam) {
							if (videoFile && videoFile.uid === file.uid) {
								setVideoFile(null);
							} else if (!nvl(file, 'type', '').includes('video')) {
								message.error('비디오만 추가하세요.');
							} else {
								const base64 = (await getBase64(nvl(file, 'originFileObj', null))) as string;
								setVideoFile({
									uid: '-1',
									name: nvl(file, 'name', ''),
									status: 'done',
									url: base64,
								});
							}
						},
					},
				};
			}

			if (key === 'scenes') {
				return {
					...item,
					props: {
						...nvl(item, 'props', {}),
						multiple: true,
						fileList: sceneFileList,
						onPreview,
						async onChange({ file }: UploadChangeParam) {
							if (sceneFileList.some(scene => scene.uid === file.uid)) {
								setSceneFileList(state => state.filter(scene => scene.uid !== file.uid));
							} else if (!nvl(file, 'type', '').includes('image')) {
								message.error('이미지만 추가하세요.');
							} else {
								const base64 = (await getBase64(nvl(file, 'originFileObj', null))) as string;
								setSceneFileList(state => [
									...state,
									{
										uid: `${Math.random()}`,
										name: nvl(file, 'name', ''),
										status: 'done',
										url: base64,
									},
								]);
							}
						},
					},
				};
			}

			return item;
		});
	}, [imageFile, videoFile, sceneFileList]);

	return { setImageFile, setVideoFile, setSceneFileList, onPreview, getImageValue, getVideoValue, formItems };
}

const [Provider, useSetImageFile, useSetVideoFile, useSetSceneFileList, useOnPreview, useGetImageValue, useGetVideoValue, useFormItems] = constate(
	useFormContents,
	value => value.setImageFile,
	value => value.setVideoFile,
	value => value.setSceneFileList,
	value => value.onPreview,
	value => value.getImageValue,
	value => value.getVideoValue,
	value => value.formItems
);

export { Provider, useSetImageFile, useSetVideoFile, useSetSceneFileList, useOnPreview, useGetImageValue, useGetVideoValue, useFormItems };
