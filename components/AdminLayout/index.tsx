// Package
import { NextPage } from 'next';
import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import styled from 'styled-components';

// Global
import { nest } from '@root/utils';
import { Provider } from '@root/contexts/Provider';

// Local
import Helmet from './Helmet';
import SideMenu from './SideMenu';

const AdminLayout: NextPage = ({ children }) => {
	return (
		<StyledLayout>
			<Helmet />
			<StyledHeader>Management</StyledHeader>
			<StyledSubLayout>
				<SideMenu />
				<StyledContent>{children}</StyledContent>
			</StyledSubLayout>
		</StyledLayout>
	);
};

export default nest(Provider, AdminLayout);

const StyledLayout = styled(Layout)(({ theme }) => ({
	height: '100%',
}));

const StyledSubLayout = styled(Layout)(({ theme }) => ({
	flexDirection: 'row',
}));

const StyledHeader = styled(Header)(({ theme }) => ({
	fontSize: 18,
	color: theme.white,
	backgroundColor: theme.black,
}));

const StyledContent = styled(Content)(({ theme }) => ({
	overflowY: 'scroll',
	padding: 15,
}));
