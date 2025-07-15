document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const matrixCanvas = document.getElementById("matrix-canvas");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const contactForm = document.getElementById("contact-form");

  // --- 1. Loading Screen Animation ---
  const loader = {
    progress: 0,
    progressBar: document.querySelector(".progress-bar"),
    progressText: document.querySelector(".progress-text"),
    
    updateProgress(value) {
      this.progress = Math.min(value, 100);
      if (this.progressBar) this.progressBar.style.width = `${this.progress}%`;
      if (this.progressText) this.progressText.textContent = `${Math.floor(this.progress)}%`;
    },

    complete() {
      setTimeout(() => {
        if (loadingScreen) loadingScreen.style.opacity = "0";
        setTimeout(() => {
          if (loadingScreen) loadingScreen.style.display = "none";
          document.body.style.overflowY = 'auto';
          initializeMainAnimations();
        }, 500);
      }, 500);
    }
  };
  
  // Simulate loading
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 10;
    loader.updateProgress(progress);
    if (progress >= 100) {
      clearInterval(loadingInterval);
      loader.complete();
    }
  }, 150);


  // --- 2. Matrix Rain Effect ---
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext("2d");
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const fontSize = 14;
    const columns = Math.ceil(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    let matrixIntervalId = setInterval(drawMatrix, 40);

    window.addEventListener('resize', () => {
      clearInterval(matrixIntervalId);
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      const newColumns = Math.ceil(matrixCanvas.width / fontSize);
      drops.length = newColumns;
      drops.fill(1);
      matrixIntervalId = setInterval(drawMatrix, 40);
    });
  }

  // --- 3. Main Page Animations (called after loading) ---
  function initializeMainAnimations() {
    // Typing animation for hero section
    const typingElement = document.querySelector(".typing-skills");
    if (typingElement) {
        // UPDATED with your skills
        const skills = ['"Full-Stack Dev"', '"AI/ML Engineer"', '"Big Data Analyst"', '"Tech Leader"'];
        let skillIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const currentSkill = skills[skillIndex];
            const an = (str, n) => str.substring(0, n);

            typingElement.textContent = an(currentSkill, isDeleting ? charIndex-- : ++charIndex);

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentSkill.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; skillIndex = (skillIndex + 1) % skills.length; typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          // Animate counters when they become visible
          if (entry.target.classList.contains('stat-number')) {
            animateCounter(entry.target);
          }
          // Animate skill bars when they become visible
          if (entry.target.classList.contains('skill-item')) {
            const level = entry.target.getAttribute('data-level');
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) progressBar.style.width = `${level}%`;
          }
           observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Observe elements
    document.querySelectorAll('.stat-number, .skill-item, section, .project-card, .contact-card, .skill-category, .expertise-item, .achievement-card').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Code editor animation
    const codeContainer = document.getElementById("code-animation");
    if(codeContainer) {
        const codeLines = [
            '<span style="color: #6c757d">1</span> <span style="color: #d63384">import</span> <span style="color: #fd7e14">React</span> <span style="color: #d63384">from</span> <span style="color: #20c997">\'react\'</span>;',
            '<span style="color: #6c757d">2</span> ',
            '<span style="color: #6c757d">3</span> <span style="color: #d63384">const</span> <span style="color: #0d6efd">Portfolio</span> = () => {',
            '<span style="color: #6c757d">4</span>   <span style="color: #d63384">const</span> [<span style="color: #fd7e14">isAwesome</span>] = <span style="color: #0d6efd">useState</span>(<span style="color: #198754">true</span>);',
            '<span style="color: #6c757d">5</span> ',
            '<span style="color: #6c757d">6</span>   <span style="color: #d63384">return</span> (',
            '<span style="color: #6c757d">7</span>     <span style="color: #6f42c1"><div></span>',
            '<span style="color: #6c757d">8</span>       <span style="color: #6f42c1"><h1></span>{<span style="color: #fd7e14">isAwesome</span> ? <span style="color: #20c997">\'Amazing\'</span> : <span style="color: #20c997">\'Good\'</span>} Code<span style="color: #6f42c1"></h1></span>',
            '<span style="color: #6c757d">9</span>     <span style="color: #6f42c1"></div></span>',
            '<span style="color: #6c757d">10</span>  );',
            '<span style="color: #6c757d">11</span> };',
        ];
        let lineIndex = 0;
        function addLine() {
            if (lineIndex < codeLines.length) {
                const line = document.createElement("div");
                line.innerHTML = codeLines[lineIndex];
                line.style.opacity = "0";
                line.style.transition = "opacity 0.5s ease";
                codeContainer.appendChild(line);
                setTimeout(() => line.style.opacity = "1", 50);
                lineIndex++;
                setTimeout(addLine, 200);
            }
        }
        setTimeout(addLine, 1000);
    }
  }

  // --- 4. Counter Animation Logic ---
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-count');
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const update = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  }

  // --- 5. Navigation & Scrolling ---
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      if (navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
      }
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // --- 6. Project Filtering ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      
      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === 'all' || category === filter;
        card.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });

  // --- 7. Contact Form Handling ---
  if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const submitBtn = contactForm.querySelector('.submit-btn');
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoader = submitBtn.querySelector('.btn-loader');
          const btnIcon = submitBtn.querySelector('.btn-icon');

          // Show loader
          btnText.style.display = 'none';
          btnIcon.style.display = 'none';
          btnLoader.style.display = 'block';
          submitBtn.disabled = true;

          const formData = new FormData(contactForm);
          fetch(contactForm.action, {
              method: 'POST',
              body: formData,
              headers: { 'Accept': 'application/json' }
          }).then(response => {
              if (response.ok) {
                  // Success
                  btnText.textContent = 'Message Sent!';
                  btnIcon.className = 'fas fa-check btn-icon';
                  submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                  contactForm.reset();
              } else {
                  // Error
                  btnText.textContent = 'Error!';
                  btnIcon.className = 'fas fa-exclamation-triangle btn-icon';
                  submitBtn.style.background = 'linear-gradient(135deg, #ff0066 0%, #cc0052 100%)';
              }
          }).catch(error => {
              // Network Error
              btnText.textContent = 'Error!';
              btnIcon.className = 'fas fa-exclamation-triangle btn-icon';
              submitBtn.style.background = 'linear-gradient(135deg, #ff0066 0%, #cc0052 100%)';
          }).finally(() => {
              // Restore button
              btnLoader.style.display = 'none';
              btnText.style.display = 'block';
              btnIcon.style.display = 'block';
              setTimeout(() => {
                  submitBtn.disabled = false;
                  btnText.textContent = 'Send Message';
                  btnIcon.className = 'fas fa-paper-plane btn-icon';
                  submitBtn.style.background = '';
              }, 3000);
          });
      });
  }
});