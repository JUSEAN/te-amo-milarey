let pieces = [];

function mostrarPuzzle() {
    document.getElementById("mensaje").style.display = "none";
    document.getElementById("puzzle").style.display = "block";
    iniciarPuzzle();
}

function iniciarPuzzle() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    pieces = [];

    const posiciones = [...Array(9).keys()];
    posiciones.sort(() => Math.random() - 0.5); // Desordenamos las posiciones

    posiciones.forEach((pos, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundImage = "url('IMG/foto1.jpeg')";
        const x = (pos % 3) * -100;
        const y = Math.floor(pos / 3) * -100;
        tile.style.backgroundPosition = `${x}px ${y}px`;

        tile.draggable = true;
        tile.dataset.index = i;
        tile.dataset.correct = pos;

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("drop", drop);

        grid.appendChild(tile);
        pieces.push(pos);
    });
}

let draggedIndex = null;

function dragStart(e) {
    draggedIndex = e.target.dataset.index;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const targetIndex = e.target.dataset.index;
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    // Intercambiar piezas
    const temp = pieces[draggedIndex];
    pieces[draggedIndex] = pieces[targetIndex];
    pieces[targetIndex] = temp;

    actualizarGrid();

    if (completado()) {
        document.getElementById("felicitacion").style.display = "block";
        lanzarConfeti();
    }

    draggedIndex = null;
}

function actualizarGrid() {
    const grid = document.getElementById("grid");
    const tiles = grid.children;
    for (let i = 0; i < 9; i++) {
        const tile = tiles[i];
        const val = pieces[i];
        tile.style.backgroundImage = "url('IMG/foto1.jpeg')";
        const x = (val % 3) * -100;
        const y = Math.floor(val / 3) * -100;
        tile.style.backgroundPosition = `${x}px ${y}px`;
        tile.dataset.correct = val;
        tile.dataset.index = i;
    }
}

function completado() {
    return pieces.every((val, idx) => val === idx);
}

function lanzarConfeti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function irAlSiguiente() {
    window.location.href = "puzzle2.html"; // Aquí vas a la página final
}

function verificarPuzzle() {
    const tiles = document.querySelectorAll(".tile");
    let correcto = true;

    tiles.forEach((tile, index) => {
        if (parseInt(tile.dataset.correct) !== index) {
            correcto = false;
        }
    });

    if (correcto) {
        tiles.forEach(tile => {
            tile.classList.add("completo");
        });
        setTimeout(() => {
            alert("¡Muy bien mi niña! Completaste este recuerdo ❤️");
            window.location.href = "puzzle2.html";
        }, 1200);
    }
}

document.addEventListener("DOMContentLoaded", mostrarPuzzle);
