// Package
import { NextPage } from 'next';
import { Modal, ModalProps } from 'antd';

// Global
import { nvl, nest } from '@root/utils';

// Local
import { values } from '../configs';
import { useVisibleModifyModal } from '../Provider';
import { Provider, useModalType, useOnOk, useOnCancel, useAfterClose } from './Provider';
import ModalForm from './ModalForm';

const SubmitModal: NextPage = () => {
	const visibleModifyModal = useVisibleModifyModal();
	const modalType = useModalType();
	const onOk = useOnOk();
	const onCancel = useOnCancel();
	const afterClose = useAfterClose();

	const modalProps: ModalProps = {
		centered: true,
		destroyOnClose: true,
		visible: visibleModifyModal,
		title: nvl(values, `adminTheatersSubmitModalValue.title.${modalType}`, ''),
		okText: nvl(values, 'adminTheatersSubmitModalValue.okText', ''),
		bodyStyle: {
			overflowY: 'scroll',
			height: 750,
		},
		onOk,
		onCancel,
		afterClose,
	};

	return (
		<Modal {...modalProps}>
			<ModalForm />
		</Modal>
	);
};

export default nest(Provider, SubmitModal);
