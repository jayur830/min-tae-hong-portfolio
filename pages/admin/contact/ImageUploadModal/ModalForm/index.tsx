// Package
import { useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { Row, Col, Form, FormProps, FormItemProps, Upload, Button, ButtonProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { nest, nvl } from '@root/utils';
import { useImgUri } from '@root/contexts/Provider';
import FormContent, { FormContentProps } from '@root/components/FormContent';

// Local
import { useContactData } from '../../Provider';
import { useForm, useOnFinish, useOnValuesChange } from '../Provider';
import { Provider, useFormItems, useSetImageFile, useGetImageValue } from './Provider';

const ModalForm: NextPage = () => {
	const imgUri = useImgUri();
	const contactData = useContactData();
	const form = useForm();
	const onFinish = useOnFinish();
	const onValuesChange = useOnValuesChange();
	const formItems = useFormItems();
	const setImageFile = useSetImageFile();
	const getImageValue = useGetImageValue();

	useEffect(() => {
		form.resetFields();

		if (nvl(contactData, 'img.filename', null) != null) {
			setImageFile({
				uid: '-1',
				name: nvl(contactData, 'img.filename', ''),
				status: 'done',
				url: `${imgUri}/${nvl(contactData, 'img.filename', '')}`,
			});
		}
	}, [imgUri, contactData]);

	const addOn = useCallback(
		(item: any) => {
			const { props, ...itemProps } = item;
			const key = nvl(item, 'key', '');

			if (key === 'img') {
				const formItemProps: FormItemProps = {
					...itemProps,
					name: key,
					initialValue: nvl(contactData, key, null),
					async getValueFromEvent(e) {
						if (Array.isArray(e)) {
							return e;
						}

						if (!nvl(e, 'target.files.0.type').includes('image')) {
							return null;
						}

						return getImageValue(e);
					},
				};

				const buttonProps: ButtonProps = {
					icon: <UploadOutlined />,
					type: 'primary',
					block: true,
				};

				return (
					<Form.Item key={key} {...formItemProps}>
						<Row>
							<Col span={24}>
								<StyledUpload {...props}>
									<Button {...buttonProps}>업로드</Button>
								</StyledUpload>
							</Col>
						</Row>
					</Form.Item>
				);
			}

			return null;
		},
		[contactData]
	);

	const formProps: FormProps = {
		form,
		layout: 'vertical',
		autoComplete: 'off',
		onFinish,
		onValuesChange,
	};

	const formContentProps: FormContentProps = {
		formItems,
		addOn,
	};

	return (
		<Form {...formProps}>
			<FormContent {...formContentProps} />
		</Form>
	);
};

export default nest(Provider, ModalForm);

const StyledUpload = styled(Upload)(({ theme }) => ({
	['.ant-upload, .ant-btn']: {
		width: '100%',
	},
}));
