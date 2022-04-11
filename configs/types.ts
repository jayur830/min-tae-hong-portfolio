import { FormItemProps } from 'antd';

export interface AboutValueType extends FormItemProps {
	comments: {
		title: string;
		buttons: {
			[name: string]: {
				label: string;
				type: 'primary' | 'default';
			};
		};
	};
}

export interface DescriptionType {
	name: string;
	label: string;
	single: boolean;
}

export interface ContentDataType {
	descriptions: DescriptionType[];
}

export interface DarkModeProps {
	'dark-mode': string;
}
