import express, { Request, Response } from 'express';
import path from 'path';
const expressLayouts = require('express-ejs-layouts');

interface RouteData {
  title: string;
  active: string;
}

class SafeGuardianServer {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // Set EJS as templating engine
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.use(expressLayouts);
    this.app.set('layout', 'layouts/main');

    // Serve static files
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use('/src', express.static(path.join(__dirname, '../src')));
  }

  private renderPage(template: string, data: RouteData) {
    return (req: Request, res: Response) => {
      res.render(template, data);
    };
  }

  private setupRoutes(): void {
    // Home route
    this.app.get('/', this.renderPage('home', {
      title: 'SafeGuardianAI - AI-Powered Emergency Response',
      active: 'home'
    }));

    // Technology route
    this.app.get('/technology', this.renderPage('technology', {
      title: 'How SafeGuardianAI\'s Technology Works',
      active: 'technology'
    }));

    // Team route
    this.app.get('/team', this.renderPage('team', {
      title: 'Our Team - SafeGuardianAI',
      active: 'team'
    }));

    // Investors route
    this.app.get('/investors', this.renderPage('investors', {
      title: 'Investor Relations - SafeGuardianAI',
      active: 'investors'
    }));

    // Contact route
    this.app.get('/contact', this.renderPage('contact', {
      title: 'Contact Us - SafeGuardianAI',
      active: 'contact'
    }));
  }

  public start(): void {
    this.app.listen(this.port, (err?: Error) => {
      if (err) {
        console.error('Error starting server:', err);
        return;
      }
      console.log(`🚀 Server running at http://localhost:${this.port}`);
    }).on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${this.port} is already in use. Try using a different port.`);
      } else {
        console.error('Server error:', err);
      }
    });
  }
}

// Start server
const server = new SafeGuardianServer();
server.start();