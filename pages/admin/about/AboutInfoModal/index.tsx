// Package
import { useCallback, useMemo } from 'react';
import { NextPage } from 'next';
import { Descriptions, DescriptionsProps, Form, FormProps, Input, message, Modal, ModalProps } from 'antd';
import styled from 'styled-components';

// Global
import { values as commonValues } from '@root/configs';
import { nvl } from '@root/utils';
import { useVisibleInfoModal, useSetVisibleInfoModal, useAboutData } from '../Provider';
import { stringify } from 'querystring';
import { values } from '../configs';

// Local

const AboutInfoModal: NextPage = () => {
	const [form] = Form.useForm();
	const visibleInfoModal = useVisibleInfoModal();
	const setVisibleInfoModal = useSetVisibleInfoModal();
	const aboutData = useAboutData();

	const initialFormData = useMemo(
		() => ({
			['NAME']: nvl(aboutData, 'name', ''),
			...nvl(aboutData, 'metadata', []).reduce(
				(result: any, cur: { label: string; value: string }) => ({
					...result,
					[cur.label]: cur.value,
				}),
				{}
			),
		}),
		[]
	);

	const onOk = useCallback(() => {
		form.submit();
	}, [form]);

	const onCancel = useCallback(() => {
		setVisibleInfoModal(false);
		form.setFieldsValue(initialFormData);
	}, [form, initialFormData]);

	const onFinish = useCallback(
		(fields: any) => {
			Modal.confirm({
				centered: true,
				title: nvl(values, 'adminAboutInfoModalValue.confirmText', ''),
				onOk() {
					try {
						message.loading({
							key: 'loading',
							content: nvl(values, 'adminAboutInfoModalValue.loadingText', ''),
						});
						/** TODO Implement */
						console.log('fields:', fields);

						message.destroy('loading');
						message.success(nvl(values, 'adminAboutInfoModalValue.infoText', ''));
					} catch (e) {
						message.destroy('loading');
						message.success(nvl(values, 'adminAboutInfoModalValue.errorText', ''));
					} finally {
						setVisibleInfoModal(false);
						form.setFieldsValue(initialFormData);
					}
				},
			});
		},
		[form, initialFormData]
	);

	const onChangeInput = useCallback((i: number, keyName: 'label' | 'value') => {
		return (e: any) => {
			form.setFieldsValue({
				...form.getFieldsValue(),
				[i]: {
					...form.getFieldValue(i),
					[keyName]: e.target.value,
				},
			});
		};
	}, []);

	const modalProps: ModalProps = {
		centered: true,
		destroyOnClose: true,
		width: 700,
		visible: visibleInfoModal,
		title: nvl(commonValues, 'aboutValue.admin.infoModal.title', ''),
		okText: nvl(commonValues, 'aboutValue.admin.infoModal.okText', '확인'),
		onOk,
		onCancel,
	};

	const formProps: FormProps = {
		form,
		layout: 'vertical',
		autoComplete: 'off',
		onFinish,
	};

	return (
		<Modal {...modalProps}>
			<Form {...formProps}>
				<Descriptions {...descriptionsProps}>
					<Descriptions.Item label="NAME.">
						<Form.Item required initialValue={nvl(aboutData, 'name', '')} name="name" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
							<Input />
						</Form.Item>
					</Descriptions.Item>
					{nvl(aboutData, 'metadata', []).map(({ label, value }: any, i: number) => {
						return (
							<Descriptions.Item key={i} label={<Input defaultValue={label} onChange={onChangeInput(i, 'label')} />}>
								<Input defaultValue={value} onChange={onChangeInput(i, 'value')} />
							</Descriptions.Item>
						);
					})}
				</Descriptions>
			</Form>
		</Modal>
	);
};

const descriptionsProps: DescriptionsProps = {
	bordered: true,
	column: 1,
	labelStyle: {
		width: 220,
	},
};

export default AboutInfoModal;
