const serviceData = [
    ["Kanopi Minimalis & Kaca", "minimal.jpg"],
    ["Pagar Besi Minimalis & Klasik", "foto1.jpg"],
    ["Gerbang Utama & Perumahan", "foto2.webp"],
    ["Teralis Jendela & Pintu", "foto3.webp"],
    ["Railing Tangga & Balkon", "foto4.webp"],
    ["Tangga Besi & Tangga Putar", "foto5.webp"],
    ["Jemuran Besi & Rak Besi", "foto6.jpg"],
    ["Meja & Kursi Industrial Custom", "foto7.webp"]
];

const materialData = [
    ["Besi Hollow", "Hollow hitam, galvanis, stainless dan berbagai ukuran.", "holo.jpg"],
    ["Besi Siku", "Siku sama sisi dan tidak sama sisi untuk rangka dan dudukan.", "siku.jpg"],
    ["Besi UNP", "Untuk rangka, dudukan dan konstruksi.", "Besi UNP.png"],
    ["Besi CNP", "Untuk rangka atap dan kebutuhan konstruksi.", "Besi CNP.jpg"],
    ["Besi WF", "Wide Flange untuk konstruksi berat.", "Besi WF.webp"],
    ["Besi H-Beam", "Untuk struktur bangunan dan konstruksi berat.", "h-beam.webp"],
    ["Besi IWF", "Profil I untuk struktur dan konstruksi.", "Besi IWF.jpg"],
    ["Besi Plat", "Plat hitam, galvanis, bordes, stainless dan strip.", "platt.avif"],
    ["Besi Pipa", "Pipa hitam, galvanis, stainless, kotak dan bulat.", "pipa.jpg"],
    ["Besi Beton", "Polos dan ulir untuk kebutuhan pembesian.", "besi beton.webp"],
    ["Besi Beton Behel", "Untuk kebutuhan pembesian dan struktur.", "Besi Beton Behel.jpg"],
    ["Besi As / Round Bar", "Besi bulat solid untuk fabrikasi dan poros.", "besi as.jpg"],
    ["Besi Strip / Flat Bar", "Untuk rangka, ornamen dan dudukan.", "besi st.jpg"],
    ["Besi Kotak", "Berbagai ukuran untuk rangka dan fabrikasi.", "besi kotak.jpg"],
    ["Besi T", "Untuk kebutuhan konstruksi dan fabrikasi tertentu.", "t.webp"],
    ["Besi Nako", "Nako polos dan ulir, umum untuk pagar dan ornamen.", "besi-nako.jpg"],
    ["Besi Ulir", "Untuk ornamen pagar, teralis dan dekorasi.", "besi-ulir.jpg"],
    ["Besi Cacing", "Untuk beberapa jenis ornamen dan pagar.", "besi-cacing.jpeg"],
    ["Besi Ornamental", "Motif bunga, daun, lingkaran dan ornamen klasik.", "besi-ornamental.webp"],
    ["Wiremesh", "Lembaran anyaman besi untuk berbagai kebutuhan.", "wire.jpg"],
    ["Expanded Metal", "Lembaran metal expanded untuk pagar dan partisi.", "expanded-metal.jpeg"],
    ["Plat Perforated", "Plat berlubang untuk desain dan ventilasi.", "plat-perforated.jpg"],
    ["Plat Cutting / Laser Cutting", "Panel desain custom dengan pola potong.", "plat-cutting.jpg"],
    ["Plat Galvanis", "Lembaran dengan perlindungan galvanis.", "plat-galvanis.jpg"],
    ["Plat Stainless Steel", "Tahan korosi dan cocok untuk finishing premium.", "plat-stainless.jpg"],
    ["Plat Aluminium", "Ringan dan tahan korosi untuk kebutuhan tertentu.", "plat-aluminium.webp"],
    ["Stainless Steel", "Material finishing yang rapi dan tahan korosi.", "stainless-steel.jpg"],
    ["Galvanis", "Cocok untuk area yang membutuhkan ketahanan korosi.", "galvanis.png"],
];

const serviceGrid = document.getElementById('serviceGrid');
if (serviceGrid) {
    serviceData.forEach(item => {
        const el = document.createElement('article');
        el.className = 'service-card'; // Menggunakan layout card terpadu (foto dan teks menyatu)
        el.innerHTML = `
            <div class="service-img">
                <img src="foto/${item[1]}" alt="${item[0]}" onerror="this.src='foto/logo.png'" loading="lazy">
            </div>
            <div class="service-content">
                <h3>${item[0]}</h3>
                <p>Pengerjaan custom sesuai ukuran dan kebutuhan.</p>
            </div>
        `;
        serviceGrid.appendChild(el);
    });
}

const galleryGrid = document.getElementById('galleryGrid'),
      search = document.getElementById('gallerySearch'),
      filter = document.getElementById('galleryFilter'),
      loadMore = document.getElementById('loadMore');

const galleryCards = galleryGrid ? Array.from(galleryGrid.querySelectorAll('.gallery-card')) : [];
let shown = 12;

function renderGallery() {
    if (!galleryGrid) return;
    const q = search ? search.value.toLowerCase().trim() : '';
    const f = filter ? filter.value : 'all';
    let visibleCount = 0;
    let currentShown = 0;

    galleryCards.forEach(card => {
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        const category = card.dataset.category || '';
        const keywords = ((card.dataset.keywords || '') + ' ' + title.toLowerCase() + ' ' + category.toLowerCase());
        
        const matchesKeyword = !q || keywords.includes(q);
        const matchesCategory = (f === 'all') || (category.toLowerCase() === f.toLowerCase());
        const matches = matchesKeyword && matchesCategory;

        if (matches) {
            visibleCount++;
            if (visibleCount <= shown) {
                card.hidden = false;
                currentShown++;
            } else {
                card.hidden = true;
            }
        } else {
            card.hidden = true;
        }
    });

    if (loadMore) {
        loadMore.style.display = (visibleCount > currentShown) ? 'block' : 'none';
    }
}

galleryCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        const category = card.dataset.category || '';
        const img = card.querySelector('img');
        if (img) {
            openModal([title, category], img.src);
        }
    });
});

if (search) search.addEventListener('input', () => { shown = 12; renderGallery(); });
if (filter) filter.addEventListener('change', () => { shown = 12; renderGallery(); });
if (loadMore) loadMore.addEventListener('click', () => { shown += 12; renderGallery(); });

renderGallery();

const materialGrid = document.getElementById('materialGrid');
if (materialGrid) {
    materialData.forEach(m => {
        const el = document.createElement('article');
        el.className = 'service-card'; // Menggunakan class service-card yang sama agar tampilan dan struktur persis dengan bagian Jasa
        el.innerHTML = `
            <div class="service-img">
                <img src="foto/${m[2]}" alt="${m[0]}" onerror="this.src='foto/logo.png'" loading="lazy">
            </div>
            <div class="service-content">
                <h3>${m[0]}</h3>
                <p>${m[1]}</p>
            </div>
        `;
        materialGrid.appendChild(el);
    });
}

const modal = document.getElementById('galleryModal'),
      modalImage = document.getElementById('modalImage'),
      modalTitle = document.getElementById('modalTitle'),
      modalCategory = document.getElementById('modalCategory');

function openModal(item, img) {
    if (!modal) return;
    modalImage.src = img;
    modalImage.alt = item[0];
    modalTitle.textContent = item[0];
    modalCategory.textContent = item[1].toUpperCase();
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

const modalClose = document.getElementById('modalClose');
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

const menuToggle = document.getElementById('menuToggle'),
      navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

function updateClock() {
    const now = new Date();
    const liveDate = document.getElementById('liveDate');
    const liveClock = document.getElementById('liveClock');
    const year = document.getElementById('year');

    if (liveDate) liveDate.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    if (liveClock) liveClock.textContent = now.toLocaleTimeString('id-ID', { hour12: false });
    if (year) year.textContent = now.getFullYear();
}
updateClock();
setInterval(updateClock, 1000);