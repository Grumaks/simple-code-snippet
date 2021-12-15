module.exports = {
    "testEnvironment": "jsdom",
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    // Setup Enzyme
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["<rootDir>/src/setupEnzyme.ts"],
    "moduleNameMapper": {
        "\\.(css|sass|scss)$": "<rootDir>/styleMock.js"
    },
}
