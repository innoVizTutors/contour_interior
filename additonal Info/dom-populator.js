/**
 * DOM Populator - Dynamically updates DOM with config data
 */
class DOMPopulator {
  /**
   * Populate company data
   */
  static populateCompanyData(config) {
    const company = config.get('company', {});
    
    // Update navigation logo
    const logoMain = document.querySelector('.logo-main');
    if (logoMain) logoMain.textContent = company.name || 'Contours Interio';
    
    // Update contact info
    const phone = document.querySelector('a[href^="tel:"]');
    if (phone) {
      phone.textContent = company.contact?.phone || '';
      phone.href = company.contact?.phoneLink || '';
    }
    
    const email = document.querySelector('a[href^="mailto:"]');
    if (email) {
      email.textContent = company.contact?.email || '';
      email.href = company.contact?.emailLink || '';
    }
    
    // Update footer
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) footerLogo.textContent = company.name || '';
    
    const footerAddr = document.querySelector('.footer-addr');
    if (footerAddr) footerAddr.textContent = company.location?.footerAddress || '';
  }

  /**
   * Populate hero section
   */
  static populateHeroSection(config) {
    const hero = config.get('hero', {});
    const company = config.get('company', {});
    
    const heroTag = document.querySelector('.hero-tag');
    if (heroTag) heroTag.textContent = company.tagline || '';
    
    const h1 = document.querySelector('.hero h1');
    if (h1) h1.innerHTML = hero.heading?.replace('Story', '<em>Story</em>') || '';
    
    const desc = document.querySelector('.hero-desc');
    if (desc) desc.textContent = hero.description || '';
    
    const stats = config.get('company.stats', {});
    const statElements = document.querySelectorAll('.stat');
    if (statElements.length >= 3) {
      statElements[0].innerHTML = `<span class="num">${stats.yearsLegacy || '30+'}</span><span class="lbl">Years of Legacy</span>`;
      statElements[1].innerHTML = `<span class="num">${stats.projectsDone || '200+'}</span><span class="lbl">Projects Done</span>`;
      statElements[2].innerHTML = `<span class="num">${stats.clientRating || '4.5★'}</span><span class="lbl">Client Rating</span>`;
    }
  }

  /**
   * Populate about section
   */
  static populateAboutSection(config) {
    const about = config.get('about', {});
    const company = config.get('company', {});
    
    const sectionLabel = document.querySelector('.about-text .section-label');
    if (sectionLabel) sectionLabel.textContent = about.sectionLabel || 'Our Story';
    
    const h2 = document.querySelector('.about-text h2');
    if (h2) h2.innerHTML = about.heading?.replace('Craftsmanship', '<em>Craftsmanship</em>') || '';
    
    const paragraphs = document.querySelectorAll('.about-text > p');
    if (paragraphs.length >= 2) {
      paragraphs[0].textContent = about.paragraph1 || '';
      paragraphs[1].textContent = about.paragraph2 || '';
    }
    
    const founder = document.querySelector('.founder-row strong');
    if (founder) founder.textContent = company.founder?.name || '';
    
    const founderTitle = document.querySelector('.founder-row span');
    if (founderTitle) founderTitle.textContent = company.founder?.title || '';
    
    const avatar = document.querySelector('.avatar');
    if (avatar) avatar.textContent = company.founder?.initials || 'PE';
    
    const aboutCardNum = document.querySelector('.big-num');
    if (aboutCardNum) aboutCardNum.innerHTML = `${about.cardHeading || '30'}<sup>+</sup>`;
    
    const aboutCardDesc = document.querySelector('.about-card-inner > p');
    if (aboutCardDesc) aboutCardDesc.textContent = about.cardDescription || '';
    
    // Update services list
    const servicesList = document.querySelector('.about-list');
    if (servicesList && about.services) {
      servicesList.innerHTML = about.services
        .map(service => `<li>&#10003; ${service}</li>`)
        .join('');
    }
  }

  /**
   * Populate services section
   */
  static populateServicesSection(config) {
    const services = config.get('services', {});
    const sectionHeader = document.querySelector('.services .section-header');
    
    if (sectionHeader) {
      const label = sectionHeader.querySelector('.section-label');
      const h2 = sectionHeader.querySelector('h2');
      
      if (label) label.textContent = services.sectionLabel || 'What We Do';
      if (h2) h2.innerHTML = services.heading?.replace('Services', '<em>Services</em>') || '';
    }
    
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && services.items) {
      servicesGrid.innerHTML = services.items
        .map(service => `
          <div class="service-card fade-in">
            <div class="service-num">${String(service.id).padStart(2, '0')}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          </div>
        `)
        .join('');
    }
  }

  /**
   * Populate projects section
   */
  static populateProjectsSection(config) {
    const projects = config.get('projects', {});
    const sectionHeader = document.querySelector('.projects .section-header');
    
    if (sectionHeader) {
      const label = sectionHeader.querySelector('.section-label');
      const h2 = sectionHeader.querySelector('h2');
      
      if (label) label.textContent = projects.sectionLabel || 'Portfolio';
      if (h2) h2.innerHTML = projects.heading?.replace('Projects', '<em>Projects</em>') || '';
    }
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && projects.items) {
      projectsGrid.innerHTML = projects.items
        .map((project, i) => `
          <div class="project-card fade-in">
            <div class="project-img p${i + 1}">
              <img src="${project.image}" alt="${project.alt}">
            </div>
            <div class="project-info">
              <span class="project-cat">${project.category} · ${project.location}</span>
              <h3>${project.title}</h3>
            </div>
          </div>
        `)
        .join('');
    }
  }

  /**
   * Populate clients section
   */
  static populateClientsSection(config) {
    const clients = config.get('clients', {});
    
    const label = document.querySelector('.clients-label');
    if (label) label.textContent = clients.label || '';
    
    const row = document.querySelector('.clients-row');
    if (row && clients.items) {
      row.innerHTML = clients.items
        .map(client => `<span>${client}</span>`)
        .join('');
    }
  }

  /**
   * Populate contact section
   */
  static populateContactSection(config) {
    const contact = config.get('contact', {});
    const company = config.get('company', {});
    
    const sectionLabel = document.querySelector('.contact-info .section-label');
    if (sectionLabel) sectionLabel.textContent = contact.sectionLabel || 'Get In Touch';
    
    const h2 = document.querySelector('.contact-info h2');
    if (h2) h2.innerHTML = contact.heading?.replace('Space', '<em>Space</em>') || '';
    
    const desc = document.querySelector('.contact-info > p:nth-of-type(2)');
    if (desc) desc.textContent = contact.description || '';
    
    // Update info blocks
    const infoBlocks = document.querySelectorAll('.info-block');
    if (infoBlocks.length >= 3) {
      infoBlocks[0].querySelector('span').innerHTML = company.location?.address || '';
      infoBlocks[1].querySelector('span').innerHTML = 
        `<a href="${company.contact?.phoneLink || ''}">${company.contact?.phone || ''}</a>`;
      infoBlocks[2].querySelector('span').innerHTML = 
        `<a href="${company.contact?.emailLink || ''}">${company.contact?.email || ''}</a>`;
    }
    
    const formSuccess = document.getElementById('formSuccess');
    if (formSuccess) formSuccess.textContent = contact.successMessage || '';
  }

  /**
   * Populate reviews section (for premium/standard)
   */
  static populateReviewsSection(config) {
    const reviews = config.get('reviews', {});
    
    if (!reviews.items || reviews.items.length === 0) return;
    
    const reviewsContainer = document.querySelector('.reviews-grid, [class*="review"]');
    if (!reviewsContainer) return;
    
    const reviewsHTML = reviews.items
      .map(review => `
        <div class="review-card fade-in">
          <div class="review-header">
            <div class="reviewer-info">
              <strong>${review.name}</strong>
              <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
          </div>
          <p class="review-text">${review.review}</p>
          ${review.service ? `<span class="review-service">${review.service}</span>` : ''}
        </div>
      `)
      .join('');
    
    // Try to append or replace
    if (reviewsContainer) {
      reviewsContainer.innerHTML += reviewsHTML;
    }
  }

  /**
   * Populate all sections
   */
  static populateAll(config) {
    if (!config || !config.getConfig()) {
      console.warn('Config not loaded yet');
      return;
    }
    
    this.populateCompanyData(config);
    this.populateHeroSection(config);
    this.populateAboutSection(config);
    this.populateServicesSection(config);
    this.populateProjectsSection(config);
    this.populateClientsSection(config);
    this.populateContactSection(config);
  }
}
