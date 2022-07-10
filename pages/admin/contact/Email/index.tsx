// Package
import { NextPage } from 'next';
import { Card, CardProps, Popconfirm, PopconfirmProps, Button, Space } from 'antd';
import Text from 'antd/lib/typography/Text';

// Global
import { nest, nvl } from '@root/utils';

// Local
import { values } from '../configs';
import { useContactData, useEditEmail } from '../Provider';
import { Provider, useForm, useOnChangeEditMode } from './Provider';
import ModalForm from './ModalForm';

const Email: NextPage = () => {
	const contactData = useContactData();
	const editEmail = useEditEmail();
	const form = useForm();
	const onChangeEditMode = useOnChangeEditMode();

	const popconfirmProps: PopconfirmProps = {
		title: nvl(values, 'messages.email.confirm', ''),
		onConfirm() {
			form.submit();
		},
	};

	const cardProps: CardProps = {
		title: '이메일',
		extra: (
			<Space>
				{editEmail ? (
					<>
						<Button onClick={onChangeEditMode}>취소</Button>
						<Popconfirm {...popconfirmProps}>
							<Button type="primary">확인</Button>
						</Popconfirm>
					</>
				) : (
					<Button onClick={onChangeEditMode}>수정</Button>
				)}
			</Space>
		),
	};

	return <Card {...cardProps}>{editEmail ? <ModalForm /> : <Text>{nvl(contactData, 'email', '')}</Text>}</Card>;
};

export default nest(Provider, Email);
