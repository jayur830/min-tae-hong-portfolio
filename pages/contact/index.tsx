import React from "react";
import { NextPage } from "next";
import css from "styled-jsx/css";

const style = css`
    section.contact {
    }
`;

const Contact: NextPage = () => (
    <section className="contact">
        Contact
        <style jsx>{style}</style>
    </section>
);

export default Contact;
