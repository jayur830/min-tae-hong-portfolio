// Package
import React from "react";

// Global

// Local
import Line from "../Line";

type Props = {
	children: any;
	key: number;
	year: string;
};

const YearBlock: (props: Props) => JSX.Element = (props) => (
	<div className="year-block">
		<div>
			<h2>{props.year}</h2>
			<Line />
		</div>
		<div>{props.children}</div>
	</div>
);

export default YearBlock;
