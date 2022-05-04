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
	admin: {
		columns: {
			key: string;
			title: string;
			dataIndex?: string | string[];
			width?: number | string;
		}[];
		infoModal: {
			title: string;
			okText?: string;
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
