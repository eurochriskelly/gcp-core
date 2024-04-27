module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['src/'], // Look here for files to test
    transform: {
        '^.+\\.ts$': 'ts-jest', // Use ts-jest to process TypeScript files
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Map src aliases if you use any
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json' // Path to your TypeScript configuration
        }
    }
};
