import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    section.drama {
    }
`;

const Drama: NextPage = () => (
    <section className="drama">
        Drama
        <style jsx>{style}</style>
    </section>
);

export default Drama;
