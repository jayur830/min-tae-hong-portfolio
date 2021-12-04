import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    section.about {
    }
`;

const About: NextPage = () => (
    <section className="about">
        About
        <style jsx>{style}</style>
    </section>
);

export default About;
