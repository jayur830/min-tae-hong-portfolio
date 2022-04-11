import { AboutValueType, ContentDataType } from './types';

export const aboutValue: AboutValueType = {
	comments: {
		title: 'Comments',
		buttons: {
			submit: {
				label: '등록',
				type: 'primary',
			},
			cancel: {
				label: '취소',
				type: 'default',
			},
			write: {
				label: '댓글 쓰기',
				type: 'primary',
			},
		},
	},
	required: true,
	rules: [
		{
			required: true,
			message: '댓글을 입력해주세요.',
		},
	],
	initialValue: '',
};

export const moviesValue: ContentDataType = {
	descriptions: [
		{
			name: 'title',
			label: '제목',
			single: true,
		},
		{
			name: 'director',
			label: '감독',
			single: true,
		},
		{
			name: 'actors',
			label: '연출',
			single: false,
		},
		{
			name: 'awards',
			label: '수상',
			single: false,
		},
	],
};

export const dramaValue = {
	descriptions: [
		{
			name: 'title',
			label: '제목',
			single: true,
		},
		{
			name: 'actors',
			label: '출연진',
			single: false,
		},
		{
			name: 'director',
			label: '감독',
			single: true,
		},
		{
			name: 'schedule',
			label: '일정',
			single: true,
		},
	],
};

export const theaterValue = {
	descriptions: [
		{
			name: 'title',
			label: '제목',
			single: true,
		},
		{
			name: 'theater',
			label: '극장',
			single: true,
		},
		{
			name: 'schedule',
			label: '일정',
			single: true,
		},
	],
};
