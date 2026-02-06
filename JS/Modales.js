class GestorModales {
    constructor() {
        this.$modalValidacionEdad = $("#modalValidacionEdad");
        this.$modalConfirmacionCierre = $("#modalConfirmacionCierre");
        this.$modalConfirmacionCompra = $("#modalConfirmacionCompra");
        this.$modalExito = $("#modalExito");
        this.$modalError = $("#modalError");

        $("#btnCerrarValidacion").click(() => this.cerrarAlerta("validacion"));
        $("#btnCerrarError").click(() => this.cerrarAlerta("error"));
        $("#btnCerrarExito").click(() => this.cerrarAlerta("exito"));
    }

    mostrarAlerta(titulo, mensaje, tipo = "info") {
        const modales = { error: this.$modalError, exito: this.$modalExito, validacion: this.$modalValidacionEdad };
        const ids = { error: "mensajeError", exito: "mensajeExito", validacion: "detalleValidacion" };
        const $modal = modales[tipo];
        
        $modal.find("h2").text(titulo);
        $(`#${ids[tipo]}`).text(mensaje);
        $modal.addClass("mostrar");
    }

    cerrarAlerta(tipo = "error") {
        const modales = { error: this.$modalError, exito: this.$modalExito, validacion: this.$modalValidacionEdad };
        modales[tipo].removeClass("mostrar");
    }

    mostrarConfirmacionCierre() { this.$modalConfirmacionCierre.addClass("mostrar"); }
    cerrarConfirmacionCierre() { this.$modalConfirmacionCierre.removeClass("mostrar"); }
    mostrarConfirmacionCompra() { this.$modalConfirmacionCompra.addClass("mostrar"); }
    cerrarConfirmacionCompra() { this.$modalConfirmacionCompra.removeClass("mostrar"); }
    obtenerElementoDetalleCompra() { return $("#detalleCompra"); }
}
