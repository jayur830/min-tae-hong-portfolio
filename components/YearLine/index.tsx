// Package
import { Row, Col, Divider, Typography } from 'antd';
import styled from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { useDarkMode } from '@contexts/Provider';

// Local

interface Props {
	year: number | string;
}

const YearLine = ({ year }: Props) => {
	const isDarkMode = useDarkMode();

	return (
		<Row align="middle">
			<Col flex={1}>
				<StyledTitle level={3} dark-mode={isDarkMode.toString()}>
					{year}
				</StyledTitle>
			</Col>
			<Col flex={15}>
				<StyledDivider orientation="left" orientationMargin={0}>
					<Circle />
				</StyledDivider>
			</Col>
			<Col flex={15}>
				<StyledDivider orientation="right" orientationMargin={0}>
					<Circle />
				</StyledDivider>
			</Col>
		</Row>
	);
};

export default YearLine;

const StyledTitle = styled(Typography.Title)<DarkModeProps>(({ theme, ...props }) => ({
	['&&']: {
		margin: 0,
		color: props['dark-mode'] === 'true' ? theme.white : theme.black,
	},
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
	['&&']: {
		borderTopColor: theme.grey2,
	},
}));

const Circle = styled.div`
	position: ${({ theme }) => theme.positionRelative};
	top: -2px;
	display: ${({ theme }) => theme.displayInlineBlock};
	width: 10px;
	height: 10px;
	border: 1px solid ${({ theme }) => theme.grey2};
	border-radius: 10px;
`;
