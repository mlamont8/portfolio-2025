# Portfolio Testing

This directory contains unit tests for the portfolio build process.

## Test Files

- `build.test.js` - Comprehensive tests for the build script functionality
- `build-utils.js` - Test utilities for direct function testing

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

The tests cover:

- ✅ Build script execution and file creation
- ✅ Section content replacement
- ✅ Script tag removal
- ✅ Comment stripping
- ✅ HTML structure preservation
- ✅ Error handling for missing files
- ✅ Meta tags and schema.org data
- ✅ Direct function testing for better coverage

## What's Tested

### Build Process Tests
- Creates `dist` directory if it doesn't exist
- Replaces all section placeholders with actual content
- Removes `sections.js` script tag from production build
- Strips dynamic content loading comments
- Preserves all other HTML structure
- Handles missing section files gracefully
- Produces valid HTML output
- Includes all required meta tags
- Includes schema.org structured data

### Error Handling Tests
- Missing section files
- Missing sections directory
- File system errors

## Test Environment

Tests run in a temporary directory to avoid affecting the main project files. Each test creates a clean environment and cleans up after itself.
