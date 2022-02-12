const nextJest = require("next/jest");

module.exports = nextJest()({
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "@testing-library/react"
    ],
    testEnvironment: "jsdom"
});
