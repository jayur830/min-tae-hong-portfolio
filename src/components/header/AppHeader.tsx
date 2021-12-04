import React from "react";
import { Link } from "react-router-dom";

import "./AppHeader.scss";

export const AppHeader = () => (
    <header className="app-header">
        <div>
            <Link to="/">
                <h1>Min Tae Hong</h1>
            </Link>
        </div>
        <nav>
            <ul>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/movies">MOVIES</Link></li>
                <li><Link to="/drama">DRAMA</Link></li>
                <li><Link to="/theater">THEATER</Link></li>
                <li><Link to="/contact">CONTACT</Link></li>
            </ul>
        </nav>
    </header>
);
