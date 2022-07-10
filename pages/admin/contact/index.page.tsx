// Package
import { NextPage } from 'next';
import { Row, Col } from 'antd';

// Global

// Local
import { Provider } from './Provider';
import Email from './Email';
import ContactImage from './ContactImage';
import ImageUploadModal from './ImageUploadModal';

const Contact: NextPage = () => {
	return (
		<Provider>
			<Row gutter={[15, 15]}>
				<Col span={12}>
					<Email />
				</Col>
				<Col span={12}>
					<ContactImage />
				</Col>
			</Row>
			<ImageUploadModal />
		</Provider>
	);
};

export default Contact;
