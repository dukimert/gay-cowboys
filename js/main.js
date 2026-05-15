/* ============================================
   GAY COWBOYS — Ana JavaScript
   Blackwing × Vintage
   ============================================ */

// ============================
// AYAR — WhatsApp numarası
// ============================
// Burayı kendi WhatsApp numaranla değiştir.
// Format: ülke kodu + numara (başında + yok, boşluk yok).
// Türkiye örneği: +90 555 123 45 67 → 905551234567
const WA_PHONE = '905551234567';

// ============================
// ÜRÜN VERİSİ
// collection: 'bw' (Blackwing) veya 'vc' (Vintage)
// type3d:    primitif fallback tipi ('jacket', 'hat', 'sunglasses',
//            'armband', 'boots', 'gloves', 'watch')
// color:     primitif rengin hex sayısı
// era:       parçanın çağı/yılı
// story:     parçanın hikayesi (italik kutu)
// model:     OPSİYONEL — gerçek 3D model yolu (örn: 'models/g1-jacket.glb')
//            tanımlıysa primitif yerine GLB yüklenir
// ============================
const PRODUCTS = [
    // ===== BLACKWING (savaş görmüş, tarih yaşamış) =====
    {
        id: 1, code: 'BW-01-OFC',
        collection: 'bw',
        name: 'Subay Kepi',
        category: 'Şapka',
        era: '1952 · Üretim Çağı',
        price: 1290, oldPrice: null,
        tag: 'BULUNDU',
        color: 0x1a1a1a,
        type3d: 'hat',
        story: 'Eski bir Doğu Avrupa askeri deposunun arka rafında bulundu. Sert kron yapısı yıllarca formunu korumuş. Astar değiştirildi, geri kalan her şey orijinal.',
        desc: 'Sert kronlu klasik subay kepi. Cilalı siper, dokuma yün gövde, pirinç kasnak. Yarım yüzyılı aşkın yaşına rağmen formu kusursuz. Müzelik kalitede, tek parça.',
        specs: [
            { label: 'Çağ', value: '1952 · Üretim · Tahmini' },
            { label: 'Kumaş', value: 'Yün serj, orijinal' },
            { label: 'Durum', value: 'Mükemmel · Restore edildi' },
            { label: 'Beden', value: '57-58 (M)' }
        ]
    },
    {
        id: 2, code: 'BW-02-GRC',
        collection: 'bw',
        name: 'Greatcoat',
        category: 'Palto',
        era: '1940s · Saha İzli',
        price: 8990, oldPrice: 10990,
        tag: 'RARE',
        color: 0x141414,
        type3d: 'jacket',
        model: 'models/midnight-command.glb',
        story: 'Bir antika tüccarının çatı katındaki bavulundan çıktı. İç astarda bir isim ve rütbe işaret kayıt edilmiş — sahibinin kim olduğunu bilmiyoruz. Yumuşamış yün, dokunduğunda zamanı hissettiren bir parça.',
        desc: 'Çift sıra düğme, geniş yaka, uzun kesim. Yıllar boyunca kumaşı yumuşamış, dokusu zenginleşmiş. Bir devre tanıklık etmiş bir parça — replica değil, gerçek.',
        specs: [
            { label: 'Çağ', value: '1940s · WWII dönemi' },
            { label: 'Kumaş', value: '%100 yün melton, orijinal' },
            { label: 'Astar', value: 'Saten viskon · Restore' },
            { label: 'Beden', value: '52 (L) · İtalyan ölçü' }
        ]
    },
    {
        id: 3, code: 'BW-03-BRS',
        collection: 'bw',
        name: 'Brassard',
        category: 'Kol Bandı',
        era: '1968 · Otantik',
        price: 590, oldPrice: null,
        tag: 'OTANTİK',
        color: 0x1f1f1f,
        type3d: 'armband',
        story: 'Bir koleksiyonerin sandığından çıkan tek parça. Kumaşta hafif solma, pirinç tokada vintage oksitleme — yıllarca takılmadan beklemiş, ama yaşamış.',
        desc: 'Vintage keten kol bandı. Pirinç kopça orijinal. Kumaşta dönemin patinası, dokumada el işi. Ceket veya gömlek üzerine, gerçek bir tarihi aksesuar.',
        specs: [
            { label: 'Çağ', value: '1968 · Tahmini' },
            { label: 'Malzeme', value: 'Yıkanmış keten + orijinal pirinç' },
            { label: 'Durum', value: 'İyi · Otantik patina' },
            { label: 'Ölçü', value: 'Ayarlanabilir 28-44 cm' }
        ]
    },
    {
        id: 4, code: 'BW-04-M65',
        collection: 'bw',
        name: 'M-65 Field',
        category: 'Ceket',
        era: '1965 · Stok Bulundu',
        price: 5290, oldPrice: null,
        tag: 'STOK',
        color: 0x1a1a1a,
        type3d: 'jacket',
        story: 'Bir Avrupa askeri ihale deposunda 50 yıl beklemiş, hiç giyilmemiş new-old-stock parça. Etiketi hâlâ üstünde. Bu tip ceketler artık böyle saf halde bulunmuyor.',
        desc: '1965 üretim M-65 field ceket — orijinal silüette. Dört kapaklı cep, ayarlanabilir bel ve kollar, gizli kapüşon. NOS (yeni eski stok) — hiç giyilmemiş.',
        specs: [
            { label: 'Çağ', value: '1965 · NOS' },
            { label: 'Kumaş', value: 'Pamuk-naylon karışım, orijinal' },
            { label: 'Cep', value: '4 kapaklı + 2 iç' },
            { label: 'Beden', value: 'M-R · Regular' }
        ]
    },
    {
        id: 5, code: 'BW-05-CMB',
        collection: 'bw',
        name: 'Combat Bot',
        category: 'Ayakkabı',
        era: '1970s · Yüklü Tarih',
        price: 4890, oldPrice: null,
        tag: 'RESTORE',
        color: 0x141414,
        type3d: 'boots',
        story: 'Eski bir asker babaannenin bavulundan miras kalan parça. Derisi yumuşamış, formu mükemmel oturmuş. Taban tamamen yenilendi, üstü dönemin ruhunu taşıyor.',
        desc: 'Yıllara meydan okumuş gerçek deri combat bot. Üst kısım orijinal, taban yeni Vibram. 8 göz bağcık dizilimi, klasik silüet. Karakter sahibi.',
        specs: [
            { label: 'Çağ', value: '1970s · Üst orijinal' },
            { label: 'Üst', value: 'Tam tahıllı dana derisi, vintage' },
            { label: 'Taban', value: 'Vibram®, yenilendi' },
            { label: 'Beden', value: 'EU 43' }
        ]
    },
    {
        id: 6, code: 'BW-06-FCP',
        collection: 'bw',
        name: 'Saha Şapkası',
        category: 'Şapka',
        era: '1958 · NOS',
        price: 1490, oldPrice: null,
        tag: 'TEK',
        color: 0x1c1c1c,
        type3d: 'hat',
        story: 'Bir Doğu Bloku askeri ihalesinde fark ettiğimiz son parça. Etiketinde üretim tarihi: 1958. Hiç giyilmemiş, depo izi taşıyan otantik bir kep.',
        desc: 'Klasik saha kepi — sert siper, ayarlanabilir arka bant. Hiç giyilmemiş, 1958 üretim. Bu döneme ait gerçek bir parça, replikası değil.',
        specs: [
            { label: 'Çağ', value: '1958 · NOS' },
            { label: 'Kumaş', value: 'Yün serj, orijinal' },
            { label: 'Durum', value: 'Yepyeni · Etiketli' },
            { label: 'Beden', value: '58 (M-L)' }
        ]
    },

    // ===== VINTAGE (80'ler, Vice City era) =====
    {
        id: 7, code: 'VC-01-G1',
        collection: 'vc',
        name: 'G-1 Navy Flight',
        category: 'Ceket',
        era: '1986 · Top Gun Era',
        price: 12900, oldPrice: null,
        tag: 'EFSANE',
        color: 0x6e4a2a,
        type3d: 'jacket',
        model: 'models/aviator-leather.glb',
        story: 'Bir emekli Donanma pilotunun gardırobundan satışa çıktı. 1986\'da üretilmiş, Top Gun filminin yayınlandığı yıl. Derisi yıllarca yumuşamış, kürk yaka hâlâ tüm görkeminde.',
        desc: 'Maverick döneminden gerçek bir G-1 — 1986 orijinal. Koyun derisi, gerçek koyun postu yaka, donanma standardı astar. 40 yıllık karakteri ve hikayesiyle.',
        specs: [
            { label: 'Çağ', value: '1986 · Vintage orijinal' },
            { label: 'Deri', value: 'Koyun derisi, dönemin işçiliği' },
            { label: 'Yaka', value: 'Gerçek koyun postu' },
            { label: 'Beden', value: 'US 42 (M-L)' }
        ]
    },
    {
        id: 8, code: 'VC-02-A2',
        collection: 'vc',
        name: 'A-2 Bomber',
        category: 'Ceket',
        era: '1944 · WWII Pilot',
        price: 18900, oldPrice: 21900,
        tag: 'KOLEKSİYON',
        color: 0x6b4a2a,
        type3d: 'jacket',
        story: 'Bu A-2 bir savaş gazisinin oğlundan alındı. Sağ omuzda solmuş bir squadron patch izi var — patch sökülmüş ama dikiş izi kalmış. 80 yıllık otantik bir parça.',
        desc: '1944 üretim orijinal A-2 — WWII döneminden gerçek pilot ceketi. Deride yıllar boyu oluşmuş otantik patina, örme yaka ve cuff yumuşamış. Tarihi taşıyan müzelik parça.',
        specs: [
            { label: 'Çağ', value: '1944 · WWII orijinal' },
            { label: 'Deri', value: 'Antika işlem dana derisi' },
            { label: 'İz', value: 'Solmuş squadron patch izi' },
            { label: 'Beden', value: '38 (S-M)' }
        ]
    },
    {
        id: 9, code: 'VC-03-MA1',
        collection: 'vc',
        name: 'MA-1 Bomber',
        category: 'Ceket',
        era: '1989 · Cold War',
        price: 4290, oldPrice: null,
        tag: 'OTANTİK',
        color: 0x2a2a26,
        type3d: 'jacket',
        story: '80\'lerin sonunda üretilmiş orijinal MA-1. Naylonda hafif solma, manşet rib bandında kullanım izi — gerçek bir pilot ceketinin işareti. Reversible turuncu astarı kusursuz.',
        desc: 'Soğuk Savaş döneminin son partilerinden orijinal MA-1. Su geçirmez naylon, turuncu acil astar (geri çevrilebilir). Üzerinde dönemin nefesi.',
        specs: [
            { label: 'Çağ', value: '1989 · Geç dönem orijinal' },
            { label: 'Dış', value: 'MIL-spec naylon, vintage' },
            { label: 'Astar', value: 'Acil turuncu, orijinal' },
            { label: 'Beden', value: 'M · Regular' }
        ]
    },
    {
        id: 10, code: 'VC-04-AVT',
        collection: 'vc',
        name: 'Aviator',
        category: 'Gözlük',
        era: '1983 · Sunset Era',
        price: 2890, oldPrice: null,
        tag: 'TEK',
        color: 0xc8a060,
        type3d: 'sunglasses',
        story: 'Bir antika dükkanından kurtarılan tek parça. Altın kaplamada minik aşınma izleri, G-15 camlarda hiç çizik yok. Yıllarca bir orijinal kutuda saklanmış.',
        desc: '1980\'lerin altın kaplama aviator gözlüğü. Polarize G-15 camlar, klasik damla kesim. Vice City\'nin sokaklarında dolaşan bir parça. Gerçek 80\'ler — replica değil.',
        specs: [
            { label: 'Çağ', value: '1983 · Vintage orijinal' },
            { label: 'Çerçeve', value: 'Pirinç + altın kaplama' },
            { label: 'Cam', value: 'Polarize G-15, orijinal' },
            { label: 'Durum', value: 'Mükemmel · Hafif patina' }
        ]
    },
    {
        id: 11, code: 'VC-05-PLT',
        collection: 'vc',
        name: 'Pilot Eldiveni',
        category: 'Aksesuar',
        era: '1976 · NOS',
        price: 1890, oldPrice: null,
        tag: 'NOS',
        color: 0x4a2a1a,
        type3d: 'gloves',
        story: 'Bir Fransız havayolu deposunun temizliği sırasında ortaya çıkan parti. 1976 üretim, hiç kullanılmamış. Kuzu derisi henüz dönemin yumuşaklığında.',
        desc: '1976 üretim NOS pilot eldiveni. Kuzu derisi, kısa cuff, snap kapama. Vintage perfore tasarım. Hiç giyilmemiş — depo izi taşıyan otantik dönem parçası.',
        specs: [
            { label: 'Çağ', value: '1976 · NOS' },
            { label: 'Deri', value: 'Kuzu derisi, dönem işçiliği' },
            { label: 'Astar', value: 'İpek touch örme, orijinal' },
            { label: 'Beden', value: '8.5 (M)' }
        ]
    },
    {
        id: 12, code: 'VC-06-BUR',
        collection: 'vc',
        name: 'B-Uhr Pilot Saat',
        category: 'Saat',
        era: '1944 · Almanya',
        price: 28900, oldPrice: null,
        tag: 'NADİR',
        color: 0xa0a0a8,
        type3d: 'watch',
        story: 'İsviçreli bir koleksiyoncudan satın alındı. 1944 üretim Beobachtungsuhr — gözlemci saati. Pilot saati efsanesi. Mekanizma 80 yaşında ve hâlâ orijinal çalışıyor.',
        desc: '1944 yapımı orijinal B-Uhr — pilot saatlerinin atası. 42mm fırçalı çelik kasa, büyük kadran, orijinal mekanik kalibre. Müzelik koleksiyon parçası.',
        specs: [
            { label: 'Çağ', value: '1944 · Almanya orijinal' },
            { label: 'Mekanizma', value: 'Orijinal manuel kurmalı' },
            { label: 'Kasa', value: '42mm fırçalı çelik' },
            { label: 'Servis', value: '2024\'te tam servisten geçti' }
        ]
    }
];

// ============================
// Yardımcılar
// ============================
function waUrl(message) {
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

function formatPrice(n) {
    return n.toLocaleString('tr-TR');
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// ============================
// SVG Ürün İkonu
// ============================
function productIcon(type) {
    const svgs = {
        jacket: '<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M30 15 L40 10 L50 14 L60 10 L70 15 L80 25 L82 50 L70 55 L70 120 L30 120 L30 55 L18 50 L20 25 Z"/><path d="M50 14 L50 70"/><path d="M40 50 L40 60 L48 60"/><path d="M60 50 L60 60 L52 60"/><circle cx="50" cy="30" r="1.5" fill="currentColor"/><circle cx="50" cy="45" r="1.5" fill="currentColor"/></svg>',
        hat: '<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="50" cy="55" rx="42" ry="8"/><path d="M30 50 Q30 25 50 22 Q70 25 70 50"/><path d="M28 50 L72 50"/><path d="M30 45 L70 45" stroke-width="0.6"/><rect x="46" y="35" width="8" height="3" fill="currentColor"/></svg>',
        sunglasses: '<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="35" cy="30" rx="22" ry="18"/><ellipse cx="85" cy="30" rx="22" ry="18"/><path d="M57 25 L63 25"/><path d="M57 30 L63 30"/><path d="M13 28 L4 22"/><path d="M107 28 L116 22"/></svg>',
        armband: '<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="50" cy="40" rx="35" ry="18"/><path d="M15 40 Q15 60 50 60 Q85 60 85 40"/><circle cx="50" cy="40" r="6" fill="currentColor"/><path d="M50 30 L50 50" stroke-width="0.5"/></svg>',
        boots: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M25 20 L25 70 L20 80 L60 80 L60 70 L45 65 L45 20 Z"/><path d="M58 78 L62 78"/><path d="M28 30 L42 30 M28 38 L42 38 M28 46 L42 46 M28 54 L42 54"/><circle cx="35" cy="30" r="1" fill="currentColor"/><circle cx="35" cy="38" r="1" fill="currentColor"/><circle cx="35" cy="46" r="1" fill="currentColor"/></svg>',
        gloves: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M30 30 L30 75 L70 75 L70 45 L65 45 L65 25 L60 25 L60 45 L55 45 L55 20 L50 20 L50 45 L45 45 L45 23 L40 23 L40 45 L35 45 L35 30 Z"/><path d="M30 78 L70 78 L70 90 L30 90 Z"/></svg>',
        watch: '<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="28" y="0" width="24" height="25"/><rect x="28" y="85" width="24" height="25"/><circle cx="40" cy="55" r="26"/><circle cx="40" cy="55" r="22" stroke-width="0.6"/><path d="M40 38 L40 55 L50 60"/><circle cx="40" cy="55" r="1.5" fill="currentColor"/><text x="40" y="42" font-size="4" fill="currentColor" stroke="none" text-anchor="middle" font-family="monospace">XII</text></svg>'
    };
    return svgs[type] || svgs.jacket;
}

// ============================
// Ürün Kartı
// ============================
function createProductCard(product) {
    const card = document.createElement('a');
    card.className = 'product-card';
    card.href = `urun.html?id=${product.id}`;
    card.dataset.id = product.id;

    let tagHtml = '';
    if (product.tag) {
        let cls = 'era';
        if (['BULUNDU', 'NOS', 'STOK', 'TEK', 'RESTORE'].includes(product.tag)) cls = 'rare';
        else if (['EFSANE', 'NADİR', 'KOLEKSİYON'].includes(product.tag)) cls = 'found';
        tagHtml = `<div class="product-tag ${cls}">${product.tag}</div>`;
    }

    const colorHex = '#' + product.color.toString(16).padStart(6, '0');
    const collectionColor = product.collection === 'bw' ? 'var(--bw-gold)' : 'var(--vc-magenta)';

    card.innerHTML = `
        <div class="product-image">
            ${tagHtml}
            <div class="product-3d-badge" title="3D Önizleme">3D</div>
            <div class="product-image-inner" style="background: radial-gradient(circle at 30% 30%, ${colorHex}33 0%, transparent 60%), linear-gradient(135deg, ${colorHex}1a 0%, transparent 80%);">
                <div class="product-svg" style="color: ${collectionColor};">${productIcon(product.type3d)}</div>
            </div>
        </div>
        <div class="product-meta">
            <div class="product-code">// ${product.code}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-era">${product.era}</div>
            <div class="product-price">
                <span><span class="currency">₺</span>${formatPrice(product.price)}</span>
                <span class="product-action">İncele →</span>
            </div>
        </div>
    `;

    return card;
}

// ============================
// Sayfa Yükleyiciler
// ============================
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    const featured = [
        ...PRODUCTS.filter(p => p.collection === 'bw').slice(0, 3),
        ...PRODUCTS.filter(p => p.collection === 'vc').slice(0, 3)
    ];
    featured.forEach(p => container.appendChild(createProductCard(p)));
}

function loadCollectionProducts(collection, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = PRODUCTS.filter(p => p.collection === collection);
    items.forEach((p, i) => {
        const card = createProductCard(p);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.08}s`;
        container.appendChild(card);

        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });
}

function loadRelatedProducts(currentProduct) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    const related = PRODUCTS
        .filter(p => p.collection === currentProduct.collection && p.id !== currentProduct.id)
        .slice(0, 4);

    related.forEach(p => container.appendChild(createProductCard(p)));
}

// ============================
// Ürün Detay Sayfası
// ============================
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')) || 7;

    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

    document.title = `${product.name} — GAY COWBOYS`;

    setText('pCode', `// ${product.code}`);
    setText('pName', product.name);
    setText('pEra', `// ${product.era}`);
    setText('pStory', product.story);
    setText('pPrice', formatPrice(product.price));
    setText('pDesc', product.desc);
    setText('hudCode', product.code);

    if (product.oldPrice) {
        const oldEl = document.getElementById('pPriceOld');
        if (oldEl) {
            oldEl.textContent = `${formatPrice(product.oldPrice)} ₺`;
            oldEl.style.display = '';
        }
    }

    const specsEl = document.getElementById('pSpecs');
    if (specsEl && product.specs) {
        specsEl.innerHTML = product.specs.map(s =>
            `<div class="spec-row"><span class="spec-label">${s.label}</span><span class="spec-value">${s.value}</span></div>`
        ).join('');
    }

    // WhatsApp sipariş butonu
    const orderBtn = document.getElementById('orderWaBtn');
    if (orderBtn) {
        const msg = `Merhaba, "${product.name}" (${product.code} · ${product.era}) ürününü sipariş vermek istiyorum.\n\nÜrün linki: ${window.location.href}`;
        orderBtn.href = waUrl(msg);
        orderBtn.target = '_blank';
    }

    // Paylaş butonu
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const url = window.location.href;
            const shareData = {
                title: `${product.name} — GAY COWBOYS`,
                text: `${product.name} · ${product.era}`,
                url: url
            };

            // Modern Web Share API (mobil için ideal)
            if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
                try {
                    await navigator.share(shareData);
                    return;
                } catch (e) {
                    // İptal edildiyse devam et
                }
            }

            // Fallback: clipboard'a kopyala
            try {
                await navigator.clipboard.writeText(url);
                showToast('★ Link kopyalandı');
            } catch (e) {
                // Eski tarayıcılar için fallback
                const ta = document.createElement('textarea');
                ta.value = url;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast('★ Link kopyalandı');
            }
        });
    }

    // 3D Viewer
    const viewerEl = document.getElementById('viewer3d');
    if (viewerEl && window.ArsivViewer) {
        const viewer = window.ArsivViewer.create(viewerEl, {
            productType: product.type3d,
            color: product.color,
            modelUrl: product.model || null
        });

        const rotateBtn = document.getElementById('viewerRotateBtn');
        const resetBtn = document.getElementById('viewerResetBtn');
        const zoomInBtn = document.getElementById('viewerZoomInBtn');
        const zoomOutBtn = document.getElementById('viewerZoomOutBtn');

        if (rotateBtn) rotateBtn.addEventListener('click', () => {
            const on = viewer.toggleAutoRotate();
            rotateBtn.textContent = on ? 'Döndürmeyi Durdur' : 'Otomatik Döndür';
        });
        if (resetBtn) resetBtn.addEventListener('click', () => viewer.reset());
        if (zoomInBtn) zoomInBtn.addEventListener('click', () => viewer.zoomIn());
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => viewer.zoomOut());
    }

    loadRelatedProducts(product);
}

function showToast(text) {
    const toast = document.getElementById('shareToast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ============================
// Ana sayfa 3D Viewer (G-1 önizleme)
// ============================
function loadHomeViewer() {
    const homeViewer = document.getElementById('viewer3dHome');
    if (homeViewer && window.ArsivViewer) {
        const previewProduct = PRODUCTS.find(p => p.id === 7) || PRODUCTS[0];
        window.ArsivViewer.create(homeViewer, {
            productType: previewProduct.type3d,
            color: previewProduct.color,
            modelUrl: previewProduct.model || null
        });
    }
}

// ============================
// WhatsApp Linkleri
// ============================
function setupWhatsAppLinks() {
    document.querySelectorAll('.wa-link').forEach(el => {
        // Eğer href elle set edildiyse (ürün detayı vs.), dokunma
        if (el.id === 'orderWaBtn') return;
        const msg = el.dataset.message || 'Merhaba, bilgi almak istiyorum.';
        el.href = waUrl(msg);
        el.target = '_blank';
        el.rel = 'noopener';
    });
}

// ============================
// Mobil menü
// ============================
function setupMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// ============================
// Header scroll efekti
// ============================
function setupHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================
// Scroll Reveal
// ============================
function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ============================
// Beden Seçici
// ============================
function setupSizeSelector() {
    document.querySelectorAll('.size').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.size').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });
}

// ============================
// Diagonal Hero — Mouse-X bazlı geçiş
// Ekranı tam ortadan ikiye böler;
// imleç hangi yarıdaysa o taraf aktif olur.
// ============================
function setupDiagonalHover() {
    const hero = document.querySelector('.diagonal-hero');
    if (!hero) return;

    let active = null;

    function update(e) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left;
        const mid = rect.width / 2;
        const next = x < mid ? 'bw' : 'vc';
        if (next === active) return;
        active = next;
        hero.classList.toggle('bw-active', next === 'bw');
        hero.classList.toggle('vc-active', next === 'vc');
    }

    function clear() {
        active = null;
        hero.classList.remove('bw-active', 'vc-active');
    }

    hero.addEventListener('mousemove', update);
    hero.addEventListener('mouseleave', clear);
}

// ============================
// İletişim Formu
// ============================
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const success = document.getElementById('formSuccess');
        if (success) {
            success.classList.add('show');
            form.reset();
            setTimeout(() => success.classList.remove('show'), 5000);
        }
    });
}

// ============================
// Başlat
// ============================
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupHeaderScroll();
    setupScrollReveal();
    setupSizeSelector();
    setupContactForm();
    setupWhatsAppLinks();
    setupDiagonalHover();

    if (document.getElementById('featuredProducts')) loadFeaturedProducts();
    if (document.getElementById('tacticalProducts')) loadCollectionProducts('bw', 'tacticalProducts');
    if (document.getElementById('aviatorProducts')) loadCollectionProducts('vc', 'aviatorProducts');
    if (document.getElementById('viewer3d')) loadProductDetail();
    if (document.getElementById('viewer3dHome')) loadHomeViewer();
});
