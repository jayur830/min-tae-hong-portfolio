// Package
import React from "react";
import type { NextPage } from "next";
import Image from "next/image";

// Global

// Local
import { useCommon } from "./Provider";

const Home: NextPage = () => {
	const common = useCommon();

	return (
		<section className="home">
			{common.windowWidth > 1120 ? (
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<Image src="/photo1.png" width={1000} height={667} draggable={false} alt="" />
							</td>
						</tr>
						<tr>
							<td>
								<Image src="/photo2.png" width={498} height={747} draggable={false} alt="" />
							</td>
							<td>
								<Image src="/photo3.png" width={498} height={747} draggable={false} alt="" />
							</td>
						</tr>
					</tbody>
				</table>
			) : (
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<Image src="/photo1.png" width={1000} height={667} draggable={false} alt="" />
							</td>
						</tr>
						<tr>
							<td>
								<Image src="/photo2.png" width={1000} height={1500} draggable={false} alt="" />
							</td>
						</tr>
						<tr>
							<td>
								<Image src="/photo3.png" width={1000} height={1500} draggable={false} alt="" />
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</section>
	);
};

export default Home;
