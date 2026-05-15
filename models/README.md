# 3D Modeller — GAY COWBOYS

Bu klasör, ürünlere bağlanacak 3D model dosyalarını (.glb) içerir.

## Nasıl yeni 3D model eklerim?

### 1. GLB dosyanı buraya at
Örnek: `g1-jacket.glb` dosyasını `models/` klasörüne kopyala.

### 2. `js/main.js` içinde ilgili ürüne bağla
İlgili ürünün objesine `model:` satırı ekle. Örnek:

```js
{
    id: 7, code: 'VC-01-G1',
    collection: 'vc',
    name: 'G-1 Navy Flight',
    // ... diğer alanlar ...
    model: 'models/g1-jacket.glb'   // ← Bu satırı ekle
}
```

### 3. Kaydet, tarayıcıyı yenile
Site otomatik o ürün için gerçek 3D modeli yükler. Yükleme bitene kadar
dönen bir torus gösterir. `model` alanı yoksa veya yükleme başarısız
olursa primitif placeholder gösterilmeye devam eder — site kırılmaz.

## GLB dosyaları nereden bulurum?

### Ücretsiz (CC0 / kullanım hakkı serbest)
- **Sketchfab** — https://sketchfab.com/search?features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b — sadece CC0 modelleri
- **Polyhaven** — https://polyhaven.com/models — tamamen ücretsiz, çoğu mimari/doğa odaklı
- **Free3D** — https://free3d.com — kıyafet modelleri var ama lisans dikkat et
- **TurboSquid Free** — https://www.turbosquid.com/Search/3D-Models/free

### Ücretli (kaliteli)
- **CGTrader** — moda 3D modelleri için iyi
- **Sketchfab Store** — direkt GLB indirilebilir

### AI ile üret (ücretli/freemium)
- **Meshy AI** — https://www.meshy.ai — text/image → 3D, .glb indir
- **Hyper3D Rodin** — https://hyperhuman.deemos.com
- **Tripo3D** — https://www.tripo3d.ai

### Kendin modelle
- **Blender** (ücretsiz) — https://www.blender.org
- Export → glTF 2.0 (.glb) seç

## Optimize ipuçları

- Boyut: Her .glb < 5 MB olsun (siteyi hızlı tut)
- Poly sayısı: 10-50k arası ideal
- Doku boyutu: 1024×1024 yeterli (çoğu durumda)
- Optimize aracı: https://gltf.report (drag-drop, online sıkıştırma)

## İsim önerileri

Net olmaları için:
- `g1-jacket.glb`, `a2-bomber.glb`, `ma1-bomber.glb`
- `officer-cap.glb`, `field-cap.glb`
- `aviator-glasses.glb`
- `combat-boots.glb`, `pilot-gloves.glb`
- `pilot-watch.glb`
- `armband.glb`, `greatcoat.glb`

## Şu an placeholder olarak ne kullanılıyor?

Three.js primitif geometriler (silindir, küre, torus) ile çizilmiş
basit silüetler. Gerçek modeli eklemediğin sürece bunlar gösterilir.
