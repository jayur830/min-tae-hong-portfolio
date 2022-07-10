// Package
import { useCallback, useMemo, useState } from 'react';
import constate from 'constate';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface';

// Global
import { getBase64, nvl } from '@root/utils';
import { FormItemUnionType } from '@root/components/FormContent/configs';

// Local
import { values, UploadItemType } from '../../configs';
import { useSetVisiblePreviewModal, useSetPreviewImage } from '../../Provider';
import { useForm } from '../Provider';
import { message } from 'antd';
import { Rule } from 'antd/lib/form';

const useModalForm = () => {
	const setVisiblePreviewModal = useSetVisiblePreviewModal();
	const setPreviewImage = useSetPreviewImage();
	const form = useForm();

	const [imageFile, setImageFile] = useState<UploadFile | null>(null);

	const onPreview = useCallback(async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as Blob);
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = error => reject(error);
			});
		}

		setPreviewImage(file.url || file.preview || '');
		setVisiblePreviewModal(true);
	}, []);

	const getImageValue = useCallback((e: any) => {
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
		return nvl(values, 'adminAboutImageUploadModalValue.formItems', []).map((item: FormItemUnionType | UploadItemType) => {
			const key = nvl(item, 'key', '');

			if (key === 'img') {
				return {
					...item,
					rules: [
						{
							validator(_: Rule, value: any) {
								if (value) {
									return Promise.resolve();
								}

								return Promise.reject('하나 이상의 이미지를 업로드하세요.');
							},
						},
					],
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

			return item;
		});
	}, [imageFile]);

	return { formItems, imageFile, setImageFile, getImageValue };
};

const [Provider, useFormItems, useImageFile, useSetImageFile, useGetImageValue] = constate(
	useModalForm,
	value => value.formItems,
	value => value.imageFile,
	value => value.setImageFile,
	value => value.getImageValue
);

export { Provider, useFormItems, useImageFile, useSetImageFile, useGetImageValue };
