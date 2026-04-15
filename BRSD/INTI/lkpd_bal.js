// === LOGIKA ROTASI BALOK 3D (DRAG) ===
const kardus = document.getElementById("kardus");
let isDragging = false,
  startX,
  startY,
  rotX = -20,
  rotY = 30;
let isLocked = false;

const start = (x, y) => {
  if (isLocked) return;
  isDragging = true;
  startX = x;
  startY = y;
  kardus.style.cursor = "grabbing";
  kardus.classList.add("dragging");
};

const move = (x, y) => {
  if (!isDragging || isLocked) return;
  const deltaX = x - startX;
  const deltaY = y - startY;

  rotY += deltaX * 0.5;
  rotX -= deltaY * 0.5;

  kardus.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  startX = x;
  startY = y;
};

const end = () => {
  if (isLocked) return;
  isDragging = false;
  kardus.style.cursor = "grab";
  kardus.classList.remove("dragging");
};

kardus.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
window.addEventListener("mouseup", end);

kardus.addEventListener(
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

// === FUNGSI BONGKAR KARDUS ===
function toggleBongkarBalok() {
  const btn = document.querySelector(".btn-action");
  isLocked = !isLocked;
  kardus.classList.toggle("unfold");

  if (isLocked) {
    btn.innerText = "LIPAT KEMBALI KARDUS";
    btn.style.backgroundColor = "#e74c3c";
    btn.style.color = "#fff";
  } else {
    btn.innerText = "BONGKAR KARDUS";
    btn.style.backgroundColor = "#f1c40f";
    btn.style.color = "#333";
    kardus.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
}

// === FUNGSI UPDATE LABEL DARI INPUT ===
function updateLabelBalok() {
  const p = document.getElementById("val_p").value;
  const l = document.getElementById("val_l").value;
  const t = document.getElementById("val_t").value;

  document.getElementById("lbl_p").innerText = p + " cm";
  document.getElementById("lbl_l").innerText = l + " cm";
  document.getElementById("lbl_t").innerText = t + " cm";
}

// === FUNGSI TOMBOL PETUNJUK (HINT) ===
function toggleHint(hintId) {
  const hintElement = document.getElementById(hintId);
  hintElement.style.display =
    hintElement.style.display === "block" ? "none" : "block";
}

// Jalankan update label pertama kali halaman dimuat
document.addEventListener("DOMContentLoaded", updateLabelBalok);
