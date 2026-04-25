document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("main-container");
  const dropZone = document.getElementById("drop-zone");
  const sourceBox = document.getElementById("source-box");
  const countDisplay = document.getElementById("count-terisi");
  const volumeDisplay = document.getElementById("volume-sisa");
  const resetBtn = document.getElementById("btn-reset");
  const successAlert = document.getElementById("success-alert");

  let boxCount = 0;

  // Konfigurasi Grid Visual (Skala: 5 panjang x 3 tinggi x 2 lebar = 30 blok)
  const colsX = 5;
  const levelsY = 3;
  const rowsZ = 2;
  const maxBoxes = colsX * levelsY * rowsZ;

  const boxW = 240 / colsX; // 48px
  const boxH = 120 / levelsY; // 40px
  const boxD = 120 / rowsZ; // 60px

  // 1. ROTASI KONTAINER
  let isSpinning = false;
  let startX, startY;
  let currX = -20,
    currY = 30;

  dropZone.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".draggable-box")) return;
    isSpinning = true;
    startX = e.clientX;
    startY = e.clientY;
    dropZone.style.cursor = "grabbing";
  });

  window.addEventListener("pointermove", (e) => {
    if (!isSpinning) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    currY += dx * 0.5;
    currX -= dy * 0.5;
    mainContainer.style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener("pointerup", () => {
    isSpinning = false;
    dropZone.style.cursor = "default";
  });

  // 2. LOGIKA DRAG PANEL
  let isDragging = false;
  let clone = null;

  sourceBox.addEventListener("pointerdown", (e) => {
    if (boxCount >= maxBoxes) return;

    isDragging = true;
    clone = sourceBox.cloneNode(true);
    clone.classList.add("is-dragging");
    document.body.appendChild(clone);
    updateClonePos(e.clientX, e.clientY);
  });

  window.addEventListener("pointermove", (e) => {
    if (isDragging && clone) updateClonePos(e.clientX, e.clientY);
  });

  window.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    const rect = dropZone.getBoundingClientRect();

    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      snapBoxIntoGrid();
    }

    clone.remove();
    isDragging = false;
  });

  function updateClonePos(x, y) {
    clone.style.left = x - 70 + "px";
    clone.style.top = y - 30 + "px";
  }

  // 3. MERAKIT BALOK 3D KE DALAM KONTAINER
  function snapBoxIntoGrid() {
    if (boxCount >= maxBoxes) return;

    const box = document.createElement("div");
    box.className = "shoe-box";

    // Merakit 6 sisi menjadi balok solid
    const faces = [
      "sb-front",
      "sb-back",
      "sb-right",
      "sb-left",
      "sb-top",
      "sb-bottom",
    ];
    faces.forEach((faceClass) => {
      const face = document.createElement("div");
      face.className = `sb-face ${faceClass}`;
      box.appendChild(face);
    });

    let zIndex = boxCount % rowsZ;
    let xIndex = Math.floor(boxCount / rowsZ) % colsX;
    let yIndex = Math.floor(boxCount / (rowsZ * colsX));

    box.style.left = xIndex * boxW + "px";
    box.style.bottom = yIndex * boxH + "px";

    let zPos = zIndex * boxD - 60 + boxD / 2;
    box.style.transform = `translateZ(${zPos}px)`;

    mainContainer.appendChild(box);
    boxCount++;

    countDisplay.innerText = boxCount;

    if (boxCount === maxBoxes) {
      volumeDisplay.innerText = "Penuh Rapat!";
      volumeDisplay.style.color = "#10b981";
      successAlert.classList.remove("hidden");
      sourceBox.style.opacity = "0.5";
    } else {
      volumeDisplay.innerText = "Proses Isi...";
    }
  }

  // 4. RESET
  resetBtn.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".shoe-box");
    boxes.forEach((b) => b.remove());
    boxCount = 0;
    countDisplay.innerText = "0";
    volumeDisplay.innerText = "Kosong";
    volumeDisplay.style.color = "#fbbf24";
    successAlert.classList.add("hidden");
    sourceBox.style.opacity = "1";

    currX = -20;
    currY = 30;
    mainContainer.style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;
  });
});
