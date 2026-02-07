// === LOGIKA ROTASI (DRAG) KUBUS ===
document.querySelectorAll(".draggable").forEach((element) => {
  let isDragging = false;
  let startX, startY;
  let rotX = -20,
    rotY = 30;

  const start = (x, y) => {
    if (element.classList.contains("unfold")) return;
    isDragging = true;
    startX = x;
    startY = y;
    element.style.cursor = "grabbing";
  };

  const move = (x, y) => {
    if (!isDragging) return;
    rotY += (x - startX) * 0.5;
    rotX -= (y - startY) * 0.5;
    element.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    startX = x;
    startY = y;
  };

  const end = () => {
    isDragging = false;
    element.style.cursor = "grab";
  };

  element.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  window.addEventListener("mouseup", end);

  element.addEventListener(
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

// === LOGIKA TOMBOL JARING-JARING ===
let isGiftUnfolded = false;
function toggleGift() {
  const gift = document.getElementById("giftCube");
  const btn = document.querySelector(".btn-action");
  isGiftUnfolded = !isGiftUnfolded;

  if (isGiftUnfolded) {
    gift.classList.add("unfold");
    btn.innerText = "TUTUP KEMBALI";
    gift.style.transform = "rotateX(0deg) rotateY(0deg)";
  } else {
    gift.classList.remove("unfold");
    btn.innerText = "CEK JARING-JARING";
    gift.style.transform = "rotateX(-20deg) rotateY(30deg)";
  }
}
