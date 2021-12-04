import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    section.photos {
    }
`;

export const Photos: NextPage = () => (
    <section className="photos">
        Photos
        <style jsx>{style}</style>
    </section>
);

export default Photos;
