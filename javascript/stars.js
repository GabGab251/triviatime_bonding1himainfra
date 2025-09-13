// Ambil canvas
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

// Sesuaikan ukuran canvas sama layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Array bintang
let stars = [];

// Buat bintang kecil random
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.2
  });
}

// Fungsi gambar bintang
function drawStars() {
  ctx.fillStyle = "white";
  ctx.beginPath();

  for (let star of stars) {
    ctx.moveTo(star.x, star.y);
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  }

  ctx.fill();
  updateStars();
}

// Update posisi bintang
function updateStars() {
  for (let star of stars) {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

// Shooting star
let shootingStars = [];

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height / 2), // muncul dari atas setengah layar
    length: Math.random() * 80 + 50,
    speed: Math.random() * 10 + 6,
    opacity: 1
  });
}

function drawShootingStars() {
  for (let i = 0; i < shootingStars.length; i++) {
    let s = shootingStars[i];
    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();

    // Update posisi
    s.x -= s.speed;
    s.y += s.speed;
    s.opacity -= 0.015;

    // Hapus kalau hilang
    if (s.opacity <= 0) {
      shootingStars.splice(i, 1);
      i--;
    }
  }
}

// Loop animasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawShootingStars();
  requestAnimationFrame(animate);
}

animate();

// Bikin shooting star tiap 2–4 detik
setInterval(createShootingStar, 800 + Math.random() * 1200);
