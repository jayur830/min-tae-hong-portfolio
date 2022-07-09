// Package
import Link from 'next/link';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import styled from 'styled-components';

// Global
import { nvl } from '@root/utils';

// Local
import { values } from '../configs';
import { useRouter } from 'next/router';

const SideMenu = () => {
	const { pathname } = useRouter();

	return (
		<StyledSider>
			<StyledMenu defaultSelectedKeys={[pathname]}>
				{nvl(values, 'adminLayoutValue.menus', []).map(({ label, link }: any) => (
					<Menu.Item key={link}>
						<Link href={link}>
							<a>{label}</a>
						</Link>
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
	backgroundColor: theme.grey6,
	padding: 15,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
	color: theme.white,
	backgroundColor: 'transparent',
	border: theme.none,
	['.ant-menu-item']: {
		['a']: {
			color: theme.white,
		},
		[':hover']: {
			backgroundColor: theme.white,
			['a']: {
				color: theme.black,
			},
		},
	},
	['&&&&']: {
		['.ant-menu-item-selected']: {
			backgroundColor: theme.white,
			['a']: {
				color: theme.black,
			},
		},
	},
}));
