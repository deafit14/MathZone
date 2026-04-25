document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  // Animasi muncul berurutan (Slide-in)
  cards.forEach((card, index) => {
    setTimeout(
      () => {
        card.classList.add("show-card");
      },
      200 * (index + 1),
    );
  });

  // Efek suara atau haptic sederhana bisa ditambahkan di sini
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Logika tambahan saat kursor masuk
    });
  });
});
