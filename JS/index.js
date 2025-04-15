const texto = "Hoy, en tu cumpleaños, quiero agradecerte por ser esa mujer tan maravillosa, por ser esa luz que ilumina mi camino en la oscuridad, por ser esa niña que me da tanta alegría.";
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
