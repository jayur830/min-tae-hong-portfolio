// Package
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-brands-svg-icons";
import constate from "constate";

// Global
import { Footer } from "@root/types";

// Local
import { useCommon, useSetCommon } from "@contexts/Provider";

type Sns = {
	name: string;
	url: string;
};

const useAdminLayout = () => {
	// require("../../hooks/useAuthenticate").useAuthenticate();

	const router = useRouter();

	const common = useCommon();
	const setCommon = useSetCommon();
	const [footer, setFooter] = useState<Footer>({
		sns: [],
	});

	const [iconsHtml, setIconsHtml] = useState([<React.Fragment key={0} />]);
	const [openSideMenu, setOpenSideMenu] = useState(false);

	const [editTitle, setEditTitle] = useState(false);
	const [editHeaderTitle, setEditHeaderTitle] = useState(false);
	const [editSnsList, setEditSnsList] = useState(false);

	const [title, setTItle] = useState(common.title);
	const [headerTitle, setHeaderTItle] = useState(common.headerTitle);
	const [snsList, setSnsList] = useState(Object.freeze(footer.sns.map((obj: Sns) => ({ ...obj }))));

	useEffect(() => {
		fetch("/api/footer/data")
			.then(response => response.json())
			.then(data => {
				setSnsList(data.sns.map((obj: Sns) => ({ ...obj })));
				setIconsHtml(
					data.sns.map((obj: Sns, i: number) => {
						switch (obj.name) {
							case "instagram":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faInstagram} />
									</a>
								);
							case "facebook":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faFacebook} />
									</a>
								);
							case "twitter":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faTwitter} />
									</a>
								);
							case "line":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faLine} />
									</a>
								);
							case "youtube":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faYoutube} />
									</a>
								);
							case "pinterest":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faPinterest} />
									</a>
								);
							case "tiktok":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faTiktok} />
									</a>
								);
							case "snapchat":
								return (
									<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
										<FontAwesomeIcon size="1x" icon={Icons.faSnapchat} />
									</a>
								);
							default:
								return <a key={i} href="#" />;
						}
					})
				);
			});
	}, [setSnsList, setIconsHtml]);

	const commitTitle = useCallback(
		(_id: string, title: string) => {
			fetch(`/api/admin/setTitle?_id=${_id}&title=${title}`);
			let _common = { ...common };
			_common.title = title;
			setCommon(_common);
			setEditTitle(false);
		},
		[common, setCommon, setEditTitle]
	);

	const commitHeaderTitle = useCallback(
		(_id: string, headerTitle: string) => {
			fetch(`/api/admin/setHeaderTitle?_id=${_id}&headerTitle=${headerTitle}`);
			let _common = { ...common };
			_common.headerTitle = headerTitle;
			setCommon(_common);
			setEditHeaderTitle(false);
		},
		[common, setCommon, setEditHeaderTitle]
	);

	const commitFooterSnsList = useCallback(
		(_id: string, sns: { name: string; url: string }[]) => {
			fetch("/api/admin/footer/setSns", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					_id,
					sns,
				}),
			});
			setFooter({ sns });

			setEditSnsList(false);
			setSnsList(sns);
			setIconsHtml(
				sns.map((obj: { name: string; url: string }, i: number) => {
					switch (obj.name) {
						case "instagram":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faInstagram} />
								</a>
							);
						case "facebook":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faFacebook} />
								</a>
							);
						case "twitter":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faTwitter} />
								</a>
							);
						case "line":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faLine} />
								</a>
							);
						case "youtube":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faYoutube} />
								</a>
							);
						case "pinterest":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faPinterest} />
								</a>
							);
						case "tiktok":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faTiktok} />
								</a>
							);
						case "snapchat":
							return (
								<a key={i + "-" + obj.name} href={obj.url} target="_blank" rel="noreferrer">
									<FontAwesomeIcon size="1x" icon={Icons.faSnapchat} />
								</a>
							);
						default:
							return <a key={i} href="#" />;
					}
				})
			);
		},
		[setFooter, setEditSnsList, setSnsList, setIconsHtml]
	);

	const linkList = useMemo(
		() =>
			["about", "movies", "drama", "theater", "contact"].map((val, i) => (
				<li key={i} className={router.pathname === "/admin/" + val ? "on" : ""}>
					<Link scroll={false} href={"/admin/" + val} passHref>
						<h4>{val.toUpperCase()}</h4>
					</Link>
				</li>
			)),
		[router]
	);

	const snsOptions = useMemo(
		() =>
			["Instagram", "Facebook", "Twitter", "Line", "Youtube", "Pinterest", "Tiktok", "Snapchat"].map((sns, i) => (
				<option key={i} value={sns.toLowerCase()}>
					{sns}
				</option>
			)),
		[]
	);

	return {
		footer,
		setFooter,
		iconsHtml,
		setIconsHtml,
		openSideMenu,
		setOpenSideMenu,
		editTitle,
		setEditTitle,
		editHeaderTitle,
		setEditHeaderTitle,
		editSnsList,
		setEditSnsList,
		title,
		setTItle,
		headerTitle,
		setHeaderTItle,
		snsList,
		setSnsList,
		commitTitle,
		commitHeaderTitle,
		commitFooterSnsList,
		linkList,
		snsOptions,
	};
};

const [
	Provider,
	useFooter,
	useSetFooter,
	useIconsHtml,
	useSetIconsHtml,
	useOpenSideMenu,
	useSetOpenSideMenu,
	useEditTitle,
	useSetEditTitle,
	useEditHeaderTitle,
	useSetEditHeaderTitle,
	useEditSnsList,
	useSetEditSnsList,
	useTitle,
	useSetTItle,
	useHeaderTitle,
	useSetHeaderTItle,
	useSnsList,
	useSetSnsList,
	useCommitTitle,
	useCommitHeaderTitle,
	useCommitFooterSnsList,
	useLinkList,
	useSnsOptions,
] = constate(
	useAdminLayout,
	value => value.footer,
	value => value.setFooter,
	value => value.iconsHtml,
	value => value.setIconsHtml,
	value => value.openSideMenu,
	value => value.setOpenSideMenu,
	value => value.editTitle,
	value => value.setEditTitle,
	value => value.editHeaderTitle,
	value => value.setEditHeaderTitle,
	value => value.editSnsList,
	value => value.setEditSnsList,
	value => value.title,
	value => value.setTItle,
	value => value.headerTitle,
	value => value.setHeaderTItle,
	value => value.snsList,
	value => value.setSnsList,
	value => value.commitTitle,
	value => value.commitHeaderTitle,
	value => value.commitFooterSnsList,
	value => value.linkList,
	value => value.snsOptions
);

export {
	Provider,
	useFooter,
	useSetFooter,
	useIconsHtml,
	useSetIconsHtml,
	useOpenSideMenu,
	useSetOpenSideMenu,
	useEditTitle,
	useSetEditTitle,
	useEditHeaderTitle,
	useSetEditHeaderTitle,
	useEditSnsList,
	useSetEditSnsList,
	useTitle,
	useSetTItle,
	useHeaderTitle,
	useSetHeaderTItle,
	useSnsList,
	useSetSnsList,
	useCommitTitle,
	useCommitHeaderTitle,
	useCommitFooterSnsList,
	useLinkList,
	useSnsOptions,
};
