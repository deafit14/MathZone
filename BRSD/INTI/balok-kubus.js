document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // BAGIAN 1: IDENTIFIKASI UNSUR BALOK
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
  camU.position.set(6, 7, 10);
  const renU = new THREE.WebGLRenderer({ antialias: true });
  renU.setSize(contU.clientWidth, contU.clientHeight);
  contU.appendChild(renU.domElement);
  const ctrlU = new THREE.OrbitControls(camU, renU.domElement);
  ctrlU.enableDamping = true;

  sceneU.add(new THREE.AmbientLight(0xffffff, 0.6));
  const lightU = new THREE.PointLight(0xffffff, 1);
  lightU.position.set(10, 20, 10);
  sceneU.add(lightU);

  // Dimensi Balok Default untuk visual unsur: p=4, l=2, t=3
  const uP = 4,
    uL = 2,
    uT = 3;
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

  function buildRect(w, h) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), matDef.clone());
    const e = new THREE.LineSegments(
      new THREE.EdgesGeometry(m.geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }),
    );
    m.add(e);
    faces.push(m);
    edgesArr.push(e.material);
    return m;
  }

  // Bangun Jaring-jaring Balok secara Matematis
  const fBase = buildRect(uP, uL);
  groupU.add(fBase); // Alas p x l

  const pR = new THREE.Group();
  pR.position.set(uP / 2, 0, 0);
  fBase.add(pR);
  const fR = buildRect(uT, uL);
  fR.position.set(uT / 2, 0, 0);
  pR.add(fR); // Kanan t x l

  const pL = new THREE.Group();
  pL.position.set(-uP / 2, 0, 0);
  fBase.add(pL);
  const fL = buildRect(uT, uL);
  fL.position.set(-uT / 2, 0, 0);
  pL.add(fL); // Kiri t x l

  const pB = new THREE.Group();
  pB.position.set(0, uL / 2, 0);
  fBase.add(pB);
  const fB = buildRect(uP, uT);
  fB.position.set(0, uT / 2, 0);
  pB.add(fB); // Belakang p x t

  const pF = new THREE.Group();
  pF.position.set(0, -uL / 2, 0);
  fBase.add(pF);
  const fF = buildRect(uP, uT);
  fF.position.set(0, -uT / 2, 0);
  pF.add(fF); // Depan p x t

  const pT_lid = new THREE.Group();
  pT_lid.position.set(0, -uT / 2, 0);
  fF.add(pT_lid);
  const fT_lid = buildRect(uP, uL);
  fT_lid.position.set(0, -uL / 2, 0);
  pT_lid.add(fT_lid); // Tutup p x l

  // Titik Sudut Balok
  const vPos = [
    [uP / 2, uL / 2, 0],
    [uP / 2, -uL / 2, 0],
    [-uP / 2, uL / 2, 0],
    [-uP / 2, -uL / 2, 0],
    [uP / 2, uL / 2, uT],
    [uP / 2, -uL / 2, uT],
    [-uP / 2, uL / 2, uT],
    [-uP / 2, -uL / 2, uT],
  ];
  vPos.forEach((p) => {
    const v = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
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
      "Jaring-jaring Balok",
      "Berbeda dengan kubus, balok memiliki 3 pasang persegipanjang yang ukurannya sama.",
      "",
    );
  };

  const expText = {
    sisi: [
      "SISI BALOK",
      "Balok memiliki <strong>6 Sisi</strong> yang terdiri dari 3 pasang persegipanjang kembar: (Atas-Bawah), (Depan-Belakang), (Kanan-Kiri).",
      "active-sisi",
    ],
    rusuk: [
      "RUSUK BALOK",
      "Balok tetap memiliki <strong>12 Rusuk</strong>, tetapi terbagi menjadi 3 kelompok panjang: 4 Panjang, 4 Lebar, dan 4 Tinggi.",
      "active-rusuk",
    ],
    titik: [
      "TITIK SUDUT",
      "Sama seperti kubus, balok memiliki <strong>8 Titik Sudut</strong>.",
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
        "<div class='status-banner status-correct'>Benar Sekali!</div><div class='step-by-step'>Walaupun bentuknya memanjang, jumlah unsur balok SAMA PERSIS dengan kubus!</div>";
    } else {
      msg.innerHTML =
        "<div class='status-banner status-wrong'>Masih ada yang salah</div><div class='step-by-step'>Ingat, jumlah unsur balok itu sama persis dengan kubus. Coba lagi!</div>";
    }
  };

  // ==========================================
  // BAGIAN 2: KONSEP VOLUME BALOK
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
  camV.position.set(10, 10, 15);
  const renV = new THREE.WebGLRenderer({ antialias: true });
  renV.setSize(contV.clientWidth, contV.clientHeight);
  contV.appendChild(renV.domElement);
  const ctrlV = new THREE.OrbitControls(camV, renV.domElement);
  sceneV.add(new THREE.AmbientLight(0xffffff, 0.8));

  let vp = 4,
    vl = 2,
    vt = 3;
  let cubesV = [];
  let boxOuter;

  function drawBoxVol() {
    if (boxOuter) sceneV.remove(boxOuter);
    const geo = new THREE.BoxGeometry(vp, vt, vl); // X, Y, Z in ThreeJS
    boxOuter = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({
        color: 0x2d935d,
        opacity: 0.3,
        transparent: true,
      }),
    );
    boxOuter.position.set(vp / 2, vt / 2, vl / 2);
    sceneV.add(boxOuter);

    const maxDim = Math.max(vp, vl, vt);
    camV.position.set(vp * 1.5, vt * 1.5 + maxDim, vl * 1.5 + maxDim);
    ctrlV.target.set(vp / 2, vt / 2, vl / 2);
  }

  function clearCubes() {
    cubesV.forEach((c) => sceneV.remove(c));
    cubesV = [];
    document.getElementById("volume-math-text").innerHTML =
      "Atur slider p, l, t lalu klik tombol susun kardus.";
  }

  function addUnitCube(x, y, z) {
    const sz = 0.96;
    const g = new THREE.BoxGeometry(sz, sz, sz);
    const m = new THREE.MeshPhongMaterial({ color: 0x4caf50 });
    const mesh = new THREE.Mesh(g, m);
    mesh.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(g),
        new THREE.LineBasicMaterial({ color: 0x111111 }),
      ),
    );
    mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    sceneV.add(mesh);
    cubesV.push(mesh);
  }

  const updateVolSliders = () => {
    vp = parseInt(document.getElementById("sl-p").value);
    document.getElementById("val-p").innerText = vp;
    vl = parseInt(document.getElementById("sl-l").value);
    document.getElementById("val-l").innerText = vl;
    vt = parseInt(document.getElementById("sl-t").value);
    document.getElementById("val-t").innerText = vt;
    clearCubes();
    drawBoxVol();
  };
  document.getElementById("sl-p").oninput = updateVolSliders;
  document.getElementById("sl-l").oninput = updateVolSliders;
  document.getElementById("sl-t").oninput = updateVolSliders;

  document.getElementById("btn-vol-lantai").onclick = () => {
    clearCubes();
    for (let i = 0; i < vp; i++) {
      for (let j = 0; j < vl; j++) {
        addUnitCube(i, 0, j);
      }
    }
    document.getElementById("volume-math-text").innerHTML =
      `<b>Langkah 1: Menyusun Lantai</b><br>Luas Alas = p &times; l = ${vp} &times; ${vl} = <b>${vp * vl}</b> kotak kardus.`;
  };

  document.getElementById("btn-vol-penuh").onclick = () => {
    clearCubes();
    for (let y = 0; y < vt; y++) {
      for (let x = 0; x < vp; x++) {
        for (let z = 0; z < vl; z++) {
          addUnitCube(x, y, z);
        }
      }
    }
    document.getElementById("volume-math-text").innerHTML =
      `<b>Langkah 2: Menumpuk Penuh</b><br>Volume = Luas Alas &times; t = ${vp * vl} &times; ${vt} = <b>${vp * vl * vt}</b> kotak kardus.<br>Rumus: <b>V = p &times; l &times; t</b>`;
  };

  document.getElementById("btn-vol-reset").onclick = clearCubes;

  // ==========================================
  // BAGIAN 3: KONSEP LUAS PERMUKAAN BALOK
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
  camLP.position.set(10, 15, 15);
  const renLP = new THREE.WebGLRenderer({ antialias: true });
  renLP.setSize(contLP.clientWidth, contLP.clientHeight);
  contLP.appendChild(renLP.domElement);
  const ctrlLP = new THREE.OrbitControls(camLP, renLP.domElement);
  ctrlLP.enableDamping = true;

  sceneLP.add(new THREE.AmbientLight(0xffffff, 0.6));
  const lightLP = new THREE.PointLight(0xffffff, 1);
  lightLP.position.set(10, 20, 10);
  sceneLP.add(lightLP);

  let masterLP;
  let pR_lp, pL_lp, pB_lp, pF_lp, pT_lp; // Pivots for unfolding

  // Fungsi canggih untuk merender ulang jaring-jaring secara dinamis
  function buildDynamicNet(p, l, t) {
    if (masterLP) sceneLP.remove(masterLP);

    masterLP = new THREE.Group();
    masterLP.rotation.x = -Math.PI / 2;
    sceneLP.add(masterLP);

    const mat = new THREE.MeshPhongMaterial({
      color: 0x2d935d,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    function createFace(w, h) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat.clone());
      m.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(m.geometry),
          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }),
        ),
      );
      return m;
    }

    const fb = createFace(p, l);
    masterLP.add(fb); // ALAS

    pR_lp = new THREE.Group();
    pR_lp.position.set(p / 2, 0, 0);
    fb.add(pR_lp);
    const fr = createFace(t, l);
    fr.position.set(t / 2, 0, 0);
    pR_lp.add(fr); // KANAN

    pL_lp = new THREE.Group();
    pL_lp.position.set(-p / 2, 0, 0);
    fb.add(pL_lp);
    const fl = createFace(t, l);
    fl.position.set(-t / 2, 0, 0);
    pL_lp.add(fl); // KIRI

    pB_lp = new THREE.Group();
    pB_lp.position.set(0, l / 2, 0);
    fb.add(pB_lp);
    const fbk = createFace(p, t);
    fbk.position.set(0, t / 2, 0);
    pB_lp.add(fbk); // BELAKANG

    pF_lp = new THREE.Group();
    pF_lp.position.set(0, -l / 2, 0);
    fb.add(pF_lp);
    const ffr = createFace(p, t);
    ffr.position.set(0, -t / 2, 0);
    pF_lp.add(ffr); // DEPAN

    pT_lp = new THREE.Group();
    pT_lp.position.set(0, -t / 2, 0);
    ffr.add(pT_lp);
    const ft = createFace(p, l);
    ft.position.set(0, -l / 2, 0);
    pT_lp.add(ft); // ATAS (Nempel di Depan)

    // Sesuaikan Kamera agar jaring-jaring muat
    const maxS = Math.max(p, l, t) * 2;
    camLP.position.set(0, maxS + 5, maxS + 2);
    ctrlLP.target.set(0, 0, 0);
  }

  let lP = 4,
    lL = 2,
    lT = 3;
  buildDynamicNet(lP, lL, lT);

  function updateMathLP() {
    const L_alas_tutup = lP * lL;
    const L_depan_blk = lP * lT;
    const L_kanan_kiri = lL * lT;
    const total = 2 * (L_alas_tutup + L_depan_blk + L_kanan_kiri);

    document.getElementById("lp-math-text").innerHTML = `
            <p>1. Luas Pasangan Atas & Bawah: 2 &times; (p&times;l) = 2 &times; (${lP}&times;${lL}) = <strong>${2 * L_alas_tutup}</strong></p>
            <p>2. Luas Pasangan Depan & Belakang: 2 &times; (p&times;t) = 2 &times; (${lP}&times;${lT}) = <strong>${2 * L_depan_blk}</strong></p>
            <p>3. Luas Pasangan Kanan & Kiri: 2 &times; (l&times;t) = 2 &times; (${lL}&times;${lT}) = <strong>${2 * L_kanan_kiri}</strong></p>
            <p style="color:#2d935d; font-weight:bold; font-size:1.2rem; margin-top:10px;">Total Luas Permukaan = ${total}</p>
        `;
  }
  updateMathLP();

  const updateLPSliders = () => {
    lP = parseInt(document.getElementById("sl-lp-p").value);
    document.getElementById("val-lp-p").innerText = lP;
    lL = parseInt(document.getElementById("sl-lp-l").value);
    document.getElementById("val-lp-l").innerText = lL;
    lT = parseInt(document.getElementById("sl-lp-t").value);
    document.getElementById("val-lp-t").innerText = lT;
    buildDynamicNet(lP, lL, lT);
    updateMathLP();
    // Reset Fold State to Unfolded immediately when sliding to see changes
    foldProgLP = 0;
    foldTargetLP = 0;
    isFoldedLP = false;
    document.getElementById("btn-animasi-lp").innerText = "Lipat Kembali";
  };

  document.getElementById("sl-lp-p").oninput = updateLPSliders;
  document.getElementById("sl-lp-l").oninput = updateLPSliders;
  document.getElementById("sl-lp-t").oninput = updateLPSliders;

  let foldProgLP = 1;
  let foldTargetLP = 1;
  let isFoldedLP = true;
  document.getElementById("btn-animasi-lp").onclick = (e) => {
    isFoldedLP = !isFoldedLP;
    foldTargetLP = isFoldedLP ? 1 : 0;
    e.target.innerText = isFoldedLP ? "Buka Jaring-jaring" : "Lipat Kembali";
  };

  // ==========================================
  // BAGIAN 4: LATIHAN MANDIRI (RUNTUT BALOK)
  // ==========================================
  document.getElementById("btn-latihan").onclick = () => {
    const pVal = parseInt(document.getElementById("lat-p").value);
    const lVal = parseInt(document.getElementById("lat-l").value);
    const tVal = parseInt(document.getElementById("lat-t").value);
    const vVal = parseInt(document.getElementById("lat-v").value);
    const lpVal = parseInt(document.getElementById("lat-lp").value);
    const fb = document.getElementById("latihan-feedback");
    const status = document.getElementById("latihan-status");

    if (
      isNaN(pVal) ||
      isNaN(lVal) ||
      isNaN(tVal) ||
      isNaN(vVal) ||
      isNaN(lpVal)
    ) {
      alert("Harap isi semua kotak dengan angka.");
      return;
    }

    const vCorrect = pVal * lVal * tVal;
    const pl = pVal * lVal;
    const pt = pVal * tVal;
    const lt = lVal * tVal;
    const lpCorrect = 2 * (pl + pt + lt);
    fb.classList.remove("hidden");

    // Populate Identitas
    document.getElementById("ans-p").innerText = pVal;
    document.getElementById("ans-l").innerText = lVal;
    document.getElementById("ans-t").innerText = tVal;

    // Populate Volume
    document.getElementById("ans-p1").innerText = pVal;
    document.getElementById("ans-l1").innerText = lVal;
    document.getElementById("ans-t1").innerText = tVal;
    document.getElementById("ans-v").innerText = vCorrect;

    // Populate LP
    document.getElementById("ans-p2").innerText = pVal;
    document.getElementById("ans-l2").innerText = lVal;
    document.getElementById("ans-p3").innerText = pVal;
    document.getElementById("ans-t2").innerText = tVal;
    document.getElementById("ans-l3").innerText = lVal;
    document.getElementById("ans-t3").innerText = tVal;
    document.getElementById("ans-pl").innerText = pl;
    document.getElementById("ans-pt").innerText = pt;
    document.getElementById("ans-lt").innerText = lt;
    document.getElementById("ans-sum").innerText = pl + pt + lt;
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
  // RENDER LOOP BERSAMA
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
    pT_lid.rotation.x = -angU;

    // Animasi Luas Permukaan
    foldProgLP += (foldTargetLP - foldProgLP) * 0.08;
    const angLP = (Math.PI / 2) * foldProgLP;
    if (masterLP) {
      pR_lp.rotation.y = -angLP;
      pL_lp.rotation.y = angLP;
      pB_lp.rotation.x = angLP;
      pF_lp.rotation.x = -angLP;
      pT_lp.rotation.x = -angLP;
    }

    ctrlU.update();
    ctrlV.update();
    ctrlLP.update();
    renU.render(sceneU, camU);
    renV.render(sceneV, camV);
    renLP.render(sceneLP, camLP);
  }

  drawBoxVol();
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
