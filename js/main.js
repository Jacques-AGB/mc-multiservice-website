// ========================================
// MC MULTISERVICE SARL - Main JavaScript
// ========================================

// ========================================
// Mobile Navigation Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for empty hash or just '#'
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow when scrolled
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// ========================================
// Scroll Animations (Fade In)
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      showNotification('Veuillez remplir tous les champs requis.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Veuillez entrer une adresse email valide.', 'error');
      return;
    }
    
    // Phone validation (French format)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(formData.phone)) {
      showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
      return;
    }
    
    // Simulate form submission
    showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send this to your backend:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: type === 'success' ? '#2A9D8F' : '#E63946',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    zIndex: '10000',
    animation: 'slideInRight 0.3s ease-out',
    maxWidth: '400px'
  });
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// Gallery Lightbox
// ========================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('.gallery-image');
    const overlay = this.querySelector('.gallery-overlay');
    
    if (img) {
      openLightbox(img.src, overlay ? overlay.querySelector('.gallery-title')?.textContent : '');
    }
  });
});

function openLightbox(imageSrc, title) {
  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  Object.assign(lightbox.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    animation: 'fadeIn 0.3s ease-out'
  });
  
  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '10px',
    lineHeight: '1'
  });
  
  // Create image
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = title;
  Object.assign(img.style, {
    maxWidth: '90%',
    maxHeight: '80vh',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
  });
  
  // Create title
  if (title) {
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    Object.assign(titleElement.style, {
      color: 'white',
      marginTop: '1.5rem',
      fontSize: '1.5rem',
      textAlign: 'center'
    });
    lightbox.appendChild(img);
    lightbox.appendChild(titleElement);
  } else {
    lightbox.appendChild(img);
  }
  
  lightbox.appendChild(closeBtn);
  
  // Close on click
  closeBtn.addEventListener('click', () => closeLightbox(lightbox));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox(lightbox);
    }
  });
  
  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      closeLightbox(lightbox);
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
}

function closeLightbox(lightbox) {
  lightbox.style.animation = 'fadeOut 0.3s ease-out';
  setTimeout(() => {
    lightbox.remove();
    document.body.style.overflow = '';
  }, 300);
}

// ========================================
// Lazy Loading Images
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Stats Counter Animation
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const numberElement = entry.target.querySelector('.stat-number');
      if (numberElement) {
        const text = numberElement.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (!isNaN(number)) {
          numberElement.textContent = '0';
          setTimeout(() => {
            animateCounter(numberElement, number);
            // Restore any suffix (like %, +, etc.)
            const suffix = text.replace(/[\d,]/g, '');
            if (suffix) {
              const timer = setInterval(() => {
                if (parseInt(numberElement.textContent) >= number) {
                  numberElement.textContent = number + suffix;
                  clearInterval(timer);
                }
              }, 50);
            }
          }, 200);
        }
        
        entry.target.dataset.animated = 'true';
        statsObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// ========================================
// Console Log - Remove in Production
// ========================================
console.log('%c MC Multiservice SARL ', 'background: #E63946; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Website by Antigravity ', 'background: #1D3557; color: white; padding: 5px 10px; font-size: 12px;');
