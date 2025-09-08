#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the main HTML file
let html = fs.readFileSync('index.html', 'utf8');

// Replace placeholders with actual content
const sections = ['hero', 'highlights', 'about', 'skills', 'experience', 'resume', 'target-role', 'contact'];

sections.forEach(section => {
  try {
    const content = fs.readFileSync(`sections/${section}.html`, 'utf8');
    // Replace the entire placeholder block with the section content
    const blockRegex = new RegExp(
      `<div\\s+id=\\"${section}-content\\"[^>]*>[\\s\\S]*?<\\/div>`,
      'i'
    );
    html = html.replace(
      blockRegex,
      () => `<div id="${section}-content">${content}</div>`
    );
  } catch (error) {
    console.error(`Error processing section ${section}:`, error.message);
    process.exit(1);
  }
});

// Remove the JavaScript that loads sections dynamically
html = html.replace(/<script src="js\/sections\.js"><\/script>\s*/, '');

// Strip placeholder comments like "<!-- ... will be loaded dynamically -->"
// from the final static build so dist/index.html is clean
html = html.replace(/<!--[\s\S]*?will be loaded dynamically[\s\S]*?-->\s*/gi, '');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy necessary assets to dist folder
const assetsToCopy = [
  { src: 'images', dest: 'dist/images' },
  { src: 'files', dest: 'dist/files' }
];

// Copy CNAME file if it exists
if (fs.existsSync('CNAME')) {
  fs.copyFileSync('CNAME', 'dist/CNAME');
  console.log('Copied CNAME file to dist/');
}

assetsToCopy.forEach(asset => {
  if (fs.existsSync(asset.src)) {
    // Remove existing destination if it exists
    if (fs.existsSync(asset.dest)) {
      fs.rmSync(asset.dest, { recursive: true, force: true });
    }
    // Copy directory recursively
    fs.cpSync(asset.src, asset.dest, { recursive: true });
    console.log(`Copied ${asset.src} to ${asset.dest}`);
  }
});

// Write the final file
fs.writeFileSync('dist/index.html', html);
console.log('Built static HTML file: dist/index.html');
