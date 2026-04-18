// Simple quiz option selection
function selectAnswer(button) {
  // remove selected class from siblings
  let siblings = button.parentElement.querySelectorAll("button");
  siblings.forEach((btn) => btn.classList.remove("selected"));

  // highlight selected
  button.classList.add("selected");
}

function toggleMode() {
  const slider = document.getElementById("slider");

  if (slider.classList.contains("vertical")) {
    slider.classList.remove("vertical");
    slider.classList.add("horizontal");
  } else {
    slider.classList.remove("horizontal");
    slider.classList.add("vertical");
  }
}

// Navbar hide/show and progress indicator functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const slider = document.getElementById('slider');
  const body = document.body;

  // Create progress indicator
  const progressIndicator = document.createElement('div');
  progressIndicator.className = 'progress-indicator';
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressIndicator.appendChild(progressBar);
  document.body.appendChild(progressIndicator);

  let isScrolling = false;
  let scrollTimer;
  let lastScrollTime = 0;
  const scrollThrottle = 16; // ~60fps

  function updateProgress() {
    if (!slider) return;

    const now = Date.now();
    if (now - lastScrollTime < scrollThrottle) return;
    lastScrollTime = now;

    // For vertical sliders, use scrollTop; for horizontal, use scrollLeft
    let scrollPosition = 0;
    let totalScrollLength = 0;

    if (slider.classList.contains('vertical')) {
      scrollPosition = slider.scrollTop;
      totalScrollLength = slider.scrollHeight - slider.clientHeight;
    } else {
      scrollPosition = slider.scrollLeft;
      totalScrollLength = slider.scrollWidth - slider.clientWidth;
    }

    // Calculate progress percentage
    const progress = totalScrollLength > 0 ? (scrollPosition / totalScrollLength) * 100 : 0;
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    progressBar.style.width = clampedProgress + '%';

    // Check for completion - trigger when user scrolls to near the end (90%+)
    if (clampedProgress >= 50 && !window.lessonCompleted) {
      window.lessonCompleted = true;
      showCompletionAlert();
    }
  }

  function handleScroll() {
    if (slider) {
      // Check if slider is in viewport
      const sliderRect = slider.getBoundingClientRect();
      const isSliderVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;

      if (isSliderVisible) {
        body.classList.add('slider-active');
      } else {
        body.classList.remove('slider-active');
      }

      updateProgress();
    }

    // Clear existing timer
    clearTimeout(scrollTimer);

    // Set scrolling flag
    isScrolling = true;

    // Remove scrolling flag after scroll stops
    scrollTimer = setTimeout(function() {
      isScrolling = false;
    }, 150);
  }

  // Initial check
  handleScroll();

  // Add scroll event listeners with passive option for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Also listen for slider scroll events
  if (slider) {
    slider.addEventListener('scroll', updateProgress, { passive: true });
  }
});

// Completion Alert Functions
function showCompletionAlert() {
  const alert = document.getElementById('completionAlert');
  if (alert) {
    alert.classList.add('show');
    // Force show for testing
    alert.style.opacity = '1';
    alert.style.visibility = 'visible';
    alert.style.transform = 'translate(-50%, -50%) scale(1)';
  }
}

function closeCompletionAlert() {
  const alert = document.getElementById('completionAlert');
  if (alert) {
    alert.classList.remove('show');
  }
}
