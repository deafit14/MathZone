document.addEventListener("DOMContentLoaded", () => {
  const btnBuatKerangka = document.getElementById("btn-buat-kerangka");
  const inputRusuk = document.getElementById("rusuk-input");
  const infoTotalPanel = document.getElementById("total-panel-dibutuhkan");
  const faces = document.querySelectorAll(".face");
  const tandon = document.getElementById("tandon");
  const dropZone = document.getElementById("drop-zone");
  const panelTerpasang = document.getElementById("panel-terpasang");
  const successMsg = document.getElementById("success-message");
  const sourcePanel = document.getElementById("source-panel");
  const btnReset = document.getElementById("btn-reset");

  let rusuk = 2;
  let facesFilled = 0;

  // 1. UPDATE KERANGKA
  btnBuatKerangka.addEventListener("click", () => {
    rusuk = parseInt(inputRusuk.value);
    if (rusuk < 1) rusuk = 1;

    // Hitung total panel 1x1 yang dibutuhkan (6 * r * r)
    let total = 6 * (rusuk * rusuk);
    infoTotalPanel.innerText = total;

    // Atur CSS variable untuk membuat efek grid kotak-kotak pada panel
    document.documentElement.style.setProperty("--grid-size", rusuk);

    resetPuzzle();
  });

  // Inisiasi awal grid
  document.documentElement.style.setProperty("--grid-size", rusuk);

  // 2. LOGIKA ROTASI KUBUS (SWIPE / DRAG BG)
  let isSpinning = false;
  let startX, startY;
  let currentX = -15,
    currentY = 25;

  dropZone.addEventListener("pointerdown", (e) => {
    // Jika yang disentuh bukan kerangka/background, batalkan (biarkan drag jalan)
    if (e.target.closest(".draggable-panel")) return;
    isSpinning = true;
    startX = e.clientX;
    startY = e.clientY;
    dropZone.style.cursor = "grabbing";
  });

  window.addEventListener("pointerup", () => {
    isSpinning = false;
    dropZone.style.cursor = "default";
  });

  window.addEventListener("pointermove", (e) => {
    if (!isSpinning) return;
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;

    currentY += deltaX * 0.5;
    currentX -= deltaY * 0.5;

    tandon.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
  });

  // 3. LOGIKA DRAG AND DROP PANEL (Custom Pointer Events untuk HP & Laptop)
  let isDraggingPanel = false;
  let clonedPanel = null;

  sourcePanel.addEventListener("pointerdown", (e) => {
    if (facesFilled >= 6) return; // Jika sudah penuh, tidak bisa tarik lagi

    isDraggingPanel = true;

    // Buat clone panel untuk efek melayang
    clonedPanel = sourcePanel.cloneNode(true);
    clonedPanel.classList.add("is-dragging");
    document.body.appendChild(clonedPanel);

    moveClone(e.clientX, e.clientY);
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDraggingPanel || !clonedPanel) return;
    moveClone(e.clientX, e.clientY);
  });

  window.addEventListener("pointerup", (e) => {
    if (!isDraggingPanel || !clonedPanel) return;

    // Cek apakah posisi drop berada di atas area dropZone (kerangka 3D)
    const dropRect = dropZone.getBoundingClientRect();
    if (
      e.clientX >= dropRect.left &&
      e.clientX <= dropRect.right &&
      e.clientY >= dropRect.top &&
      e.clientY <= dropRect.bottom
    ) {
      // Jika dijatuhkan di area kerangka, isi salah satu sisi yang masih kosong
      fillNextEmptyFace();
    }

    // Hapus elemen melayang
    clonedPanel.remove();
    clonedPanel = null;
    isDraggingPanel = false;
  });

  function moveClone(x, y) {
    // Menempatkan titik tengah panel tepat di jari/kursor
    clonedPanel.style.left = x - 40 + "px"; // 40 adalah setengah lebar panel (80px)
    clonedPanel.style.top = y - 40 + "px";
  }

  function fillNextEmptyFace() {
    // Cari wajah (face) yang belum terisi
    const emptyFace = Array.from(faces).find(
      (face) => !face.classList.contains("filled"),
    );

    if (emptyFace) {
      emptyFace.classList.add("filled");
      facesFilled++;
      panelTerpasang.innerText = facesFilled;

      if (facesFilled === 6) {
        successMsg.classList.remove("hidden");
        sourcePanel.style.opacity = "0.5";
        sourcePanel.style.cursor = "not-allowed";
      }
    }
  }

  // 4. RESET FUNGSI
  btnReset.addEventListener("click", resetPuzzle);

  function resetPuzzle() {
    facesFilled = 0;
    panelTerpasang.innerText = facesFilled;
    successMsg.classList.add("hidden");
    sourcePanel.style.opacity = "1";
    sourcePanel.style.cursor = "grab";

    faces.forEach((face) => {
      face.classList.remove("filled");
    });

    // Kembalikan rotasi
    currentX = -15;
    currentY = 25;
    tandon.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
  }
});
