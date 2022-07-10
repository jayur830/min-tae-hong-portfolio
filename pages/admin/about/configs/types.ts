import { UploadProps } from 'antd';
import { Rule } from 'antd/lib/form';

import { MessageType } from '@root/configs';
import { FormItemUnionType } from '@root/components/FormContent/configs';

export interface AdminAboutCommentsTableColumnType {
	key: string;
	title: string;
	dataIndex: string | string[];
	width?: string | number;
}

export interface AdminAboutCommentsValueType {
	removeText: string;
	loadingText: string;
	infoText: string;
	errorText: string;
	columns: AdminAboutCommentsTableColumnType[];
}

export interface UploadItemType {
	key?: string;
	type: 'upload';
	label: string;
	valuePropName?: string;
	required?: boolean;
	rules?: Rule[];
	props?: UploadProps;
}

export interface AdminAboutImageUploadModalValueType {
	title: string;
	okText?: string;
	messages?: MessageType;
	formItems: (FormItemUnionType | UploadItemType)[];
}
