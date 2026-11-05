const serviceData = [
    "Kanopi Minimalis & Kaca",
    "Pagar Besi Minimalis & Klasik",
    "Gerbang Utama & Perumahan",
    "Teralis Jendela & Pintu",
    "Railing Tangga & Balkon",
    "Tangga Besi & Tangga Putar",
    "Jemuran Besi & Rak Besi",
    "Meja & Kursi Industrial Custom"
];

const icons = ["⌂", "▦", "☲", "⌕", "☷", "⟡", "☱", "❖"];

const materialData = [
    ["Besi Hollow", "Hollow hitam, galvanis, stainless dan berbagai ukuran.", "▣"],
    ["Besi Siku", "Siku sama sisi dan tidak sama sisi untuk rangka dan dudukan.", "∟"],
    ["Besi UNP", "Untuk rangka, dudukan dan konstruksi.", "U"],
    ["Besi CNP", "Untuk rangka atap dan kebutuhan konstruksi.", "C"],
    ["Besi WF", "Wide Flange untuk konstruksi berat.", "W"],
    ["Besi H-Beam", "Untuk struktur bangunan dan konstruksi berat.", "H"],
    ["Besi IWF", "Profil I untuk struktur dan konstruksi.", "I"],
    ["Besi Plat", "Plat hitam, galvanis, bordes, stainless dan strip.", "▤"],
    ["Besi Pipa", "Pipa hitam, galvanis, stainless, kotak dan bulat.", "○"],
    ["Besi Beton", "Polos dan ulir untuk kebutuhan pembesian.", "#"],
    ["Besi Beton Behel", "Untuk kebutuhan pembesian dan struktur.", "⌁"],
    ["Besi As / Round Bar", "Besi bulat solid untuk fabrikasi dan poros.", "●"],
    ["Besi Strip / Flat Bar", "Untuk rangka, ornamen dan dudukan.", "▬"],
    ["Besi Kotak", "Berbagai ukuran untuk rangka dan fabrikasi.", "□"],
    ["Besi T", "Untuk kebutuhan konstruksi dan fabrikasi tertentu.", "T"],
    ["Besi Nako", "Nako polos dan ulir, umum untuk pagar dan ornamen.", "N"],
    ["Besi Ulir", "Untuk ornamen pagar, teralis dan dekorasi.", "≈"],
    ["Besi Cacing", "Untuk beberapa jenis ornamen dan pagar.", "≋"],
    ["Besi Ornamental", "Motif bunga, daun, lingkaran dan ornamen klasik.", "✦"],
    ["Wiremesh", "Lembaran anyaman besi untuk berbagai kebutuhan.", "╳"],
    ["Expanded Metal", "Lembaran metal expanded untuk pagar dan partisi.", "◇"],
    ["Plat Perforated", "Plat berlubang untuk desain dan ventilasi.", "⠿"],
    ["Plat Cutting / Laser Cutting", "Panel desain custom dengan pola potong.", "✧"],
    ["Plat Galvanis", "Lembaran dengan perlindungan galvanis.", "▤"],
    ["Plat Stainless Steel", "Tahan korosi dan cocok untuk finishing premium.", "S"],
    ["Plat Aluminium", "Ringan dan tahan korosi untuk kebutuhan tertentu.", "A"],
    ["Stainless Steel", "Material finishing yang rapi dan tahan korosi.", "SS"],
    ["Galvanis", "Cocok untuk area yang membutuhkan ketahanan korosi.", "G"],
    ["Baja Ringan", "Material ringan untuk rangka tertentu.", "BR"],
    ["Kawat Las / Elektroda", "Consumable untuk proses pengelasan.", "⚡"],
    ["Kawat Las MIG", "Consumable untuk pengelasan MIG.", "⚡"],
    ["Batu Gerinda", "Untuk pemotongan dan penghalusan material.", "◈"],
    ["Cutting Wheel", "Untuk pemotongan besi dan baja.", "◉"],
    ["Mata Bor Besi", "Untuk membuat lubang pada material logam.", "⌁"],
    ["Baut & Mur", "Pengikat untuk berbagai pekerjaan fabrikasi.", "B"],
    ["Dynabolt", "Pengikat ke beton untuk pemasangan tertentu.", "D"],
    ["Engsel", "Komponen untuk pintu, pagar dan gerbang.", "◫"],
    ["Roda Pagar Sliding", "Roda untuk sistem pagar geser.", "○"],
    ["Handle / Gagang Pintu", "Pegangan pintu dan gerbang custom.", "H"],
    ["Kunci Pagar", "Komponen pengunci pagar dan gerbang.", "K"],
    ["Rel Pagar Sliding", "Rel untuk sistem pagar sliding.", "═"]
];

const serviceGrid = document.getElementById('serviceGrid');
if (serviceGrid) {
    serviceData.forEach((name, i) => {
        const el = document.createElement('article');
        el.className = 'service-card';
        el.innerHTML = `<div class="icon">${icons[i % icons.length]}</div><h3>${name}</h3><p>Pengerjaan custom sesuai ukuran dan kebutuhan.</p>`;
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
        el.className = 'material-card';
        el.innerHTML = `<div class="mat-icon">${m[2]}</div><div><h3>${m[0]}</h3><p>${m[1]}</p></div>`;
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