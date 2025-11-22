

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Load jobs based on current page
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        loadFeaturedJobs();
    } else if (currentPage.includes('jobs.html')) {
        loadAllJobs();
    } else if (currentPage.includes('job-detail.html')) {
        loadSimilarJobs();
    }

    // Application Form Submission
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }

    // File upload handling
    const fileInput = document.getElementById('resume');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const label = document.querySelector('.file-upload-label span');
                label.textContent = fileName;
            }
        });
    }

    // Search functionality
    const jobSearchInput = document.getElementById('jobSearchInput');
    if (jobSearchInput) {
        jobSearchInput.addEventListener('input', function(e) {
            filterJobs(e.target.value);
        });
    }
});

// Load Featured Jobs on Home Page
function loadFeaturedJobs() {
    const container = document.getElementById('featuredJobs');
    if (!container) return;

    const featuredJobs = jobsData.slice(0, 6);
    container.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
}

// Load All Jobs on Jobs Page
function loadAllJobs() {
    const container = document.getElementById('jobsList');
    if (!container) return;

    container.innerHTML = jobsData.map(job => createJobCard(job)).join('');
    
    const jobCount = document.getElementById('jobCount');
    if (jobCount) {
        jobCount.textContent = jobsData.length;
    }
}

// Load Similar Jobs on Job Detail Page
function loadSimilarJobs() {
    const container = document.getElementById('similarJobs');
    if (!container) return;

    const similarJobs = jobsData.slice(0, 3);
    container.innerHTML = similarJobs.map(job => createJobCard(job)).join('');
}

// Create Job Card HTML
function createJobCard(job) {
    return `
        <div class="job-card" onclick="window.location.href='job-detail.html?id=${job.id}'">
            <div class="job-card-header">
                <div class="company-icon">
                    <i class="fas fa-building"></i>
                </div>
                <div class="job-card-info">
                    <h3>${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                </div>
            </div>
            <div class="job-card-details">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                <span><i class="fas fa-clock"></i> ${job.posted}</span>
            </div>
            <div class="job-card-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                ${job.remote ? '<span class="tag">Remote</span>' : ''}
            </div>
            <div class="job-card-footer">
                <span class="salary">${job.salary}</span>
                <a href="job-detail.html?id=${job.id}" class="btn-apply">Apply Now</a>
            </div>
        </div>
    `;
}

// Filter Jobs
function filterJobs(searchTerm) {
    const container = document.getElementById('jobsList');
    if (!container) return;

    const filteredJobs = jobsData.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    container.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
    
    const jobCount = document.getElementById('jobCount');
    if (jobCount) {
        jobCount.textContent = filteredJobs.length;
    }
}

// Handle Application Form Submission
function handleApplicationSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        experience: document.getElementById('experience').value,
        currentCompany: document.getElementById('currentCompany').value,
        linkedin: document.getElementById('linkedin').value,
        portfolio: document.getElementById('portfolio').value,
        coverLetter: document.getElementById('coverLetter').value,
        salary: document.getElementById('salary').value,
        availability: document.getElementById('availability').value
    };

    // Show success message
    alert('Application submitted successfully! We will review your application and get back to you soon.');
    
    // Redirect to jobs page
    setTimeout(() => {
        window.location.href = 'jobs.html';
    }, 1000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

console.log('JobHub Portal Loaded Successfully! 🚀');