/*
 * Simple JavaScript for The Compliers website.
 *
 * This script enables smooth scrolling when clicking on navigation
 * links, updates the footer year dynamically and provides a basic
 * acknowledgement for the contact form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update the footer to show the current year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Simple form submission handler
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Display a friendly message to the user
      alert('Thank you for reaching out! We will get back to you soon.');
      form.reset();
    });
  }
});