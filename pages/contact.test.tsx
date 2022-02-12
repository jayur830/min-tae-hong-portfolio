import React from "react";
import { render } from "@testing-library/react";
import Contact from "./contact";

describe("Test", () => {
    it("Foo", () => {
        const { getByText } = render(<Contact />);
        expect(getByText("EMAIL.")).toBeInTheDocument();
    });
});

export {};
