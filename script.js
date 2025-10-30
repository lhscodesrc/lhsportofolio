 // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
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
                // Close mobile menu if open
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });

        // Smooth scroll-triggered reversible animations
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .bounce-in, .skill-item');
        const skillBars = document.querySelectorAll('.skill-bar');
        
        // Enhanced Intersection Observer for smooth reversible animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const smoothObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    // Element is entering viewport - animate forward
                    setTimeout(() => {
                        element.classList.add('animate-forward');
                        element.classList.remove('animate-reverse');
                    }, 50); // Small delay for smoother transition
                } else {
                    // Element is leaving viewport - animate reverse
                    element.classList.add('animate-reverse');
                    element.classList.remove('animate-forward');
                }
            });
        }, observerOptions);

        // Special observer for skill bars with staggered animation
        const skillBarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skill bars with staggered delay
                    const skillBarsInSection = entry.target.querySelectorAll('.skill-bar');
                    skillBarsInSection.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.classList.add('animate-forward');
                            bar.classList.remove('animate-reverse');
                        }, index * 200 + 300); // Staggered delay
                    });
                } else {
                    // Reverse skill bars animation
                    const skillBarsInSection = entry.target.querySelectorAll('.skill-bar');
                    skillBarsInSection.forEach(bar => {
                        bar.classList.add('animate-reverse');
                        bar.classList.remove('animate-forward');
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        // Counter animation observer
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    
                    // Ensure observer doesn't re-trigger animation
                    if (counter.classList.contains('is-animating')) return;
                    counter.classList.add('is-animating');
                    counter.classList.add('animate-forward');
                    
                    const duration = 2500; // Animation duration in ms
                    let startTimestamp = null;
                    
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        
                        // Apply ease-out-quad easing function
                        const easedProgress = progress * (2 - progress);
                        const currentValue = Math.floor(easedProgress * target);
                        
                        counter.textContent = currentValue.toLocaleString() + suffix;
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            // Ensure final value is exact
                            counter.textContent = target.toLocaleString() + suffix;
                        }
                    };
                    
                    window.requestAnimationFrame(step);


                    // Stop observing this element after it has animated once
                    counterObserver.unobserve(entry.target);

                } else {
                    // Reset counter when out of view
                    const counter = entry.target;
                    counter.classList.remove('animate-forward');
                    counter.textContent = '0';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        animatedElements.forEach(el => {
            smoothObserver.observe(el);
        });

        // Observe sections containing skill bars
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            skillBarObserver.observe(aboutSection);
        }

        // Observe counter elements
        const counterElements = document.querySelectorAll('.counter-animation');
        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });

        // Additional scroll-based animation control
        let lastScrollY = window.scrollY;
        let scrollDirection = 'down';

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = currentScrollY;

            // Add scroll direction class to body for additional styling if needed
            document.body.setAttribute('data-scroll-direction', scrollDirection);
        });

        // Initialize Element SDK
        const defaultConfig = {
            name: "Lalu Habib Sasiwimbe",
            tagline: "Lulusan Ilmu Kesehatan • Developer Kreatif • Ahli Solusi Digital",
            about_title: "Tentang Saya",
            about_description: "Lulusan Ilmu Kesehatan dengan keahlian beragam di domain teknis dan kreatif. Menggabungkan pengetahuan ilmu kesehatan dengan keahlian teknologi untuk menciptakan solusi digital yang inovatif.",
            contact_title: "Hubungi Saya",
            email: "emailkerjaannyahabib@gmail.com",
            phone: "087865240934",
            background_color: "#202864",
            surface_color: "#ffffff",
            text_color: "#1e293b",
            primary_action_color: "#fbbf24",
            secondary_action_color: "#4f53eb"
        };

        async function onConfigChange(config) {
            // Update text content
            const nameElements = document.querySelectorAll('#nav-name, #hero-name');
            nameElements.forEach(el => {
                if (el) el.textContent = config.name || defaultConfig.name;
            });

            const heroTagline = document.getElementById('hero-tagline');
            if (heroTagline) heroTagline.textContent = config.tagline || defaultConfig.tagline;
            
            const aboutTitle = document.getElementById('about-title');
            if (aboutTitle) aboutTitle.textContent = config.about_title || defaultConfig.about_title;
            
            const aboutDescription = document.getElementById('about-description');
            if (aboutDescription) aboutDescription.textContent = config.about_description || defaultConfig.about_description;
            
            const contactTitle = document.getElementById('contact-title');
            if (contactTitle) contactTitle.textContent = config.contact_title || defaultConfig.contact_title;
            
            const contactEmail = document.getElementById('contact-email');
            if (contactEmail) contactEmail.textContent = config.email || defaultConfig.email;
            
            const contactPhone = document.getElementById('contact-phone');
            if (contactPhone) contactPhone.textContent = config.phone || defaultConfig.phone;

            // Update colors
            const backgroundColor = config.background_color || defaultConfig.background_color;
            const surfaceColor = config.surface_color || defaultConfig.surface_color;
            const textColor = config.text_color || defaultConfig.text_color;
            const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
            const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

            // Apply background color to gradient sections
            document.querySelectorAll('.gradient-bg').forEach(el => {
                el.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, ${secondaryActionColor} 50%, ${secondaryActionColor} 100%)`;
            });

            // Apply surface color to cards and white sections
            document.querySelectorAll('.bg-white').forEach(el => {
                el.style.backgroundColor = surfaceColor;
            });

            // Apply text color
            document.querySelectorAll('.text-slate-800, .text-slate-700, .text-blue-900').forEach(el => {
                el.style.color = textColor;
            });

            // Apply primary action color to buttons and accents
            document.querySelectorAll('.bg-yellow-500, .bg-yellow-400').forEach(el => {
                el.style.backgroundColor = primaryActionColor;
            });

            // Apply secondary action color to secondary elements
            document.querySelectorAll('.text-blue-600, .bg-blue-600').forEach(el => {
                if (el.classList.contains('bg-blue-600')) {
                    el.style.backgroundColor = secondaryActionColor;
                } else {
                    el.style.color = secondaryActionColor;
                }
            });
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ background_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.surface_color || defaultConfig.surface_color,
                        set: (value) => {
                            config.surface_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ surface_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ text_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.primary_action_color || defaultConfig.primary_action_color,
                        set: (value) => {
                            config.primary_action_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ primary_action_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                        set: (value) => {
                            config.secondary_action_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ secondary_action_color: value });
                            }
                        }
                    }
                ],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["name", config.name || defaultConfig.name],
                ["tagline", config.tagline || defaultConfig.tagline],
                ["about_title", config.about_title || defaultConfig.about_title],
                ["about_description", config.about_description || defaultConfig.about_description],
                ["contact_title", config.contact_title || defaultConfig.contact_title],
                ["email", config.email || defaultConfig.email],
                ["phone", config.phone || defaultConfig.phone]
            ]);
        }

        // Dynamic tooltip width calculation
        function setupDynamicTooltips() {
            const allIcons = document.querySelectorAll('.tech-icon, .tech-icon-sm, .skill-icon, .skill-icon-sm');
            
            allIcons.forEach(icon => {
                const tooltip = icon.getAttribute('data-tooltip');
                if (tooltip) {
                    // Create temporary element to measure text width
                    const tempElement = document.createElement('span');
                    tempElement.style.visibility = 'hidden';
                    tempElement.style.position = 'absolute';
                    tempElement.style.fontSize = '0.75rem';
                    tempElement.style.fontWeight = '500';
                    tempElement.style.padding = '0.5rem 0.75rem';
                    tempElement.style.whiteSpace = 'nowrap';
                    tempElement.textContent = tooltip;
                    
                    document.body.appendChild(tempElement);
                    const textWidth = tempElement.offsetWidth;
                    document.body.removeChild(tempElement);
                    
                    // Set CSS custom property for this icon
                    icon.style.setProperty('--tooltip-width', `${textWidth}px`);
                    
                    // Update sibling icons when this icon is hovered
                    icon.addEventListener('mouseenter', () => {
                        const container = icon.closest('.tech-icon-container, .skill-icon-container');
                        if (container) {
                            const siblings = container.querySelectorAll('.tech-icon, .tech-icon-sm, .skill-icon, .skill-icon-sm');
                            siblings.forEach(sibling => {
                                sibling.style.setProperty('--tooltip-width', `${textWidth}px`);
                            });
                        }
                    });
                    
                    icon.addEventListener('mouseleave', () => {
                        const container = icon.closest('.tech-icon-container, .skill-icon-container');
                        if (container) {
                            const siblings = container.querySelectorAll('.tech-icon, .tech-icon-sm, .skill-icon, .skill-icon-sm');
                            siblings.forEach(sibling => {
                                sibling.style.setProperty('--tooltip-width', '120px');
                            });
                        }
                    });
                }
            });
        }

        // Initialize dynamic tooltips
        setupDynamicTooltips();

        // Project card toggle functionality
        function toggleProjectCard(card) {
            const details = card.querySelector('.project-details');
            const isExpanded = details.style.maxHeight && details.style.maxHeight !== '0px';
            
            if (isExpanded) {
                // Collapse
                details.style.maxHeight = '0px';
                card.classList.remove('expanded');
            } else {
                // Expand
                details.style.maxHeight = details.scrollHeight + 'px';
                card.classList.add('expanded');
            }
        }

        // Make toggleProjectCard globally available
        window.toggleProjectCard = toggleProjectCard;

        // Skills toggle functionality
        function toggleSkills() {
            const hiddenSkills = document.getElementById('hidden-skills');
            const toggleBtn = document.getElementById('skills-toggle-btn');
            const toggleIcon = document.getElementById('skills-toggle-icon');
            const toggleText = toggleBtn.querySelector('span');
            
            // Check current state based on visible skills count
            const allSkills = document.querySelectorAll('#skills-container .skill-item');
            const visibleSkills = Array.from(allSkills).filter(skill => {
                const computedStyle = window.getComputedStyle(skill);
                return computedStyle.display !== 'none' && computedStyle.opacity !== '0';
            });
            
            const isExpanded = visibleSkills.length > 4;
            
            if (isExpanded) {
                // Collapse - show only 3 skills
                hiddenSkills.style.maxHeight = '0px';
                hiddenSkills.style.opacity = '0';
                hiddenSkills.classList.remove('expanded');
                toggleIcon.style.transform = 'rotate(0deg)';
                toggleText.setAttribute('data-id', 'show-more-skills');
                toggleText.textContent = translations[currentLanguage]['show-more-skills'];
            } else {
                // Expand - show all 6 skills
                hiddenSkills.style.maxHeight = hiddenSkills.scrollHeight + 'px';
                hiddenSkills.style.opacity = '1';
                hiddenSkills.classList.add('expanded');
                toggleIcon.style.transform = 'rotate(180deg)';
                toggleText.setAttribute('data-id', 'show-less-skills');
                toggleText.textContent = translations[currentLanguage]['show-less-skills'];
            }
        }
        
        // Make toggleSkills globally available
        window.toggleSkills = toggleSkills;

        // Generic project toggle functionality
        function toggleProjects(category) {
            const hiddenProjects = document.getElementById(`${category}-projects-hidden`);
            const toggleBtn = document.getElementById(`${category}-projects-toggle`);
            const toggleIcon = document.getElementById(`${category}-projects-toggle-icon`);
            const toggleText = toggleBtn.querySelector('span');
            
            const isExpanded = hiddenProjects.style.maxHeight && hiddenProjects.style.maxHeight !== '0px';
            
            if (isExpanded) {
                // Collapse
                hiddenProjects.style.maxHeight = '0px';
                hiddenProjects.style.opacity = '0';
                toggleIcon.style.transform = 'rotate(0deg)';
                toggleText.setAttribute('data-id', `show-more-${category}-projects`);
                toggleText.textContent = translations[currentLanguage][`show-more-${category}-projects`];
            } else {
                // Expand
                hiddenProjects.style.maxHeight = hiddenProjects.scrollHeight + 'px';
                hiddenProjects.style.opacity = '1';
                toggleIcon.style.transform = 'rotate(180deg)';
                toggleText.setAttribute('data-id', `show-less-${category}-projects`);
                toggleText.textContent = translations[currentLanguage][`show-less-${category}-projects`];
            }
        }
        
        // Make the generic function available globally
        window.toggleDesignProjects = () => toggleProjects('design');
        window.toggleMotionProjects = () => toggleProjects('motion');
        window.toggleAppsProjects = () => toggleProjects('apps');

        // Language System
        let currentLanguage = 'id';
        let isLanguageSwitching = false;
        
        const translations = {
            id: {
                // Navigation
                'nav-about': 'Tentang',
                'nav-experience': 'Pengalaman',
                'nav-project': 'Project',
                'nav-contact': 'Kontak',
                'nav-about-mobile': 'Tentang',
                'nav-experience-mobile': 'Pengalaman',
                'nav-project-mobile': 'Project',
                'nav-contact-mobile': 'Kontak',
                
                // Hero Section
                'hero-name': 'Lalu Habib Sasiwimbe',
                'hero-tagline': 'Fresh Graduate   |   Desainer Grafis   |   Programmer',
                'hero-portfolio-btn': 'Lihat Portfolio',
                'hero-contact-btn': 'Hubungi Saya',
                
                // About Section
                'about-title': 'Tentang Saya',
                'about-profile': 'Profil',
                'about-description': 'Lulusan Ilmu Kesehatan dengan keahlian beragam di domain teknis dan kreatif. Menggabungkan pengetahuan ilmu kesehatan dengan keahlian teknologi untuk menciptakan solusi digital yang inovatif.',
                'about-skills-title': 'Keahlian Inti',
                
                // Tags
                'tag-health': 'Ilmu Kesehatan',
                'tag-design': 'Desain Grafis',
                'tag-software': 'Pengembangan Aplikasi',
                
                // Skills
                'skill-graphic': 'Desain Grafis',
                'skill-motion': 'Motion Grafis',
                'skill-office': 'Microsoft Office',
                'skill-software': 'Pengembangan Aplikasi',
                'skill-website': 'Pengembangan Website',
                'skill-management': 'Manajemen Tim',
                'level-expert': 'Ahli',
                'level-advanced': 'Tingkat Lanjut',
                'level-intermediate': 'Menengah',
                'show-more-skills': 'Tampilkan Lebih Banyak',
                'show-less-skills': 'Sembunyikan',
                'all-skills': 'Semua Keahlian',
                'learn-more-btn': 'Lebih Lanjut',
                'show-more-design-projects': 'Lebih banyak project Design & Graphics',
                'show-less-design-projects': 'Sembunyikan project Design & Graphics',
                
                // Design Projects
                'design-project-1-title': 'Desain Publikasi Modul Pelatihan (UNICEF)',
                'design-project-1-desc': 'Mendesain modul pelatihan komprehensif untuk UNICEF dan Kemenkes. Sebuah proyek kolaborasi multi-institusi yang menuntut presisi desain, tata letak profesional, dan hasil cetak berkualitas tinggi.',
                'design-project-2-title': 'Identitas Visual & Branding NHPEO Mandalika 2025',
                'design-project-2-desc': 'Merancang seluruh identitas visual untuk acara berskala nasional. Dari logo, merchandise (ID card, lanyard, pena), hingga materi promosi raksasa (billboard & stage design) untuk pengalaman yang kohesif.',
                'design-project-3-title': 'Visual Branding & Promosi Digital (Sukma Rasa)',
                'design-project-3-desc': 'Menerjemahkan esensi kuliner (gurih, pedas, segar) menjadi desain poster digital yang "menggugah selera". Fokus pada komposisi dan tipografi dinamis untuk menarik minat beli di platform digital.',
                'design-project-4-title': 'Desain Menu Book & Materi Promosi (Sukma Rasa)',
                'design-project-4-desc': 'Proyek desain end-to-end untuk restoran. Tidak hanya materi promo, tapi juga mendesain buku menu yang informatif, jelas, dan selaras dengan identitas visual brand.',
                'design-project-5-title': 'Studi Kasus: Konten & Branding Media Sosial',
                'design-project-5-desc': 'Mengubah strategi brand menjadi feed Instagram yang estetik dan fungsional. Portofolio ini menunjukkan kemampuan merencanakan grid, adaptasi gaya visual, dan eksekusi desain yang engaging untuk berbagai industri.',
                'design-project-6-title': 'Visual Branding & Promosi Digital (Xpectro Club)',
                'design-project-6-desc': 'Bertanggung jawab atas mayoritas materi visual untuk platform online tutoring. Mendesain konten promosi engaging untuk media sosial serta layout modul pembelajaran yang user-friendly, bekerja sepenuhnya secara remote (WFA).',
                'design-project-7-title': 'Brand Identity Ikatan Alumni Poltekkes Mataram',
                'design-project-7-desc': 'Memimpin proyek rebranding untuk organisasi alumni. Menciptakan identitas visual baru yang modern, profesional, dan sarat makna filosofis untuk merefleksikan nilai-nilai alumni.',
                'design-project-8-title': 'Logo & Visual Identity (AIPTLMI)',
                'design-project-8-desc': 'Mengeksekusi desain logo dan brand guideline untuk Asosiasi Institusi Pendidikan Tinggi TLM Indonesia. Tantangannya adalah menerjemahkan identitas organisasi nasional menjadi simbol yang filosofis dan modern.',
                'design-project-9-title': 'Desain & Ilustrasi Buku Saku ASI Eksklusif',
                'design-project-9-desc': 'Proyek kolaborasi dengan Poltekkes yang menuntut keahlian ganda: mendesain tata letak publikasi yang rapi sekaligus menciptakan ilustrasi orisinal dari nol untuk melengkapi materi edukasi.',
                'design-project-10-title': 'Materi Promosi & Panduan Aplikasi (KalDu PKV & Lab Health)',
                'design-project-10-desc': 'Mendesain flyer dan banner panduan pengguna untuk aplikasi digital. Fokus pada desain yang user-friendly, mengubah fitur teknis aplikasi menjadi panduan visual yang mudah diikuti oleh pengguna awam.',
                
                // Motion Projects
                'motion-project-1-title': 'Video Animasi Edukasi "SADANIS"',
                'motion-project-1-desc': 'Memimpin produksi penuh video animasi 6 menit. Menerjemahkan naskah medis kompleks (pemeriksaan payudara klinis) menjadi visual yang jelas, informatif, dan mudah dipahami oleh audiens awam dari konsep hingga final.',
                'motion-project-2-title': 'Serial Video Dokumenter (Pengabdian Masyarakat)',
                'motion-project-2-desc': 'Memproduksi serial video dokumenter yang menangkap esensi program pemberdayaan masyarakat. Mengubah kegiatan lapangan (Labkes Mini, SIGATBC, Ramuan Rajalom) menjadi cerita visual yang kuat dan inspiratif.',
                'motion-project-3-title': 'Video Animasi "MENJADI" (Pencegahan Diabetes)',
                'motion-project-3-desc': 'Mengelola siklus produksi penuh untuk video edukasi diabetes. Menerjemahkan faktor risiko dan metode pencegahan yang kompleks menjadi alur cerita animasi yang informatif dan praktis bagi audiens dewasa/lansia.',
                'motion-project-4-title': 'Video Animasi "CERDAS" (Gaya Flipbook)',
                'motion-project-4-desc': 'Mengelola produksi end-to-end untuk video edukasi pencegahan anemia. Mengeksekusi konsep unik flipbook-style mulai dari naskah, storyboard, hingga menjadi animasi final yang dinamis dan menarik.',
                'motion-project-5-title': 'Video Animasi "Persalinan Normal vs. Sesar"',
                'motion-project-5-desc': 'Meneliti topik, menyusun konsep naratif, dan menulis naskah untuk video animasi 3 menit. Menggunakan gaya bahasa non-formal untuk memberdayakan ibu hamil dengan informasi yang akurat dan berimbang.',
                'motion-project-6-title': 'Video Edukasi "Remaja Sehat Itu Keren"',
                'motion-project-6-desc': 'Video edukasi 7 menit yang mencakup prinsip gizi seimbang, pesan diet utama, hingga kebutuhan kalori spesifik untuk remaja (termasuk zat besi & folat).',
                'show-more-motion-projects': 'Lebih banyak project Motion Grafis & Video',
                'show-less-motion-projects': 'Sembunyikan project Motion Grafis & Video',

                // Experience Section
                'experience-title': 'Pengalaman Profesional',
                'tools-label': 'Alat',
                'skills-label': 'Keahlian',
                
                // Experience Titles
                'exp-owner-title': 'Pemilik / Freelancer',
                'exp-editor-title': 'Editor & Desainer Publikasi',
                'exp-lead-title': 'Desainer Utama & Wakil Koordinator IT',
                'exp-designer-title': 'Desainer & Bantuan IT',
                'exp-production-title': 'Staf Produksi',
                
                // Experience Descriptions
                'exp-owner-desc': 'Menyalurkan keahlian di bidang teknologi dan desain untuk solusi digital. Berfokus pada proyek yang memanfaatkan semua keahlian saya.',
                'exp-editor-desc': 'Proyek desain editorial untuk "Modul Pelatihan Imunisasi Antigen Baru" - kolaborasi multi-institusi.',
                'exp-lead-desc': 'Merancang identitas visual acara nasional dan mengelola aspek teknis (live stream, OBS, videotron).',
                'exp-designer-desc': 'Peran ganda dalam desain visual dan dukungan teknis untuk platform bimbingan belajar online.',
                'exp-production-desc': 'Mewujudkan desain visual sesuai keinginan klien dengan berbagai media kreatif.',
                
                // Experience Periods
                'period-current': 'Saat Ini',
                'period-aug-2021-current': 'Agu 2021 - Saat Ini',
                'period-unicef': 'Mei 2025 - Jun 2025',
                'period-nhpeo': '2025',
                'period-xpectro': 'Des 2023 - Apr 2025',
                'period-spacemed': 'Jul 2022 - Sep 2024',
                
                // Projects
                'stats-subtitle': 'Sampai saat ini telah menghasilkan sebanyak:',
                'collaboration-subtitle': 'Telah Bekerjasama dengan',
                'projects-title': 'Project Unggulan',
                'total-design': 'Desain Grafis',
                'design-desc': 'Logo, Poster, Banner, Leaflet dan materi visual lainnya',
                'total-motion': 'Motion Grafis & Video',
                'motion-desc': 'Animasi, Video Promosi, Motion Graphics dan konten multimedia',
                'total-software': 'Aplikasi & Website',
                'software-desc': 'Aplikasi Mobile, Website, Dashboard dan sistem digital',
                'design-graphics-title': 'Desain Grafis',
                'design-graphics-subtitle': 'Menciptakan identitas visual yang kuat dan komunikatif',
                'motion-graphics-title': 'Motion Grafis & Video',
                'motion-graphics-subtitle': 'Menghadirkan cerita melalui animasi dan video yang menarik',
                'apps-website-title': 'Aplikasi & Website',
                'apps-website-subtitle': 'Solusi digital yang fungsional dan user-friendly',

                // App Projects
                'app-project-1-title': 'Desain Ulang UI/UX & Website (Jurusan TLM)',
                'app-project-1-desc': 'Bertanggung jawab penuh atas desain ulang end-to-end website jurusan. Menerjemahkan kebutuhan akademik menjadi interface (UI/UX) yang modern, responsif, dan fungsional (HTML, CSS, JavaScript).',
                'app-project-2-title': 'Aplikasi Mobile "KalDu PKV" (Flutter)',
                'app-project-2-desc': 'Mendesain dan membangun aplikasi kalkulator risiko kardiovaskular (model WHO). Fokus pada user experience yang mulus, dari dashboard interaktif, kalkulator intuitif, hingga fitur smart advice yang dipersonalisasi.',
                'app-project-3-title': 'Aplikasi Mobile "Lab Health Pocket" (Kotlin)',
                'app-project-3-desc': 'Mengubah data lab yang "njlimet" menjadi visual yang mudah dibaca. Aplikasi ini "menerjemahkan" angka (kolesterol, gula darah) menjadi interpretasi simpel (Tinggi, Normal, Rendah) dengan rekomendasi gaya hidup praktis.',
                'app-project-4-title': 'Aplikasi Desktop "SIS" (Smart Inventory Management)',
                'app-project-4-desc': 'Mendesain dan membangun aplikasi database desktop (C#) untuk manajemen inventaris bahan makanan rumah sakit. Solusi digital yang efisien untuk mengatasi kerumitan pencatatan dan pelacakan stok.',
                'show-more-apps-projects': 'Lebih banyak project Aplikasi & Website',
                'show-less-apps-projects': 'Sembunyikan project Aplikasi & Website',
                
                // Contact
                'contact-title': 'Hubungi Saya',
                'contact-description': 'Siap untuk berkolaborasi dalam proyek digital yang inovatif? Mari berdiskusi!',
                'contact-email-label': 'Email',
                'contact-whatsapp-label': 'WhatsApp',
                'contact-website-label': 'Website',
                'email-button': 'Kontak melalui Email',
                'whatsapp-button': 'Kontak melalui WhatsApp',
                'website-button': 'Segera Hadir',
                
                // Footer
                'footer-text': '© 2025 Lalu Habib Sasiwimbe. Dibuat dengan ❤️ untuk berbagi karya dan pengalaman.'
            },
            en: {
                // Navigation
                'nav-about': 'About',
                'nav-experience': 'Experience',
                'nav-project': 'Projects',
                'nav-contact': 'Contact',
                'nav-about-mobile': 'About',
                'nav-experience-mobile': 'Experience',
                'nav-project-mobile': 'Projects',
                'nav-contact-mobile': 'Contact',
                
                // Hero Section
                'hero-name': 'Lalu Habib Sasiwimbe',
                'hero-tagline': 'Fresh Graduate   |   Graphic Designer   |   Programmer',
                'hero-portfolio-btn': 'View Portfolio',
                'hero-contact-btn': 'Contact Me',
                
                // About Section
                'about-title': 'About Me',
                'about-profile': 'Profile',
                'about-description': 'Health Science graduate with diverse expertise in technical and creative domains. Combining health science knowledge with technology skills to create innovative digital solutions.',
                'about-skills-title': 'Core Skills',
                
                // Tags
                'tag-health': 'Health Science',
                'tag-design': 'Graphic Design',
                'tag-software': 'Application Development',
                
                // Skills
                'skill-graphic': 'Graphic Design',
                'skill-motion': 'Motion Graphics',
                'skill-office': 'Microsoft Office',
                'skill-software': 'Application Development',
                'skill-website': 'Website Development',
                'skill-management': 'Team Management',
                'level-expert': 'Expert',
                'level-advanced': 'Advanced',
                'level-intermediate': 'Intermediate',
                'show-more-skills': 'Show More',
                'show-less-skills': 'Hide',
                'all-skills': 'All Skills',
                'learn-more-btn': 'Learn More',
                'show-more-design-projects': 'More Design & Graphics projects',
                'show-less-design-projects': 'Hide Design & Graphics projects',
                
                // Design Projects
                'design-project-1-title': 'Training Module Publication Design (UNICEF)',
                'design-project-1-desc': 'Designing comprehensive training modules for UNICEF and Ministry of Health. A multi-institutional collaboration project that demands design precision, professional layout, and high-quality print results.',
                'design-project-2-title': 'Visual Identity & Branding NHPEO Mandalika 2025',
                'design-project-2-desc': 'Designing complete visual identity for national-scale events. From logos, merchandise (ID cards, lanyards, pens), to massive promotional materials (billboards & stage design) for a cohesive experience.',
                'design-project-3-title': 'Visual Branding & Digital Promotion (Sukma Rasa)',
                'design-project-3-desc': 'Translating culinary essence (savory, spicy, fresh) into "appetite-stimulating" digital poster designs. Focus on dynamic composition and typography to attract purchase interest on digital platforms.',
                'design-project-4-title': 'Menu Book Design & Promotional Materials (Sukma Rasa)',
                'design-project-4-desc': 'End-to-end design project for restaurants. Not only promotional materials, but also designing informative, clear menu books that align with brand visual identity.',
                'design-project-5-title': 'Case Study: Social Media Content & Branding',
                'design-project-5-desc': 'Transforming brand strategy into aesthetic and functional Instagram feeds. This portfolio demonstrates the ability to plan grids, adapt visual styles, and execute engaging designs for various industries.',
                'design-project-6-title': 'Visual Branding & Digital Promotion (Xpectro Club)',
                'design-project-6-desc': 'Responsible for the majority of visual materials for online tutoring platforms. Designing engaging promotional content for social media and user-friendly learning module layouts, working entirely remotely (WFA).',
                'design-project-7-title': 'Brand Identity Poltekkes Mataram Alumni Association',
                'design-project-7-desc': 'Leading rebranding projects for alumni organizations. Creating new visual identities that are modern, professional, and rich in philosophical meaning to reflect alumni values.',
                'design-project-8-title': 'Logo & Visual Identity (AIPTLMI)',
                'design-project-8-desc': 'Executing logo design and brand guidelines for the Indonesian TLM Higher Education Institution Association. The challenge is translating national organizational identity into philosophical and modern symbols.',
                'design-project-9-title': 'Design & Illustration of Exclusive Breastfeeding Pocket Book',
                'design-project-9-desc': 'Collaboration project with Poltekkes that demands dual expertise: designing neat publication layouts while creating original illustrations from scratch to complement educational materials.',
                'design-project-10-title': 'Promotional Materials & Application Guide (KalDu PKV & Lab Health)',
                'design-project-10-desc': 'Designing flyers and user guide banners for digital applications. Focus on user-friendly design, transforming technical application features into visual guides that are easy for ordinary users to follow.',
                
                // Motion Projects
                'motion-project-1-title': '"SADANIS" Educational Animation Video',
                'motion-project-1-desc': 'Led the full production of a 6-minute animation video. Translated complex medical scripts (clinical breast examination) into clear, informative, and easily understandable visuals for a general audience from concept to final.',
                'motion-project-2-title': 'Documentary Video Series (Community Service)',
                'motion-project-2-desc': 'Produced a documentary video series capturing the essence of community empowerment programs. Transformed field activities (Mini Labkes, SIGATBC, Ramuan Rajalom) into powerful and inspiring visual stories.',
                'motion-project-3-title': '"MENJADI" Animation Video (Diabetes Prevention)',
                'motion-project-3-desc': 'Managed the full production cycle for a diabetes education video. Translated complex risk factors and prevention methods into an informative and practical animated storyline for an adult/elderly audience.',
                'motion-project-4-title': '"CERDAS" Animation Video (Flipbook Style)',
                'motion-project-4-desc': 'Managed end-to-end production for an anemia prevention education video. Executed a unique flipbook-style concept from script, storyboard, to a dynamic and engaging final animation.',
                'motion-project-5-title': '"Normal vs. Cesarean Delivery" Animation Video',
                'motion-project-5-desc': 'Researched topics, developed narrative concepts, and wrote scripts for a 3-minute animation video. Used a non-formal language style to empower pregnant women with accurate and balanced information.',
                'motion-project-6-title': '"Healthy Teens are Cool" Educational Video',
                'motion-project-6-desc': 'A 7-minute educational video covering balanced nutrition principles, key dietary messages, to specific calorie needs for adolescents (including iron & folate).',
                'show-more-motion-projects': 'More Motion Graphics & Video projects',
                'show-less-motion-projects': 'Hide Motion Graphics & Video projects',

                // Experience Section
                'experience-title': 'Professional Experience',
                'tools-label': 'Tools',
                'skills-label': 'Skills',
                
                // Experience Titles
                'exp-owner-title': 'Owner / Freelancer',
                'exp-editor-title': 'Editor & Publication Designer',
                'exp-lead-title': 'Lead Designer & IT Co-Coordinator',
                'exp-designer-title': 'Designer & IT Support',
                'exp-production-title': 'Production Staff',
                
                // Experience Descriptions
                'exp-owner-desc': 'Channeling expertise in technology and design for digital solutions. Focusing on projects that utilize all my skills.',
                'exp-editor-desc': 'Editorial design project for "New Antigen Immunization Training Module" - multi-institutional collaboration.',
                'exp-lead-desc': 'Designing visual identity for national events and managing technical aspects (live stream, OBS, videotron).',
                'exp-designer-desc': 'Dual role in visual design and technical support for online learning platform.',
                'exp-production-desc': 'Realizing visual designs according to client desires with various creative media.',
                
                // Experience Periods
                'period-current': 'Present',
                'period-aug-2021-current': 'Aug 2021 - Present',
                'period-unicef': 'May 2025 - Jun 2025',
                'period-nhpeo': '2025',
                'period-xpectro': 'Dec 2023 - Apr 2025',
                'period-spacemed': 'Jul 2022 - Sep 2024',
                
                // Projects
                'stats-subtitle': 'So far has produced as many as:',
                'collaboration-subtitle': 'Has Collaborated with',
                'projects-title': 'Featured Projects',
                'total-design': 'Graphic Design',
                'design-desc': 'Logo, Poster, Banner, Leaflet and other visual materials',
                'total-motion': 'Motion Graphics & Video',
                'motion-desc': 'Animation, Promotional Videos, Motion Graphics and multimedia content',
                'total-software': 'Applications & Website',
                'software-desc': 'Mobile Applications, Websites, Dashboards and digital systems',
                'design-graphics-title': 'Graphic Design',
                'design-graphics-subtitle': 'Creating strong and communicative visual identities',
                'motion-graphics-title': 'Motion Graphics & Video',
                'motion-graphics-subtitle': 'Bringing stories to life through engaging animation and video',
                'apps-website-title': 'Apps & Website',
                'apps-website-subtitle': 'Functional and user-friendly digital solutions',

                // App Projects
                'app-project-1-title': 'UI/UX Redesign & Website (TLM Department)',
                'app-project-1-desc': 'Fully responsible for the end-to-end redesign of the department website. Translated academic needs into a modern, responsive, and functional interface (UI/UX) using HTML, CSS, JavaScript.',
                'app-project-2-title': '"KalDu PKV" Mobile App (Flutter)',
                'app-project-2-desc': 'Designed and built a cardiovascular risk calculator application (WHO model). Focused on a seamless user experience, from an interactive dashboard, intuitive calculator, to personalized smart advice features.',
                'app-project-3-title': '"Lab Health Pocket" Mobile App (Kotlin)',
                'app-project-3-desc': 'Transformed complex lab data into easy-to-read visuals. This app "translates" numbers (cholesterol, blood sugar) into simple interpretations (High, Normal, Low) with practical lifestyle recommendations.',
                'app-project-4-title': '"SIS" Desktop App (Smart Inventory Management)',
                'app-project-4-desc': 'Designed and built a desktop database application (C#) for hospital food inventory management. An efficient digital solution to overcome the complexity of stock recording and tracking.',
                'show-more-apps-projects': 'More Apps & Website projects',
                'show-less-apps-projects': 'Hide Apps & Website projects',
                
                // Contact
                'contact-title': 'Contact Me',
                'contact-description': 'Ready to collaborate on innovative digital projects? Let\'s discuss!',
                'contact-email-label': 'Email',
                'contact-whatsapp-label': 'WhatsApp',
                'contact-website-label': 'Website',
                'email-button': 'Contact via Email',
                'whatsapp-button': 'Contact via WhatsApp',
                'website-button': 'Coming Soon',
                
                // Footer
                'footer-text': '© 2025 Lalu Habib Sasiwimbe. Made with ❤️ to share work and experience.'
            }
        };
        
        // Create loading overlay
        function createLoadingOverlay(targetLang) {
            const overlay = document.createElement('div');
            overlay.id = 'language-loading';
            overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 transition-opacity duration-300';
            
            const loadingText = targetLang === 'en' ? 'Switching to English...' : 'Beralih ke Bahasa Indonesia...';
            
            overlay.innerHTML = `
                <div class="bg-white rounded-2xl p-8 flex items-center gap-4 shadow-2xl">
                    <div class="w-8 h-8 text-blue-600 translate-icon-animate" style="color: #202864;">
                        <svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                        </svg>
                    </div>
                    <span class="text-lg font-medium text-gray-700">${loadingText}</span>
                </div>
            `;
            document.body.appendChild(overlay);
            
            // Trigger fade in
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            return overlay;
        }
        
        function removeLoadingOverlay(overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
        
        function switchLanguage(lang) {
            if (isLanguageSwitching || currentLanguage === lang) return;
            
            isLanguageSwitching = true;
            const loadingOverlay = createLoadingOverlay(lang);
            
            setTimeout(() => {
                currentLanguage = lang;
                
                // Update language buttons with smooth transition
                const langButtons = document.querySelectorAll('[id^="lang-"]');
                langButtons.forEach(btn => {
                    btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    if (btn.id.includes(lang)) {
                        btn.classList.add('text-white');
                        btn.classList.remove('text-gray-600', 'hover:text-blue-600');
                        btn.style.backgroundColor = '#202864';
                    } else {
                        btn.classList.remove('text-white');
                        btn.classList.add('text-gray-600', 'hover:text-blue-600');
                        btn.style.backgroundColor = 'transparent';
                    }
                });
                
                // Update all translatable elements with fade effect
                Object.keys(translations[lang]).forEach(key => {
                    const elements = document.querySelectorAll(`[data-id="${key}"]`);
                    elements.forEach(element => {
                        element.style.transition = 'opacity 0.2s ease-in-out';
                        element.style.opacity = '0';
                        
                        setTimeout(() => {
                            element.textContent = translations[lang][key];
                            element.style.opacity = '1';
                        }, 100);
                    });
                });
                
                // Update all toggle button texts based on current state
                const hiddenSkills = document.getElementById('hidden-skills');
                const isSkillsExpanded = hiddenSkills && hiddenSkills.classList.contains('expanded');
                const skillsToggleText = document.querySelector('#skills-toggle-btn span');
                if (skillsToggleText) {
                    setTimeout(() => {
                        if (isSkillsExpanded) {
                            skillsToggleText.textContent = translations[lang]['show-less-skills'];
                        } else {
                            skillsToggleText.textContent = translations[lang]['show-more-skills'];
                        }
                    }, 100);
                }
                
                // Update design projects toggle
                const hiddenDesignProjects = document.getElementById('design-projects-hidden');
                const isDesignExpanded = hiddenDesignProjects && (hiddenDesignProjects.style.maxHeight && hiddenDesignProjects.style.maxHeight !== '0px');
                const designToggleText = document.querySelector('#design-projects-toggle span');
                if (designToggleText) {
                    setTimeout(() => {
                        if (isDesignExpanded) {
                            designToggleText.textContent = translations[lang]['show-less-design-projects'];
                        } else {
                            designToggleText.textContent = translations[lang]['show-more-design-projects'];
                        }
                    }, 100);
                }
                
                // Update motion projects toggle
                const hiddenMotionProjects = document.getElementById('motion-projects-hidden');
                const isMotionExpanded = hiddenMotionProjects && (hiddenMotionProjects.style.maxHeight && hiddenMotionProjects.style.maxHeight !== '0px');
                const motionToggleText = document.querySelector('#motion-projects-toggle span');
                if (motionToggleText) {
                    setTimeout(() => {
                        if (isMotionExpanded) {
                            motionToggleText.textContent = translations[lang]['show-less-motion-projects'];
                        } else {
                            motionToggleText.textContent = translations[lang]['show-more-motion-projects'];
                        }
                    }, 100);
                }
                
                // Update apps projects toggle
                const hiddenAppsProjects = document.getElementById('apps-projects-hidden');
                const isAppsExpanded = hiddenAppsProjects && (hiddenAppsProjects.style.maxHeight && hiddenAppsProjects.style.maxHeight !== '0px');
                const appsToggleText = document.querySelector('#apps-projects-toggle span');
                if (appsToggleText) {
                    setTimeout(() => {
                        if (isAppsExpanded) {
                            appsToggleText.textContent = translations[lang]['show-less-apps-projects'];
                        } else {
                            appsToggleText.textContent = translations[lang]['show-more-apps-projects'];
                        }
                    }, 100);
                }
                
                // Remove loading overlay and reset flag
                setTimeout(() => {
                    removeLoadingOverlay(loadingOverlay);
                    isLanguageSwitching = false;
                }, 600);
            }, 400);
        }
        
        // Make switchLanguage globally available
        window.switchLanguage = switchLanguage;

        // Initialize Element SDK when available
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }