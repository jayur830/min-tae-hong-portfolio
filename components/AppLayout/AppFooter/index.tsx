// Package
import { Fragment } from 'react';
import { Typography, Col } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { InstagramFilled, FacebookFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { nvl } from '@root/utils';
import { useDarkMode, useFooterData } from '@root/contexts/Provider';

// Local
import { values } from '../configs';

const AppFooter = () => {
	const isDarkMode = useDarkMode();
	const footerData = useFooterData();

	return (
		<StyledFooter dark-mode={isDarkMode.toString()}>
			<Col>{values.footerConfigs.description}</Col>
			{nvl(footerData, 'sns', []).map((sns: { name: string; url: string }, i: number) => {
				if (sns.name === 'instagram') {
					return (
						<Col key={i}>
							<Typography.Link href={sns.url} target="_blank">
								<InstagramFilled />
							</Typography.Link>
						</Col>
					);
				}

				if (sns.name === 'facebook') {
					return (
						<Col key={i}>
							<Typography.Link href={sns.url} target="_blank">
								<FacebookFilled />
							</Typography.Link>
						</Col>
					);
				}

				if (sns.name === 'twitter') {
					return (
						<Col key={i}>
							<Typography.Link href={sns.url} target="_blank">
								<TwitterOutlined />
							</Typography.Link>
						</Col>
					);
				}

				if (sns.name === 'youtube') {
					return (
						<Col key={i}>
							<Typography.Link href={sns.url} target="_blank">
								<YoutubeFilled />
							</Typography.Link>
						</Col>
					);
				}

				return <Fragment key={i} />;
			})}
		</StyledFooter>
	);
};

export default AppFooter;

const StyledFooter = styled(Footer)<DarkModeProps>(({ theme, ...props }) => ({
	display: theme.displayFlex,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: props['dark-mode'] === 'true' ? theme.darkMode4 : theme.black,
	color: theme.white,
	height: 120,
	marginTop: 20,
	['.ant-col']: {
		margin: '0 5px',
	},
	['.anticon']: {
		fontSize: 30,
		color: theme.white,
		cursor: 'pointer',
		transition: 'all 0.15s ease',
		[':hover']: {
			color: props['dark-mode'] === 'true' ? theme.darkMode1 : theme.grey3,
		},
	},
}));
