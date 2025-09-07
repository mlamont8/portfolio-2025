#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the main HTML file
let html = fs.readFileSync('index.html', 'utf8');

// Replace placeholders with actual content
const sections = ['hero', 'highlights', 'about', 'skills', 'experience', 'resume', 'target-role', 'contact'];

sections.forEach(section => {
  const content = fs.readFileSync(`sections/${section}.html`, 'utf8');
  html = html.replace(`<div id="${section}-content">`, `<div id="${section}-content">${content}`);
});

// Remove the JavaScript that loads sections dynamically
html = html.replace(/<script src="js\/sections\.js"><\/script>\s*/, '');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Write the final file
fs.writeFileSync('dist/index.html', html);
console.log('Built static HTML file: dist/index.html');
