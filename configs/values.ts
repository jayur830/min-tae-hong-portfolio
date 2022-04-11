import { ContentDataType } from './types';

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
