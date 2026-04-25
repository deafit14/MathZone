document.addEventListener("DOMContentLoaded", () => {
  // --- FUNGSI BANTUAN ---
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Generator SVG Khusus Balok (Memanjang)
  function generateBalokSVG(labelTop, labelP, labelL, labelT) {
    return `
        <svg viewBox="0 0 120 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#2d935d" stroke-width="2" stroke-linejoin="round" fill="#e8f5e9">
                <polygon points="25,15 95,15 75,30 5,30" fill="#c8e6c9" />
                <polygon points="5,30 75,30 75,80 5,80" />
                <polygon points="75,30 95,15 95,65 75,80" fill="#a5d6a7"/>
            </g>
            <text x="40" y="95" font-size="11" text-anchor="middle" font-weight="bold" fill="#333">${labelP}</text>
            <text x="88" y="78" font-size="11" text-anchor="start" font-weight="bold" fill="#333">${labelL}</text>
            <text x="98" y="45" font-size="11" text-anchor="start" font-weight="bold" fill="#333">${labelT}</text>
            <text x="50" y="10" font-size="11" text-anchor="middle" font-weight="bold" fill="#d32f2f">${labelTop}</text>
        </svg>`;
  }

  // --- GENERATOR SOAL DINAMIS BALOK ---
  let questions = [];

  function generateQuestions() {
    questions = []; // Reset

    // 1. Cepat - Cari Volume (p, l, t)
    let p1 = rand(8, 15);
    let l1 = rand(3, 7);
    let t1 = rand(4, 9);
    let v1 = p1 * l1 * t1;
    questions.push({
      type: "Cepat",
      text: `Sebuah balok memiliki panjang ${p1} cm, lebar ${l1} cm, dan tinggi ${t1} cm. Berapakah volumenya?`,
      svg: generateBalokSVG("", `p=${p1}`, `l=${l1}`, `t=${t1}`),
      options: [v1, v1 + 10, p1 + l1 + t1, p1 * l1].map(String),
      correct: String(v1),
      unit: "cm³",
      diketahui: `p = ${p1} cm, l = ${l1} cm, t = ${t1} cm`,
      ditanya: `Volume (V) ?`,
      jawab: `V = p × l × t<br>V = ${p1} × ${l1} × ${t1}<br>V = <strong>${v1} cm³</strong>`,
    });

    // 2. Cepat - Cari Luas Permukaan
    let p2 = rand(5, 10);
    let l2 = rand(2, 5);
    let t2 = rand(3, 6);
    let lp2 = 2 * (p2 * l2 + p2 * t2 + l2 * t2);
    questions.push({
      type: "Cepat",
      text: `Hitunglah luas permukaan balok jika diketahui panjang ${p2} cm, lebar ${l2} cm, dan tinggi ${t2} cm!`,
      svg: generateBalokSVG("Luas Permukaan?", `p=${p2}`, `l=${l2}`, `t=${t2}`),
      options: [lp2, p2 * l2 * t2, lp2 / 2, lp2 + 20].map(String),
      correct: String(lp2),
      unit: "cm²",
      diketahui: `p = ${p2} cm, l = ${l2} cm, t = ${t2} cm`,
      ditanya: `Luas Permukaan (LP) ?`,
      jawab: `LP = 2 × ( (p×l) + (p×t) + (l×t) )<br>LP = 2 × ( (${p2}×${l2}) + (${p2}×${t2}) + (${l2}×${t2}) )<br>LP = 2 × ( ${p2 * l2} + ${p2 * t2} + ${l2 * t2} )<br>LP = 2 × ${p2 * l2 + p2 * t2 + l2 * t2}<br>LP = <strong>${lp2} cm²</strong>`,
    });

    // 3. Cepat - Cari tinggi dari Volume
    let p3 = rand(6, 12);
    let l3 = rand(3, 5);
    let t3 = rand(5, 10);
    let v3 = p3 * l3 * t3;
    questions.push({
      type: "Cepat",
      text: `Volume sebuah balok adalah ${v3} cm³. Jika panjangnya ${p3} cm dan lebarnya ${l3} cm, berapakah tinggi balok tersebut?`,
      svg: generateBalokSVG(`V = ${v3}`, `p=${p3}`, `l=${l3}`, `t=?`),
      options: [t3, t3 + 2, t3 - 1, p3 * l3].map(String),
      correct: String(t3),
      unit: "cm",
      diketahui: `Volume (V) = ${v3} cm³, p = ${p3} cm, l = ${l3} cm`,
      ditanya: `Tinggi (t) ?`,
      jawab: `V = p × l × t<br>${v3} = ${p3} × ${l3} × t<br>${v3} = ${p3 * l3} × t<br>t = ${v3} / ${p3 * l3}<br>t = <strong>${t3} cm</strong>`,
    });

    // 4. Cepat - Total Panjang Rusuk
    let p4 = rand(10, 15);
    let l4 = rand(5, 8);
    let t4 = rand(4, 7);
    let kr4 = 4 * (p4 + l4 + t4);
    questions.push({
      type: "Cepat",
      text: `Berapakah total panjang seluruh rusuk balok yang berukuran ${p4} cm × ${l4} cm × ${t4} cm?`,
      svg: generateBalokSVG("Total Rusuk?", `p=${p4}`, `l=${l4}`, `t=${t4}`),
      options: [kr4, p4 + l4 + t4, kr4 / 4, kr4 + 10].map(String),
      correct: String(kr4),
      unit: "cm",
      diketahui: `p = ${p4} cm, l = ${l4} cm, t = ${t4} cm`,
      ditanya: `Keliling Rusuk (KR) ?`,
      jawab: `Balok memiliki 4 rusuk panjang, 4 lebar, dan 4 tinggi.<br>KR = 4 × (p + l + t)<br>KR = 4 × (${p4} + ${l4} + ${t4})<br>KR = 4 × ${p4 + l4 + t4}<br>KR = <strong>${kr4} cm</strong>`,
    });

    // 5. Cepat - Cari Lebar dari Total Rusuk
    let p5 = rand(12, 18);
    let l5 = rand(5, 9);
    let t5 = rand(6, 10);
    let kr5 = 4 * (p5 + l5 + t5);
    questions.push({
      type: "Cepat",
      text: `Diketahui total panjang semua rusuk balok adalah ${kr5} cm. Jika panjang balok ${p5} cm dan tingginya ${t5} cm, berapakah lebarnya?`,
      svg: generateBalokSVG(`Rusuk = ${kr5}`, `p=${p5}`, `l=?`, `t=${t5}`),
      options: [l5, l5 + 3, p5 - t5, l5 * 2].map(String),
      correct: String(l5),
      unit: "cm",
      diketahui: `Total Rusuk = ${kr5} cm, p = ${p5} cm, t = ${t5} cm`,
      ditanya: `Lebar (l) ?`,
      jawab: `Total Rusuk = 4 × (p + l + t)<br>${kr5} = 4 × (${p5} + l + ${t5})<br>${kr5}/4 = ${p5 + t5} + l<br>${kr5 / 4} = ${p5 + t5} + l<br>l = ${kr5 / 4} - ${p5 + t5}<br>l = <strong>${l5} cm</strong>`,
    });

    // 6. Cerita - Volume Aquarium (Liter)
    let p6 = rand(8, 12);
    let l6 = rand(4, 6);
    let t6 = rand(5, 8); // dm
    let v6 = p6 * l6 * t6;
    questions.push({
      type: "Cerita",
      text: `Sebuah akuarium berbentuk balok memiliki ukuran bagian dalam panjang ${p6} dm, lebar ${l6} dm, dan tinggi ${t6} dm. Berapa liter air maksimal yang dapat ditampung akuarium tersebut? (1 dm³ = 1 Liter)`,
      svg: generateBalokSVG("Akuarium", `p=${p6}dm`, `l=${l6}dm`, `t=${t6}dm`),
      options: [v6, v6 * 10, p6 + l6 + t6, v6 / 2].map(String),
      correct: String(v6),
      unit: "Liter",
      diketahui: `p = ${p6} dm, l = ${l6} dm, t = ${t6} dm`,
      ditanya: `Volume air dalam Liter ?`,
      jawab: `V = p × l × t<br>V = ${p6} × ${l6} × ${t6}<br>V = ${v6} dm³<br>Karena 1 dm³ = 1 Liter, maka kapasitas maksimalnya adalah <strong>${v6} Liter</strong>.`,
    });

    // 7. Cerita - Membungkus Kado (Luas Permukaan)
    let p7 = rand(15, 25);
    let l7 = rand(10, 15);
    let t7 = rand(5, 10);
    let lp7 = 2 * (p7 * l7 + p7 * t7 + l7 * t7);
    questions.push({
      type: "Cerita",
      text: `Deafit akan membungkus kado berbentuk balok dengan kertas kado. Ukuran kado tersebut adalah ${p7} cm × ${l7} cm × ${t7} cm. Berapakah luas minimal kertas kado yang dibutuhkan?`,
      svg: generateBalokSVG("Kado", `p=${p7}`, `l=${l7}`, `t=${t7}`),
      options: [lp7, p7 * l7 * t7, lp7 / 2, lp7 + 100].map(String),
      correct: String(lp7),
      unit: "cm²",
      diketahui: `p = ${p7} cm, l = ${l7} cm, t = ${t7} cm. Membungkus seluruh kotak = mencari Luas Permukaan.`,
      ditanya: `Luas Permukaan (LP) ?`,
      jawab: `LP = 2 × ( (p×l) + (p×t) + (l×t) )<br>LP = 2 × ( (${p7}×${l7}) + (${p7}×${t7}) + (${l7}×${t7}) )<br>LP = 2 × ( ${p7 * l7} + ${p7 * t7} + ${l7 * t7} )<br>LP = 2 × ${p7 * l7 + p7 * t7 + l7 * t7}<br>LP = <strong>${lp7} cm²</strong>`,
    });

    // 8. Cerita - Kerangka Etalase (Kawat/Aluminium)
    let p8 = rand(10, 15);
    let l8 = rand(4, 8);
    let t8 = rand(5, 10);
    let kr8 = 4 * (p8 + l8 + t8);
    questions.push({
      type: "Cerita",
      text: `Pak Guru menugaskan membuat kerangka balok dari aluminium dengan ukuran panjang ${p8} cm, lebar ${l8} cm, dan tinggi ${t8} cm. Berapa panjang aluminium yang dibutuhkan untuk satu kerangka?`,
      svg: generateBalokSVG("Kerangka", `p=${p8}`, `l=${l8}`, `t=${t8}`),
      options: [kr8, p8 * l8 * t8, p8 + l8 + t8, kr8 * 2].map(String),
      correct: String(kr8),
      unit: "cm",
      diketahui: `Kerangka balok. p = ${p8} cm, l = ${l8} cm, t = ${t8} cm.`,
      ditanya: `Total panjang rusuk ?`,
      jawab: `KR = 4 × (p + l + t)<br>KR = 4 × (${p8} + ${l8} + ${t8})<br>KR = 4 × ${p8 + l8 + t8}<br>KR = <strong>${kr8} cm</strong>`,
    });

    // 9. Cerita - Kardus masuk Kontainer (Volume dibagi Volume)
    let sk = rand(2, 5); // kubus kecil
    let mul = rand(4, 6);
    let p9 = sk * mul;
    let l9 = sk * (mul - 1);
    let t9 = sk * (mul - 2);
    let v_balok = p9 * l9 * t9;
    let v_kubus = sk * sk * sk;
    let jml9 = v_balok / v_kubus;
    questions.push({
      type: "Cerita",
      text: `Sebuah kardus besar berukuran ${p9} cm × ${l9} cm × ${t9} cm akan diisi dengan kotak-kotak kecil berbentuk kubus yang rusuknya ${sk} cm. Berapa banyak kotak kecil yang dapat dimuat ke dalam kardus besar tersebut?`,
      svg: generateBalokSVG("Isi Kardus", `p=${p9}`, `l=${l9}`, `t=${t9}`),
      options: [jml9, jml9 * 2, v_balok, v_kubus].map(String),
      correct: String(jml9),
      unit: "kotak",
      diketahui: `Balok: p=${p9}, l=${l9}, t=${t9}.<br>Kubus kecil: s=${sk}.`,
      ditanya: `Jumlah kotak kecil ?`,
      jawab: `Langkah 1: Volume Balok<br>V_b = ${p9} × ${l9} × ${t9} = ${v_balok} cm³<br><br>Langkah 2: Volume Kubus Kecil<br>V_k = ${sk} × ${sk} × ${sk} = ${v_kubus} cm³<br><br>Langkah 3: Bagi Volumenya<br>Jumlah = V_b / V_k = ${v_balok} / ${v_kubus} = <strong>${jml9} kotak</strong>`,
    });

    // 10. Cerita - Kolam Renang Terisi Sebagian
    let p10 = rand(15, 25);
    let l10 = rand(8, 12);
    let t10 = rand(2, 4); // meter
    let v_full = p10 * l10 * t10;
    let v_half = v_full / 2;
    questions.push({
      type: "Cerita",
      text: `Sebuah kolam renang berbentuk balok memiliki panjang ${p10} m, lebar ${l10} m, dan kedalaman (tinggi) ${t10} m. Jika kolam tersebut hanya diisi air SETENGAH bagian saja, berapakah volume airnya?`,
      svg: generateBalokSVG(
        "Terisi 1/2",
        `p=${p10}m`,
        `l=${l10}m`,
        `t=${t10}m`,
      ),
      options: [v_half, v_full, p10 * l10, v_half * 3].map(String),
      correct: String(v_half),
      unit: "m³",
      diketahui: `p = ${p10} m, l = ${l10} m, t = ${t10} m. Terisi 1/2 bagian.`,
      ditanya: `Volume air ?`,
      jawab: `Langkah 1: Volume Total Kolam<br>V = p × l × t<br>V = ${p10} × ${l10} × ${t10} = ${v_full} m³<br><br>Langkah 2: Kalikan 1/2<br>V_air = 1/2 × ${v_full} = <strong>${v_half} m³</strong>`,
    });
  }

  // --- RENDER SOAL KE HTML ---
  const container = document.getElementById("quiz-container");

  function renderQuiz() {
    container.innerHTML = "";
    generateQuestions();

    questions.forEach((q, index) => {
      let shuffledOptions = shuffle([...q.options]);
      let card = document.createElement("div");
      card.className = "question-card";
      card.id = `q-card-${index}`;

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

    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", function () {
        let name = this.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
          r.parentElement.classList.remove("selected");
        });
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

        if (selectedRadio.value === q.correct) {
          score += 10;
          label.classList.add("is-correct");
        } else {
          label.classList.add("is-wrong");
          document.querySelectorAll(`input[name="q${index}"]`).forEach((r) => {
            if (r.value === q.correct) {
              r.parentElement.classList.add("is-correct");
            }
          });
        }
      }

      document.getElementById(`exp-q${index}`).style.display = "block";
      document
        .querySelectorAll(`input[name="q${index}"]`)
        .forEach((r) => (r.disabled = true));
    });

    if (!allAnswered) {
      alert(
        "Kamu belum menjawab semua soal. Namun yang sudah dijawab tetap akan dikoreksi.",
      );
    }

    document.getElementById("btn-koreksi").classList.add("hidden");
    let skorContainer = document.getElementById("skor-container");
    skorContainer.classList.remove("hidden");

    let teksSkor = document.getElementById("teks-skor");
    teksSkor.innerText = `Nilai Kamu: ${score} / 100`;
    if (score >= 80) teksSkor.style.color = "#2d935d";
    else if (score >= 50) teksSkor.style.color = "#ffc107";
    else teksSkor.style.color = "#d32f2f";

    skorContainer.scrollIntoView({ behavior: "smooth" });
  });

  // --- LOGIKA ACAK ULANG ---
  document.getElementById("btn-ulang").addEventListener("click", () => {
    document.getElementById("btn-koreksi").classList.remove("hidden");
    document.getElementById("skor-container").classList.add("hidden");
    renderQuiz();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mulai
  renderQuiz();
});
