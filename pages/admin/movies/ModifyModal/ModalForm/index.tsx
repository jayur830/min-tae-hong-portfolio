// Package
import { Fragment, useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { Row, Col, Form, Input, Upload, Button, FormItemProps, ButtonProps, FormProps } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { nvl, nest } from '@root/utils';
import { useImgUri } from '@root/contexts/Provider';
import FormContent, { FormContentProps } from '@root/components/FormContent';

// Local
import { useSelectedData } from '../../Provider';
import { useForm, useOnFinish, useOnValuesChange } from '../Provider';
import { Provider, useSetImageFile, useSetVideoFile, useSetSceneFileList, useGetImageValue, useGetVideoValue, useFormItems } from './Provider';

const ModalForm: NextPage = () => {
	const imgUri = useImgUri();
	const selectedData = useSelectedData();
	const form = useForm();
	const onFinish = useOnFinish();
	const onValuesChange = useOnValuesChange();
	const setImageFile = useSetImageFile();
	const setVideoFile = useSetVideoFile();
	const setSceneFileList = useSetSceneFileList();
	const getImageValue = useGetImageValue();
	const getVideoValue = useGetVideoValue();
	const formItems = useFormItems();

	useEffect(() => {
		form.resetFields();

		if (nvl(selectedData, 'img', {})) {
			setImageFile({
				uid: '-1',
				name: nvl(selectedData, 'img.filename', ''),
				status: 'done',
				url: `${imgUri}/${nvl(selectedData, 'img.filename', '')}`,
			});
		}

		if (nvl(selectedData, 'video', {})) {
			setVideoFile({
				uid: '-1',
				name: nvl(selectedData, 'video.filename', ''),
				status: 'done',
				url: `${imgUri}/${nvl(selectedData, 'video.filename', '')}`,
			});
		}

		setSceneFileList(
			nvl(selectedData, 'scenes', []).map(({ filename }: any, i: number) => ({
				uid: i,
				name: filename,
				status: 'done',
				url: `${imgUri}/${filename}`,
			}))
		);
	}, [imgUri, selectedData]);

	const addOn = useCallback(
		(item: any) => {
			const key = nvl(item, 'key', '');
			const label = nvl(item, 'label', '');

			if (key === 'img') {
				const formItemProps: FormItemProps = {
					name: key,
					label,
					valuePropName: 'file',
					initialValue: nvl(selectedData, key, {}),
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
				};

				return (
					<Form.Item key={key} {...formItemProps}>
						<Row>
							<Col span={24}>
								<StyledUpload {...nvl(item, 'props', {})}>
									<Button {...buttonProps}>업로드</Button>
								</StyledUpload>
							</Col>
						</Row>
					</Form.Item>
				);
			}

			if (key === 'video') {
				const formItemProps: FormItemProps = {
					name: key,
					label,
					valuePropName: 'file',
					initialValue: nvl(selectedData, key, {}),
					async getValueFromEvent(e) {
						if (Array.isArray(e)) {
							return e;
						}

						if (!nvl(e, 'target.files.0.type').includes('video')) {
							return null;
						}

						return getVideoValue(e);
					},
				};

				const buttonProps: ButtonProps = {
					icon: <UploadOutlined />,
					type: 'primary',
				};

				return (
					<Form.Item key={key} {...formItemProps}>
						<Row>
							<Col span={24}>
								<StyledUpload {...nvl(item, 'props', {})}>
									<Button {...buttonProps}>업로드</Button>
								</StyledUpload>
							</Col>
						</Row>
					</Form.Item>
				);
			}

			if (['actors', 'awards'].includes(key)) {
				return (
					<Form.Item key={key} label={label}>
						<Form.List name={key} initialValue={nvl(selectedData, key, [])}>
							{(fields, { add, remove }) => (
								<Row justify="end" align="middle" gutter={[10, 10]}>
									{fields.map((_: any, i: number) => (
										<Fragment key={i}>
											<Col span={22}>
												<StyledFormItem name={i}>
													<Input />
												</StyledFormItem>
											</Col>
											<Col span={2}>
												<MinusCircleOutlined onClick={() => remove(i)} />
											</Col>
										</Fragment>
									))}
									<StyledPlusCol span={24}>
										<PlusOutlined onClick={() => add('')} />
									</StyledPlusCol>
								</Row>
							)}
						</Form.List>
					</Form.Item>
				);
			}

			if (key === 'scenes') {
				const formItemProps: FormItemProps = {
					name: key,
					label,
					initialValue: nvl(selectedData, key, []),
					valuePropName: 'filelist',
					getValueFromEvent(e) {
						if (Array.isArray(e)) {
							return e;
						}

						if (!nvl(e, 'target.files.0.type').includes('image')) {
							return null;
						}

						const scenes = form.getFieldValue('scenes');
						const newScene = getImageValue(e);

						return scenes ? [...scenes, newScene] : [newScene];
					},
				};

				return (
					<Form.Item key={key} {...formItemProps}>
						<Row>
							<Col span={24}>
								<Upload {...nvl(item, 'props', {})}>
									<PlusOutlined />
								</Upload>
							</Col>
						</Row>
					</Form.Item>
				);
			}

			return null;
		},
		[selectedData]
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
		initialValues: selectedData,
	};

	return (
		<Form {...formProps}>
			<FormContent {...formContentProps} />
		</Form>
	);
};

export default nest(Provider, ModalForm);

const StyledFormItem = styled(Form.Item)(({ theme }) => ({
	marginBottom: 0,
}));

const StyledUpload = styled(Upload)(({ theme }) => ({
	['.ant-upload, .ant-btn']: {
		width: '100%',
	},
}));

const StyledPlusCol = styled(Col)(({ theme }) => ({
	fontSize: 16,
	textAlign: 'center',
}));
