const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const expressLayouts = require('express-ejs-layouts');

// Static site generator for GitHub Pages
class StaticGenerator {
  constructor() {
    this.app = express();
    this.distPath = path.join(__dirname, '../dist');
    this.setupApp();
  }

  setupApp() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.use(expressLayouts);
    this.app.set('layout', 'layouts/main');
  }

  async generatePage(route, data) {
    return new Promise((resolve, reject) => {
      this.app.render(route, data, (err, html) => {
        if (err) reject(err);
        else resolve(html);
      });
    });
  }

  async generateStaticSite() {
    const routes = [
      { path: 'index.html', template: 'home', data: { title: 'SafeGuardianAI - AI-Powered Emergency Response', active: 'home' }},
      { path: 'technology.html', template: 'technology', data: { title: 'How SafeGuardianAI\'s Technology Works', active: 'technology' }},
      { path: 'team.html', template: 'team', data: { title: 'Our Team - SafeGuardianAI', active: 'team' }},
      { path: 'investors.html', template: 'investors', data: { title: 'Investor Relations - SafeGuardianAI', active: 'investors' }},
      { path: 'contact.html', template: 'contact', data: { title: 'Contact Us - SafeGuardianAI', active: 'contact' }}
    ];

    console.log('Generating static pages...');
    
    for (const route of routes) {
      try {
        const html = await this.generatePage(route.template, route.data);
        const outputPath = path.join(this.distPath, route.path);
        await fs.writeFile(outputPath, html);
        console.log(`✓ Generated ${route.path}`);
      } catch (error) {
        console.error(`✗ Failed to generate ${route.path}:`, error.message);
      }
    }

    // Copy public assets (already handled by Vite build)
    console.log('✓ Static site generation complete');
  }
}

// Run generator
const generator = new StaticGenerator();
generator.generateStaticSite().catch(console.error);