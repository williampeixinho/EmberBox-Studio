document.addEventListener("DOMContentLoaded", () => {
    const fill = document.getElementById("progress-fill1");
    const text = document.getElementById("progress-text");
    const preloader = document.getElementById("preloader");
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      fill.style.width = `${progress}%`;
      text.textContent = `${progress}%`;
  
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add("fade-out");
        }, 300); // Pequeno delay antes do fade iniciar
      }
    }, 20); // 100 * 20ms = 2s
  });
  