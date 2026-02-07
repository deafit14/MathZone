// === LOGIKA ROTASI (DRAG) UNTUK SEMUA BALOK ===
document.querySelectorAll(".draggable").forEach((element) => {
  let isDragging = false;
  let startX, startY;
  let rotX = -20,
    rotY = 30; // Posisi awal standar

  const start = (x, y) => {
    isDragging = true;
    startX = x;
    startY = y;
    element.style.cursor = "grabbing";
  };

  const move = (x, y) => {
    if (!isDragging) return;
    const deltaX = x - startX;
    const deltaY = y - startY;

    // Sensitivitas putaran
    rotY += deltaX * 0.5;
    rotX -= deltaY * 0.5;

    element.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    startX = x;
    startY = y;
  };

  const end = () => {
    isDragging = false;
    element.style.cursor = "grab";
  };

  // Event Listeners (Mouse - Laptop)
  element.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  window.addEventListener("mouseup", end);

  // Event Listeners (Touch - HP)
  element.addEventListener(
    "touchstart",
    (e) => start(e.touches[0].clientX, e.touches[0].clientY),
    { passive: false },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      if (isDragging) e.preventDefault(); // Mencegah layar scroll saat memutar 3D
      move(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: false },
  );
  window.addEventListener("touchend", end);
});
