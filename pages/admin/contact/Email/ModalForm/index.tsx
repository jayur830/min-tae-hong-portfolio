// Package
import { useEffect } from 'react';
import { NextPage } from 'next';
import { Form, FormProps, FormItemProps, Input } from 'antd';

// Global

// Local
import { useContactData, useEditEmail } from '../../Provider';
import { useForm, useOnFinish } from '../Provider';
import { nvl } from '@root/utils';

const ModalForm: NextPage = () => {
	const contactData = useContactData();
	const editEmail = useEditEmail();
	const form = useForm();
	const onFinish = useOnFinish();

	useEffect(() => {
		form.resetFields();
	}, [editEmail]);

	const formProps: FormProps = {
		form,
		autoComplete: 'off',
		onFinish,
	};

	const formItemProps: FormItemProps = {
		name: 'email',
		initialValue: nvl(contactData, 'email', ''),
	};

	return (
		<Form {...formProps}>
			<Form.Item {...formItemProps}>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default ModalForm;
