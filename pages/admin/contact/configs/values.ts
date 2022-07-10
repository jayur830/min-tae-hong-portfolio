import { FormItemUnionType } from '@root/components/FormContent/configs';
import { MessagesType } from '@root/configs';
import { ImageUploadModalValuesType, UploadItemType } from './types';

export const messages: MessagesType = {
	email: {
		confirm: '이메일을 수정하시겠습니까?',
		loading: '이메일을 수정중입니다...',
		success: '이메일이 수정되었습니다.',
		error: '문제가 발생했습니다. 관리자에게 문의하세요.',
	},
	img: {
		confirm: '이미지를 바꾸시겠습니까?',
		loading: '이미지를 수정중입니다...',
		success: '이미지가 수정되었습니다.',
		error: '문제가 발생했습니다. 관리자에게 문의하세요.',
	},
};

export const modalValues: ImageUploadModalValuesType = {
	title: '이미지 변경',
	okText: '완료',
};

export const formItems: (FormItemUnionType | UploadItemType)[] = [
	{
		key: 'img',
		type: 'upload',
		label: '이미지',
		required: true,
		valuePropName: 'file',
		props: {
			name: 'img',
			action: '/api/file/post',
			listType: 'picture',
		},
	},
];
