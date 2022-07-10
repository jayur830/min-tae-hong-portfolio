import { Rule } from 'antd/lib/form';

export interface SubmitItemType {
	key?: string;
	type: 'submit';
	rules?: Rule[];
}
