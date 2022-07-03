// Package
import { NextPage } from 'next';
import { Modal, ModalProps } from 'antd';

// Global
import { nvl, nest } from '@root/utils';

// Local
import { values } from '../configs';
import { useVislbleModifyModal } from '../Provider';
import { Provider, useOnOk, useOnCancel, useAfterClose } from './Provider';
import ModalForm from './ModalForm';

const ModifyModal: NextPage = () => {
	const vislbleModifyModal = useVislbleModifyModal();
	const onOk = useOnOk();
	const onCancel = useOnCancel();
	const afterClose = useAfterClose();

	const modalProps: ModalProps = {
		centered: true,
		destroyOnClose: true,
		visible: vislbleModifyModal,
		title: nvl(values, 'adminMoviesModifyModalValue.title', ''),
		okText: nvl(values, 'adminMoviesModifyModalValue.okText', ''),
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

export default nest(Provider, ModifyModal);
