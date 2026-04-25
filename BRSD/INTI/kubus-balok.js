document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // BAGIAN 1: IDENTIFIKASI UNSUR
  // ==========================================
  const contU = document.getElementById("unsur-canvas");
  const sceneU = new THREE.Scene();
  sceneU.background = new THREE.Color(0x1a1a1a);
  const camU = new THREE.PerspectiveCamera(
    45,
    contU.clientWidth / contU.clientHeight,
    0.1,
    1000,
  );
  camU.position.set(5, 6, 8);
  const renU = new THREE.WebGLRenderer({ antialias: true });
  renU.setSize(contU.clientWidth, contU.clientHeight);
  contU.appendChild(renU.domElement);
  const ctrlU = new THREE.OrbitControls(camU, renU.domElement);
  ctrlU.enableDamping = true;

  sceneU.add(new THREE.AmbientLight(0xffffff, 0.6));
  const lightU = new THREE.PointLight(0xffffff, 1);
  lightU.position.set(10, 20, 10);
  sceneU.add(lightU);

  const sU = 2;
  const offU = sU / 2;
  const faces = [];
  const edgesArr = [];
  const verticesArr = [];
  const matDef = new THREE.MeshPhongMaterial({
    color: 0x2d935d,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
  });
  const matHL = new THREE.MeshPhongMaterial({
    color: 0x4caf50,
    emissive: 0x2d935d,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });

  const groupU = new THREE.Group();
  groupU.rotation.x = -Math.PI / 2;
  sceneU.add(groupU);

  function buildFace() {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(sU, sU), matDef.clone());
    const e = new THREE.LineSegments(
      new THREE.EdgesGeometry(m.geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }),
    );
    m.add(e);
    faces.push(m);
    edgesArr.push(e.material);
    return m;
  }

  const fBase = buildFace();
  groupU.add(fBase);
  const pR = new THREE.Group();
  pR.position.set(offU, 0, 0);
  fBase.add(pR);
  const fR = buildFace();
  fR.position.set(offU, 0, 0);
  pR.add(fR);
  const pL = new THREE.Group();
  pL.position.set(-offU, 0, 0);
  fBase.add(pL);
  const fL = buildFace();
  fL.position.set(-offU, 0, 0);
  pL.add(fL);
  const pB = new THREE.Group();
  pB.position.set(0, offU, 0);
  fBase.add(pB);
  const fB = buildFace();
  fB.position.set(0, offU, 0);
  pB.add(fB);
  const pF = new THREE.Group();
  pF.position.set(0, -offU, 0);
  fBase.add(pF);
  const fF = buildFace();
  fF.position.set(0, -offU, 0);
  pF.add(fF);
  const pT = new THREE.Group();
  pT.position.set(0, -offU, 0);
  fF.add(pT);
  const fT = buildFace();
  fT.position.set(0, -offU, 0);
  pT.add(fT);

  const vPos = [
    [offU, offU, 0],
    [offU, -offU, 0],
    [-offU, offU, 0],
    [-offU, -offU, 0],
    [offU, offU, sU],
    [offU, -offU, sU],
    [-offU, offU, sU],
    [-offU, -offU, sU],
  ];
  vPos.forEach((p) => {
    const v = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf44336 }),
    );
    v.position.set(...p);
    v.visible = false;
    groupU.add(v);
    verticesArr.push(v);
  });

  let foldProg = 1;
  let foldTarget = 1;
  let isFolded = true;
  document.getElementById("btn-animasi").onclick = (e) => {
    isFolded = !isFolded;
    foldTarget = isFolded ? 1 : 0;
    e.target.innerText = isFolded ? "Buka Jaring-jaring" : "Lipat Kembali";
    resetHL();
    updateExp(
      "Jaring-jaring",
      "Perhatikan bagaimana ke-6 sisi berpisah dan mendatar untuk membentuk pola.",
      "",
    );
  };

  const expText = {
    sisi: [
      "SISI (Bidang)",
      "Sisi adalah bidang datar yang membatasi wilayah luar dan wilayah dalam pada bangun ruang. Kubus memiliki <strong>6 Sisi</strong> berbentuk persegi yang bentuk dan ukurannya persis sama.",
      "active-sisi",
    ],
    rusuk: [
      "RUSUK (Kerangka)",
      "Rusuk adalah garis pertemuan antara dua sisi pada bangun ruang. Kubus memiliki <strong>12 Rusuk</strong> yang semuanya sama panjang.",
      "active-rusuk",
    ],
    titik: [
      "TITIK SUDUT (Pojok)",
      "Titik sudut adalah titik pertemuan dari tiga atau lebih rusuk pada bangun ruang. Kubus memiliki <strong>8 Titik Sudut</strong> pertemuan antar rusuk.",
      "active-titik",
    ],
  };

  function resetHL() {
    faces.forEach((f) => (f.material = matDef.clone()));
    edgesArr.forEach((e) => {
      e.color.set(0xffffff);
      e.linewidth = 2;
    });
    verticesArr.forEach((v) => (v.visible = false));
    ["btn-sisi", "btn-rusuk", "btn-titik"].forEach(
      (id) => (document.getElementById(id).className = "legend-item"),
    );
  }
  function updateExp(title, desc, cls) {
    const box = document.getElementById("dynamic-explanation");
    box.className = "theory-box";
    if (cls) box.classList.add(cls);
    document.getElementById("exp-title").innerHTML = title;
    document.getElementById("exp-desc").innerHTML = desc;
  }

  document.getElementById("btn-sisi").onclick = () => {
    resetHL();
    document.getElementById("btn-sisi").classList.add("active-sisi");
    faces.forEach((f) => (f.material = matHL));
    updateExp(expText.sisi[0], expText.sisi[1], expText.sisi[2]);
  };
  document.getElementById("btn-rusuk").onclick = () => {
    resetHL();
    document.getElementById("btn-rusuk").classList.add("active-rusuk");
    edgesArr.forEach((e) => {
      e.color.set(0xffc107);
    });
    updateExp(expText.rusuk[0], expText.rusuk[1], expText.rusuk[2]);
  };
  document.getElementById("btn-titik").onclick = () => {
    resetHL();
    document.getElementById("btn-titik").classList.add("active-titik");
    verticesArr.forEach((v) => (v.visible = true));
    updateExp(expText.titik[0], expText.titik[1], expText.titik[2]);
    if (!isFolded) document.getElementById("btn-animasi").click();
  };

  document.getElementById("btn-kuis").onclick = () => {
    const s = document.getElementById("kuis-sisi").value;
    const r = document.getElementById("kuis-rusuk").value;
    const t = document.getElementById("kuis-titik").value;
    const msg = document.getElementById("kuis-feedback");
    msg.classList.remove("hidden");
    if (s == 6 && r == 12 && t == 8) {
      msg.innerHTML =
        "<div class='status-banner status-correct'>Benar Sekali!</div><div class='step-by-step'>Kamu sudah mengingat unsur-unsurnya. Mari lanjut ke Volume!</div>";
    } else {
      msg.innerHTML =
        "<div class='status-banner status-wrong'>Masih ada yang salah</div><div class='step-by-step'>Coba hitung lagi dengan menekan tombol unsur di atas.</div>";
    }
  };

  // ==========================================
  // BAGIAN 2: KONSEP VOLUME KUBUS
  // ==========================================
  const contV = document.getElementById("volume-canvas");
  const sceneV = new THREE.Scene();
  sceneV.background = new THREE.Color(0x1a1a1a);
  const camV = new THREE.PerspectiveCamera(
    45,
    contV.clientWidth / contV.clientHeight,
    0.1,
    1000,
  );
  camV.position.set(8, 8, 12);
  const renV = new THREE.WebGLRenderer({ antialias: true });
  renV.setSize(contV.clientWidth, contV.clientHeight);
  contV.appendChild(renV.domElement);
  const ctrlV = new THREE.OrbitControls(camV, renV.domElement);
  sceneV.add(new THREE.AmbientLight(0xffffff, 0.8));

  let sVol = 3;
  let cubesV = [];
  let boxOuter;

  function drawBox() {
    if (boxOuter) sceneV.remove(boxOuter);
    const geo = new THREE.BoxGeometry(sVol, sVol, sVol);
    boxOuter = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({
        color: 0x2d935d,
        opacity: 0.3,
        transparent: true,
      }),
    );
    boxOuter.position.set(sVol / 2, sVol / 2, sVol / 2);
    sceneV.add(boxOuter);
    camV.position.set(sVol * 2, sVol * 2, sVol * 2.5);
    ctrlV.target.set(sVol / 2, sVol / 2, sVol / 2);
  }

  function clearCubes() {
    cubesV.forEach((c) => sceneV.remove(c));
    cubesV = [];
    document.getElementById("volume-math-text").innerHTML =
      "Tentukan ukuran rusuk lalu klik tombol di atas.";
  }

  function addUnitCube(x, y, z) {
    const sz = 0.96;
    const g = new THREE.BoxGeometry(sz, sz, sz);
    const m = new THREE.MeshPhongMaterial({ color: 0x4caf50 });
    const mesh = new THREE.Mesh(g, m);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(g),
      new THREE.LineBasicMaterial({ color: 0x111111 }),
    );
    mesh.add(edges);
    mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    sceneV.add(mesh);
    cubesV.push(mesh);
  }

  document.getElementById("slider-s").oninput = (e) => {
    sVol = parseInt(e.target.value);
    document.getElementById("val-s").innerText = sVol;
    clearCubes();
    drawBox();
  };

  document.getElementById("btn-vol-lantai").onclick = () => {
    clearCubes();
    for (let i = 0; i < sVol; i++) {
      for (let j = 0; j < sVol; j++) {
        addUnitCube(i, 0, j);
      }
    }
    document.getElementById("volume-math-text").innerHTML =
      `<b>Langkah 1: Menyusun Alas</b><br>Luas Alas (lantai) = s &times; s = ${sVol} &times; ${sVol} = <b>${sVol * sVol}</b> kubus satuan.`;
  };

  document.getElementById("btn-vol-penuh").onclick = () => {
    clearCubes();
    for (let y = 0; y < sVol; y++) {
      for (let x = 0; x < sVol; x++) {
        for (let z = 0; z < sVol; z++) {
          addUnitCube(x, y, z);
        }
      }
    }
    document.getElementById("volume-math-text").innerHTML =
      `<b>Langkah 2: Menumpuk ke Atas</b><br>Volume = Luas Alas &times; Tinggi<br>Volume = ${sVol * sVol} &times; ${sVol} = <b>${Math.pow(sVol, 3)}</b> kubus satuan.`;
  };

  document.getElementById("btn-vol-reset").onclick = clearCubes;

  // ==========================================
  // BAGIAN 3: KONSEP LUAS PERMUKAAN (BARU)
  // ==========================================
  const contLP = document.getElementById("lp-canvas");
  const sceneLP = new THREE.Scene();
  sceneLP.background = new THREE.Color(0x1a1a1a);
  const camLP = new THREE.PerspectiveCamera(
    45,
    contLP.clientWidth / contLP.clientHeight,
    0.1,
    1000,
  );
  camLP.position.set(8, 10, 12);
  const renLP = new THREE.WebGLRenderer({ antialias: true });
  renLP.setSize(contLP.clientWidth, contLP.clientHeight);
  contLP.appendChild(renLP.domElement);
  const ctrlLP = new THREE.OrbitControls(camLP, renLP.domElement);
  ctrlLP.enableDamping = true;

  sceneLP.add(new THREE.AmbientLight(0xffffff, 0.6));
  const lightLP = new THREE.PointLight(0xffffff, 1);
  lightLP.position.set(10, 20, 10);
  sceneLP.add(lightLP);

  const sBase = 1;
  const offBase = sBase / 2; // Ukuran dasar selalu 1, nanti di-scale
  const groupLP = new THREE.Group();
  groupLP.rotation.x = -Math.PI / 2;
  sceneLP.add(groupLP);
  const matLP = new THREE.MeshPhongMaterial({
    color: 0x2d935d,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });

  function buildFaceLP() {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(sBase, sBase),
      matLP.clone(),
    );
    const e = new THREE.LineSegments(
      new THREE.EdgesGeometry(m.geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }),
    );
    m.add(e);
    return m;
  }

  const fbLP = buildFaceLP();
  groupLP.add(fbLP);
  const pR_LP = new THREE.Group();
  pR_LP.position.set(offBase, 0, 0);
  fbLP.add(pR_LP);
  const fR_LP = buildFaceLP();
  fR_LP.position.set(offBase, 0, 0);
  pR_LP.add(fR_LP);
  const pL_LP = new THREE.Group();
  pL_LP.position.set(-offBase, 0, 0);
  fbLP.add(pL_LP);
  const fL_LP = buildFaceLP();
  fL_LP.position.set(-offBase, 0, 0);
  pL_LP.add(fL_LP);
  const pB_LP = new THREE.Group();
  pB_LP.position.set(0, offBase, 0);
  fbLP.add(pB_LP);
  const fB_LP = buildFaceLP();
  fB_LP.position.set(0, offBase, 0);
  pB_LP.add(fB_LP);
  const pF_LP = new THREE.Group();
  pF_LP.position.set(0, -offBase, 0);
  fbLP.add(pF_LP);
  const fF_LP = buildFaceLP();
  fF_LP.position.set(0, -offBase, 0);
  pF_LP.add(fF_LP);
  const pT_LP = new THREE.Group();
  pT_LP.position.set(0, -offBase, 0);
  fF_LP.add(pT_LP);
  const fT_LP = buildFaceLP();
  fT_LP.position.set(0, -offBase, 0);
  pT_LP.add(fT_LP);

  let sLP = 3; // Initial value
  groupLP.scale.set(sLP, sLP, sLP); // Scale grup utamanya

  function updateMathLP() {
    document.getElementById("lp-math-text").innerHTML = `
            <p><strong>1. Luas 1 Sisi (Persegi):</strong> s &times; s = ${sLP} &times; ${sLP} = <strong>${sLP * sLP}</strong></p>
            <p><strong>2. Luas Permukaan (6 Sisi):</strong> 6 &times; Luas Sisi = 6 &times; ${sLP * sLP} = <strong>${6 * (sLP * sLP)}</strong></p>
        `;
  }
  updateMathLP();

  document.getElementById("slider-lp").oninput = (e) => {
    sLP = parseInt(e.target.value);
    document.getElementById("val-lp").innerText = sLP;
    groupLP.scale.set(sLP, sLP, sLP); // Membesar/Mengecil sesuai slider
    updateMathLP();
  };

  let foldProgLP = 1;
  let foldTargetLP = 1;
  let isFoldedLP = true;
  document.getElementById("btn-animasi-lp").onclick = (e) => {
    isFoldedLP = !isFoldedLP;
    foldTargetLP = isFoldedLP ? 1 : 0;
    e.target.innerText = isFoldedLP ? "Buka Jaring-jaring" : "Lipat Kembali";
  };

  // ==========================================
  // BAGIAN 4: LATIHAN MANDIRI (RUNTUT)
  // ==========================================
  document.getElementById("btn-latihan").onclick = () => {
    const sVal = parseInt(document.getElementById("latihan-s").value);
    const vVal = parseInt(document.getElementById("latihan-v").value);
    const lpVal = parseInt(document.getElementById("latihan-lp").value);
    const fb = document.getElementById("latihan-feedback");
    const status = document.getElementById("latihan-status");

    if (isNaN(sVal) || isNaN(vVal) || isNaN(lpVal)) {
      alert("Harap isi semua kotak dengan angka.");
      return;
    }

    const vCorrect = sVal * sVal * sVal;
    const lpCorrect = 6 * (sVal * sVal);
    fb.classList.remove("hidden");

    document.getElementById("ans-s").innerText = sVal;
    document.getElementById("ans-s1").innerText = sVal;
    document.getElementById("ans-s2").innerText = sVal;
    document.getElementById("ans-s3").innerText = sVal;
    document.getElementById("ans-v").innerText = vCorrect;

    document.getElementById("ans-s4").innerText = sVal;
    document.getElementById("ans-s5").innerText = sVal;
    document.getElementById("ans-lsisi").innerText = sVal * sVal;
    document.getElementById("ans-lp").innerText = lpCorrect;

    if (vVal === vCorrect && lpVal === lpCorrect) {
      status.className = "status-banner status-correct";
      status.innerText =
        "Luar Biasa! Jawaban Volume dan Luas Permukaanmu benar semua.";
    } else {
      status.className = "status-banner status-wrong";
      status.innerText = `Masih ada yang belum tepat. Mari perhatikan langkah pembahasannya di bawah.`;
    }
  };

  // ==========================================
  // RENDER LOOP BERSAMA (Menjalankan ke-3 Animasi)
  // ==========================================
  function animate() {
    requestAnimationFrame(animate);

    // Animasi Unsur
    foldProg += (foldTarget - foldProg) * 0.08;
    const angU = (Math.PI / 2) * foldProg;
    pR.rotation.y = -angU;
    pL.rotation.y = angU;
    pB.rotation.x = angU;
    pF.rotation.x = -angU;
    pT.rotation.x = -angU;

    // Animasi Luas Permukaan
    foldProgLP += (foldTargetLP - foldProgLP) * 0.08;
    const angLP = (Math.PI / 2) * foldProgLP;
    pR_LP.rotation.y = -angLP;
    pL_LP.rotation.y = angLP;
    pB_LP.rotation.x = angLP;
    pF_LP.rotation.x = -angLP;
    pT_LP.rotation.x = -angLP;

    ctrlU.update();
    ctrlV.update();
    ctrlLP.update();
    renU.render(sceneU, camU);
    renV.render(sceneV, camV);
    renLP.render(sceneLP, camLP);
  }

  drawBox();
  animate();

  window.addEventListener("resize", () => {
    camU.aspect = contU.clientWidth / contU.clientHeight;
    camU.updateProjectionMatrix();
    renU.setSize(contU.clientWidth, contU.clientHeight);
    camV.aspect = contV.clientWidth / contV.clientHeight;
    camV.updateProjectionMatrix();
    renV.setSize(contV.clientWidth, contV.clientHeight);
    camLP.aspect = contLP.clientWidth / contLP.clientHeight;
    camLP.updateProjectionMatrix();
    renLP.setSize(contLP.clientWidth, contLP.clientHeight);
  });
});
