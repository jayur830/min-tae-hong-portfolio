import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    div.home {
        color: red;
    }
`;

const Index: NextPage = () => {
    return (
        <section className="home">
            <h1>Hello</h1>

            <style jsx>{style}</style>
        </section>
    );
};

export default Index;