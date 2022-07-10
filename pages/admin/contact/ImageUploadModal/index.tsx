// Package
import { NextPage } from 'next';
import { Modal, ModalProps } from 'antd';

// Global
import { nvl, nest } from '@root/utils';

// Local
import { values } from '../configs';
import { useVisibleImageUploadModal } from '../Provider';
import { Provider, useOnOk, useOnCancel } from './Provider';
import ModalForm from './ModalForm';

const ImageUploadModal: NextPage = () => {
	const visible = useVisibleImageUploadModal();
	const onOk = useOnOk();
	const onCancel = useOnCancel();

	console.log('ImageUploadModal');

	const modalProps: ModalProps = {
		centered: true,
		destroyOnClose: true,
		visible,
		title: nvl(values, 'modalValues.title', ''),
		okText: nvl(values, 'modalValues.okText', ''),
		onOk,
		onCancel,
	};

	return (
		<Modal {...modalProps}>
			<ModalForm />
		</Modal>
	);
};

export default nest(Provider, ImageUploadModal);
