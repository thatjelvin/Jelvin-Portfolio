// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navMenu) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Combined scroll handler for better performance
const handleScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    // Navbar background change
    if (navbar) {
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    }

    // Parallax effect for hero
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    // Active nav link highlighting
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, 100);

window.addEventListener('scroll', handleScroll);

// Top repositories data
const topRepositories = [
    {
        name: "Bundesliga-winner",
        description: "A machine learning model to predict the winner of the German Bundesliga",
        language: "Python",
        stars: 4,
        topics: ["learn", "machine-learning", "sports-analytics"],
        url: "https://github.com/thatjelvin/Bundesliga-winner",
        icon: "⚽"
    },
    {
        name: "missed-call-automation-for-businesses",
        description: "I created this automation that can handle businesses missing clients that call them. I did it with n8n for my HVAC client but you can just tweak it for any other business",
        language: "Automation",
        stars: 0,
        topics: ["automation", "business", "n8n"],
        url: "https://github.com/thatjelvin/missed-call-automation-for-businesses",
        icon: "📞"
    },
    {
        name: "UEFA-Champions-league",
        description: "A machine learning model to predict this year's UCL winner.",
        language: "Python",
        stars: 0,
        topics: ["machine-learning", "sports-analytics"],
        url: "https://github.com/thatjelvin/UEFA-Champions-league",
        icon: "🏆"
    },
    {
        name: "pincart",
        description: "New app for dropshippers",
        language: "TypeScript",
        stars: 0,
        topics: ["dropshipping", "e-commerce"],
        url: "https://github.com/thatjelvin/pincart",
        icon: "🛒"
    },
    {
        name: "ATHLETE-APP",
        description: "An app for athletes",
        language: "App Development",
        stars: 0,
        topics: ["sports", "fitness"],
        url: "https://github.com/thatjelvin/ATHLETE-APP",
        icon: "💪"
    },
    {
        name: "linkedin-automation",
        description: "Automate LinkedIn posts",
        language: "Automation",
        stars: 0,
        topics: ["automation", "linkedin", "social-media"],
        url: "https://github.com/thatjelvin/linkedin-automation",
        icon: "💼"
    }
];

// Function to create project card
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <h3 class="project-title">${project.name}</h3>
            </div>
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                ${project.language ? `<span class="project-language"><i class="fas fa-code"></i> ${project.language}</span>` : ''}
                <div class="project-stats">
                    <div class="project-stat">
                        <i class="fas fa-star"></i>
                        <span>${project.stars} stars</span>
                    </div>
                    ${project.topics.length > 0 ? `
                    <div class="project-stat">
                        <i class="fas fa-tag"></i>
                        <span>${project.topics.length} topics</span>
                    </div>
                    ` : ''}
                </div>
                <a href="${project.url}" target="_blank" class="project-link">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

// Load projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = topRepositories.map(project => createProjectCard(project)).join('');
    }
}

// Intersection Observer for fade-in animations
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

// Add fade-in effect to sections
document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    loadProjects();

    // Add animation to cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}



// Console message for visitors
console.log('%cHello! 👋', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #8b5cf6; font-size: 14px;');
console.log('%cFeel free to reach out if you want to collaborate!', 'color: #cbd5e1; font-size: 12px;');
