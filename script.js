document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startBtn");

  if (startButton) {
    startButton.addEventListener("click", () => {
      // Memberikan efek klik sebelum berpindah
      startButton.style.transform = "scale(0.9)";

      setTimeout(() => {
        // Berpindah ke halaman materi.html
        window.location.href = "materi.html";
      }, 150); // Delay singkat 150ms agar animasi klik terlihat
    });
  }
});
