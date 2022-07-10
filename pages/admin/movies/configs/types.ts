import { FormItemUnionType } from '@root/components/FormContent/configs';
import { MessagesType } from '@root/configs';
import { UploadProps } from 'antd';
import { Rule } from 'antd/lib/form';

export interface UploadItemType {
	key?: string;
	type: 'upload';
	label: string;
	required?: boolean;
	rules?: Rule[];
	props?: UploadProps;
}

export interface ListItemType {
	key?: string;
	type: 'list';
	label: string;
	required?: boolean;
	rules?: Rule[];
	itemType: FormItemUnionType;
}

export interface AdminMoviesSubmitModalValueType {
	title: string | { [name: string]: string };
	okText?: string;
	messages?: MessagesType;
	descriptions: {
		key: string;
		label: string;
	}[];
	formItems: (FormItemUnionType | UploadItemType | ListItemType)[];
}
