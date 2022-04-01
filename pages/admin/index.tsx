// Package
import React from "react";
import { useSelector } from "react-redux";
import type { NextPage } from "next";
import Image from "next/image";

// Global

// Local

const Index: NextPage = () => {
	const commonState = useSelector((state: any) => state.common);

	return (
		<section className="home">
			{commonState.windowWidth > 1120 ? (
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<Image src="/api/file/photo1.png" width={1000} height={667} draggable={false} alt="" />
							</td>
						</tr>
						<tr>
							<td>
								<Image src="/api/file/photo2.png" width={498} height={747} draggable={false} alt="" />
							</td>
							<td>
								<Image src="/api/file/photo3.png" width={498} height={747} draggable={false} alt="" />
							</td>
						</tr>
					</tbody>
				</table>
			) : (
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<Image src="/api/file/photo1.png" width={1000} height={667} draggable={false} alt="" />
							</td>
						</tr>
						<tr>
							<td>
								<Image src="/api/file/photo2.png" width={1000} height={1500} draggable={false} alt="" />
							</td>
						</tr>
						<tr>
							<td>
								<Image src="/api/file/photo3.png" width={1000} height={1500} draggable={false} alt="" />
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</section>
	);
};

export default Index;
