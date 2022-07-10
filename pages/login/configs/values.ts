import { FormItemUnionType } from '@root/components/FormContent/configs';

import { SubmitItemType } from './types';

export const formItems: (FormItemUnionType | SubmitItemType)[] = [
	{
		key: 'password',
		type: 'password',
		label: 'PASSWORD',
		required: true,
		rules: [
			{
				required: true,
				message: '비밀번호를 입력하세요.',
			},
		],
		props: {
			placeholder: '비밀번호를 입력하세요.',
			style: {
				fontFamily: 'sans-serif',
			},
		},
	},
	{
		key: 'submit',
		type: 'submit',
	},
];
