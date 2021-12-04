import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    section.theater {
    }
`;

const Theater: NextPage = () => (
    <section className="theater">
        Theater
        <style jsx>{style}</style>
    </section>
);

export default Theater;
