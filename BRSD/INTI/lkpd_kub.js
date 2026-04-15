document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk animasi scroll (fade up) pada kartu materi
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      // Menentukan seberapa jauh elemen harus di layar sebelum muncul
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 50;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  }

  // Memicu fungsi saat halaman di-scroll
  window.addEventListener("scroll", reveal);

  // Memicu fungsi sekali saat halaman pertama kali dimuat agar elemen atas langsung muncul
  reveal();
});
