import { UploadProps } from 'antd';
import { Rule } from 'antd/lib/form';

export interface ImageUploadModalValuesType {
	title: string;
	okText?: string;
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
