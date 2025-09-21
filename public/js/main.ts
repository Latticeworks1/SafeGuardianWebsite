// Professional TypeScript implementation with Web Components
interface MetricElement extends HTMLElement {
  target: string;
  animated: boolean;
}

interface AnimationConfig {
  duration: number;
  fps: number;
}

class SafeGuardianApp {
  private observer!: IntersectionObserver;
  private animationConfig: AnimationConfig = {
    duration: 2000,
    fps: 60
  };

  constructor() {
    this.init();
  }

  private init(): void {
    this.setupSmoothScrolling();
    this.initializeIntersectionObserver();
    this.setupContactForm();
    this.observeElements();
  }

  private setupSmoothScrolling(): void {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href')!);
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  private animateNumbers(): void {
    const numbers = document.querySelectorAll<MetricElement>('.number');
    
    numbers.forEach(number => {
      if (number.animated) return;
      
      const target = number.innerText;
      const targetValue = parseFloat(target);
      const isMillions = target.includes('M');
      const isPercentage = target.includes('%');
      
      let current = 0;
      const increment = isMillions ? targetValue / 100 : targetValue / 60;
      const steps = this.animationConfig.duration / (1000 / this.animationConfig.fps);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          number.innerText = target;
          number.animated = true;
          clearInterval(timer);
        } else {
          const suffix = isMillions ? 'M+' : isPercentage ? '%' : '';
          number.innerText = current.toFixed(1) + suffix;
        }
      }, 1000 / this.animationConfig.fps);
    });
  }

  private initializeIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          if (entry.target.classList.contains('metrics')) {
            this.animateNumbers();
          }
        }
      });
    }, { threshold: 0.1 });
  }

  private observeElements(): void {
    document.querySelectorAll('.feature, .tech-card, .metric-card').forEach(el => {
      this.observer.observe(el);
    });
  }

  private setupContactForm(): void {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.handleFormSubmission();
    });
  }

  private handleFormSubmission(): void {
    const confirmation = document.getElementById('form-confirmation');
    if (!confirmation) return;

    confirmation.style.display = 'block';
    confirmation.textContent = 'Thank you for your message! We will get back to you shortly.';
    
    const form = document.getElementById('contactForm') as HTMLFormElement;
    form?.reset();
    
    setTimeout(() => {
      confirmation.style.display = 'none';
    }, 5000);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SafeGuardianApp();
});