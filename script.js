document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const contactForm = document.getElementById("contact-form");
    const cursorLight = document.getElementById('cursor-light');
    const particleCanvas = document.getElementById("matrix-canvas");
    const projectsGrid = document.getElementById("projects-grid");

    const projectsData = [
  {
    category: "web",
    categoryLabel: "Web Gaming Platform",
    title: "GeoRush: Real-Time Geography Game",
    image: "geo-rush.png",
    alt: "GeoRush gameplay and duel interface",
    overlayText: "Arcade-style geography platform with daily challenges, private 1v1 duels, and live scoring.",
    description: "Built a multi-mode geography game with Speed Run, quizzes, Flag Guess, Travel Chain, leaderboards, profiles, and shareable duel rooms.",
    tech: ["Next.js", "TypeScript", "Google Auth"],
    actions: [
      { type: "live", url: "https://georush-opal.vercel.app/" },
      { type: "github", url: "https://github.com/keshav6740/GeoRush" }
    ]
  },
  {
            category: "web",
            categoryLabel: "Full-Stack Application",
            title: "Gym Management System",
            image: "image.png",
            alt: "Gym Management System",
            overlayText: "Full-stack app automating scheduling, billing, members (25% efficiency gain).",
            description: "A comprehensive system to automate scheduling, billing, and member management for gyms.",
            tech: ["Node.js", "SQL", "JavaScript", "HTML/CSS"],
            actions: [
                { type: "live", url: "https://gym-management-system-1-s1km.onrender.com/" },
                { type: "github", url: "https://github.com/keshav6740/Gym-Management-System" }
            ]
        },
       
        {
            category: "ai",
            categoryLabel: "AI / Computer Vision",
            title: "Content-Based Image Retrieval",
            image: "cbir.png",
            alt: "Content-Based Image Retrieval",
            overlayText: "SIFT & ORB based system fetching similar images from 8000+ entries.",
            description: "Developed a high-accuracy image retrieval system using SIFT & ORB algorithms.",
            tech: ["OpenCV", "Python", "React", "Flask"],
            actions: [
                { type: "live", url: "https://cbir-api.onrender.com/" },
                { type: "github", url: "https://github.com/keshav6740/Content-Based-Image-Retrieval" }
            ]
        },
        
        {
            category: "web",
            categoryLabel: "SaaS Web Application",
            title: "Nexus: AI Business Management",
            image: "nexus.png",
            alt: "Nexus AI Management",
            overlayText: "Modern AI-powered SaaS platform to manage business operations and collaboration.",
            description: "A modern AI-powered SaaS platform for business operations and collaboration.",
            tech: ["React", "Node.js", "MongoDB", "AI"],
            actions: [
                { type: "live", url: "https://nexus-business-ai-management.vercel.app/" },
                { type: "github", url: "https://github.com/keshav6740/Nexus-Business-AI-Management" }
            ]
        },
        {
            category: "ai",
            categoryLabel: "AI / Deep Learning",
            title: "Music Genre Classification",
            image: "polaroify.png",
            alt: "Music Genre Classification",
            overlayText: "Deep learning model trained on GTZAN dataset for audio genre classification.",
            description: "A deep learning model for classifying music genres from audio files, trained on the GTZAN dataset.",
            tech: ["Deep Learning", "Python", "TensorFlow"],
            actions: [
                { type: "live", url: "https://deeplearning-music-classifier.onrender.com/" },
                { type: "github", url: "https://github.com/keshav6740/Smart-Music-Genre-Classification" }
            ]
        },
        {
            category: "web",
            categoryLabel: "Web App / Creator Tool",
            title: "Polaroify",
            image: "music.png",
            alt: "Polaroify music poster generator",
            overlayText: "Studio for music posters that turns songs into collectible print-ready polaroids.",
            description: "Search Spotify tracks, customize templates, colors, fonts, lyrics, and layout, then export high-quality PNGs for gifts, merch drops, and phone covers.",
            tech: ["Next.js", "Spotify API", "Canvas Export", "Vercel"],
            actions: [
                { type: "live", url: "https://polaroify.vercel.app/" },
                { type: "github", url: "https://github.com/keshav6740/Polaroify" }
            ]
        },
         {
            category: "ai",
            categoryLabel: "AI / ML Web Application",
            title: "Crop Yield Prediction ML",
            image: "crop-yield.png",
            alt: "Crop Yield Prediction dashboard",
            overlayText: "Flask + XGBoost system predicting crop yield with confidence intervals and SHAP explainability.",
            description: "Built an ML-powered Flask app for crop-yield forecasting with XGBoost regression, quantile-based confidence ranges, and feature-level SHAP insights.",
            tech: ["Python", "Flask", "XGBoost", "LightGBM", "SHAP"],
            actions: [
                { type: "live", url: "https://crop-yield-prediction-ml-iar3.onrender.com/" },
                { type: "github", url: "https://github.com/keshav6740/Crop-Yield-Prediction-ML" }
            ]
        },
        {
            category: "web",
            categoryLabel: "Web Application",
            title: "Real-Time Chat App",
            image: "rtca.jpg",
            alt: "Real-Time Chat App",
            overlayText: "Django messaging platform using Redis pub-sub for live communication.",
            description: "A real-time messaging platform built with Django and Redis for live pub-sub communication.",
            tech: ["Django", "Redis", "WebSockets", "Python"],
            actions: [{ type: "github", url: "https://github.com/krtn2902/realtime-conversation-app" }]
        },
        
        {
            category: "big-data",
            categoryLabel: "Big Data & Analytics",
            title: "Stock Market Prediction",
            image: "stock.png",
            alt: "Stock Market Prediction",
            overlayText: "Real-time NIFTY 50 prediction using Hadoop, Kafka, Spark, & Monte Carlo simulation.",
            description: "Engineered a real-time prediction pipeline for NIFTY 50 index. (Private Repo)",
            tech: ["Hadoop", "Kafka", "Spark", "HBase"],
            actions: [{ type: "private" }]
        }
    ];

    function getProjectActionIconClass(type) {
        if (type === "github") return "fab fa-github";
        if (type === "live") return "fas fa-external-link-alt";
        return "fas fa-lock";
    }

    function buildProjectActionsHTML(actions) {
        return actions.map((action) => {
            const iconClass = getProjectActionIconClass(action.type);
            if (action.type === "private") {
                return `<a href="#" class="project-btn" aria-label="Private repository"><i class="${iconClass}"></i></a>`;
            }
            return `<a href="${action.url}" target="_blank" rel="noopener noreferrer" class="project-btn"><i class="${iconClass}"></i></a>`;
        }).join("");
    }

    function renderProjects() {
        if (!projectsGrid) return;

        projectsGrid.innerHTML = projectsData.map((project) => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.alt}" class="project-image-fill">
                    <div class="project-overlay">
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <div class="project-tech">
                                ${project.tech.map((techItem) => `<span>${techItem}</span>`).join("")}
                            </div>
                        </div>
                        <div class="project-actions">
                            ${buildProjectActionsHTML(project.actions)}
                        </div>
                    </div>
                </div>
                <div class="project-details">
                    <div class="project-category">${project.categoryLabel}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
            </div>
        `).join("");
    }

    renderProjects();

    // ===================================
    //  1. CORE: PARTICLE & CURSOR
    // ===================================

    if (cursorLight) {
        document.addEventListener('mousemove', (e) => {
            cursorLight.style.left = e.clientX + 'px';
            cursorLight.style.top = e.clientY + 'px';
        });
    }

    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        const PARTICLE_LINK_DISTANCE = 120;
        const PARTICLE_MOUSE_DISTANCE = 250;
        const PARTICLE_CELL_SIZE = PARTICLE_LINK_DISTANCE;
        let particles = [];
        let spatialGrid = new Map();
        let mouse = { x: null, y: null };

        function resizeCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
            initParticles();
        }
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        document.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

        class Particle {
            constructor(x, y, vx, vy) { this.x = x; this.y = y; this.vx = vx; this.vy = vy; this.radius = 1.5; this.color = `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.3})`; }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); }
            update() {
                if (this.x < 0 || this.x > particleCanvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > particleCanvas.height) this.vy = -this.vy;
                this.x += this.vx; this.y += this.vy;
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = Math.min(140, Math.floor((particleCanvas.width * particleCanvas.height) / 16000));
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle(Math.random() * particleCanvas.width, Math.random() * particleCanvas.height, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5));
            }
        }

        function getGridKey(col, row) {
            return `${col},${row}`;
        }

        function buildSpatialGrid() {
            spatialGrid = new Map();
            particles.forEach((particle, index) => {
                const col = Math.floor(particle.x / PARTICLE_CELL_SIZE);
                const row = Math.floor(particle.y / PARTICLE_CELL_SIZE);
                const key = getGridKey(col, row);
                if (!spatialGrid.has(key)) spatialGrid.set(key, []);
                spatialGrid.get(key).push(index);
            });
        }

        function connectParticles() {
            buildSpatialGrid();
            const linkDistanceSq = PARTICLE_LINK_DISTANCE * PARTICLE_LINK_DISTANCE;
            for (let i = 0; i < particles.length; i++) {
                const current = particles[i];
                const currentCol = Math.floor(current.x / PARTICLE_CELL_SIZE);
                const currentRow = Math.floor(current.y / PARTICLE_CELL_SIZE);

                for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
                    for (let colOffset = -1; colOffset <= 1; colOffset++) {
                        const key = getGridKey(currentCol + colOffset, currentRow + rowOffset);
                        const candidates = spatialGrid.get(key);
                        if (!candidates) continue;

                        for (const j of candidates) {
                            if (j <= i) continue;

                            const candidate = particles[j];
                            const dx = current.x - candidate.x;
                            const dy = current.y - candidate.y;
                            const distSq = dx * dx + dy * dy;

                            if (distSq < linkDistanceSq) {
                                const dist = Math.sqrt(distSq);
                                ctx.beginPath();
                                ctx.strokeStyle = `rgba(0, 255, 136, ${1 - dist / PARTICLE_LINK_DISTANCE})`;
                                ctx.lineWidth = 0.5;
                                ctx.moveTo(current.x, current.y);
                                ctx.lineTo(candidate.x, candidate.y);
                                ctx.stroke();
                            }
                        }
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dist = Math.hypot(current.x - mouse.x, current.y - mouse.y);
                    if (dist < PARTICLE_MOUSE_DISTANCE) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 136, ${1 - dist / PARTICLE_MOUSE_DISTANCE})`;
                        ctx.lineWidth = 0.7;
                        ctx.moveTo(current.x, current.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }
        resizeCanvas();
        animateParticles();
    }

    // =============================
    // 2. LOADING SCREEN & INIT
    // =============================
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
                }, 250);
            }, 120);
        }
    };
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20 + 8;
        loader.updateProgress(progress);
        if (progress >= 100) {
            clearInterval(loadingInterval);
            loader.complete();
        }
    }, 80);

    // ===============================
    // 3. MAIN ANIMATIONS & INTERACTIONS
    // ===============================
    function initializeMainAnimations() {
        // Init all features
        initTypingAnimation();
        initIntersectionObserver();
        initCodeEditorAnimation();
        init3DCards();
        initHeroParallax();
        initNavHighlight();
    }

    // Typing animation
    function initTypingAnimation() {
        const el = document.querySelector(".typing-skills");
        if (!el) return;
        const skills = ['"Full-Stack Dev"', '"AI/ML Engineer"', '"Big Data Analyst"', '"Tech Leader"'];
        let skillIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentSkill = skills[skillIndex];
            el.textContent = currentSkill.substring(0, isDeleting ? --charIndex : ++charIndex);
            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentSkill.length) { typeSpeed = 2000; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; skillIndex = (skillIndex + 1) % skills.length; typeSpeed = 500; }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // Intersection Observer for all scroll-based animations
    function initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    if (entry.target.classList.contains('stat-number')) animateCounter(entry.target);
                    if (entry.target.classList.contains('skill-item')) {
                        const level = entry.target.getAttribute('data-level');
                        const progressBar = entry.target.querySelector('.skill-progress');
                        if (progressBar) progressBar.style.width = `${level}%`;
                    }
                    if (entry.target.classList.contains('reveal-title')) {
                        entry.target.classList.add('is-revealing');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.stat-number, .skill-item, section, .project-card, .contact-card, .skill-category, .expertise-item, .achievement-card, .reveal-title').forEach(el => {
            el.classList.add('loading');
            observer.observe(el);
        });
    }
    
    // Code editor animation
    function initCodeEditorAnimation() {
        const codeContainer = document.getElementById("code-animation");
        if (!codeContainer) return;
        const codeLines = ['<span style="color: #6c757d">1</span> <span style="color: #d63384">import</span> <span style="color: #fd7e14">React</span> <span style="color: #d63384">from</span> <span style="color: #20c997">\'react\'</span>;', '<span style="color: #6c757d">2</span> ', '<span style="color: #6c757d">3</span> <span style="color: #d63384">const</span> <span style="color: #0d6efd">Portfolio</span> = () => {', '<span style="color: #6c757d">4</span>   <span style="color: #d63384">const</span> [<span style="color: #fd7e14">isAwesome</span>] = <span style="color: #0d6efd">useState</span>(<span style="color: #198754">true</span>);', '<span style="color: #6c757d">5</span> ', '<span style="color: #6c757d">6</span>   <span style="color: #d63384">return</span> (', '<span style="color: #6c757d">7</span>     <span style="color: #6f42c1"><div></span>', '<span style="color: #6c757d">8</span>       <span style="color: #6f42c1"><h1></span>{<span style="color: #fd7e14">isAwesome</span> ? <span style="color: #20c997">\'Amazing\'</span> : <span style="color: #20c997">\'Good\'</span>} Code<span style="color: #6f42c1"></h1></span>', '<span style="color: #6c757d">9</span>     <span style="color: #6f42c1"></div></span>', '<span style="color: #6c757d">10</span>  );', '<span style="color: #6c757d">11</span> };', ];
        let lineIndex = 0;
        function addLine() {
            if (lineIndex < codeLines.length) {
                const line = document.createElement("div");
                line.innerHTML = codeLines[lineIndex];
                line.style.opacity = "0"; line.style.transition = "opacity 0.5s ease";
                codeContainer.appendChild(line);
                setTimeout(() => line.style.opacity = "1", 50);
                lineIndex++;
                setTimeout(addLine, 200);
            }
        }
        setTimeout(addLine, 1000);
    }
    
    // 3D cards
    function init3DCards() {
        const cards = document.querySelectorAll('.project-card, .expertise-item');
        const maxTilt = 2.5;
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -maxTilt;
                const rotateY = ((x - centerX) / centerX) * maxTilt;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
            card.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0deg) rotateY(0deg)'; });
        });
    }

    // Hero Parallax
    function initHeroParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth * 2;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight * 2;
            parallaxElements.forEach(el => {
                const strength = el.dataset.parallaxStrength || 20;
                el.style.transform = `translate(${-x * strength}px, ${-y * strength}px)`;
            });
        });
    }

    // Navbar Highlight
    function initNavHighlight() {
        const navMenu = document.getElementById('nav-menu');
        const navLinks = navMenu.querySelectorAll('.nav-link');
        const highlight = navMenu.querySelector('.nav-highlight');

        if (!navMenu || !highlight) return;

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                highlight.style.opacity = '1';
                highlight.style.width = `${link.offsetWidth}px`;
                highlight.style.left = `${link.offsetLeft}px`;
            });
        });

        navMenu.addEventListener('mouseleave', () => {
            highlight.style.opacity = '0';
        });
    }

    // ==========================
    // 4. HELPER FUNCTIONS & UI
    // ==========================
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-count');
        const duration = 1500;
        const increment = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += increment;
            if (current < target) { counter.innerText = Math.ceil(current); requestAnimationFrame(update); }
            else { counter.innerText = target; }
        };
        update();
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navMenu.classList.contains('active')) { navToggle.classList.remove('active'); navMenu.classList.remove('active'); }
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");
            projectCards.forEach(card => {
                card.style.display = (filter === 'all' || card.getAttribute("data-category") === filter) ? 'block' : 'none';
            });
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn'), btnText = submitBtn.querySelector('.btn-text'),
                  btnLoader = submitBtn.querySelector('.btn-loader'), btnIcon = submitBtn.querySelector('.btn-icon');
            btnText.style.display = 'none'; btnIcon.style.display = 'none';
            btnLoader.style.display = 'block'; submitBtn.disabled = true;
            fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } })
            .then(res => {
                btnText.textContent = res.ok ? 'Message Sent!' : 'Error!';
                btnIcon.className = `fas ${res.ok ? 'fa-check' : 'fa-exclamation-triangle'} btn-icon`;
                submitBtn.style.background = res.ok ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)' : 'linear-gradient(135deg, #ff0066 0%, #cc0052 100%)';
                if(res.ok) contactForm.reset();
            }).catch(() => {
                btnText.textContent = 'Error!'; btnIcon.className = 'fas fa-exclamation-triangle btn-icon';
                submitBtn.style.background = 'linear-gradient(135deg, #ff0066 0%, #cc0052 100%)';
            }).finally(() => {
                btnLoader.style.display = 'none'; btnText.style.display = 'block'; btnIcon.style.display = 'block';
                setTimeout(() => {
                    submitBtn.disabled = false; btnText.textContent = 'Send Message';
                    btnIcon.className = 'fas fa-paper-plane btn-icon'; submitBtn.style.background = '';
                }, 3000);
            });
        });
    }
});
