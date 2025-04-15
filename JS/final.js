const texto = "Nada ni nadie nos va a separar. La distancia no será para siempre, por eso te dedico Mi Suerte. Te amoooo. ¡Feliz cumpleaños, mi vida!, en tu cumpleaños, quiero agradecerte por ser esa mujer tan maravillosa, por ser esa luz que ilumina mi camino en la oscuridad, por ser esa niña que me da tanta alegría.";
const parrafo = document.getElementById("mensaje");
let i = 0;

function escribir() {
  if (i < texto.length) {
    parrafo.textContent += texto.charAt(i);
    i++;
    setTimeout(escribir, 50);
  }
}

escribir();
