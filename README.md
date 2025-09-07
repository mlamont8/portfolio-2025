# Portfolio Website

A modern, responsive portfolio website for **Marimi Lamont Taylor** - Full-Stack Software Developer.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic dark mode based on user preference
- **Modular Architecture** - Clean separation of sections for easy maintenance
- **Interactive Resume** - Embedded PDF viewer with download functionality
- **SEO Optimized** - Schema.org markup for better search visibility
- **Modern Styling** - Built with Tailwind CSS for clean, professional design

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file with modular sections
├── sections/               # Individual section components
│   ├── hero.html          # Hero section with introduction
│   ├── highlights.html    # Quick highlights cards
│   ├── about.html         # Personal introduction
│   ├── skills.html        # Technical skills showcase
│   ├── experience.html    # Work experience timeline
│   ├── resume.html        # Interactive PDF resume viewer
│   ├── target-role.html   # Career objectives
│   └── contact.html       # Contact information
├── js/
│   └── sections.js        # Dynamic section loading
├── files/
│   └── Lamont-Taylor-Resume.pdf  # Resume PDF
├── images/                # Image assets (ready for future use)
├── dist/                  # Built static files
├── build.js              # Build script for static generation
└── package.json          # Project configuration
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Dynamic content loading
- **Node.js** - Build process
- **Schema.org** - Structured data markup

## 🚀 Getting Started

### Prerequisites

- Node.js (for build process)
- Python 3 (for local development server)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mlamont8/portfolio-2025
   cd portfolio
   ```

2. **Start development server**
   ```bash
   npm run dev
   # or
   python3 -m http.server 8000
   ```

3. **View the website**
   - Open `http://localhost:8000` in your browser

### Building for Production

1. **Build static version**
   ```bash
   npm run build
   ```

2. **Preview static build**
   ```bash
   npm run preview
   # or
   python3 -m http.server 8001 -d dist
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build static HTML file
- `npm run preview` - Preview static build

## 🎨 Customization

### Adding New Sections

1. Create a new HTML file in `sections/`
2. Add the section to `js/sections.js`
3. Update `build.js` to include the new section
4. Add navigation link in `index.html`

### Updating Content

- **Personal Info**: Update `sections/about.html`
- **Skills**: Modify `sections/skills.html`
- **Experience**: Edit `sections/experience.html`
- **Resume**: Replace `files/Lamont-Taylor-Resume.pdf`

### Styling

The website uses Tailwind CSS. Customize styles by:
- Modifying Tailwind classes in HTML files
- Adding custom CSS in the `<style>` section of `index.html`
- Updating the Tailwind configuration in the `<script>` section

## 🌐 Deployment

### Static Hosting (Recommended)

The `dist/` folder contains a single HTML file ready for deployment:


### File Structure for Deployment

```
your-domain.com/
├── index.html
├── files/
│   └── Lamont-Taylor-Resume.pdf
└── images/ (if you add any)
```


## 🔧 Technical Details


### Build Process

The build script (`build.js`) combines all sections into a single HTML file for production deployment, removing the need for JavaScript-based section loading.


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Marimi Lamont Taylor*