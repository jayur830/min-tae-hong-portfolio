// Package
import { useCallback } from 'react';
import { Row, Col, Switch, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { useSetVisibleMenu, useDarkMode, useSetDarkMode } from '@contexts/Provider';

// Local

const AppTop = () => {
	const setVisibleMenu = useSetVisibleMenu();
	const isDarkMode = useDarkMode();
	const setDarkMode = useSetDarkMode();

	const onVisibleMobileMenu = useCallback(() => {
		setVisibleMenu(true);
	}, []);

	return (
		<StyledOptionsWrap align="middle">
			<Col span={12}>
				<StyledMenuIcon onClick={onVisibleMobileMenu} dark-mode={isDarkMode.toString()} />
			</Col>
			<Col span={12}>
				<StyledDarkModeText dark-mode={isDarkMode.toString()}>{isDarkMode ? 'Dark' : 'Light'}</StyledDarkModeText>
				<StyledSwitch onClick={setDarkMode} />
			</Col>
		</StyledOptionsWrap>
	);
};

export default AppTop;

const StyledOptionsWrap = styled(Row)(({ theme }) => ({
	['.ant-col']: {
		padding: '10px',
		[':first-child(1)']: {
			textAlign: 'left',
		},
		[':last-child']: {
			textAlign: 'right',
		},
	},
}));

const StyledMenuIcon = styled(MenuOutlined)<DarkModeProps>(({ theme, ...props }) => ({
	fontSize: 24,
	color: props['dark-mode'] === 'true' ? theme.white : theme.black,
	cursor: 'pointer',
	transition: 'color 0.15s',
	[':hover']: {
		color: theme.grey4,
	},
	[`@media screen and (min-width: ${theme.mobileSize})`]: {
		display: theme.none,
	},
}));

const StyledDarkModeText = styled(Typography.Text)<DarkModeProps>(({ theme, ...props }) => ({
	color: props['dark-mode'] === 'true' ? theme.white : theme.black,
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
	marginLeft: 10,
	['&.ant-switch-checked']: {
		backgroundColor: theme.darkMode6,
		boxShadow: `0 0 0 2px ${theme.white}`,
		[':hover']: {
			boxShadow: `0 0 0 2px ${theme.grey3}`,
		},
	},
}));
