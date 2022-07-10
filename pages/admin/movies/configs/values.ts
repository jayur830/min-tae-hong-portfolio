import dayjs from 'dayjs';
import { AdminMoviesSubmitModalValueType } from './types';

export const adminMoviesSubmitModalValue: AdminMoviesSubmitModalValueType = {
	title: {
		create: '영화 작품 추가',
		update: '영화 작품 수정',
	},
	okText: '완료',
	messages: {
		create: {
			confirm: '작품 정보를 추가하시겠습니까?',
			loading: '작품 정보를 추가중입니다...',
			success: '작품 정보가 추가되었습니다.',
			error: '문제가 발생했습니다. 관리자에게 문의하세요.',
		},
		update: {
			confirm: '작품 정보를 수정하시겠습니까?',
			loading: '작품 정보를 수정중입니다...',
			success: '작품 정보가 수정되었습니다.',
			error: '문제가 발생했습니다. 관리자에게 문의하세요.',
		},
		remove: {
			confirm: '작품을 삭제하시겠습니까?',
			loading: '작품을 삭제중입니다...',
			success: '작품이 삭제되었습니다.',
			error: '문제가 발생했습니다. 관리자에게 문의하세요.',
		},
		removeByYear: {
			confirm: '해당 연도의 작품이 모두 삭제됩니다.\n정말로 삭제하시겠습니까?',
			loading: '작품들을 삭제중입니다...',
			success: '작품이 모두 삭제되었습니다.',
			error: '문제가 발생했습니다. 관리자에게 문의하세요.',
		},
	},
	descriptions: [
		{
			key: 'director',
			label: '감독',
		},
		{
			key: 'actors',
			label: '연출',
		},
		{
			key: 'awards',
			label: '수상',
		},
	],
	formItems: [
		{
			key: 'year',
			type: 'number',
			label: '연도',
			required: true,
			initialValue: dayjs().year(),
			rules: [
				{
					required: true,
					message: '연도를 입력해주세요.',
				},
			],
		},
		{
			key: 'img',
			type: 'upload',
			label: '대표 이미지',
			props: {
				name: 'img',
				action: '/api/file/post',
				listType: 'picture',
			},
		},
		{
			key: 'video',
			type: 'upload',
			label: '비디오',
			props: {
				name: 'img',
				action: '/api/file/post',
				listType: 'picture',
			},
		},
		{
			key: 'title',
			type: 'text',
			label: '제목',
			required: true,
			rules: [
				{
					required: true,
					message: '제목을 입력해주세요.',
				},
			],
			props: {
				placeholder: '제목을 입력해주세요.',
			},
		},
		{
			key: 'director',
			type: 'text',
			label: '감독',
			required: true,
			rules: [
				{
					required: true,
					message: '감독명을 입력해주세요.',
				},
			],
			props: {
				placeholder: '감독명을 입력해주세요.',
			},
		},
		{
			key: 'actors',
			type: 'list',
			label: '연출',
			itemType: {
				type: 'text',
				label: '',
				props: {
					placeholder: '출연 배우를 입력해주세요.',
				},
			},
		},
		{
			key: 'awards',
			type: 'list',
			label: '수상',
			itemType: {
				type: 'text',
				label: '',
				props: {
					placeholder: '수상 이력을 입력해주세요.',
				},
			},
		},
		{
			key: 'scenes',
			type: 'upload',
			label: '씬',
			props: {
				name: 'img',
				action: '/api/file/post',
				listType: 'picture-card',
			},
		},
	],
};
