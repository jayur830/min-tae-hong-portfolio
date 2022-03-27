// Package
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-brands-svg-icons";
import constate from "constate";

// Global

// Local

const useAppLayout = () => {
	const router = useRouter();
	const [iconsHtml, setIconsHtml] = useState<JSX.Element[]>([<React.Fragment key={0} />]);
	const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

	useEffect(() => {
		fetch("/api/footer/data")
			.then((response) => response.json())
			.then((data) => {
				setIconsHtml(
					data.sns.map((obj: { name: string; url: string }, i: number) => {
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
	}, [setIconsHtml]);

	const linkList = useMemo(
		() =>
			["about", "movies", "drama", "theater", "contact"].map((val, i) => (
				<li key={i} className={router.pathname === "/" + val ? "on" : ""}>
					<Link scroll={false} href={"/" + val} passHref>
						<h4>{val.toUpperCase()}</h4>
					</Link>
				</li>
			)),
		[router]
	);

	return {
		iconsHtml,
		setIconsHtml,
		openSideMenu,
		setOpenSideMenu,
		linkList,
	};
};

const [Provider, useIconsHtml, useSetIconsHtml, useOpenSideMenu, useSetOpenSideMenu, useLinkList] = constate(
	useAppLayout,
	(value) => value.iconsHtml,
	(value) => value.setIconsHtml,
	(value) => value.openSideMenu,
	(value) => value.setOpenSideMenu,
	(value) => value.linkList
);

export { Provider, useIconsHtml, useSetIconsHtml, useOpenSideMenu, useSetOpenSideMenu, useLinkList };
