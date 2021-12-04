import React from "react";
import { Routes, Route } from "react-router-dom";

import { Photos } from "./photos/Photos";
import { About } from "./about/About";
import { Movies } from "./movies/Movies";
import { Drama } from "./drama/Drama";
import { Theater } from "./theater/Theater";
import { Contact } from "./contact/Contact";

export const ContentWrap = () => (
    <section className="content-wrap">
        <Routes>
            <Route path="/" element={<Photos />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/drama" element={<Drama />} />
            <Route path="/theater" element={<Theater />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </section>
);
