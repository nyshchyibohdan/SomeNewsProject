export const testEnvironment = 'jest-environment-jsdom';
export const moduleNameMapper = {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub',
};
export const transform = {
    '^.+\\.jsx?$': 'babel-jest',
};
export const setupFilesAfterEnv = ['./jest.setup.js', '@testing-library/jest-dom'];

export const testPathIgnorePatterns = ['/node_modules/', '/__tests__/utils/'];
