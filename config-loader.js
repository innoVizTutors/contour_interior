/**
 * Config Loader - Manages loading and accessing configuration data
 */
class ConfigLoader {
  constructor() {
    this.config = null;
    this.configPath = '/config.json';
  }

  /**
   * Load configuration from JSON file
   */
  async load() {
    try {
      const response = await fetch(this.configPath);
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`);
      }
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Error loading config:', error);
      return null;
    }
  }

  /**
   * Get entire config
   */
  getConfig() {
    return this.config;
  }

  /**
   * Get nested config value
   */
  get(path, defaultValue = null) {
    if (!this.config) return defaultValue;
    
    const keys = path.split('.');
    let value = this.config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }
    
    return value;
  }

  /**
   * Get company data
   */
  getCompany() {
    return this.get('company', {});
  }

  /**
   * Get reviews
   */
  getReviews() {
    return this.get('reviews', {});
  }

  /**
   * Get services
   */
  getServices() {
    return this.get('services.items', []);
  }

  /**
   * Get projects
   */
  getProjects() {
    return this.get('projects.items', []);
  }

  /**
   * Get clients
   */
  getClients() {
    return this.get('clients.items', []);
  }

  /**
   * Get contact info
   */
  getContact() {
    return this.get('company.contact', {});
  }
}

// Create global instance
const configLoader = new ConfigLoader();

// Auto-load config when script is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    configLoader.load();
  });
} else {
  configLoader.load();
}
