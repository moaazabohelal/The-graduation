// Document Ready Function
document.addEventListener('DOMContentLoaded', () => {
	// Initialize all components
	initNavigation();
	initSlideshow();
	initProjectTabs();
	initLightbox();
	initRatings();
	initScrollAnimations();
	
	// Add special handling for mobile devices
	initMobileOptimizations();
	
	// Add visual cue to indicate project items are clickable
	addProjectItemInteractions();
});

// Mobile Navigation
function initNavigation() {
	const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
	const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
	const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
	const header = document.querySelector('#header');

	// Toggle hamburger menu
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
		document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
	});

	// Header background change on scroll
	document.addEventListener('scroll', () => {
		const scroll_position = window.scrollY;
		if (scroll_position > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// Close mobile menu when clicking on menu items
	menu_item.forEach((item) => {
		item.addEventListener('click', () => {
			hamburger.classList.remove('active');
			mobile_menu.classList.remove('active');
			document.body.classList.remove('no-scroll'); // Allow scrolling when menu is closed
		});
	});
	
	// Handle window resize to reset menu on desktop
	window.addEventListener('resize', () => {
		if (window.innerWidth > 992) {
			hamburger.classList.remove('active');
			mobile_menu.classList.remove('active');
			document.body.classList.remove('no-scroll');
		}
	});
	
	// Close mobile menu when clicking outside
	document.addEventListener('click', (e) => {
		if (mobile_menu.classList.contains('active') && 
			!e.target.closest('.nav-list') && 
			!e.target.closest('.hamburger')) {
			hamburger.classList.remove('active');
			mobile_menu.classList.remove('active');
			document.body.classList.remove('no-scroll');
		}
	});
}

// Project Group Tabs
function initProjectTabs() {
	const tabButtons = document.querySelectorAll('.tab-btn');
	const projectGroups = document.querySelectorAll('.project-group');
	const tabsContainer = document.querySelector('.project-tabs');

	// Add smooth scroll to tabs container on mobile
	if (tabsContainer) {
		let isDown = false;
		let startX;
		let scrollLeft;

		// Handle horizontal touch scrolling for mobile
		tabsContainer.addEventListener('touchstart', (e) => {
			isDown = true;
			startX = e.touches[0].pageX - tabsContainer.offsetLeft;
			scrollLeft = tabsContainer.scrollLeft;
		});

		tabsContainer.addEventListener('touchend', () => {
			isDown = false;
		});

		tabsContainer.addEventListener('touchmove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.touches[0].pageX - tabsContainer.offsetLeft;
			const walk = (x - startX) * 2; // Scroll speed multiplier
			tabsContainer.scrollLeft = scrollLeft - walk;
		});
	}

	tabButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Remove active class from all buttons and groups
			tabButtons.forEach(btn => btn.classList.remove('active'));
			projectGroups.forEach(group => group.classList.remove('active'));

			// Add active class to clicked button and corresponding group
			button.classList.add('active');
			const groupId = button.getAttribute('data-group');
			document.getElementById(groupId).classList.add('active');
			
			// Scroll the active tab into view for mobile
			if (window.innerWidth <= 768) {
				button.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center'
				});
			}
			
			// Smooth scroll to projects header on mobile
			if (window.innerWidth <= 768) {
				const projectsHeader = document.querySelector('.projects-header');
				if (projectsHeader) {
					setTimeout(() => {
						projectsHeader.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}, 100);
				}
			}
		});
	});
}

// Project Slideshows
function initSlideshow() {
	// Initialize all slides
	document.querySelectorAll('.project-img').forEach(container => {
		const slides = container.querySelectorAll('.slide');
		
		// Make sure at least one slide is active
		let hasActiveSlide = false;
		
		slides.forEach((slide, index) => {
			if (index === 0) {
				slide.classList.add('active');
				slide.style.opacity = '1';
				hasActiveSlide = true;
			} else {
				slide.classList.remove('active');
				slide.style.opacity = '0';
			}
		});
		
		// Force first slide to be active if none are active
		if (!hasActiveSlide && slides.length > 0) {
			slides[0].classList.add('active');
			slides[0].style.opacity = '1';
		}
		
		// Make slides tappable on mobile devices
		if (window.innerWidth <= 768) {
			slides.forEach(slide => {
				slide.addEventListener('click', (e) => {
					// Only handle taps that aren't on the arrows
					if (!e.target.closest('.arrow')) {
						nextSlide(container.querySelector('.arrow.right'));
					}
				});
			});
		}
	});
}

// Slide Navigation Functions
function nextSlide(button) {
	const container = button.closest(".project-img");
	const slides = container.querySelectorAll(".slide");
	const currentSlide = container.querySelector(".slide.active");
	const currentIndex = Array.from(slides).indexOf(currentSlide);
	
	// Fade out current slide
	currentSlide.style.opacity = '0';
	currentSlide.classList.remove("active");
	
	// Calculate next index
	const nextIndex = (currentIndex + 1) % slides.length;
	
	// Fade in next slide
	setTimeout(() => {
		slides[nextIndex].style.opacity = '1';
		slides[nextIndex].classList.add("active");
	}, 300);
}

function prevSlide(button) {
	const container = button.closest(".project-img");
	const slides = container.querySelectorAll(".slide");
	const currentSlide = container.querySelector(".slide.active");
	const currentIndex = Array.from(slides).indexOf(currentSlide);
	
	// Fade out current slide
	currentSlide.style.opacity = '0';
	currentSlide.classList.remove("active");
	
	// Calculate previous index
	const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
	
	// Fade in previous slide
	setTimeout(() => {
		slides[prevIndex].style.opacity = '1';
		slides[prevIndex].classList.add("active");
	}, 300);
}

// Lightbox Functionality
function initLightbox() {
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = lightbox.querySelector('.lightbox-img-container img');
	const lightboxTitle = lightbox.querySelector('.lightbox-title');
	const lightboxStudent = lightbox.querySelector('.lightbox-student');
	const lightboxDescription = lightbox.querySelector('.lightbox-description');
	const lightboxClose = lightbox.querySelector('.lightbox-close');
	const projectItems = document.querySelectorAll('.project-item');
	const lightboxPrev = lightbox.querySelector('.lightbox-arrow.left');
	const lightboxNext = lightbox.querySelector('.lightbox-arrow.right');

	// Current project tracking for lightbox navigation
	let currentProject = null;

	// Open lightbox when clicking on a project item
	projectItems.forEach(projectItem => {
		// Make the entire project item clickable
		projectItem.addEventListener('click', (e) => {
			// Don't open lightbox when clicking on arrows, rating stars, or project-meta elements
			if (e.target.closest('.arrow') || 
				e.target.closest('.project-rating') || 
				e.target.classList.contains('project-views') ||
				e.target.closest('.project-views')) {
				return;
			}
			
			// Get project information
			const title = projectItem.querySelector('.project-info h1').textContent;
			const student = projectItem.querySelector('.project-info h2').textContent;
			const description = projectItem.querySelector('.project-info p').textContent;
			const activeSlide = projectItem.querySelector('.slide.active');
			
			// Set lightbox content
			lightboxImg.src = activeSlide.src;
			lightboxTitle.textContent = title;
			lightboxStudent.textContent = student;
			lightboxDescription.textContent = description;
			
			// Store reference to current project for navigation
			currentProject = projectItem;
			
			// Show lightbox
			lightbox.classList.add('active');
			document.body.style.overflow = 'hidden';
		});

		// Add cursor pointer style to indicate clickability
		projectItem.style.cursor = 'pointer';
		
		// Ensure project image arrows still work for navigation
		const projectImgArrows = projectItem.querySelectorAll('.arrow');
		projectImgArrows.forEach(arrow => {
			arrow.addEventListener('click', (e) => {
				e.stopPropagation(); // Prevent opening lightbox when clicking on arrows
			});
		});

		// Prevent lightbox from opening when clicking on rating stars
		const ratingStars = projectItem.querySelectorAll('.project-rating .star-wrapper, .project-rating i');
		ratingStars.forEach(star => {
			star.addEventListener('click', (e) => {
				e.stopPropagation(); // Prevent opening lightbox when clicking on stars
			});
		});

		// Prevent lightbox from opening when clicking on project views
		const projectViews = projectItem.querySelector('.project-views');
		if (projectViews) {
			projectViews.addEventListener('click', (e) => {
				e.stopPropagation(); // Prevent opening lightbox when clicking on views
			});
		}
	});

	// Close lightbox
	lightboxClose.addEventListener('click', () => {
		lightbox.classList.remove('active');
		document.body.style.overflow = '';
		resetLightboxRating();
	});

	// Close lightbox when clicking outside the content
	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) {
			lightbox.classList.remove('active');
			document.body.style.overflow = '';
			resetLightboxRating();
		}
	});

	// Lightbox navigation: next image
	lightboxNext.addEventListener('click', () => {
		if (currentProject) {
			const nextBtn = currentProject.querySelector('.arrow.right');
			nextSlide(nextBtn);
			
			// Update lightbox image after transition
			setTimeout(() => {
				const activeSlide = currentProject.querySelector('.slide.active');
				lightboxImg.src = activeSlide.src;
			}, 300);
		}
	});

	// Lightbox navigation: previous image
	lightboxPrev.addEventListener('click', () => {
		if (currentProject) {
			const prevBtn = currentProject.querySelector('.arrow.left');
			prevSlide(prevBtn);
			
			// Update lightbox image after transition
			setTimeout(() => {
				const activeSlide = currentProject.querySelector('.slide.active');
				lightboxImg.src = activeSlide.src;
			}, 300);
		}
	});

	// Keyboard navigation
	document.addEventListener('keydown', (e) => {
		if (lightbox.classList.contains('active')) {
			if (e.key === 'Escape') {
				lightbox.classList.remove('active');
				document.body.style.overflow = '';
				resetLightboxRating();
			} else if (e.key === 'ArrowLeft') {
				lightboxPrev.click();
			} else if (e.key === 'ArrowRight') {
				lightboxNext.click();
			}
		}
	});
	
	// Submit button handler
	const submitBtn = lightbox.querySelector('.lightbox-submit');
	submitBtn.addEventListener('click', () => {
		const rating = getLightboxRating();
		const comment = lightbox.querySelector('.lightbox-comment').value;
		
		if (rating === 0) {
			alert('Please select a rating');
			return;
		}
		
		// Log rating and comment (would send to server in a real application)
		console.log('Project rating submitted:', rating, 'stars');
		console.log('Comment:', comment);
		
		// Update project rating in the UI
		if (currentProject) {
			const projectRating = currentProject.querySelector('.project-rating');
			projectRating.setAttribute('data-rating', rating);
			
			const stars = projectRating.querySelectorAll('i');
			stars.forEach((star, index) => {
				if (index < rating) {
					star.className = 'fas fa-star';
				} else {
					star.className = 'far fa-star';
				}
			});
		}
		
		// Reset and close
		alert('Thank you for your rating and feedback!');
		resetLightboxRating();
		lightbox.classList.remove('active');
		document.body.style.overflow = '';
	});
}

// Rating System Functionality
function initRatings() {
	// Lightbox star ratings
	const lightboxStarWrappers = document.querySelectorAll('.lightbox-stars .star-wrapper');
	
	lightboxStarWrappers.forEach(wrapper => {
		const star = wrapper.querySelector('.star');
		const rating = parseInt(star.getAttribute('data-rating'));
		
		wrapper.addEventListener('click', (e) => {
			e.stopPropagation(); // Prevent event bubbling
			updateStars(lightboxStarWrappers, rating);
		});
		
		// Add touch events for mobile devices
		wrapper.addEventListener('touchstart', (e) => {
			e.stopPropagation(); // Prevent lightbox from closing
		});
		
		wrapper.addEventListener('touchend', (e) => {
			e.preventDefault(); // Prevent default touch behavior
			e.stopPropagation();
			updateStars(lightboxStarWrappers, rating);
		});
	});
	
	// Initialize project star ratings in the main UI
	document.querySelectorAll('.project-rating').forEach(container => {
		const starWrappers = container.querySelectorAll('.star-wrapper');
		
		starWrappers.forEach(wrapper => {
			const star = wrapper.querySelector('i');
			const rating = parseInt(star.getAttribute('data-value'));
			
			wrapper.addEventListener('click', (e) => {
				e.stopPropagation(); // Prevent opening lightbox when clicking on stars
				updateProjectRating(container, starWrappers, rating);
			});
			
			// Add touch events for mobile devices
			wrapper.addEventListener('touchstart', (e) => {
				e.stopPropagation();
			});
			
			wrapper.addEventListener('touchend', (e) => {
				e.preventDefault();
				e.stopPropagation();
				updateProjectRating(container, starWrappers, rating);
			});
		});
	});
	
	// Main form rating
	const formStars = document.querySelectorAll('.rating-form .rating .star');
	const ratingText = document.querySelector('.rating-text');
	
	formStars.forEach(star => {
		star.addEventListener('click', () => {
			const rating = parseInt(star.getAttribute('data-value'));
			updateStars(formStars, rating);
			
			// Update text based on rating
			const ratingMessages = [
				'Poor',
				'Fair',
				'Good',
				'Very Good',
				'Excellent'
			];
			
			ratingText.textContent = ratingMessages[rating - 1];
		});
	});
	
	// Form submission
	const ratingForm = document.querySelector('.rating-form');
	if (ratingForm) {
		ratingForm.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const stars = ratingForm.querySelectorAll('.rating .star');
			let rating = 0;
			
			stars.forEach(star => {
				if (star.classList.contains('active')) {
					const value = parseInt(star.getAttribute('data-value'));
					rating = Math.max(rating, value);
				}
			});
			
			const comment = ratingForm.querySelector('.comment').value;
			const name = ratingForm.querySelector('input[type="text"]').value;
			const email = ratingForm.querySelector('input[type="email"]').value;
			
			if (rating === 0) {
				alert('Please select a rating');
				return;
			}
			
			// Log submission data (would send to server in a real application)
			console.log('Website rating submitted:', rating, 'stars');
			console.log('Comment:', comment);
			console.log('Name:', name);
			console.log('Email:', email);
			
			// Show success message
			alert('Thank you for your feedback!');
			
			// Reset form
			ratingForm.reset();
			formStars.forEach(star => {
				star.className = 'far fa-star star';
			});
			ratingText.textContent = 'Click to rate';
		});
		
		// Cancel button handler
		const cancelBtn = ratingForm.querySelector('.btn.cancel');
		if (cancelBtn) {
			cancelBtn.addEventListener('click', () => {
				ratingForm.reset();
				formStars.forEach(star => {
					star.className = 'far fa-star star';
				});
				ratingText.textContent = 'Click to rate';
			});
		}
	}
}

// Helper function to update star ratings
function updateStars(wrappers, rating) {
	wrappers.forEach((wrapper, index) => {
		const star = wrapper.querySelector('.star') || wrapper;
		if (index < rating) {
			star.className = 'fas fa-star star active';
		} else {
			star.className = 'far fa-star star';
		}
	});
}

// Helper function to update project rating in main UI
function updateProjectRating(container, wrappers, rating) {
	container.setAttribute('data-rating', rating);
	
	wrappers.forEach((wrapper, index) => {
		const star = wrapper.querySelector('i') || wrapper;
		if (index < rating) {
			star.className = 'fas fa-star';
		} else {
			star.className = 'far fa-star';
		}
	});
}

// Get the current lightbox rating
function getLightboxRating() {
	const stars = document.querySelectorAll('.lightbox-stars .star.active');
	return stars.length;
}

// Reset lightbox rating and comment
function resetLightboxRating() {
	const stars = document.querySelectorAll('.lightbox-stars .star');
	stars.forEach(star => {
		star.className = 'far fa-star star';
	});
	
	const comment = document.querySelector('.lightbox-comment');
	if (comment) {
		comment.value = '';
	}
}

// Scroll Animations using GSAP
function initScrollAnimations() {
	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		// Animate section titles
		gsap.utils.toArray('.section-title').forEach(title => {
			gsap.from(title, {
				scrollTrigger: {
					trigger: title,
					start: "top 80%",
					toggleActions: "play none none none"
				},
				opacity: 0,
				y: 50,
				duration: 1
			});
		});
		
		// Animate project items
		gsap.utils.toArray('.project-item').forEach(item => {
			gsap.from(item, {
				scrollTrigger: {
					trigger: item,
					start: "top 80%",
					toggleActions: "play none none none"
				},
				opacity: 0,
				y: 30,
				duration: 0.8,
				delay: 0.2
			});
		});
		
		// Animate about card icons
		gsap.utils.toArray('.card-icon').forEach(icon => {
			gsap.from(icon, {
				scrollTrigger: {
					trigger: icon,
					start: "top 85%",
					toggleActions: "play none none none"
				},
				rotation: 180,
				opacity: 0,
				duration: 0.8
			});
		});
		
		// Animate rate form
		const rateForm = document.querySelector('.rating-form');
		if (rateForm) {
			gsap.from(rateForm, {
				scrollTrigger: {
					trigger: rateForm,
					start: "top 80%",
					toggleActions: "play none none none"
				},
				opacity: 0,
				y: 50,
				duration: 1
			});
		}
	}
}

// Add function for mobile-specific optimizations
function initMobileOptimizations() {
	// Detect if device is mobile
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	
	if (isMobile) {
		// Increase tap area for all interactive elements
		document.querySelectorAll('.star, button, .cta, .social-icon, .lightbox-close, .tab-btn').forEach(element => {
			element.style.minHeight = '44px'; // Minimum Apple recommended touch target size
			
			// Add active state visual feedback for touch
			element.addEventListener('touchstart', () => {
				element.classList.add('touch-active');
			});
			
			element.addEventListener('touchend', () => {
				setTimeout(() => {
					element.classList.remove('touch-active');
				}, 150);
			});
		});
		
		// Fix scrolling issues in lightbox
		const lightbox = document.getElementById('lightbox');
		if (lightbox) {
			const lightboxDetails = lightbox.querySelector('.lightbox-details');
			const lightboxContent = lightbox.querySelector('.lightbox-content');
			
			// Allow scrolling in the lightbox details section
			if (lightboxDetails) {
				lightboxDetails.addEventListener('touchmove', (e) => {
					e.stopPropagation(); // Prevent lightbox from closing
				});
			}
			
			// Prevent body scrolling when lightbox is open
			lightbox.addEventListener('touchmove', (e) => {
				if (e.target === lightbox || e.target === lightboxContent) {
					e.preventDefault(); // Prevent background scrolling
				}
			}, { passive: false });
		}
		
		// Make rating stars more responsive by increasing their hit area
		document.querySelectorAll('.lightbox-stars .star, .project-rating i, .rating .star').forEach(star => {
			// Add a wrapper with greater clickable area if not already wrapped
			const parent = star.parentNode;
			
			// Add enhanced touch response
			star.addEventListener('touchstart', () => {
				star.style.transform = 'scale(1.3)';
			});
			
			star.addEventListener('touchend', () => {
				setTimeout(() => {
					if (!star.classList.contains('active') && !star.classList.contains('fas')) {
						star.style.transform = '';
					}
				}, 300);
			});
		});
	}
}

// Function to add visual cues that project items are clickable
function addProjectItemInteractions() {
	const projectItems = document.querySelectorAll('.project-item');
	
	projectItems.forEach(item => {
		// Add hover effect for desktop devices
		item.addEventListener('mouseenter', () => {
			if (window.innerWidth > 768) { // Only for desktop
				const img = item.querySelector('.project-img');
				if (img) {
					img.style.transform = 'scale(1.02)';
				}
			}
		});
		
		item.addEventListener('mouseleave', () => {
			if (window.innerWidth > 768) { // Only for desktop
				const img = item.querySelector('.project-img');
				if (img) {
					img.style.transform = '';
				}
			}
		});
		
		// Add feedback for touch devices
		item.addEventListener('touchstart', () => {
			item.classList.add('touch-active');
		});
		
		item.addEventListener('touchend', () => {
			setTimeout(() => {
				item.classList.remove('touch-active');
			}, 200);
		});
	});
}