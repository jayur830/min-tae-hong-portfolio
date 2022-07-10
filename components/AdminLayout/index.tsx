// Package
import { useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Row, Col, Layout, Space } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import { UserOutlined, ExportOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { nest } from '@root/utils';
import { Provider, useSetVisibleUpdatePasswordModal } from '@root/contexts/Provider';

// Local
import Helmet from './Helmet';
import SideMenu from './SideMenu';
import UpdatePasswordModal from '../UpdatePasswordModal';

const AdminLayout: NextPage<any> = ({ children }) => {
	const router = useRouter();
	const setVisibleUpdatePasswordModal = useSetVisibleUpdatePasswordModal();

	const logout = useCallback(() => {
		localStorage.removeItem('mthp_authentication');
		router.push('/');
	}, []);

	return (
		<>
			<StyledLayout>
				<Helmet />
				<StyledHeader>
					<Row justify="space-between">
						<Col>Management</Col>
						<Col>
							<Space>
								<StyledUserOutlined onClick={() => setVisibleUpdatePasswordModal(true)} />
								<StyledExportOutlined onClick={logout} />
							</Space>
						</Col>
					</Row>
				</StyledHeader>
				<StyledSubLayout>
					<SideMenu />
					<StyledContent>{children}</StyledContent>
				</StyledSubLayout>
			</StyledLayout>
			<UpdatePasswordModal />
		</>
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
	padding: '0 25px',
}));

const StyledContent = styled(Content)(({ theme }) => ({
	overflowY: 'scroll',
	padding: 15,
}));

const StyledUserOutlined = styled(UserOutlined)(({ theme }) => ({
	fontSize: 24,
	paddingLeft: 10,
	cursor: 'pointer',
	transition: 'all 0.3s ease',
	[':hover']: {
		color: theme.grey3,
	},
	[':active']: {
		color: theme.grey6,
	},
}));

const StyledExportOutlined = styled(ExportOutlined)(({ theme }) => ({
	fontSize: 24,
	paddingLeft: 10,
	cursor: 'pointer',
	transition: 'all 0.3s ease',
	[':hover']: {
		color: theme.grey3,
	},
	[':active']: {
		color: theme.grey6,
	},
}));
