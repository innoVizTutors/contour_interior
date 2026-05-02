# Contours Interio - Config System Documentation

## Overview

The website now uses a centralized JSON configuration system that allows you to manage all company data, reviews, and content from a single `config.json` file. All three models (Basic, Premium, Standard) automatically fetch and display this data dynamically.

## File Structure

```
contours_bundle/
├── config.json                 # Main configuration file
├── config-loader.js            # Config loader utility
├── dom-populator.js            # DOM population utility
├── assets/
│   └── images/
├── basic/
│   ├── index.html
│   ├── main.js
│   └── style.css
├── premium/
│   ├── index.html
│   ├── main.js
│   └── style.css
└── standard/
    ├── index.html
    ├── main.js
    └── style.css
```

## Config JSON Structure

### Company Section
Contains all basic company information:

```json
{
  "company": {
    "name": "Contours Interio Pvt. Ltd.",
    "tagline": "Est. 2010 · Pune, India",
    "description": "...",
    "location": {
      "address": "...",
      "footerAddress": "...",
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India"
    },
    "contact": {
      "phone": "+91 93567 04250",
      "phoneLink": "tel:+919356704250",
      "email": "info@contoursinterio.com",
      "emailLink": "mailto:info@contoursinterio.com"
    },
    "founder": {
      "name": "Mr. Parag Edwankar, B.E. (Civil)",
      "title": "Founder & Director",
      "initials": "PE"
    },
    "stats": {
      "yearsLegacy": "30+",
      "projectsDone": "200+",
      "clientRating": "4.5★"
    }
  }
}
```

### Reviews Section
Contains all client reviews with ratings and dates:

```json
{
  "reviews": {
    "overallRating": 5.0,
    "totalReviews": 2,
    "items": [
      {
        "id": 1,
        "name": "Justice Mckinney",
        "rating": 5,
        "date": "2 days ago",
        "dateISO": "2026-04-24",
        "review": "I was actually unsure of wallpapering...",
        "service": "Wallpapering",
        "helpful": 0
      }
    ]
  }
}
```

### Services Section
Array of services offered:

```json
{
  "services": {
    "sectionLabel": "What We Do",
    "heading": "Our Services",
    "items": [
      {
        "id": 1,
        "title": "Residential Interiors",
        "description": "Complete home transformation..."
      }
    ]
  }
}
```

### Projects Section
Portfolio of completed projects:

```json
{
  "projects": {
    "sectionLabel": "Portfolio",
    "heading": "Featured Projects",
    "items": [
      {
        "id": 1,
        "title": "Anand Gangoli Residence",
        "category": "Residential",
        "location": "Pune",
        "image": "/assets/images/2.jpg",
        "alt": "Anand Gangoli Residence"
      }
    ]
  }
}
```

### Clients Section
List of trusted clients:

```json
{
  "clients": {
    "label": "Trusted by distinguished clients...",
    "items": ["ClearSkin Clinics", "Lupin Pharma", ...]
  }
}
```

### Contact Section
Contact form configuration:

```json
{
  "contact": {
    "sectionLabel": "Get In Touch",
    "heading": "Let's Design Your Space",
    "description": "Share your vision...",
    "successMessage": "Thank you! We'll be in touch...",
    "formFields": {
      "requirements": ["Full Home Interior", "Modular Kitchen", ...],
      "budgets": ["₹10L – ₹15L", "₹15L – ₹20L", "₹20L+"]
    }
  }
}
```

## How It Works

### 1. Config Loader (`config-loader.js`)
The `ConfigLoader` class:
- Automatically loads `config.json` on page load
- Provides methods to access config data
- Handles errors gracefully

**Key Methods:**
```javascript
// Load config
await configLoader.load();

// Get entire config
configLoader.getConfig();

// Get nested values
configLoader.get('company.contact.phone');

// Get specific data
configLoader.getCompany();
configLoader.getServices();
configLoader.getProjects();
configLoader.getClients();
configLoader.getReviews();
```

### 2. DOM Populator (`dom-populator.js`)
The `DOMPopulator` class automatically updates all HTML elements with config data:

```javascript
// Populate specific sections
DOMPopulator.populateCompanyData(configLoader);
DOMPopulator.populateHeroSection(configLoader);
DOMPopulator.populateAboutSection(configLoader);
DOMPopulator.populateServicesSection(configLoader);
DOMPopulator.populateProjectsSection(configLoader);
DOMPopulator.populateClientsSection(configLoader);
DOMPopulator.populateContactSection(configLoader);

// Populate everything at once
DOMPopulator.populateAll(configLoader);
```

### 3. HTML Integration
Each model's HTML includes the config utilities:

```html
<script src="../config-loader.js"></script>
<script src="../dom-populator.js"></script>
```

The `main.js` in each model initializes the config on page load:

```javascript
document.addEventListener("DOMContentLoaded", async () => {
  // Load config
  await configLoader.load();
  
  // Populate DOM
  DOMPopulator.populateAll(configLoader);
  
  // Rest of initialization...
});
```

## Updating Content

### To Update Company Information
Edit `config.json` > `company` section:

```json
"company": {
  "name": "Your Company Name",
  "contact": {
    "phone": "+91 XXXXXXXXXX",
    "email": "your-email@example.com"
  }
}
```

### To Add/Update Reviews
Edit `config.json` > `reviews.items`:

```json
"reviews": {
  "items": [
    {
      "id": 1,
      "name": "Customer Name",
      "rating": 5,
      "date": "X days ago",
      "dateISO": "2026-04-26",
      "review": "Review text here...",
      "service": "Service type"
    }
  ]
}
```

### To Update Services
Edit `config.json` > `services.items`:

```json
"services": {
  "items": [
    {
      "id": 1,
      "title": "Service Name",
      "description": "Service description..."
    }
  ]
}
```

### To Update Projects
Edit `config.json` > `projects.items`:

```json
"projects": {
  "items": [
    {
      "id": 1,
      "title": "Project Name",
      "category": "Residential",
      "location": "Pune",
      "image": "/assets/images/X.jpg",
      "alt": "Project description"
    }
  ]
}
```

## How to Extend

### Add New Section
1. Add new section to `config.json`
2. Create a populate method in `dom-populator.js`
3. Call the method in `DOMPopulator.populateAll()`

### Add New Fields
1. Add fields to relevant section in `config.json`
2. Update corresponding populate method in `dom-populator.js`
3. Update HTML elements with matching selectors

### Custom Usage in JavaScript
```javascript
// Access config values in your own scripts
const companyName = configLoader.get('company.name');
const phone = configLoader.get('company.contact.phone');
const reviews = configLoader.getReviews();

// Wait for config to load if needed
configLoader.load().then(() => {
  console.log('Config loaded!');
  const data = configLoader.getConfig();
});
```

## Best Practices

1. **Keep JSON Valid**: Ensure all JSON is properly formatted
2. **Consistent IDs**: Use sequential IDs for items in arrays
3. **Image Paths**: Always use absolute paths starting with `/`
4. **Review Dates**: Keep both human-readable (`date`) and ISO format (`dateISO`)
5. **Backup**: Always backup `config.json` before major changes
6. **Testing**: Test changes on all three models after updating config

## Troubleshooting

### Config Not Loading
- Check browser console for errors
- Verify `config.json` is in the root directory
- Ensure JSON is valid (use JSONLint.com)
- Check file paths in script tags

### Data Not Displaying
- Verify HTML selectors match DOMPopulator expectations
- Check that config section exists and has data
- Inspect element to see if DOM is being updated
- Clear browser cache and reload

### Form Not Submitting
- Check `formConfig.googleSheetURL` is correct
- Verify Google Apps Script URL is accessible
- Check browser console for fetch errors

## Files Modified

All three models have been updated:
- **basic/index.html** - Added config script tags
- **basic/main.js** - Added config loading
- **premium/index.html** - Added config script tags
- **premium/main.js** - Added config loading
- **standard/index.html** - Added config script tags
- **standard/main.js** - Added config loading

## Support

For questions or issues with the config system, refer to the structure and examples in this document.
