import React from "react";

type Props = {
    children: any,
    key: number,
    year: string
};

const YearBlock: (props: Props) => JSX.Element = (props) => (
    <div className="year-block">
        <div>
            <h2>{props.year}</h2>
            <span className="hr-circle" />
            <span className="hr-line" />
            <span className="hr-circle" />
        </div>
        <div>{props.children}</div>
    </div>
);

export default YearBlock;
