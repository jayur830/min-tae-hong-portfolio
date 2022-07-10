// Package
import { useMediaQuery } from 'react-responsive';
import { Carousel as AntCarousel, CarouselProps as AntCarouselProps } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled, { useTheme } from 'styled-components';

// Global
import { DarkModeProps } from '@root/configs';
import { useDarkMode } from '@root/contexts/Provider';

// Local

export interface CarouselProps {
	children: any;
}

const PrevButton = ({ className, currentSlide, slideCount, ...restArrowProps }: any) => {
	const disabled = currentSlide === 0;
	return <LeftOutlined {...restArrowProps} className={[className, disabled ? 'disabled' : ''].join(' ')} />;
};

const NextButton = ({ className, currentSlide, slideCount, desktopSlideCount, mobileSlideCount, ...restArrowProps }: any) => {
	const theme = useTheme();
	const isMobile = useMediaQuery({ query: `(max-width: ${theme.mobileSize})` });
	const disabled = currentSlide === slideCount - (isMobile ? mobileSlideCount : desktopSlideCount);
	return <RightOutlined {...restArrowProps} className={[className, disabled ? 'disabled' : ''].join(' ')} />;
};

const Carousel = ({ children }: CarouselProps) => {
	const isDarkMode = useDarkMode();
	const [desktopSlideCount, mobileSlideCount] = [5, 3];

	const carouselProps: AntCarouselProps = {
		arrows: true,
		prevArrow: <PrevButton />,
		nextArrow: <NextButton desktopSlideCount={desktopSlideCount} mobileSlideCount={mobileSlideCount} />,
		dots: false,
		infinite: false,
		slidesToShow: desktopSlideCount,
		slidesToScroll: desktopSlideCount,
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: desktopSlideCount,
					slidesToScroll: desktopSlideCount,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: mobileSlideCount,
					slidesToScroll: mobileSlideCount,
				},
			},
		],
	};

	return (
		<StyledCarousel {...carouselProps} dark-mode={isDarkMode.toString()}>
			{children}
		</StyledCarousel>
	);
};

export default Carousel;

const StyledCarousel = styled(AntCarousel)<DarkModeProps>(({ theme, ...props }) => ({
	fontSize: 18,
	width: '62vh',
	['&&']: {
		['.slick-prev, .slick-next']: {
			color: props['dark-mode'] === 'true' ? theme.white : theme.black,
			[':hover']: {
				color: props['dark-mode'] === 'true' ? theme.darkMode1 : theme.grey4,
			},
			['&.disabled']: {
				color: props['dark-mode'] === 'true' ? theme.darkMode2 : theme.grey3,
				cursor: 'default',
				[':hover']: {
					color: props['dark-mode'] === 'true' ? theme.darkMode2 : theme.grey3,
				},
			},
		},
	},
	[`@media screen and (max-width: ${theme.mobileSize})`]: {
		width: '85vmin',
	},
}));
