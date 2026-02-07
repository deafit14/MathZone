document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".materi-card");

  // Memunculkan kartu satu per satu dengan jeda waktu (stagger)
  cards.forEach((card, index) => {
    setTimeout(
      () => {
        card.classList.add("show");
      },
      150 * (index + 1),
    ); // Jeda 150ms antar item
  });

  // Event listener untuk klik materi
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const namaMateri = this.innerText;
      console.log("Membuka materi: " + namaMateri);

      // Tambahkan animasi klik kecil
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "translateY(-5px) scale(1)";
        // Arahkan ke halaman materi spesifik jika ada
        // window.location.href = namaMateri.toLowerCase().replace(/ /g, "-") + ".html";
      }, 100);
    });
  });
});
