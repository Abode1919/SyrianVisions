
document.addEventListener('DOMContentLoaded', function () {window.setTimeout(document.querySelector('svg').classList.add('animated'),1000);})

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const langToggle = document.getElementById('langToggle');

  // Hent språk frå localStorage eller HTML-attributt
  let currentLang = localStorage.getItem('lang') || html.getAttribute('lang') || 'ar';

  function applyLang(lang) {
    currentLang = lang;
    html.lang = lang;
    html.dir  = (lang === 'ar') ? 'rtl' : 'ltr';

    // Oppdater toggle
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Oppdater all tekst med data-ar/data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
      const text = (lang === 'ar') ? el.dataset.ar : el.dataset.en;
      if (!text) return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'TITLE') {
        document.title = text; // støtt dynamisk <title>
      } else {
        el.textContent = text;
      }
    });

    // Lagre valet – gjeld for alle sider
    localStorage.setItem('lang', lang);
  }

  // Kjør ved sideinnlasting
  applyLang(currentLang);

  // Klikk på språk-knappen
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLang(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  // Mobile Menu Toggle (robust mot manglande element)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks && mobileMenuBtn) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  });
});

        // Form Handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `مرحبا، اسمي ${name}%0A%0Aالبريد الإلكتروني: ${email}%0A%0Aالرسالة: ${message}`;
            const whatsappUrl = `https://wa.me/963900000000?text=${whatsappMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
        });

        // Floating Label Animation
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check if field has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });



                // ---- Work: filter buttons ----
        (function(){
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            grid.querySelectorAll('.portfolio-item').forEach(card => {
                card.style.display = (f === 'all' || card.dataset.category === f) ? '' : 'none';
            });
            });
        });
        })();

        // ---- Simple lightbox ----
(function () {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  const imgEl = document.getElementById('lightboxImg');
  const closeBtn = modal.querySelector('.lightbox-close');

  function openLightbox(src) {
    // last først i minne
    const tmp = new Image();
    tmp.onload = () => {
      imgEl.src = src;
      modal.hidden = false;
    };
    tmp.onerror = () => {
      console.warn('Lightbox image not found:', src);
      alert('Could not load image.');
    };
    tmp.src = src;
  }

  function closeLightbox() {
    modal.hidden = true;
    imgEl.src = '';
  }

  document.querySelectorAll('a.lightbox').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const src = a.getAttribute('href');
      if (src) openLightbox(src);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', e => { if (e.target === modal) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();




