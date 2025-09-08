const fs = require('fs');
const path = require('path');

// Mock the build logic for direct testing
function buildPortfolio() {
  let html = fs.readFileSync('index.html', 'utf8');
  
  const sections = ['hero', 'highlights', 'about', 'skills', 'experience', 'resume', 'target-role', 'contact'];
  
  sections.forEach(section => {
    try {
      const content = fs.readFileSync(`sections/${section}.html`, 'utf8');
      const blockRegex = new RegExp(
        `<div\\s+id=\\"${section}-content\\"[^>]*>[\\s\\S]*?<\\/div>`,
        'i'
      );
      html = html.replace(
        blockRegex,
        () => `<div id="${section}-content">${content}</div>`
      );
    } catch (error) {
      throw new Error(`Error processing section ${section}: ${error.message}`);
    }
  });
  
  // Remove the JavaScript that loads sections dynamically
  html = html.replace(/<script src="js\/sections\.js"><\/script>\s*/, '');
  
  // Strip placeholder comments
  html = html.replace(/<!--[\s\S]*?will be loaded dynamically[\s\S]*?-->\s*/gi, '');
  
  return html;
}

module.exports = { buildPortfolio };
