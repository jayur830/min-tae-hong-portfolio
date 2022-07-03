// import dependency modules : package.json에 명시된 외부모듈을 선언하세요.
import { Component } from 'react';
import { Row, Col } from 'antd';

// import global modules : 서비스 전역에서 사용중인 모듈을 선언하세요.
import { nvl } from '@root/utils';

// import local modules : 지역(route)에서 사용중인 모듈을 선언하세요.
import { FormItemUnionType, ComplexItemType } from './configs';
import Item, { FormContentItemProps } from './Item';

export interface FormContentProps {
	gutter?: [number, number];
	parentKey?: string[];
	formItems: (FormItemUnionType | ComplexItemType)[];
	initialValues?: any;
	addOn?: (item: any) => JSX.Element | JSX.Element[] | null;
}

export default class FormContent extends Component<FormContentProps> {
	constructor(props: FormContentProps) {
		super(props);
	}

	static Item(props: FormContentItemProps) {
		return <Item {...props} />;
	}

	render(): JSX.Element {
		const { gutter, parentKey, formItems, initialValues, addOn } = this.props;

		return (
			<Row align="middle" gutter={gutter}>
				{formItems.map((item, i) => {
					const formContentItemProps: FormContentItemProps = {
						item,
						parentKey,
						initialValues,
						addOn,
					};

					return (
						<Col key={i} span={nvl(item, 'span', 24)}>
							<Item {...formContentItemProps} />
						</Col>
					);
				})}
			</Row>
		);
	}
}

// 함수로 작성한 styled component를 선언하세요.
