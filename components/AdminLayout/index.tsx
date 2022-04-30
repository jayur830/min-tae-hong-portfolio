// Package
import { NextPage } from 'next';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import styled from 'styled-components';

// Global

// Local
import SideMenu from './SideMenu';
import Helmet from './Helmet';

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

export default AdminLayout;

const StyledLayout = styled(Layout)(({ theme }) => ({
	height: '100%',
}));

const StyledSubLayout = styled(Layout)(({ theme }) => ({
	flexDirection: 'row',
}));

const StyledHeader = styled(Header)(({ theme }) => ({
	fontSize: 18,
	color: theme.white,
}));

const StyledSider = styled(Sider)(({ theme }) => ({
	display: theme.displayFlex,
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: theme.center,
	fontSize: 16,
	backgroundColor: '#83c3ff',
	color: '#15293b',
	padding: 15,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	backgroundColor: 'transparent',
	border: theme.none,
	['&&']: {
		['.ant-menu-item-selected']: {
			backgroundColor: '#15293b',
			color: '#daeeff',
		},
	},
}));

const StyledContent = styled(Content)(({ theme }) => ({
	padding: 15,
}));
