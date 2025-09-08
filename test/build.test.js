const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildPortfolio } = require('./build-utils');

describe('build.js', () => {
  const originalCwd = process.cwd();
  const testDir = path.join(__dirname, 'temp-build-test');
  
  beforeEach(() => {
    // Create a clean test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
    
    // Copy necessary files to test directory
    fs.copyFileSync('index.html', path.join(testDir, 'index.html'));
    fs.copyFileSync('build.js', path.join(testDir, 'build.js'));
    
    // Create sections directory and copy section files
    fs.mkdirSync(path.join(testDir, 'sections'));
    const sections = ['hero', 'highlights', 'about', 'skills', 'experience', 'resume', 'target-role', 'contact'];
    sections.forEach(section => {
      fs.copyFileSync(`sections/${section}.html`, path.join(testDir, 'sections', `${section}.html`));
    });
    
    process.chdir(testDir);
  });
  
  afterEach(() => {
    process.chdir(originalCwd);
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  test('should create dist directory if it does not exist', () => {
    execSync('node build.js');
    expect(fs.existsSync('dist')).toBe(true);
    expect(fs.existsSync('dist/index.html')).toBe(true);
  });

  test('should replace all section placeholders with actual content', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    
    // Check that all sections are included
    const sections = ['hero', 'highlights', 'about', 'skills', 'experience', 'resume', 'target-role', 'contact'];
    sections.forEach(section => {
      // Should contain the section content (not just the placeholder div)
      expect(builtHtml).toContain(`id="${section}-content"`);
      // Should not contain the placeholder comment
      expect(builtHtml).not.toContain(`${section} content will be loaded dynamically`);
    });
  });

  test('should remove sections.js script tag', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    expect(builtHtml).not.toContain('<script src="js/sections.js"></script>');
  });

  test('should remove dynamic content loading comments', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    expect(builtHtml).not.toMatch(/<!--[\s\S]*?will be loaded dynamically[\s\S]*?-->/);
  });

  test('should preserve all other HTML structure', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    
    // Check that important HTML elements are preserved
    expect(builtHtml).toContain('<!DOCTYPE html>');
    expect(builtHtml).toContain('<html lang="en">');
    expect(builtHtml).toContain('<head>');
    expect(builtHtml).toContain('<body');
    expect(builtHtml).toContain('Marimi Lamont Taylor');
    expect(builtHtml).toContain('tailwind.config');
  });

  test('should handle missing section files gracefully', () => {
    // Remove a section file to test error handling
    fs.unlinkSync('sections/hero.html');
    
    expect(() => {
      execSync('node build.js');
    }).toThrow();
  });

  test('should handle missing sections directory', () => {
    // Remove sections directory to test error handling
    fs.rmSync('sections', { recursive: true, force: true });
    
    expect(() => {
      execSync('node build.js');
    }).toThrow();
  });

  test('should produce valid HTML', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    
    // Basic HTML structure validation
    expect(builtHtml).toMatch(/<!DOCTYPE html>/);
    expect(builtHtml).toMatch(/<html[^>]*>/);
    expect(builtHtml).toMatch(/<\/html>/);
    expect(builtHtml).toMatch(/<head[^>]*>/);
    expect(builtHtml).toMatch(/<\/head>/);
    expect(builtHtml).toMatch(/<body[^>]*>/);
    expect(builtHtml).toMatch(/<\/body>/);
  });

  test('should include all required meta tags', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    
    expect(builtHtml).toContain('<meta charset="utf-8" />');
    expect(builtHtml).toContain('<meta name="viewport"');
    expect(builtHtml).toContain('<title>');
    expect(builtHtml).toContain('<meta name="description"');
  });

  test('should include schema.org structured data', () => {
    execSync('node build.js');
    const builtHtml = fs.readFileSync('dist/index.html', 'utf8');
    
    expect(builtHtml).toContain('application/ld+json');
    expect(builtHtml).toContain('"@context": "https://schema.org"');
    expect(builtHtml).toContain('"@type": "Person"');
  });

  // Direct function testing for better coverage
  describe('buildPortfolio function', () => {
    test('should process all sections correctly', () => {
      const result = buildPortfolio();
      
      // Check that all sections are processed
      const sections = ['hero', 'highlights', 'about', 'skills', 'experience', 'resume', 'target-role', 'contact'];
      sections.forEach(section => {
        expect(result).toContain(`id="${section}-content"`);
        expect(result).not.toContain(`${section} content will be loaded dynamically`);
      });
    });

    test('should remove sections.js script tag', () => {
      const result = buildPortfolio();
      expect(result).not.toContain('<script src="js/sections.js"></script>');
    });

    test('should remove dynamic content comments', () => {
      const result = buildPortfolio();
      expect(result).not.toMatch(/<!--[\s\S]*?will be loaded dynamically[\s\S]*?-->/);
    });

    test('should throw error for missing section file', () => {
      // Remove a section file
      fs.unlinkSync('sections/hero.html');
      
      expect(() => {
        buildPortfolio();
      }).toThrow('Error processing section hero');
    });
  });
});
