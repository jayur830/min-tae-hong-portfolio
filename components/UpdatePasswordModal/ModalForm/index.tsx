// Package
import FormContent from '@root/components/FormContent';
import { nvl } from '@root/utils';
import { Form, FormProps } from 'antd';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { values } from '../configs';

// Global

// Local
import { useForm, useOnFinish, useFormItems } from '../Provider';

const ModalForm: NextPage = () => {
	const form = useForm();
	const onFinish = useOnFinish();
	const formItems = useFormItems();

	useEffect(() => {
		form.resetFields();
	}, []);

	const formProps: FormProps = {
		form,
		layout: 'vertical',
		autoComplete: 'off',
		onFinish,
	};

	return (
		<Form {...formProps}>
			<FormContent formItems={formItems} />
		</Form>
	);
};

export default ModalForm;
