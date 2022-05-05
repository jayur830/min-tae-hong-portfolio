// Package
import { useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { Form, FormProps, message, Modal, ModalProps } from 'antd';

// Global
import { values as commonValues } from '@root/configs';
import { nest, nvl } from '@root/utils';

// Local
import { values } from '../configs';
import { useVisibleInfoModal, useSetVisibleInfoModal } from '../Provider';
import { Provider } from './Provider';
import FormContents from './FormContents';

const AboutInfoModal: NextPage = () => {
	const [form] = Form.useForm();
	const visibleInfoModal = useVisibleInfoModal();
	const setVisibleInfoModal = useSetVisibleInfoModal();

	const onOk = useCallback(() => {
		form.submit();
	}, [form]);

	const onCancel = useCallback(() => {
		setVisibleInfoModal(false);
	}, [form]);

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
						const result = {
							name: nvl(fields, 'name', ''),
							metadata: nvl(fields, 'metadata', []).map(({ label, value }: any) => ({ label, value })),
						};
						console.log('fields:', result);

						message.destroy('loading');
						message.success(nvl(values, 'adminAboutInfoModalValue.infoText', ''));
					} catch (e) {
						message.destroy('loading');
						message.success(nvl(values, 'adminAboutInfoModalValue.errorText', ''));
					} finally {
						setVisibleInfoModal(false);
					}
				},
			});
		},
		[form]
	);

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
				<FormContents form={form} />
			</Form>
		</Modal>
	);
};

export default nest(Provider, AboutInfoModal);
