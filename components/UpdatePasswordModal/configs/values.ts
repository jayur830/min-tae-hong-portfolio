import { MessageType } from '@root/configs';
import { FormItemUnionType } from '@root/components/FormContent/configs';

import { ModalValuesType } from './types';

export const modalValues: ModalValuesType = {
	title: '비밀번호 변경',
	okText: '완료',
};

export const messages: MessageType = {
	confirm: '입력하신 비밀번호로 변경하시겠습니까?',
	loading: '비밀번호를 변경하고 있습니다...',
	success: '비밀번호가 변경되었습니다.',
	error: '문제가 발생했습니다. 관리자에게 문의하세요.',
};

export const formItems: FormItemUnionType[] = [
	{
		key: 'password',
		type: 'password',
		label: '비밀번호',
		required: true,
		rules: [
			{
				required: true,
				message: '비밀번호를 입력해주세요.',
			},
		],
		props: {
			placeholder: '비밀번호를 입력해주세요.',
			style: {
				fontFamily: 'serif',
			},
		},
	},
	{
		key: 'passwordConfirm',
		type: 'password',
		label: '비밀번호 확인',
		required: true,
		props: {
			placeholder: '비밀번호 확인을 입력해주세요.',
			style: {
				fontFamily: 'serif',
			},
		},
	},
];
