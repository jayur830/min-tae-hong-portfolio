import React from "react";
import "./AppFooter.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export const AppFooter = () => (
    <footer className="app-footer">
        <h5>©Copyright 2021. All Rights Reserved.</h5>
        <FontAwesomeIcon size="2x" icon={faInstagram} />
    </footer>
);
