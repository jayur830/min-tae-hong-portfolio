// Package
import { NextPage } from 'next';
import { Modal, ModalProps } from 'antd';

// Global
import { nvl, nest } from '@root/utils';
import { useVisibleUpdatePasswordModal } from '@root/contexts/Provider';

// Local
import { values } from './configs';
import { Provider, useOnOk, useOnCancel } from './Provider';
import ModalForm from './ModalForm';

const UpdatePasswordModal: NextPage = () => {
	const visible = useVisibleUpdatePasswordModal();
	const onOk = useOnOk();
	const onCancel = useOnCancel();

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

export default nest(Provider, UpdatePasswordModal);
