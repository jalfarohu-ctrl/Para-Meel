
document.addEventListener("DOMContentLoaded", () => {

  // Flores y corazones flotantes
  const decoraciones = document.getElementById("decoraciones");
  const simbolos = ["♥", "♡", "✿", "❀", "✾"];

  function crearDecoracion() {
    if (document.hidden) return;

    const elemento = document.createElement("span");
    elemento.className = "decoracion-flotante";

    elemento.textContent =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    elemento.style.left = Math.random() * 100 + "vw";
    elemento.style.fontSize = (12 + Math.random() * 18) + "px";
    elemento.style.color = ["#a879ce", "#e9a3ca", "#bc8cdb"][
      Math.floor(Math.random() * 3)
    ];

    const duracion = 7 + Math.random() * 7;
    elemento.style.animationDuration = duracion + "s";

    decoraciones.appendChild(elemento);

    elemento.addEventListener("animationend", () => {
      elemento.remove();
    });
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(crearDecoracion, 650);
  }

  // Galería interactiva
  const fotos = Array.from(
    document.querySelectorAll(".polaroid img")
  );

  const visor = document.getElementById("visor");
  const imagenGrande = document.getElementById("imagenGrande");
  const contador = document.getElementById("contador");

  let indice = 0;
  let elementoAnterior = null;

  function mostrarFoto(n) {
    indice = (n + fotos.length) % fotos.length;
    imagenGrande.src = fotos[indice].src;
    imagenGrande.alt = fotos[indice].alt;
    contador.textContent = `${indice + 1} / ${fotos.length}`;
  }

  function abrirVisor(n) {
    elementoAnterior = document.activeElement;
    mostrarFoto(n);
    visor.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("cerrarVisor").focus();
  }

  function cerrarVisor() {
    visor.hidden = true;
    document.body.style.overflow = "";
    imagenGrande.removeAttribute("src");
    elementoAnterior?.focus();
  }

  fotos.forEach((foto, n) => {
    const tarjeta = foto.closest(".polaroid");
    tarjeta.setAttribute("tabindex", "0");
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("aria-label", "Ampliar recuerdo " + (n + 1));

    tarjeta.addEventListener("click", () => abrirVisor(n));

    tarjeta.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirVisor(n);
      }
    });
  });

  document.getElementById("cerrarVisor")
    .addEventListener("click", cerrarVisor);

  document.getElementById("anterior")
    .addEventListener("click", () => mostrarFoto(indice - 1));

  document.getElementById("siguiente")
    .addEventListener("click", () => mostrarFoto(indice + 1));

  visor.addEventListener("click", e => {
    if (e.target === visor) cerrarVisor();
  });

  document.addEventListener("keydown", e => {
    if (visor.hidden) return;

    if (e.key === "Escape") cerrarVisor();
    if (e.key === "ArrowRight") mostrarFoto(indice + 1);
    if (e.key === "ArrowLeft") mostrarFoto(indice - 1);

    if (e.key === "Tab") {
      const controles = [
        document.getElementById("cerrarVisor"),
        document.getElementById("anterior"),
        document.getElementById("siguiente")
      ];
      const actual = controles.indexOf(document.activeElement);
      e.preventDefault();
      const paso = e.shiftKey ? -1 : 1;
      controles[(actual + paso + controles.length) % controles.length].focus();
    }
  });

  // Carta sorpresa
  const sobre = document.getElementById("sobre");
  const carta = document.getElementById("carta");

  function alternarCarta() {
    const abrir = carta.hidden;
    carta.hidden = !abrir;
    sobre.setAttribute("aria-expanded", String(abrir));

    if (abrir) {
      setTimeout(() => {
        carta.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    }
  }

  sobre.addEventListener("click", alternarCarta);
  sobre.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      alternarCarta();
    }
  });
});
