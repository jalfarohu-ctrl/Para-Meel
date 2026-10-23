
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("myAudio");

  if (!audio) {
    console.error("No se encontró el audio.");
    return;
  }

  audio.volume = 0.7;
  audio.loop = true;

  async function reproducirMusica() {
    try {
      await audio.play();
      console.log("Música reproduciéndose");
      quitarEventos();
    } catch (error) {
      console.log(
        "El navegador espera una interacción para reproducir música."
      );
    }
  }

  function quitarEventos() {
    document.removeEventListener("click", reproducirMusica);
    document.removeEventListener("touchstart", reproducirMusica);
    document.removeEventListener("keydown", reproducirMusica);
  }

  // Intentar reproducir al abrir la página
  reproducirMusica();

  // Si el navegador bloquea autoplay,
  // reproducir con la primera interacción.
  document.addEventListener("click", reproducirMusica);
  document.addEventListener("touchstart", reproducirMusica);
  document.addEventListener("keydown", reproducirMusica);

  audio.addEventListener("error", () => {
    console.error(
      "No se pudo cargar la canción:",
      audio.currentSrc,
      audio.error
    );
  });
});
