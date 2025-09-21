import { BaseComponent } from './base-component.js';

export class MetricCard extends BaseComponent {
  private value: string = '';
  private label: string = '';
  private animated: boolean = false;

  static get observedAttributes() {
    return ['value', 'label'];
  }

  constructor() {
    super();
    this.template = `
      <div class="metric-card">
        <div class="metric-value number">${this.value}</div>
        <div class="metric-label">${this.label}</div>
      </div>
    `;
    
    this.styles = `
      .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        color: white;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .metric-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      }
      
      .metric-value {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      
      .metric-label {
        font-size: 1.2rem;
        opacity: 0.9;
      }
    `;
  }

  protected setupEventListeners(): void {
    // Setup intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animateValue();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this[name as keyof this] = newValue as any;
      this.render();
    }
  }

  private animateValue(): void {
    const numberElement = this.shadowRoot?.querySelector('.number') as HTMLElement;
    if (!numberElement || this.animated) return;

    const target = parseFloat(this.value);
    const isPercentage = this.value.includes('%');
    const isMillions = this.value.includes('M');
    
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    
    const animate = () => {
      current += increment;
      if (current >= target) {
        numberElement.textContent = this.value;
        this.animated = true;
      } else {
        const suffix = isMillions ? 'M+' : isPercentage ? '%' : '';
        numberElement.textContent = current.toFixed(1) + suffix;
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Register the custom element
customElements.define('metric-card', MetricCard);