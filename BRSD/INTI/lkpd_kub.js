// === LOGIKA ROTASI DADU 3D (DRAG) ===
const dadu = document.getElementById("dadu");
let isDragging = false,
  startX,
  startY,
  rotX = -20,
  rotY = 30;
let isLocked = false; // Mencegah dadu diputar saat sedang dibongkar

const start = (x, y) => {
  if (isLocked) return; // Jika sedang dibongkar, abaikan klik
  isDragging = true;
  startX = x;
  startY = y;
  dadu.style.cursor = "grabbing";
  dadu.classList.add("dragging");
};

const move = (x, y) => {
  if (!isDragging || isLocked) return;
  const deltaX = x - startX;
  const deltaY = y - startY;

  rotY += deltaX * 0.5;
  rotX -= deltaY * 0.5;

  dadu.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  startX = x;
  startY = y;
};

const end = () => {
  if (isLocked) return;
  isDragging = false;
  dadu.style.cursor = "grab";
  dadu.classList.remove("dragging");
};

// Event Listener Mouse
dadu.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
window.addEventListener("mouseup", end);

// Event Listener Touch (Untuk HP/Tablet)
dadu.addEventListener(
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

// === FUNGSI BONGKAR DADU (JARING-JARING) ===
function toggleBongkarDadu() {
  const btn = document.querySelector(".btn-action");

  // Ubah status kunci
  isLocked = !isLocked;

  // Tambah/hapus class unfold untuk memicu animasi CSS
  dadu.classList.toggle("unfold");

  if (isLocked) {
    btn.innerText = "KEMBALIKAN DADU";
    btn.style.backgroundColor = "#e74c3c"; // Berubah merah saat dibongkar
    btn.style.color = "#fff";
  } else {
    btn.innerText = "BONGKAR DADU";
    btn.style.backgroundColor = "#f1c40f"; // Kembali kuning
    btn.style.color = "#333";
    // Kembalikan ke posisi rotasi terakhir yang disimpan
    dadu.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
}

// === FUNGSI TOMBOL PETUNJUK (HINT) ===
function toggleHint(hintId) {
  const hintElement = document.getElementById(hintId);

  if (hintElement.style.display === "block") {
    hintElement.style.display = "none";
  } else {
    hintElement.style.display = "block";
  }
}
