// Package
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Menu } from 'antd';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { useTab, useSetTab, useDarkMode } from '@root/contexts/Provider';

// Local
import { values } from '../configs';

const TopNavigation: NextPage = () => {
	const { pathname } = useRouter();
	const tab = useTab();
	const setTab = useSetTab();
	const isDarkMode = useDarkMode();

	useEffect(() => {
		const paths = pathname.split('/');
		setTab(paths[paths.length - 1]);
	}, [pathname]);

	return (
		<StyledMenu mode="horizontal" selectedKeys={[tab]} dark-mode={isDarkMode.toString()}>
			{values.navigation.map(menu => (
				<StyledMenuItem key={menu.name} dark-mode={isDarkMode.toString()}>
					<Link scroll={false} href={menu.uri} passHref>
						{menu.label.toUpperCase()}
					</Link>
				</StyledMenuItem>
			))}
		</StyledMenu>
	);
};

export default TopNavigation;

const StyledMenu = styled(Menu)<DarkModeProps>(({ theme, ...props }) => ({
	justifyContent: theme.center,
	backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.white,
	borderColor: 'transparent',
	marginBottom: 20,
}));

const StyledMenuItem = styled(Menu.Item)<DarkModeProps>(({ theme, ...props }) => ({
	['&&&']: {
		fontSize: 18,
		fontFamily: theme.fontFamilyBold,
		margin: '0 20px',
		padding: '5px 50px',
		['a']: {
			color: props['dark-mode'] === 'true' ? theme.white : theme.black,
		},
		[':hover, &.ant-menu-item-selected']: {
			backgroundColor: props['dark-mode'] === 'true' ? theme.white : theme.black,
			['*']: {
				color: props['dark-mode'] === 'true' ? theme.darkMode6 : theme.white,
			},
			[':after']: {
				border: theme.none,
			},
		},
		[':after']: {
			border: theme.none,
		},
		[`@media screen and (max-width: ${theme.tabletSize})`]: {
			fontSize: 14,
			padding: '3px 30px',
		},
		[`@media screen and (max-width: ${theme.mobileSize})`]: {
			display: theme.none,
		},
	},
}));
