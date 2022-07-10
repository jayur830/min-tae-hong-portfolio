// Package
import { NextPage } from 'next';
import { Modal, ModalProps } from 'antd';

// Global
import { values as commonValues } from '@root/configs';
import { nvl, nest } from '@root/utils';

// Local
import { useVisibleInfoModal } from '../Provider';
import { Provider, useOnOk, useOnCancel } from './Provider';
import FormContents from './FormContents';

const AboutInfoModal: NextPage = () => {
	const visible = useVisibleInfoModal();
	const onOk = useOnOk();
	const onCancel = useOnCancel();

	const modalProps: ModalProps = {
		centered: true,
		destroyOnClose: true,
		width: 700,
		visible,
		title: nvl(commonValues, 'aboutValue.admin.infoModal.title', ''),
		okText: nvl(commonValues, 'aboutValue.admin.infoModal.okText', '확인'),
		onOk,
		onCancel,
	};

	return (
		<Modal {...modalProps}>
			<FormContents />
		</Modal>
	);
};

export default nest(Provider, AboutInfoModal);
