// Package
import Link from 'next/link';
import { Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { nvl } from '@root/utils';
import { useCommonData, useDarkMode } from '@root/contexts/Provider';

// Local

const AppHeader = () => {
	const isDarkMode = useDarkMode();
	const commonData = useCommonData();

	return (
		<StyledHeader>
			<StyledTitle level={1} dark-mode={isDarkMode.toString()}>
				<Link scroll={false} href="/" passHref>
					{nvl(commonData, 'headerTitle', '')}
				</Link>
			</StyledTitle>
		</StyledHeader>
	);
};

export default AppHeader;

const StyledHeader = styled(Header)(({ theme }) => ({
	['&&&']: {
		textAlign: 'center',
		backgroundColor: 'transparent',
		height: 'fit-content',
		padding: '25px 0 50px',
		['*']: {
			color: theme.black,
		},
	},
}));

const StyledTitle = styled(Typography.Title)<DarkModeProps>(({ theme, ...props }) => ({
	['&&& a']: {
		color: props['dark-mode'] === 'true' ? theme.white : theme.black,
	},
}));
