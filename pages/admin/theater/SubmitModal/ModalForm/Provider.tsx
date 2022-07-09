import { useState, useCallback, useMemo } from 'react';
import constate from 'constate';
import { message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import { getBase64, nvl } from '@root/utils';
import { FormItemUnionType } from '@root/components/FormContent/configs';

import { values, UploadItemType, ListItemType } from '../../configs';
import { useSetPreviewImage, useSetVisiblePreviewModal } from '../../Provider';
import { useForm } from '../Provider';

function useFormContents() {
	const setPreviewImage = useSetPreviewImage();
	const setVisiblePreviewModal = useSetVisiblePreviewModal();
	const form = useForm();

	const [imageFile, setImageFile] = useState<UploadFile | null>(null);
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

	const formItems = useMemo(() => {
		return nvl(values, 'adminTheatersSubmitModalValue.formItems', []).map((item: FormItemUnionType | UploadItemType | ListItemType) => {
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
								form.setFieldsValue({ img: null });
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
								const removeIndex = sceneFileList.findIndex(scene => scene.uid === file.uid);
								form.setFieldsValue({ scenes: form.getFieldValue('scenes').filter((_: any, i: number) => i !== removeIndex) });
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
	}, [imageFile, sceneFileList]);

	return { setImageFile, setSceneFileList, onPreview, getImageValue, formItems };
}

const [Provider, useSetImageFile, useSetSceneFileList, useOnPreview, useGetImageValue, useFormItems] = constate(
	useFormContents,
	value => value.setImageFile,
	value => value.setSceneFileList,
	value => value.onPreview,
	value => value.getImageValue,
	value => value.formItems
);

export { Provider, useSetImageFile, useSetSceneFileList, useOnPreview, useGetImageValue, useFormItems };
