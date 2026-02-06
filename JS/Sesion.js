class GestorSesion {
    constructor() {
        this.$formulario = $("#formularioUsuario");
        this.$seccionPeliculas = $("#seccionPeliculas");
        this.$btnCerrarSesion = $("#btnCerrarSesion");
        this.$header = $("header");
        this.$nav = $("nav");

        this.$formulario.submit((e) => this.iniciarSesion(e));
        this.$btnCerrarSesion.click(() => this.solicitarCierreSesion());
        $("#btnConfirmarCierre").click(() => this.confirmarCierreSesion());
        $("#btnCancelarCierre").click(() => this.cancelarCierreSesion());
    }

    iniciarSesion(e) {
        e.preventDefault();
        const usuario = new Usuario($("#nombre").val().trim(), Number($("#edad").val()), $("#email").val().trim());
        const validacion = usuario.validar();
        
        if (!validacion.valido) {
            window.app.modales.mostrarAlerta("Error", validacion.error, "error");
            return;
        }

        Usuario.guardar(usuario);
        window.app.usuario = usuario;
        this.mostrarSeccionPeliculas();
    }

    recuperarSesion() {
        const usuario = Usuario.recuperar();
        if (usuario) {
            window.app.usuario = usuario;
            this.mostrarSeccionPeliculas();
            return true;
        }
        return false;
    }

    mostrarSeccionPeliculas() {
        this.$formulario.hide();
        this.$seccionPeliculas.addClass("mostrar");
        this.$btnCerrarSesion.addClass("visible");
        this.$header.addClass("contraido");
        this.$nav.addClass("oculto");
    }

    solicitarCierreSesion() { window.app.modales.mostrarConfirmacionCierre(); }

    confirmarCierreSesion() {
        Usuario.limpiar();
        localStorage.removeItem("Compra");
        window.app.usuario = null;
        
        this.$formulario.trigger("reset").show();
        this.$seccionPeliculas.removeClass("mostrar");
        this.$btnCerrarSesion.removeClass("visible");
        this.$header.removeClass("contraido");
        this.$nav.removeClass("oculto");
        window.app.modales.cerrarConfirmacionCierre();
    }

    cancelarCierreSesion() { window.app.modales.cerrarConfirmacionCierre(); }
}
