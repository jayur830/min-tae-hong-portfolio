import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DarkModeButton: () => JSX.Element = () => {
    const dispatch = useDispatch();
    const commonState = useSelector((state: any) => state.common);

    return (
        <div className="dark-mode-btn">
            <span className="font-smoothing">{commonState.darkMode ? "Dark" : "Light"}</span>
            <div className="font-smoothing"><span style={{ transform: `translateX(${commonState.darkMode ? 11 : -12}px)` }} onClick={() => dispatch({ type: "SET_DARK_MODE" })} /></div>
        </div>
    );
};

export default DarkModeButton;
