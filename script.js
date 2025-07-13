// Global JavaScript Functions - Legal Help Assistant

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  
  navMenu.classList.toggle('active');
  
  // Update hamburger icon
  if (navMenu.classList.contains('active')) {
    menuToggle.innerHTML = '✕';
  } else {
    menuToggle.innerHTML = '☰';
  }
}

// Set active navigation link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Show loading state
function showLoading(element) {
  const originalContent = element.innerHTML;
  element.innerHTML = '<span class="loading-spinner"></span> Loading...';
  element.disabled = true;
  return originalContent;
}

// Hide loading state
function hideLoading(element, originalContent) {
  element.innerHTML = originalContent;
  element.disabled = false;
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    background-color: ${type === 'success' ? '#059669' : '#dc2626'};
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(notificationStyles);

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setActiveNavLink();
  
  // Add mobile menu toggle event listener
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
});