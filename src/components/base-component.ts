// Base Web Component class for extensible architecture
export abstract class BaseComponent extends HTMLElement {
  protected template: string = '';
  protected styles: string = '';
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  protected render(): void {
    if (!this.shadowRoot) return;
    
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      ${this.template}
    `;
  }

  protected abstract setupEventListeners(): void;

  // Utility method for type-safe event handling
  protected addEventHandler(
    selector: string, 
    event: string, 
    handler: (event: Event) => void
  ): void {
    const element = this.shadowRoot?.querySelector(selector);
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  // Reactive state management
  protected setState(newState: Record<string, any>): void {
    Object.assign(this, newState);
    this.render();
  }
}