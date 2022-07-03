// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { CSSProperties } from 'react';
import { Form, FormItemProps, Select, SelectProps, Input, InputProps, InputNumber, InputNumberProps, Button, Checkbox, Radio, Switch, DatePicker, DatePickerProps } from 'antd';
import { PasswordProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { RangePickerProps } from 'antd/lib/date-picker';
import Text from 'antd/lib/typography/Text';
import TextArea from 'antd/lib/input/TextArea';
import Search from 'antd/lib/input/Search';
import styled from 'styled-components';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { nvl, onKeyDownInputNumber } from '@root/utils';
import { FormItemUnionType, ComplexItemType } from '../configs';
import FormContent, { FormContentProps } from '..';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.

export interface FormContentItemProps {
	item: FormItemUnionType | ComplexItemType;
	parentKey?: string[];
	initialValues?: any;
	addOn?: (item: any) => JSX.Element | JSX.Element[] | null;
}

export default function Item({ item, parentKey, initialValues, addOn }: FormContentItemProps) {
	const key = nvl(item, 'key', '');
	const type = nvl(item, 'type', '');
	const props = nvl(item, 'props', {});
	const name = parentKey ? [...parentKey, key] : key;

	if (addOn) {
		const formItem = addOn(item);
		if (formItem) {
			return <>{formItem}</>;
		}
	}

	const formItemProps: FormItemProps = {
		label: nvl(item, 'label', ''),
		required: nvl(item, 'required', false),
		name,
		rules: nvl(item, 'rules', []),
		initialValue: nvl(initialValues, key, nvl(item, 'initialValue', null)),
	};

	if (type === 'select') {
		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<Select {...props}>
					{nvl(item, 'options', []).map(({ label, value }: any, j: number) => {
						return (
							<Select.Option key={j} value={value}>
								{label}
							</Select.Option>
						);
					})}
				</Select>
			</StyledFormItem>
		);
	}

	if (type === 'number') {
		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<StyledInputNumber {...props} />
			</StyledFormItem>
		);
	}

	if (type === 'password') {
		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<Input.Password {...props} />
			</StyledFormItem>
		);
	}

	if (type === 'text') {
		const numberOnly = nvl(item, 'numberOnly', false);

		const inputProps: InputProps = {
			...props,
			onKeyDown(e) {
				if (numberOnly) {
					onKeyDownInputNumber(e);
				}

				const onKeyDownHandler = nvl(item, 'onKeyDown', null);
				if (onKeyDownHandler) {
					onKeyDownHandler(e);
				}
			},
		};

		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<Input {...inputProps} />
			</StyledFormItem>
		);
	}

	if (type === 'textarea') {
		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<StyledTextArea {...props} height={nvl(item, 'height', null)} />
			</StyledFormItem>
		);
	}

	if (type === 'search') {
		const searchButtonProps = nvl(item, 'searchButtonProps');

		if (searchButtonProps) {
			const { label, ...buttonProps } = searchButtonProps;
			const searchProps: SearchProps = {
				...props,
				enterButton: <Button {...buttonProps}>{label}</Button>,
			};

			return (
				<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
					<StyledSearch {...searchProps} />
				</StyledFormItem>
			);
		}

		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<StyledSearch {...props} />
			</StyledFormItem>
		);
	}

	if (type === 'checkbox') {
		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<Checkbox.Group {...props}>
					{nvl(item, 'items', []).map(({ label, value }: any, j: number) => {
						return (
							<Checkbox key={j} value={value}>
								{label}
							</Checkbox>
						);
					})}
				</Checkbox.Group>
			</StyledFormItem>
		);
	}

	if (type === 'radio') {
		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<Radio.Group {...props}>
					{nvl(item, 'items', []).map(({ label, value }: any, j: number) => {
						return (
							<Radio key={j} value={value}>
								{label}
							</Radio>
						);
					})}
				</Radio.Group>
			</StyledFormItem>
		);
	}

	if (type === 'switch') {
		return (
			<StyledFormItem {...formItemProps} valuePropName="checked" parent={`${parentKey != null}`}>
				<Switch {...props} />
			</StyledFormItem>
		);
	}

	if (type === 'label') {
		return (
			<StyledFormItem {...formItemProps} valuePropName="children" parent={`${parentKey != null}`}>
				<Text />
			</StyledFormItem>
		);
	}

	if (type === 'date') {
		const datePickerProps: DatePickerProps = {
			...props,
			style: {
				...DatePickerInlineStyle,
				...nvl(props, 'style', {}),
			},
		};

		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<StyledDatePicker {...datePickerProps} />
			</StyledFormItem>
		);
	}

	if (type === 'daterange') {
		const rangePickerProps: RangePickerProps = {
			...props,
			style: {
				...DatePickerInlineStyle,
				...nvl(props, 'style', {}),
			},
		};

		return (
			<StyledFormItem {...formItemProps} parent={`${parentKey != null}`}>
				<StyledRangePicker {...rangePickerProps} />
			</StyledFormItem>
		);
	}

	if (type === 'complex') {
		const { initialValue, ...complexFormItemProps } = formItemProps;

		const formContentProps: FormContentProps = {
			gutter: nvl(item, 'gutter', null),
			parentKey: parentKey ? [...parentKey, key] : [key],
			formItems: nvl(item, 'children', []),
			initialValues: nvl(initialValues, key, {}),
			addOn: nvl(item, 'addOn', null),
		};

		return (
			<Form.Item {...complexFormItemProps}>
				<FormContent {...formContentProps} />
			</Form.Item>
		);
	}

	return null;
}

const DatePickerInlineStyle: CSSProperties = {
	width: '100%',
};

// 함수로 작성한 styled component를 선언하세요.
const StyledFormItem = styled(Form.Item)<{ parent: string }>(({ theme, ...props }) => ({
	marginBottom: props['parent'] === 'true' ? 0 : 24,
}));

const StyledInputNumber = styled(InputNumber)(({ theme }) => ({
	['&&']: {
		width: '100%',
	},
}));

const StyledTextArea = styled(TextArea)<{ height?: number }>(({ theme, ...props }) => {
	if (props['height']) {
		return {
			height: props['height'],
		};
	}

	return {};
});

const StyledSearch = styled(Search)(({ theme }) => ({
	['&& .ant-input']: {
		width: 'calc(100% - 15px)',
		borderRightWidth: 1,
		borderRightStyle: 'solid',
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
	},
	['&&& .ant-input-group-addon .ant-btn']: {
		height: 52,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
	},
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
	width: '100%',
}));

const StyledRangePicker = styled(DatePicker.RangePicker)(({ theme }) => ({
	width: '100%',
}));
