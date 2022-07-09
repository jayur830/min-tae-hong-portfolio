// Package
import { NextPage } from 'next';

// Global

// Local
import { Provider } from './Provider';
import List from './List';
import ModifyModal from './SubmitModal';
import PreviewModal from './PreviewModal';

const Theaters: NextPage = () => {
	return (
		<Provider>
			<List />
			<ModifyModal />
			<PreviewModal />
		</Provider>
	);
};

export default Theaters;
