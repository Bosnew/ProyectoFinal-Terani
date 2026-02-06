class App {
    constructor() {
        this.usuario = null;
        this.modales = new GestorModales();
        this.peliculas = new GestorPeliculas();
        this.sesion = new GestorSesion();
        this.modalCompra = new ModalCompra();
    }

    async inicializar() {
        // Recuperar usuario si existe
        this.sesion.recuperarSesion();
        
        // Cargar películas
        await this.peliculas.cargar();
    }
}

// Crear instancia global de la app cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.app.inicializar();
});
