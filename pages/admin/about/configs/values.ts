import { AdminAboutCommentsValueType, AdminAboutInfoModalValueType } from './types';

export const adminAboutInfoModalValue: AdminAboutInfoModalValueType = {
	confirmText: '수정하시겠습니까?',
	infoText: '수정되었습니다.',
	loadingText: '수정중입니다...',
	errorText: '문제가 발생했습니다. 좆될수도 있으니 관리자에게 문의하세요.',
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
			dataIndex: ['option'],
			width: 50,
		},
	],
};
