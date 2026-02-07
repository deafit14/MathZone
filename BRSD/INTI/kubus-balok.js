// === NAVIGASI & SCROLL ===
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50)
      el.classList.add("active");
  });
});
function scrollToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// === LOGIKA ROTASI (DRAG) ===
let isLocked = false;
document.querySelectorAll(".draggable").forEach((cube) => {
  let isDragging = false,
    startX,
    startY,
    rotX = -20,
    rotY = 30;
  const start = (x, y) => {
    if (!isLocked) {
      isDragging = true;
      startX = x;
      startY = y;
      cube.style.cursor = "grabbing";
    }
  };
  const move = (x, y) => {
    if (!isDragging) return;
    rotY += (x - startX) * 0.5;
    rotX -= (y - startY) * 0.5;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    startX = x;
    startY = y;
  };
  const end = () => {
    isDragging = false;
    cube.style.cursor = "grab";
  };

  cube.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  window.addEventListener("mouseup", end);
  cube.addEventListener(
    "touchstart",
    (e) => start(e.touches[0].clientX, e.touches[0].clientY),
    { passive: false },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      if (isDragging) e.preventDefault();
      move(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: false },
  );
  window.addEventListener("touchend", end);
});

// === KUBUS FUNCTIONS (TETAP) ===
function cekKubusIdent() {
  const s = document.getElementById("k_sisi").value,
    r = document.getElementById("k_rusuk").value,
    t = document.getElementById("k_titik").value;
  const box = document.getElementById("res_kubus_ident");
  box.style.display = "block";

  // Perbaikan: Kubus juga pakai detail benar/salah agar konsisten
  let msg = "";
  msg += s == 6 ? "✅ Sisi: Benar (6)<br>" : "❌ Sisi: Salah (Hitung lagi)<br>";
  msg +=
    r == 12 ? "✅ Rusuk: Benar (12)<br>" : "❌ Rusuk: Salah (Hitung lagi)<br>";
  msg +=
    t == 8
      ? "✅ Titik Sudut: Benar (8)"
      : "❌ Titik Sudut: Salah (Hitung lagi)";
  box.innerHTML = msg;
}

function updateLabelKubus() {
  document.getElementById("lbl_sisi").innerText =
    document.getElementById("val_sisi").value;
}
function cekKubusVol() {
  const s = document.getElementById("val_sisi").value,
    ans = document.getElementById("ans_kubus_vol").value;
  const res = s * s * s;
  const box = document.getElementById("res_kubus_vol");
  box.style.display = "block";
  box.innerHTML = `
        <b>${ans == res ? "✅ Benar" : "❌ Salah"}</b><br>
        <b>Diketahui:</b> s=${s}<br>
        <b>Ditanya:</b> Volume?<br>
        <b>Jawab:</b> V = s³ = <b>${res} cm³</b>`;
}
function toggleBongkarKubus() {
  const cube = document.getElementById("cube_lp");
  isLocked = !isLocked;
  cube.classList.toggle("unfold");
  document.querySelector(".btn-unfold").innerText = isLocked
    ? "KEMBALIKAN"
    : "BONGKAR";
  if (!isLocked) cube.style.transform = "rotateX(-20deg) rotateY(30deg)";
}
function cekKubusLP() {
  const s = document.getElementById("val_sisi_lp").value,
    ans = document.getElementById("ans_kubus_lp").value;
  const res = 6 * s * s;
  const box = document.getElementById("res_kubus_lp");
  box.style.display = "block";
  box.innerHTML = `
        <b>${ans == res ? "✅ Benar" : "❌ Salah"}</b><br>
        <b>Diketahui:</b> s=${s}<br>
        <b>Ditanya:</b> LP?<br>
        <b>Jawab:</b> LP = 6xs² = <b>${res} cm²</b>`;
}

// === BALOK FUNCTIONS (DIPERBAIKI SESUAI REQUEST) ===

// 1. Identifikasi Balok: Terpisah Benar/Salahnya
function cekBalokIdent() {
  const s = document.getElementById("b_sisi").value;
  const r = document.getElementById("b_rusuk").value;
  const t = document.getElementById("b_titik").value;
  const box = document.getElementById("res_balok_ident");
  box.style.display = "block";

  let feedback = "";

  // Cek Sisi
  if (s == 6) feedback += "✅ <b>Sisi:</b> Benar (6)<br>";
  else feedback += "❌ <b>Sisi:</b> Salah (Hitung dindingnya)<br>";

  // Cek Rusuk
  if (r == 12) feedback += "✅ <b>Rusuk:</b> Benar (12)<br>";
  else feedback += "❌ <b>Rusuk:</b> Salah (Hitung kerangkanya)<br>";

  // Cek Titik Sudut
  if (t == 8) feedback += "✅ <b>Titik Sudut:</b> Benar (8)";
  else feedback += "❌ <b>Titik Sudut:</b> Salah (Hitung pojoknya)";

  box.innerHTML = feedback;
}

// 2. Volume Balok: Diketahui, Ditanya, Dijawab
function cekBalokVol() {
  const p = parseFloat(document.getElementById("val_p").value);
  const l = parseFloat(document.getElementById("val_l").value);
  const t = parseFloat(document.getElementById("val_t").value);
  const ans = parseFloat(document.getElementById("ans_balok_vol").value);
  const res = p * l * t;
  const box = document.getElementById("res_balok_vol");
  box.style.display = "block";

  box.innerHTML = `
        <b>${ans === res ? "✅ Jawaban Benar!" : "❌ Masih Salah"}</b><br><br>
        <b>Diketahui:</b><br>
        p = ${p} cm, l = ${l} cm, t = ${t} cm<br>
        <b>Ditanya:</b> Volume?<br>
        <b>Jawab:</b><br>
        V = p x l x t<br>
        V = ${p} x ${l} x ${t}<br>
        V = <b>${res} cm³</b>
    `;
}

function toggleBongkarBalok() {
  const cube = document.getElementById("balok_lp");
  isLocked = !isLocked;
  cube.classList.toggle("unfold");
  document.querySelector(".btn-unfold-balok").innerText = isLocked
    ? "KEMBALIKAN"
    : "BONGKAR";
  if (!isLocked) cube.style.transform = "rotateX(-20deg) rotateY(30deg)";
}

// 3. Luas Permukaan Balok: Diketahui, Ditanya, Dijawab
function cekBalokLP() {
  const p = parseFloat(document.getElementById("lp_p").value);
  const l = parseFloat(document.getElementById("lp_l").value);
  const t = parseFloat(document.getElementById("lp_t").value);
  const ans = parseFloat(document.getElementById("ans_balok_lp").value);

  // Rumus: 2(pl + pt + lt)
  const pl = p * l;
  const pt = p * t;
  const lt = l * t;
  const res = 2 * (pl + pt + lt);

  const box = document.getElementById("res_balok_lp");
  box.style.display = "block";

  box.innerHTML = `
        <b>${ans === res ? "✅ Jawaban Benar!" : "❌ Masih Salah"}</b><br><br>
        <b>Diketahui:</b> p = ${p}, l = ${l}, t = ${t}<br>
        <b>Ditanya:</b> Luas Permukaan?<br>
        <b>Jawab:</b><br>
        LP = 2 x ((p x l) + (p x t) + (l x t))<br>
        LP = 2 x (${pl} + ${pt} + ${lt})<br>
        LP = 2 x ${pl + pt + lt}<br>
        LP = <b>${res} cm²</b>
    `;
}
