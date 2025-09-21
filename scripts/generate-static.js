const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');

// Static site generator for GitHub Pages
class StaticGenerator {
  constructor() {
    this.app = express();
    this.distPath = path.join(__dirname, '../dist');
    this.viewsPath = path.join(__dirname, '../views');
    this.setupApp();
  }

  setupApp() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', this.viewsPath);
  }

  async copyPublicAssets() {
    const publicPath = path.join(__dirname, '../public');
    
    // Copy CSS
    try {
      const cssSource = path.join(publicPath, 'css');
      const cssTarget = path.join(this.distPath, 'css');
      await fs.mkdir(cssTarget, { recursive: true });
      
      const cssFiles = await fs.readdir(cssSource);
      for (const file of cssFiles) {
        await fs.copyFile(
          path.join(cssSource, file),
          path.join(cssTarget, file)
        );
      }
      console.log('✓ Copied CSS files');
    } catch (err) {
      console.warn('Could not copy CSS:', err.message);
    }

    // Copy images, videos, pdf
    const assetDirs = ['images', 'videos', 'pdf'];
    for (const dir of assetDirs) {
      try {
        const source = path.join(publicPath, dir);
        const target = path.join(this.distPath, dir);
        
        await fs.mkdir(target, { recursive: true });
        const files = await fs.readdir(source);
        
        for (const file of files) {
          await fs.copyFile(
            path.join(source, file),
            path.join(target, file)
          );
        }
        console.log(`✓ Copied ${dir} files`);
      } catch (err) {
        console.warn(`Could not copy ${dir}:`, err.message);
      }
    }
  }

  async generatePage(route, data) {
    try {
      // Read the layout template
      const layoutPath = path.join(this.viewsPath, 'layouts/main.ejs');
      const layoutTemplate = await fs.readFile(layoutPath, 'utf8');
      
      // Read the page template
      const pagePath = path.join(this.viewsPath, `${route}.ejs`);
      const pageTemplate = await fs.readFile(pagePath, 'utf8');
      
      // Render the page content
      const pageContent = ejs.render(pageTemplate, data);
      
      // Render the full layout with the page content
      const html = ejs.render(layoutTemplate, {
        ...data,
        body: pageContent
      });
      
      return html;
    } catch (error) {
      throw new Error(`Failed to generate ${route}: ${error.message}`);
    }
  }

  async generateStaticSite() {
    // First copy all public assets
    await this.copyPublicAssets();
    
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

    console.log('✓ Static site generation complete');
  }
}

// Run generator
const generator = new StaticGenerator();
generator.generateStaticSite().catch(console.error);