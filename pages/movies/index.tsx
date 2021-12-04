import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    section.movies {
    }
`;

const Movies: NextPage = () => (
    <section className="movies">
        Movies
        <style jsx>{style}</style>
    </section>
);

export default Movies;
