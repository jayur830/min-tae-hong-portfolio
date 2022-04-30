// Package
import { NextPage } from 'next';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

// Global
import { nest } from '@root/utils';
import { DarkModeProps } from '@root/configs';
import { Provider, useDarkMode } from '@contexts/Provider';
import Helmet from '@root/components/AppLayout/Helmet';

// Local
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppTop from './AppTop';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';

const AppLayout: NextPage = ({ children }) => {
	const isDarkMode = useDarkMode();

	return (
		<StyledLayout dark-mode={isDarkMode.toString()}>
			<Helmet />
			<AppTop />
			<AppHeader />
			<TopNavigation />
			<SideNavigation />
			<StyledContent dark-mode={isDarkMode.toString()}>{children}</StyledContent>
			<AppFooter />
		</StyledLayout>
	);
};

// export default AppLayout;
export default nest(Provider, AppLayout);

const StyledLayout = styled(Layout)<DarkModeProps>(({ theme, ...props }) => ({
	minHeight: '100vh',
	backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.white,
	transition: 'background-color 0.3s',
}));

const StyledContent = styled(Content)<DarkModeProps>(({ theme, ...props }) => ({
	display: theme.displayFlex,
	justifyContent: 'center',
	alignItems: 'middle',
	backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.white,
	height: 'fit-content',
	transition: 'background-color 0.3s',
	[`@media screen and (max-width: ${theme.mobileSize})`]: {
		flexDirection: 'column',
		alignItems: 'center',
	},
}));
