// Load sections dynamically
async function loadSection(sectionId, filePath) {
  try {
    const response = await fetch(filePath);
    const content = await response.text();
    const element = document.getElementById(sectionId);
    if (element) {
      element.innerHTML = content;
    }
  } catch (error) {
    console.error(`Error loading section ${sectionId}:`, error);
  }
}

// Load all sections when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadSection('hero-content', 'sections/hero.html'),
    loadSection('highlights-content', 'sections/highlights.html'),
    loadSection('about-content', 'sections/about.html'),
    loadSection('skills-content', 'sections/skills.html'),
    loadSection('experience-content', 'sections/experience.html'),
    loadSection('resume-content', 'sections/resume.html'),
    loadSection('target-role-content', 'sections/target-role.html'),
    loadSection('contact-content', 'sections/contact.html')
  ]);
});
