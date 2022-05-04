// Package
import { NextPage } from 'next';
import { Row, Col } from 'antd';

// Global

// Local
import { Provider } from './Provider';
import AboutInfoModal from './AboutInfoModal';
import Comments from './Comments';
import Info from './Info';
import AboutImage from './AboutImage';

const About: NextPage = () => {
	return (
		<Provider>
			<Row gutter={[15, 15]}>
				<Col span={12}>
					<Info />
				</Col>
				<Col span={12}>{/* <AboutImage /> */}</Col>
				<Col span={24}>
					<Comments />
				</Col>
			</Row>
			<AboutInfoModal />
		</Provider>
	);
};

export default About;
