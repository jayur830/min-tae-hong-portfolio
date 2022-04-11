// Package
import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Drawer, DrawerProps } from 'antd';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { useVisibleMenu, useSetVisibleMenu, useTab, useSetTab, useDarkMode } from '@contexts/Provider';

// Local
import { values } from '../configs';

const SideNavigation = () => {
	const { pathname } = useRouter();
	const tab = useTab();
	const setTab = useSetTab();
	const visibleMenu = useVisibleMenu();
	const setVisibleMenu = useSetVisibleMenu();
	const isDarkMode = useDarkMode();

	const onInvisibleMobileMenu = useCallback(() => {
		setVisibleMenu(false);
	}, []);

	useEffect(() => {
		const paths = pathname.split('/');
		setTab(paths[paths.length - 1]);
	}, [pathname]);

	const drawerProps: DrawerProps = {
		placement: 'left',
		width: 300,
		visible: visibleMenu,
		onClose: onInvisibleMobileMenu,
	};

	return (
		<StyledDrawer {...drawerProps} dark-mode={isDarkMode.toString()}>
			<StyledMenu mode="inline" selectedKeys={[tab]}>
				{values.navigation.map(menu => (
					<StyledMenuItem key={menu.name} dark-mode={isDarkMode.toString()}>
						<Link scroll={false} href={menu.uri} passHref>
							{menu.label.toUpperCase()}
						</Link>
					</StyledMenuItem>
				))}
			</StyledMenu>
		</StyledDrawer>
	);
};

export default SideNavigation;

const StyledDrawer = styled(Drawer)<DarkModeProps>(({ theme, ...props }) => ({
	['.ant-drawer-content']: {
		backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode1 : theme.white,
		opacity: props['dark-mode'] === 'true' ? 0.8 : 1,
		['.ant-drawer-close']: {
			color: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.black,
		},
		['.ant-drawer-header']: {
			backgroundColor: theme.inherit,
		},
		['.ant-drawer-body .ant-menu']: {
			backgroundColor: theme.inherit,
		},
	},
	[`@media screen and (min-width: ${theme.mobileSize})`]: {
		display: theme.none,
	},
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	justifyContent: theme.center,
	borderColor: 'transparent',
	marginBottom: 20,
}));

const StyledMenuItem = styled(Menu.Item)<DarkModeProps>(({ theme, ...props }) => ({
	['&&&']: {
		fontSize: 18,
		fontFamily: theme.fontFamilyBold,
		margin: '0 20px',
		padding: '5px 50px',
		[':hover, &.ant-menu-item-selected']: {
			backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.black,
			['*']: {
				color: theme.white,
			},
			[':after']: {
				border: theme.none,
			},
		},
		[':after']: {
			border: theme.none,
		},
	},
}));
