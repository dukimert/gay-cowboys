/* ============================================
   GAY COWBOYS — 3D Product Viewer (Three.js)
   ============================================
   İki yüklenme modu:
   1) GLB dosyası varsa (options.modelUrl): gerçek 3D modeli yükle
   2) Yoksa: primitif geometriden placeholder göster
   ============================================ */

window.ArsivViewer = (function () {
    'use strict';

    function create3DViewer(container, options) {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js yüklenmedi.');
            return null;
        }

        options = options || {};
        const productType = options.productType || 'jacket';
        const baseColor = options.color || 0x6b5a3e;
        const modelUrl = options.modelUrl || null;

        // ============================
        // Sahne · Kamera · Renderer
        // ============================
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0d0d10, 4, 14);

        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
        camera.position.set(0, 0.2, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        if (renderer.outputEncoding !== undefined) {
            renderer.outputEncoding = THREE.sRGBEncoding;
        }

        while (container.firstChild) container.removeChild(container.firstChild);
        container.appendChild(renderer.domElement);

        // ============================
        // Sinematik 3 noktalı aydınlatma
        // ============================
        const ambient = new THREE.AmbientLight(0x4a4a55, 0.4);
        scene.add(ambient);

        const key = new THREE.DirectionalLight(0xfff0d4, 1.6);
        key.position.set(3, 4, 3);
        key.castShadow = true;
        key.shadow.mapSize.width = 1024;
        key.shadow.mapSize.height = 1024;
        scene.add(key);

        const fill = new THREE.DirectionalLight(0x6a85b0, 0.6);
        fill.position.set(-3, 1, 2);
        scene.add(fill);

        const rim = new THREE.DirectionalLight(0xffd9a0, 0.9);
        rim.position.set(0, 2, -4);
        scene.add(rim);

        // Yansıtıcı zemin diski
        const groundGeo = new THREE.CircleGeometry(3, 64);
        const groundMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a0e,
            roughness: 0.4,
            metalness: 0.6,
            transparent: true,
            opacity: 0.7
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.6;
        ground.receiveShadow = true;
        scene.add(ground);

        // ============================
        // Model yükle: GLB veya primitif fallback
        // ============================
        const model = new THREE.Group();
        scene.add(model);

        let modelLoaded = false;
        let loadingPlaceholder = null;

        if (modelUrl && typeof THREE.GLTFLoader !== 'undefined') {
            // Loading göstergesi (basit dönen torus)
            loadingPlaceholder = createLoadingSpinner();
            scene.add(loadingPlaceholder);

            const loader = new THREE.GLTFLoader();
            loader.load(
                modelUrl,
                (gltf) => {
                    const loaded = gltf.scene;
                    // Otomatik ortala ve normalize et
                    autoFitModel(loaded);
                    model.add(loaded);
                    modelLoaded = true;
                    if (loadingPlaceholder) {
                        scene.remove(loadingPlaceholder);
                        loadingPlaceholder = null;
                    }
                },
                undefined,
                (err) => {
                    console.warn('GLB yüklenemedi, fallback primitive gösteriliyor:', err);
                    if (loadingPlaceholder) {
                        scene.remove(loadingPlaceholder);
                        loadingPlaceholder = null;
                    }
                    buildPlaceholder(model, productType, baseColor);
                }
            );
        } else {
            // GLB yok → primitif fallback
            buildPlaceholder(model, productType, baseColor);
        }

        // ============================
        // Etkileşim — manuel orbit
        // ============================
        let isDragging = false;
        let prevX = 0, prevY = 0;
        let rotY = 0, rotX = 0;
        let targetRotY = 0, targetRotX = 0;
        let autoRotate = true;
        let zoom = 5;
        let targetZoom = 5;

        const dom = renderer.domElement;
        dom.style.touchAction = 'none';

        function onPointerDown(e) {
            isDragging = true;
            autoRotate = false;
            const point = e.touches ? e.touches[0] : e;
            prevX = point.clientX;
            prevY = point.clientY;
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            const point = e.touches ? e.touches[0] : e;
            const dx = point.clientX - prevX;
            const dy = point.clientY - prevY;
            targetRotY += dx * 0.01;
            targetRotX += dy * 0.005;
            targetRotX = Math.max(-0.8, Math.min(0.8, targetRotX));
            prevX = point.clientX;
            prevY = point.clientY;
            e.preventDefault();
        }

        function onPointerUp() {
            isDragging = false;
        }

        function onWheel(e) {
            targetZoom += e.deltaY * 0.005;
            targetZoom = Math.max(3, Math.min(8, targetZoom));
            e.preventDefault();
        }

        dom.addEventListener('mousedown', onPointerDown);
        dom.addEventListener('touchstart', onPointerDown, { passive: false });
        window.addEventListener('mousemove', onPointerMove);
        dom.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('mouseup', onPointerUp);
        window.addEventListener('touchend', onPointerUp);
        dom.addEventListener('wheel', onWheel, { passive: false });

        // ============================
        // Resize
        // ============================
        function onResize() {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);
        window.addEventListener('resize', onResize);

        // ============================
        // Animasyon
        // ============================
        let animationId;
        function animate() {
            animationId = requestAnimationFrame(animate);

            if (autoRotate) {
                targetRotY += 0.004;
            }

            rotY += (targetRotY - rotY) * 0.08;
            rotX += (targetRotX - rotX) * 0.08;
            zoom += (targetZoom - zoom) * 0.08;

            model.rotation.y = rotY;
            model.rotation.x = rotX;
            camera.position.z = zoom;

            model.position.y = Math.sin(Date.now() * 0.001) * 0.04;

            if (loadingPlaceholder) {
                loadingPlaceholder.rotation.y += 0.02;
                loadingPlaceholder.rotation.x += 0.01;
            }

            renderer.render(scene, camera);
        }

        animate();

        return {
            scene, camera, renderer, model,
            toggleAutoRotate: function () {
                autoRotate = !autoRotate;
                return autoRotate;
            },
            reset: function () {
                targetRotY = 0;
                targetRotX = 0;
                targetZoom = 5;
                autoRotate = true;
            },
            zoomIn: function () {
                targetZoom = Math.max(3, targetZoom - 0.6);
                autoRotate = false;
            },
            zoomOut: function () {
                targetZoom = Math.min(8, targetZoom + 0.6);
                autoRotate = false;
            },
            destroy: function () {
                cancelAnimationFrame(animationId);
                resizeObserver.disconnect();
                window.removeEventListener('resize', onResize);
                window.removeEventListener('mousemove', onPointerMove);
                window.removeEventListener('mouseup', onPointerUp);
                window.removeEventListener('touchend', onPointerUp);
                renderer.dispose();
            }
        };
    }

    // ============================
    // GLB yüklenmiş modeli ortala ve normalize et
    // ============================
    function autoFitModel(obj) {
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Merkeze al
        obj.position.x -= center.x;
        obj.position.y -= center.y;
        obj.position.z -= center.z;

        // Normalize boyut (en büyük eksen ~ 2 birim olsun)
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            const scale = 2.2 / maxDim;
            obj.scale.setScalar(scale);
        }

        // Gölge ayarı
        obj.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }

    // ============================
    // Loading spinner (GLB yüklenirken)
    // ============================
    function createLoadingSpinner() {
        const group = new THREE.Group();
        const geo = new THREE.TorusGeometry(0.4, 0.04, 8, 32);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xc8a76b,
            roughness: 0.3,
            metalness: 0.8,
            emissive: 0x3a2a0a,
            emissiveIntensity: 0.3
        });
        const ring1 = new THREE.Mesh(geo, mat);
        group.add(ring1);
        const ring2 = new THREE.Mesh(geo, mat);
        ring2.rotation.x = Math.PI / 2;
        group.add(ring2);
        return group;
    }

    // ============================
    // Primitif placeholder modeller
    // ============================
    function makeMaterial(color, options) {
        options = options || {};
        return new THREE.MeshStandardMaterial({
            color: color,
            roughness: options.roughness !== undefined ? options.roughness : 0.7,
            metalness: options.metalness !== undefined ? options.metalness : 0.15
        });
    }

    function buildPlaceholder(group, productType, color) {
        if (productType === 'hat') buildHat(group, color);
        else if (productType === 'sunglasses') buildSunglasses(group, color);
        else if (productType === 'armband') buildArmband(group, color);
        else if (productType === 'boots') buildBoots(group, color);
        else if (productType === 'gloves') buildGloves(group, color);
        else if (productType === 'watch') buildWatch(group, color);
        else buildJacket(group, color);
    }

    function buildJacket(group, color) {
        const mat = makeMaterial(color, { roughness: 0.55, metalness: 0.05 });
        const accentMat = makeMaterial(0x1a1a1a, { roughness: 0.4, metalness: 0.6 });

        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.95, 1.7, 24, 1, false), mat);
        body.castShadow = true;
        group.add(body);

        const shoulderGeo = new THREE.SphereGeometry(0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const lShoulder = new THREE.Mesh(shoulderGeo, mat);
        lShoulder.position.set(-0.65, 0.7, 0);
        lShoulder.rotation.z = Math.PI / 2;
        group.add(lShoulder);
        const rShoulder = lShoulder.clone();
        rShoulder.position.x = 0.65;
        rShoulder.rotation.z = -Math.PI / 2;
        group.add(rShoulder);

        const sleeveGeo = new THREE.CylinderGeometry(0.22, 0.28, 1.3, 16);
        const lSleeve = new THREE.Mesh(sleeveGeo, mat);
        lSleeve.position.set(-0.78, -0.05, 0);
        lSleeve.rotation.z = Math.PI / 10;
        lSleeve.castShadow = true;
        group.add(lSleeve);
        const rSleeve = lSleeve.clone();
        rSleeve.position.x = 0.78;
        rSleeve.rotation.z = -Math.PI / 10;
        group.add(rSleeve);

        const cuffGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 16);
        const lCuff = new THREE.Mesh(cuffGeo, accentMat);
        lCuff.position.set(-0.92, -0.7, 0);
        lCuff.rotation.z = Math.PI / 10;
        group.add(lCuff);
        const rCuff = lCuff.clone();
        rCuff.position.x = 0.92;
        rCuff.rotation.z = -Math.PI / 10;
        group.add(rCuff);

        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.1, 12, 24, Math.PI * 1.3), accentMat);
        collar.position.set(0, 0.85, 0.1);
        collar.rotation.x = -Math.PI / 4;
        group.add(collar);

        const zip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.5, 0.05), makeMaterial(0xc8a060, { metalness: 0.8, roughness: 0.3 }));
        zip.position.set(0, 0, 0.75);
        group.add(zip);

        const pocketGeo = new THREE.BoxGeometry(0.35, 0.25, 0.04);
        const lPocket = new THREE.Mesh(pocketGeo, accentMat);
        lPocket.position.set(-0.35, -0.3, 0.78);
        group.add(lPocket);
        const rPocket = lPocket.clone();
        rPocket.position.x = 0.35;
        group.add(rPocket);

        const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.0, 0.18, 24), accentMat);
        skirt.position.y = -0.92;
        group.add(skirt);

        group.position.y = -0.1;
    }

    function buildHat(group, color) {
        const mat = makeMaterial(color, { roughness: 0.6 });
        const accentMat = makeMaterial(0x111111, { metalness: 0.7, roughness: 0.3 });

        const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.4, 32), mat);
        crown.position.y = 0.2;
        crown.castShadow = true;
        group.add(crown);

        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.03, 32), mat);
        top.position.y = 0.4;
        group.add(top);

        const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.05, 32), accentMat);
        brim.position.set(0, 0, 0.1);
        brim.rotation.x = -0.15;
        brim.castShadow = true;
        group.add(brim);

        const band = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.1, 32), accentMat);
        band.position.y = 0.05;
        group.add(band);

        const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), makeMaterial(0xc8a060, { metalness: 0.8, roughness: 0.3 }));
        emblem.position.set(0, 0.25, 0.51);
        group.add(emblem);
    }

    function buildSunglasses(group, color) {
        const frameMat = makeMaterial(color, { metalness: 0.85, roughness: 0.25 });
        const lensMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            metalness: 1,
            roughness: 0.05,
            transparent: true,
            opacity: 0.85
        });

        const lensGeo = new THREE.TorusGeometry(0.32, 0.04, 12, 32);
        const lLens = new THREE.Mesh(lensGeo, frameMat);
        lLens.position.set(-0.38, 0, 0);
        group.add(lLens);

        const lLensFill = new THREE.Mesh(new THREE.CircleGeometry(0.32, 32), lensMat);
        lLensFill.position.set(-0.38, 0, 0);
        group.add(lLensFill);

        const rLens = lLens.clone();
        rLens.position.x = 0.38;
        group.add(rLens);

        const rLensFill = lLensFill.clone();
        rLensFill.position.x = 0.38;
        group.add(rLensFill);

        const bridgeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.18, 12);
        const bridge = new THREE.Mesh(bridgeGeo, frameMat);
        bridge.position.set(0, 0.08, 0);
        bridge.rotation.z = Math.PI / 2;
        group.add(bridge);

        const bridge2 = bridge.clone();
        bridge2.position.y = -0.05;
        group.add(bridge2);

        const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 12);
        const lArm = new THREE.Mesh(armGeo, frameMat);
        lArm.position.set(-0.85, 0.05, -0.3);
        lArm.rotation.z = Math.PI / 2;
        lArm.rotation.y = -Math.PI / 8;
        group.add(lArm);

        const rArm = lArm.clone();
        rArm.position.x = 0.85;
        rArm.rotation.y = Math.PI / 8;
        group.add(rArm);

        group.scale.set(1.2, 1.2, 1.2);
    }

    function buildArmband(group, color) {
        const mat = makeMaterial(color, { roughness: 0.7 });
        const accentMat = makeMaterial(0xc8a060, { metalness: 0.8, roughness: 0.25 });

        const band = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32, 1, true), mat);
        band.castShadow = true;
        group.add(band);

        const edgeTopGeo = new THREE.TorusGeometry(0.5, 0.02, 8, 32);
        const edgeTop = new THREE.Mesh(edgeTopGeo, accentMat);
        edgeTop.position.y = 0.25;
        edgeTop.rotation.x = Math.PI / 2;
        group.add(edgeTop);

        const edgeBottom = edgeTop.clone();
        edgeBottom.position.y = -0.25;
        group.add(edgeBottom);

        const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.15, 16), accentMat);
        emblem.position.set(0, 0, 0.51);
        group.add(emblem);

        const emblemInner = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), makeMaterial(color, { roughness: 0.6 }));
        emblemInner.position.set(0, 0, 0.515);
        group.add(emblemInner);

        group.scale.set(1.4, 1.4, 1.4);
    }

    function buildBoots(group, color) {
        const mat = makeMaterial(color, { roughness: 0.65 });
        const soleMat = makeMaterial(0x141414, { roughness: 0.9 });

        const lBoot = new THREE.Group();
        const lShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.9, 24), mat);
        lShaft.position.y = 0.3;
        lShaft.castShadow = true;
        lBoot.add(lShaft);

        const lFoot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.7), mat);
        lFoot.position.set(0, -0.2, 0.15);
        lBoot.add(lFoot);

        const lSole = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.74), soleMat);
        lSole.position.set(0, -0.33, 0.15);
        lBoot.add(lSole);

        lBoot.position.x = -0.3;
        group.add(lBoot);

        const rBoot = lBoot.clone();
        rBoot.position.x = 0.3;
        group.add(rBoot);

        group.position.y = -0.3;
    }

    function buildGloves(group, color) {
        const mat = makeMaterial(color, { roughness: 0.6 });

        const lGlove = new THREE.Group();
        const lPalm = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.6, 0.18), mat);
        lPalm.castShadow = true;
        lGlove.add(lPalm);

        const lCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.3, 16), mat);
        lCuff.position.y = -0.4;
        lGlove.add(lCuff);

        lGlove.position.x = -0.4;
        lGlove.rotation.z = -0.15;
        group.add(lGlove);

        const rGlove = lGlove.clone();
        rGlove.position.x = 0.4;
        rGlove.rotation.z = 0.15;
        group.add(rGlove);

        group.scale.set(1.3, 1.3, 1.3);
    }

    function buildWatch(group, color) {
        const caseMat = makeMaterial(color, { metalness: 0.9, roughness: 0.2 });
        const faceMat = makeMaterial(0x0a0a0a, { metalness: 0.4, roughness: 0.6 });
        const strapMat = makeMaterial(0x3a2a1a, { roughness: 0.8 });

        const watchCase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.18, 32), caseMat);
        watchCase.rotation.x = Math.PI / 2;
        watchCase.castShadow = true;
        group.add(watchCase);

        const face = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), faceMat);
        face.position.z = 0.1;
        group.add(face);

        const hour = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.02), makeMaterial(0xe8e6e1, { metalness: 0.6 }));
        hour.position.set(0, 0.05, 0.13);
        group.add(hour);

        const minute = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.32, 0.02), makeMaterial(0xe8e6e1, { metalness: 0.6 }));
        minute.position.set(0.1, 0, 0.13);
        minute.rotation.z = -0.6;
        group.add(minute);

        const strapTop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.7, 0.08), strapMat);
        strapTop.position.y = 0.6;
        group.add(strapTop);

        const strapBottom = strapTop.clone();
        strapBottom.position.y = -0.6;
        group.add(strapBottom);

        group.scale.set(1.4, 1.4, 1.4);
    }

    return { create: create3DViewer };
})();
