document.addEventListener("DOMContentLoaded", () => {
  // --- FUNGSI BANTUAN ---
  // Fungsi untuk mendapatkan angka acak
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fungsi untuk mengacak posisi pilihan ganda
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Fungsi menggambar visual kubus sederhana pakai SVG dengan label
  function generateCubeSVG(labelTop, labelSide, labelBottom) {
    return `
        <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#2d935d" stroke-width="2" stroke-linejoin="round" fill="#e8f5e9">
                <polygon points="50,10 85,25 50,40 15,25" fill="#c8e6c9" />
                <polygon points="15,25 50,40 50,85 15,70" />
                <polygon points="50,40 85,25 85,70 50,85" fill="#a5d6a7"/>
            </g>
            <text x="50" y="97" font-size="12" text-anchor="middle" font-weight="bold" fill="#333">${labelBottom}</text>
            <text x="15" y="15" font-size="12" text-anchor="start" font-weight="bold" fill="#d32f2f">${labelTop}</text>
        </svg>`;
  }

  // --- GENERATOR SOAL DINAMIS ---
  let questions = [];

  function generateQuestions() {
    questions = []; // Reset

    // 1. Cepat - Cari Volume dari sisi
    let s1 = rand(5, 15);
    let v1 = s1 * s1 * s1;
    questions.push({
      type: "Cepat",
      text: `Sebuah kubus memiliki panjang rusuk ${s1} cm. Berapakah volume kubus tersebut?`,
      svg: generateCubeSVG("", "", `s = ${s1} cm`),
      options: [v1, v1 + 10, v1 - s1, s1 * s1 * 6].map(String),
      correct: String(v1),
      unit: "cm³",
      diketahui: `Panjang rusuk (s) = ${s1} cm`,
      ditanya: `Volume (V) ?`,
      jawab: `V = s × s × s<br>V = ${s1} × ${s1} × ${s1}<br>V = <strong>${v1} cm³</strong>`,
    });

    // 2. Cepat - Cari LP dari sisi
    let s2 = rand(4, 12);
    let lp2 = 6 * (s2 * s2);
    questions.push({
      type: "Cepat",
      text: `Diketahui panjang rusuk sebuah kubus adalah ${s2} cm. Luas permukaan kubus tersebut adalah...`,
      svg: generateCubeSVG("", "", `s = ${s2} cm`),
      options: [lp2, s2 * s2 * s2, 4 * (s2 * s2), lp2 + 12].map(String),
      correct: String(lp2),
      unit: "cm²",
      diketahui: `Panjang rusuk (s) = ${s2} cm`,
      ditanya: `Luas Permukaan (LP) ?`,
      jawab: `LP = 6 × (s × s)<br>LP = 6 × (${s2} × ${s2})<br>LP = 6 × ${s2 * s2}<br>LP = <strong>${lp2} cm²</strong>`,
    });

    // 3. Cepat - Cari sisi dari Volume
    let s3 = rand(6, 12);
    let v3 = s3 * s3 * s3;
    questions.push({
      type: "Cepat",
      text: `Jika volume sebuah kubus adalah ${v3} cm³, maka panjang rusuknya adalah...`,
      svg: generateCubeSVG(`V = ${v3}`, "", `s = ?`),
      options: [s3, s3 - 1, s3 + 2, s3 * 2].map(String),
      correct: String(s3),
      unit: "cm",
      diketahui: `Volume (V) = ${v3} cm³`,
      ditanya: `Panjang rusuk (s) ?`,
      jawab: `V = s³<br>${v3} = s³<br>s = ∛${v3}<br>s = <strong>${s3} cm</strong>`,
    });

    // 4. Cepat - Cari sisi dari Luas Permukaan
    let s4 = rand(5, 10);
    let lp4 = 6 * (s4 * s4);
    questions.push({
      type: "Cepat",
      text: `Luas permukaan sebuah kubus adalah ${lp4} cm². Panjang rusuk kubus tersebut adalah...`,
      svg: generateCubeSVG(`LP = ${lp4}`, "", `s = ?`),
      options: [s4, s4 * 6, s4 + 1, s4 * s4].map(String),
      correct: String(s4),
      unit: "cm",
      diketahui: `Luas Permukaan (LP) = ${lp4} cm²`,
      ditanya: `Panjang rusuk (s) ?`,
      jawab: `LP = 6 × s²<br>${lp4} = 6 × s²<br>s² = ${lp4} / 6<br>s² = ${s4 * s4}<br>s = √${s4 * s4} = <strong>${s4} cm</strong>`,
    });

    // 5. Cepat - Cari Volume dari keliling rusuk
    let s5 = rand(3, 8);
    let kr5 = 12 * s5;
    let v5 = s5 * s5 * s5;
    questions.push({
      type: "Cepat",
      text: `Jumlah panjang seluruh rusuk sebuah kubus adalah ${kr5} cm. Berapakah volume kubus tersebut?`,
      svg: generateCubeSVG(`Total Rusuk = ${kr5}`, "", `s = ?`),
      options: [v5, s5 * s5, 6 * (s5 * s5), kr5 * 3].map(String),
      correct: String(v5),
      unit: "cm³",
      diketahui: `Total panjang rusuk = ${kr5} cm<br>Jumlah rusuk kubus = 12`,
      ditanya: `Volume (V) ?`,
      jawab: `Langkah 1 (Cari s):<br>s = Total Rusuk / 12<br>s = ${kr5} / 12 = ${s5} cm<br><br>Langkah 2 (Cari Volume):<br>V = s × s × s<br>V = ${s5} × ${s5} × ${s5} = <strong>${v5} cm³</strong>`,
    });

    // 6. Cerita - Aquarium Liter
    let s6 = rand(4, 9); // dalam dm
    let v6 = s6 * s6 * s6;
    questions.push({
      type: "Cerita",
      text: `Sebuah akuarium berbentuk kubus memiliki panjang rusuk bagian dalam ${s6} dm. Jika akuarium tersebut diisi air sampai penuh, berapa liter air yang dibutuhkan? (1 dm³ = 1 Liter)`,
      svg: generateCubeSVG("Akuarium", "", `s = ${s6} dm`),
      options: [v6, v6 * 10, s6 * s6 * 6, v6 / 2].map(String),
      correct: String(v6),
      unit: "Liter",
      diketahui: `Bentuk: Kubus<br>Panjang rusuk (s) = ${s6} dm<br>Terisi = Penuh`,
      ditanya: `Volume air dalam Liter ?`,
      jawab: `V = s × s × s<br>V = ${s6} × ${s6} × ${s6}<br>V = ${v6} dm³<br>Karena 1 dm³ = 1 Liter, maka air yang dibutuhkan adalah <strong>${v6} Liter</strong>.`,
    });

    // 7. Cerita - Kerangka Kawat
    let s7 = rand(10, 20);
    let kr7 = 12 * s7;
    questions.push({
      type: "Cerita",
      text: `Deafit ditugaskan membuat kerangka kubus dari kawat. Jika ia memiliki kawat sepanjang ${kr7} cm, berapa panjang rusuk maksimal yang bisa ia buat agar kawatnya habis terpakai?`,
      svg: generateCubeSVG("Kawat", "", `Total = ${kr7} cm`),
      options: [s7, s7 * 12, s7 * 2, s7 / 2].map(String),
      correct: String(s7),
      unit: "cm",
      diketahui: `Panjang kawat (Total Rusuk) = ${kr7} cm<br>Kubus memiliki 12 rusuk yang sama panjang.`,
      ditanya: `Panjang rusuk (s) ?`,
      jawab: `Total Rusuk = 12 × s<br>${kr7} = 12 × s<br>s = ${kr7} / 12<br>s = <strong>${s7} cm</strong>.`,
    });

    // 8. Cerita - Pengecatan (LP)
    let s8 = rand(2, 6);
    let lp8 = 6 * (s8 * s8);
    questions.push({
      type: "Cerita",
      text: `Sebuah kotak kayu berbentuk kubus dengan panjang rusuk ${s8} m akan dicat seluruh permukaan luarnya. Berapa luas area kotak yang akan dicat tersebut?`,
      svg: generateCubeSVG("Dicat Luar", "", `s = ${s8} m`),
      options: [lp8, s8 * s8 * s8, s8 * s8, lp8 * 2].map(String),
      correct: String(lp8),
      unit: "m²",
      diketahui: `Bentuk: Kubus<br>Panjang rusuk (s) = ${s8} m<br>Dicat seluruh permukaannya.`,
      ditanya: `Luas Permukaan (LP) ?`,
      jawab: `Karena dicat di seluruh permukaannya, kita mencari Luas Permukaan kubus.<br>LP = 6 × (s × s)<br>LP = 6 × (${s8} × ${s8})<br>LP = 6 × ${s8 * s8}<br>LP = <strong>${lp8} m²</strong>.`,
    });

    // 9. Cerita - Kubus dalam Kubus
    let s9_kecil = rand(2, 4);
    let kelipatan = rand(3, 5);
    let s9_besar = s9_kecil * kelipatan;
    let jml9 = Math.pow(kelipatan, 3);
    questions.push({
      type: "Cerita",
      text: `Sebuah kardus besar berbentuk kubus memiliki rusuk ${s9_besar} cm. Kardus tersebut akan diisi dengan rubik-rubik kecil yang juga berbentuk kubus dengan rusuk ${s9_kecil} cm sampai penuh. Berapa banyak rubik kecil yang dapat dimasukkan?`,
      svg: generateCubeSVG(`S = ${s9_besar} cm`, "", `s = ${s9_kecil} cm`),
      options: [jml9, kelipatan, kelipatan * 6, jml9 * 2].map(String),
      correct: String(jml9),
      unit: "buah",
      diketahui: `Rusuk besar (S) = ${s9_besar} cm<br>Rusuk kecil (s) = ${s9_kecil} cm`,
      ditanya: `Jumlah rubik kecil yang muat ?`,
      jawab: `Langkah 1: Hitung Volume Besar<br>V_besar = ${s9_besar} × ${s9_besar} × ${s9_besar} = ${Math.pow(s9_besar, 3)} cm³<br><br>Langkah 2: Hitung Volume Kecil<br>V_kecil = ${s9_kecil} × ${s9_kecil} × ${s9_kecil} = ${Math.pow(s9_kecil, 3)} cm³<br><br>Langkah 3: Bagi volumenya<br>Jumlah = V_besar / V_kecil = ${Math.pow(s9_besar, 3)} / ${Math.pow(s9_kecil, 3)} = <strong>${jml9} buah</strong>.`,
    });

    // 10. Cerita - Bak Mandi Setengah
    let s10 = rand(8, 12); // dm
    let v10_penuh = s10 * s10 * s10;
    let v10_setengah = v10_penuh / 2;
    questions.push({
      type: "Cerita",
      text: `Sebuah bak mandi berbentuk kubus dengan rusuk ${s10} dm. Saat ini bak tersebut hanya terisi air SETENGAH bagian. Berapa volume air di dalam bak tersebut?`,
      svg: generateCubeSVG("Terisi 1/2", "", `s = ${s10} dm`),
      options: [v10_setengah, v10_penuh, s10 * s10 * 3, v10_setengah / 2].map(
        String,
      ),
      correct: String(v10_setengah),
      unit: "dm³",
      diketahui: `Bentuk: Kubus<br>Panjang rusuk (s) = ${s10} dm<br>Volume air = 1/2 dari bak`,
      ditanya: `Volume air ?`,
      jawab: `Langkah 1: Hitung Volume bak jika penuh<br>V_penuh = s × s × s<br>V_penuh = ${s10} × ${s10} × ${s10} = ${v10_penuh} dm³<br><br>Langkah 2: Hitung setengahnya<br>V_air = 1/2 × V_penuh<br>V_air = 1/2 × ${v10_penuh} = <strong>${v10_setengah} dm³</strong>.`,
    });
  }

  // --- RENDER SOAL KE HTML ---
  const container = document.getElementById("quiz-container");

  function renderQuiz() {
    container.innerHTML = "";
    generateQuestions();

    questions.forEach((q, index) => {
      // Acak pilihan ganda
      let shuffledOptions = shuffle([...q.options]);

      let card = document.createElement("div");
      card.className = "question-card";
      card.id = `q-card-${index}`;

      // Bangun HTML Pilihan Ganda
      let optionsHTML = "";
      shuffledOptions.forEach((opt, i) => {
        optionsHTML += `
                    <label class="option-label" id="label-q${index}-opt${i}">
                        <input type="radio" name="q${index}" value="${opt}">
                        ${opt} ${q.unit}
                    </label>
                `;
      });

      card.innerHTML = `
                <div class="question-header">
                    <div class="question-text">
                        <span style="color:#2d935d; font-size:0.9rem;">Soal ${index + 1} (${q.type})</span><br>
                        ${q.text}
                    </div>
                    <div class="question-visual">
                        ${q.svg}
                    </div>
                </div>
                <div class="options-container" id="options-q${index}">
                    ${optionsHTML}
                </div>
                
                <div class="explanation-box" id="exp-q${index}">
                    <h4>Pembahasan Runtut:</h4>
                    <p><strong>Diketahui:</strong><br>${q.diketahui}</p>
                    <p><strong>Ditanya:</strong><br>${q.ditanya}</p>
                    <p><strong>Dijawab:</strong></p>
                    <div class="math-step">${q.jawab}</div>
                </div>
            `;
      container.appendChild(card);
    });

    // Tambahkan event listener untuk styling radio button yang dipilih
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", function () {
        // Hapus class selected dari semua label di soal ini
        let name = this.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
          r.parentElement.classList.remove("selected");
        });
        // Tambah class selected ke label yang dipilih
        if (this.checked) {
          this.parentElement.classList.add("selected");
        }
      });
    });
  }

  // --- LOGIKA KOREKSI JAWABAN ---
  document.getElementById("btn-koreksi").addEventListener("click", () => {
    let score = 0;
    let allAnswered = true;

    questions.forEach((q, index) => {
      let selectedRadio = document.querySelector(
        `input[name="q${index}"]:checked`,
      );

      if (!selectedRadio) {
        allAnswered = false;
      } else {
        let label = selectedRadio.parentElement;

        // Cek kebenaran
        if (selectedRadio.value === q.correct) {
          score += 10;
          label.classList.add("is-correct");
        } else {
          label.classList.add("is-wrong");
          // Cari dan hijaukan jawaban yang sebenarnya benar
          document.querySelectorAll(`input[name="q${index}"]`).forEach((r) => {
            if (r.value === q.correct) {
              r.parentElement.classList.add("is-correct");
            }
          });
        }
      }

      // Tampilkan kotak pembahasan
      document.getElementById(`exp-q${index}`).style.display = "block";

      // Matikan semua radio button agar tidak bisa diubah lagi
      document
        .querySelectorAll(`input[name="q${index}"]`)
        .forEach((r) => (r.disabled = true));
    });

    if (!allAnswered) {
      alert(
        "Kamu belum menjawab semua soal. Namun yang sudah dijawab tetap akan dikoreksi.",
      );
    }

    // Tampilkan Skor Akhir
    document.getElementById("btn-koreksi").classList.add("hidden");
    let skorContainer = document.getElementById("skor-container");
    skorContainer.classList.remove("hidden");

    let teksSkor = document.getElementById("teks-skor");
    teksSkor.innerText = `Nilai Kamu: ${score} / 100`;
    if (score >= 80) teksSkor.style.color = "#2d935d";
    else if (score >= 50) teksSkor.style.color = "#ffc107";
    else teksSkor.style.color = "#d32f2f";

    // Scroll ke bawah
    skorContainer.scrollIntoView({ behavior: "smooth" });
  });

  // --- LOGIKA ACAK ULANG ---
  document.getElementById("btn-ulang").addEventListener("click", () => {
    // Kembalikan tombol
    document.getElementById("btn-koreksi").classList.remove("hidden");
    document.getElementById("skor-container").classList.add("hidden");

    // Buat ulang soal dan render ulang
    renderQuiz();

    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Jalankan pertama kali saat web dibuka
  renderQuiz();
});
