// Package
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Link from 'next/link';
import styled from 'styled-components';

// Global
import { values } from '../configs';

// Local

const SideMenu = () => {
	return (
		<StyledSider>
			<StyledMenu>
				{values.adminLayoutValue.menus.map(({ label, link }, i) => (
					<Menu.Item key={i}>
						<Link href={link}>{label}</Link>
					</Menu.Item>
				))}
			</StyledMenu>
		</StyledSider>
	);
};

export default SideMenu;

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
	['&&&&']: {
		['.ant-menu-item-selected']: {
			backgroundColor: '#15293b',
			['a']: {
				color: '#daeeff',
			},
		},
	},
}));
