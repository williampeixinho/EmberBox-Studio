document.querySelector('.background').addEventListener('mousemove', function (e) {
    const moveX = (e.clientX / window.innerWidth) - 0.5; // Cria um valor de movimento no eixo X
    const moveY = (e.clientY / window.innerHeight) - 0.1; // Cria um valor de movimento no eixo Y

    const bgMoveX = moveX * 10; // Ajusta a intensidade do movimento horizontal
    const bgMoveY = moveY * 10; // Ajusta a intensidade do movimento vertical

    this.style.backgroundPosition = `${50 + bgMoveX}% ${50 + bgMoveY}%`; // Aplica o movimento suave

    if (window.innerWidth < 768) {
        var script = document.createElement('script');
        script.src = 'script.js';
        document.head.appendChild(script);
    }
});