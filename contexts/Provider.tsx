// Package
import { useState } from 'react';
import constate from 'constate';
import { useQuery } from '@apollo/client';

// Global
// import { CommonQuery, FooterQuery } from '@graphql/queries';
import CommonQuery from '@graphql/queries/getCommon.gql';
import FooterQuery from '@graphql/queries/getFooter.gql';
import { nvl } from '@root/utils';

// Local

const useAppLayout = () => {
	const [visibleMenu, setVisibleMenu] = useState(false);
	const [isDarkMode, setDarkMode] = useState(false);
	const [tab, setTab] = useState('');

	const imgUri = `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com`;

	const { data: common } = useQuery(CommonQuery);
	const commonData = nvl(common, 'common', {});

	const { data: footer } = useQuery(FooterQuery);
	const footerData = nvl(footer, 'footer', {});

	return { visibleMenu, setVisibleMenu, imgUri, isDarkMode, setDarkMode, commonData, footerData, tab, setTab };
};

const [Provider, useVisibleMenu, useSetVisibleMenu, useImgUri, useDarkMode, useSetDarkMode, useCommonData, useFooterData, useTab, useSetTab] = constate(
	useAppLayout,
	value => value.visibleMenu,
	value => value.setVisibleMenu,
	value => value.imgUri,
	value => value.isDarkMode,
	value => value.setDarkMode,
	value => value.commonData,
	value => value.footerData,
	value => value.tab,
	value => value.setTab
);

export { Provider, useVisibleMenu, useSetVisibleMenu, useImgUri, useDarkMode, useSetDarkMode, useCommonData, useFooterData, useTab, useSetTab };
