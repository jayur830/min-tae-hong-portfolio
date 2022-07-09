// Package
import { useCallback } from 'react';
import { NextPage } from 'next';
import { Modal, ModalProps } from 'antd';
import styled from 'styled-components';

// Global

// Local
import { usePreviewImage, useSetPreviewImage, useVisiblePreviewModal, useSetVisiblePreviewModal } from '../Provider';

const PreviewModal: NextPage = () => {
	const previewImage = usePreviewImage();
	const setPreviewImage = useSetPreviewImage();
	const visiblePreviewModal = useVisiblePreviewModal();
	const setVisiblePreviewModal = useSetVisiblePreviewModal();

	const onClose = useCallback(() => {
		setVisiblePreviewModal(false);
		setPreviewImage('');
	}, []);

	const modalProps: ModalProps = {
		centered: true,
		destroyOnClose: true,
		width: 750,
		title: '',
		footer: null,
		visible: visiblePreviewModal,
		onOk: onClose,
		onCancel: onClose,
	};

	return (
		<Modal {...modalProps}>
			<StyledImg src={previewImage} />
		</Modal>
	);
};

export default PreviewModal;

const StyledImg = styled.img`
	width: 100%;
`;
