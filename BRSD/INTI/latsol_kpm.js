document.addEventListener("DOMContentLoaded", () => {
  // ========================================================
  // SCENE 1: KARDUS KUBUS DAN BALOK (SOAL 1)
  // ========================================================
  const canvas1 = document.getElementById("canvas-soal1");
  const scene1 = new THREE.Scene();
  // Warna background terang agar mirip ruang ujian/meja
  scene1.background = new THREE.Color(0xf4f7f4);

  const camera1 = new THREE.PerspectiveCamera(
    45,
    canvas1.clientWidth / canvas1.clientHeight,
    0.1,
    1000,
  );
  // Posisi kamera agar kedua bangun terlihat
  camera1.position.set(0, 30, 60);

  const renderer1 = new THREE.WebGLRenderer({ antialias: true });
  renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);
  canvas1.appendChild(renderer1.domElement);

  const controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
  controls1.enableDamping = true;

  // Pencahayaan
  scene1.add(new THREE.AmbientLight(0xffffff, 0.7));
  const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
  light1.position.set(20, 30, 20);
  scene1.add(light1);

  // Material Kardus (Coklat Karton)
  const matKardus = new THREE.MeshPhongMaterial({
    color: 0xc49a6c, // Coklat karton
    roughness: 0.8,
  });
  // Garis tepi agar bentuk 3D lebih tegas
  const matGaris = new THREE.LineBasicMaterial({
    color: 0x5c4033,
    linewidth: 2,
  });

  // 1. KUBUS (Rusuk 15)
  const geoKubus = new THREE.BoxGeometry(15, 15, 15);
  const kubus = new THREE.Mesh(geoKubus, matKardus);
  const garisKubus = new THREE.LineSegments(
    new THREE.EdgesGeometry(geoKubus),
    matGaris,
  );
  kubus.add(garisKubus);
  kubus.position.set(-15, 7.5, 0); // Geser ke kiri
  scene1.add(kubus);

  // 2. BALOK (p=20, l=10, t=12)
  const geoBalok = new THREE.BoxGeometry(20, 12, 10); // Lebar di sumbu Z, Tinggi sumbu Y
  const balok = new THREE.Mesh(geoBalok, matKardus);
  const garisBalok = new THREE.LineSegments(
    new THREE.EdgesGeometry(geoBalok),
    matGaris,
  );
  balok.add(garisBalok);
  balok.position.set(15, 6, 0); // Geser ke kanan
  scene1.add(balok);

  // Tambahkan Lantai (Opsional agar terlihat membumi)
  const lantai = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      transparent: true,
      opacity: 0.5,
    }),
  );
  lantai.rotation.x = -Math.PI / 2;
  scene1.add(lantai);

  // ========================================================
  // SCENE 2: KOTAK PAJANGAN AKRILIK TANPA ALAS (SOAL 2)
  // ========================================================
  const canvas2 = document.getElementById("canvas-soal2");
  const scene2 = new THREE.Scene();
  scene2.background = new THREE.Color(0xf4f7f4);

  const camera2 = new THREE.PerspectiveCamera(
    45,
    canvas2.clientWidth / canvas2.clientHeight,
    0.1,
    1000,
  );
  camera2.position.set(30, 40, 50); // Angle menukik agar "tanpa alas" bisa terlihat jika digeser

  const renderer2 = new THREE.WebGLRenderer({ antialias: true });
  renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
  canvas2.appendChild(renderer2.domElement);

  const controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
  controls2.enableDamping = true;

  scene2.add(new THREE.AmbientLight(0xffffff, 0.6));
  const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
  light2.position.set(-20, 30, 20);
  scene2.add(light2);

  // Material Akrilik Bening
  const matAkrilik = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    metalness: 0.1,
    roughness: 0.1,
    transparent: true,
    opacity: 0.4, // Transparan seperti kaca
    side: THREE.DoubleSide,
  });
  // Garis tepi kaca
  const matGarisKaca = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
  });

  // Merangkai Balok TANPA ALAS (Terdiri dari 5 bidang)
  // Ukuran: p = 30, l = 20, t = 25
  const p = 30;
  const l = 20;
  const t = 25;
  const akrilikGroup = new THREE.Group();

  function createKaca(width, height) {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      matAkrilik,
    );
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(plane.geometry),
      matGarisKaca,
    );
    plane.add(edges);
    return plane;
  }

  // 1. Sisi Atas (Tutup)
  const atap = createKaca(p, l);
  atap.rotation.x = -Math.PI / 2;
  atap.position.set(0, t, 0);
  akrilikGroup.add(atap);

  // 2. Sisi Depan
  const depan = createKaca(p, t);
  depan.position.set(0, t / 2, l / 2);
  akrilikGroup.add(depan);

  // 3. Sisi Belakang
  const belakang = createKaca(p, t);
  belakang.position.set(0, t / 2, -l / 2);
  akrilikGroup.add(belakang);

  // 4. Sisi Kanan
  const kanan = createKaca(l, t);
  kanan.rotation.y = Math.PI / 2;
  kanan.position.set(p / 2, t / 2, 0);
  akrilikGroup.add(kanan);

  // 5. Sisi Kiri
  const kiri = createKaca(l, t);
  kiri.rotation.y = Math.PI / 2;
  kiri.position.set(-p / 2, t / 2, 0);
  akrilikGroup.add(kiri);

  // Pusatkan grup agar rotasi mulus
  akrilikGroup.position.set(0, -t / 2, 0);
  scene2.add(akrilikGroup);

  // Tambahkan kisi-kisi lantai agar efek "bolong" di bawah lebih jelas
  const grid = new THREE.GridHelper(60, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.1;
  grid.material.transparent = true;
  grid.position.y = -t / 2;
  scene2.add(grid);

  // ========================================================
  // RENDER LOOP & RESIZE HANDLER
  // ========================================================
  function animate() {
    requestAnimationFrame(animate);

    // Putar perlahan secara otomatis agar siswa sadar ini 3D
    kubus.rotation.y += 0.005;
    balok.rotation.y -= 0.005;
    akrilikGroup.rotation.y += 0.003;

    controls1.update();
    controls2.update();

    renderer1.render(scene1, camera1);
    renderer2.render(scene2, camera2);
  }
  animate();

  window.addEventListener("resize", () => {
    camera1.aspect = canvas1.clientWidth / canvas1.clientHeight;
    camera1.updateProjectionMatrix();
    renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);

    camera2.aspect = canvas2.clientWidth / canvas2.clientHeight;
    camera2.updateProjectionMatrix();
    renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
  });
});
