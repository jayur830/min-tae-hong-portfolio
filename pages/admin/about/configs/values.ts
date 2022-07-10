import { MessageType } from '@root/configs';
import { AdminAboutCommentsValueType, AdminAboutImageUploadModalValueType } from './types';

export const adminAboutInfoModalValue: MessageType = {
	confirm: '수정하시겠습니까?',
	loading: '수정중입니다...',
	success: '수정되었습니다.',
	error: '문제가 발생했습니다. 좆될수도 있으니 관리자에게 문의하세요.',
};

export const adminAboutCommentsValue: AdminAboutCommentsValueType = {
	removeText: '이 댓글을 삭제하시겠습니까?',
	loadingText: '댓글을 삭제중입니다...',
	infoText: '댓글이 삭제되었습니다.',
	errorText: '문제가 발생했습니다. 관리자에게 문의하세요.',
	columns: [
		{
			key: 'date',
			title: '날짜 및 시간',
			dataIndex: ['date'],
			width: 200,
		},
		{
			key: 'comment',
			title: '댓글',
			dataIndex: ['comment'],
		},
		{
			key: 'option',
			title: '',
			dataIndex: ['id'],
			width: 50,
		},
	],
};

export const adminAboutImageUploadModalValue: AdminAboutImageUploadModalValueType = {
	title: '이미지 수정',
	okText: '완료',
	messages: {
		confirm: '이미지를 바꾸시겠습니까?',
		loading: '이미지를 수정중입니다...',
		success: '이미지가 수정되었습니다.',
		error: '문제가 발생했습니다. 관리자에게 문의하세요.',
	},
	formItems: [
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
	],
};
