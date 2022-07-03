// Package
import { NextPage } from 'next';

// Global

// Local
import { Provider } from './Provider';
import List from './List';
import ModifyModal from './ModifyModal';
import PreviewModal from './PreviewModal';

const Movies: NextPage = () => {
	return (
		<Provider>
			<List />
			<ModifyModal />
			<PreviewModal />
		</Provider>
	);
};

export default Movies;
