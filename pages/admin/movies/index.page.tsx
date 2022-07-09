// Package
import { NextPage } from 'next';

// Global

// Local
import { Provider } from './Provider';
import List from './List';
import SubmitModal from './SubmitModal';
import PreviewModal from './PreviewModal';

const Movies: NextPage = () => {
	return (
		<Provider>
			<List />
			<SubmitModal />
			<PreviewModal />
		</Provider>
	);
};

export default Movies;
