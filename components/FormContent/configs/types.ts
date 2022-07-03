import { Option } from '@root/configs';
import { ButtonProps, DatePickerProps, InputNumberProps, RadioGroupProps, SelectProps, SwitchProps } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { RangePickerProps } from 'antd/lib/date-picker';
import { Rule } from 'antd/lib/form';
import { InputProps, PasswordProps, SearchProps, TextAreaProps } from 'antd/lib/input';

export interface FormItemType {
	key?: string;
	span?: number;
	type: 'select' | 'number' | 'password' | 'text' | 'textarea' | 'search' | 'checkbox' | 'radio' | 'switch' | 'label' | 'date' | 'daterange' | 'complex';
	label: string;
	required?: boolean;
	rules?: Rule[];
	initialValue?: any;
}

export interface SelectItemType extends FormItemType {
	type: 'select';
	options: {
		label: string;
		value: string;
	}[];
	props?: SelectProps;
}

export interface NumberItemType extends FormItemType {
	type: 'number';
	props?: InputNumberProps;
}

export interface PasswordItemType extends FormItemType {
	type: 'password';
	props?: PasswordProps;
}

export interface TextItemType extends FormItemType {
	type: 'text';
	props?: InputProps;
	numberOnly?: boolean;
}

export interface TextAreaItemType extends FormItemType {
	type: 'textarea';
	props?: TextAreaProps;
	height?: number;
}

export interface SearchItemType extends FormItemType {
	type: 'search';
	props?: SearchProps;
	searchButtonProps?: { label: string } & ButtonProps;
}

export interface CheckboxItemType extends FormItemType {
	type: 'checkbox';
	items: Option[];
	props?: CheckboxGroupProps;
}

export interface RadioItemType extends FormItemType {
	type: 'radio';
	items: Option[];
	props?: RadioGroupProps;
}

export interface SwitchItemType extends FormItemType {
	type: 'switch';
	props?: SwitchProps;
}

export interface LabelItemType extends FormItemType {
	type: 'label';
}

export interface DateItemType extends FormItemType {
	type: 'date';
	props?: DatePickerProps;
}

export interface DateRangeItemType extends FormItemType {
	type: 'daterange';
	props?: RangePickerProps;
}

export type FormItemUnionType =
	| SelectItemType
	| NumberItemType
	| PasswordItemType
	| TextItemType
	| TextAreaItemType
	| SearchItemType
	| CheckboxItemType
	| RadioItemType
	| SwitchItemType
	| LabelItemType
	| DateItemType
	| DateRangeItemType;

export interface ComplexItemType extends FormItemType {
	type: 'complex';
	gutter?: [number, number];
	children: (FormItemUnionType | ComplexItemType)[];
	addOn?: (item: any) => JSX.Element | JSX.Element[] | null;
}
