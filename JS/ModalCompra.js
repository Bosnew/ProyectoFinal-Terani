class ModalCompra {
    constructor() {
        this.$modal = $("#modalCompra");
        this.$formulario = $("#formularioCompra");
        this.$cantidadInput = $("#cantidad");
        this.$totalPrecio = $("#totalPrecio");
        this.$nombrePeliculaModal = $("#nombrePeliculaModal");
        
        this.PRECIO_ENTRADA = 5000.00;
        this.peliculaSeleccionada = null;
        this.datosCompra = null;

        $("#btnCerrarModal").click(() => this.cerrar());
        $(window).click((e) => { if ($(e.target).is(this.$modal)) this.cerrar(); });
        this.$cantidadInput.on("change input", () => this.actualizarTotal());
        this.$formulario.submit((e) => this.procesarCompra(e));
        $("#btnConfirmarCompraFinal").click(() => this.confirmarCompraFinal());
        $("#btnCancelarCompra").click(() => this.cancelarCompra());
    }

    abrir(keyPelicula) {
        const usuario = window.app.usuario;
        const pelicula = window.app.peliculas.obtenerPorId(keyPelicula);

        if (!usuario) {
            window.app.modales.mostrarAlerta("Sesion no iniciada", "Debes registrarte primero", "error");
            return;
        }

        if (!pelicula) {
            window.app.modales.mostrarAlerta("Error", "Película no encontrada", "error");
            return;
        }

        if (usuario.edad < pelicula.edadRequerida) {
            window.app.modales.mostrarAlerta("Edad insuficiente", 
                `Debes tener al menos ${pelicula.edadRequerida} años para ver ${pelicula.titulo}`, "error");
            return;
        }

        this.peliculaSeleccionada = pelicula;
        this.$nombrePeliculaModal.text(pelicula.titulo);
        this.$formulario.trigger("reset");
        this.$cantidadInput.val(1);
        this.actualizarTotal();
        this.$modal.addClass("mostrar");
    }

    cerrar() {
        this.$modal.removeClass("mostrar");
        this.peliculaSeleccionada = null;
    }

    actualizarTotal() {
        const cantidad = Number(this.$cantidadInput.val()) || 1;
        this.$totalPrecio.text((cantidad * this.PRECIO_ENTRADA).toFixed(2));
    }

    procesarCompra(e) {
        e.preventDefault();

        if (!this.peliculaSeleccionada || !window.app.usuario) {
            window.app.modales.mostrarAlerta("Error", "Falta informacion para procesar", "error");
            return;
        }

        const dia = $("#dia").val();
        const horario = $("#horario").val();
        const cantidad = Number($("#cantidad").val());
        const total = (cantidad * this.PRECIO_ENTRADA).toFixed(2);

        if (!dia || !horario) {
            window.app.modales.mostrarAlerta("Campos incompletos", "Selecciona dia y horario", "error");
            return;
        }

        const usuario = window.app.usuario;
        const $detalleCompra = window.app.modales.obtenerElementoDetalleCompra();

        $detalleCompra.html(`
            <p><strong>Pelicula:</strong> ${this.peliculaSeleccionada.titulo}</p>
            <p><strong>Usuario:</strong> ${usuario.nombre}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Dia:</strong> ${dia}</p>
            <p><strong>Horario:</strong> ${horario}</p>
            <p><strong>Cantidad:</strong> ${cantidad}</p>
            <p><strong>Precio unitario:</strong> $${this.PRECIO_ENTRADA.toFixed(2)}</p>
            <p style="font-size: 1.2em; margin-top: 10px;"><strong>Total: $${total}</strong></p>
        `);

        this.datosCompra = { dia, horario, cantidad, total };
        window.app.modales.mostrarConfirmacionCompra();
    }

    confirmarCompraFinal() {
        if (!this.datosCompra || !this.peliculaSeleccionada || !window.app.usuario) {
            window.app.modales.mostrarAlerta("Error", "Datos de compra no encontrados", "error");
            return;
        }

        const { dia, horario, cantidad, total } = this.datosCompra;
        const usuario = window.app.usuario;

        const compra = {
            usuario: usuario.nombre,
            email: usuario.email,
            pelicula: this.peliculaSeleccionada.titulo,
            dia, horario, cantidad, total,
            fecha: new Date().toLocaleString()
        };

        localStorage.setItem("Compra", JSON.stringify(compra));

        window.app.modales.mostrarAlerta("Compra confirmada",
            `${cantidad} entrada(s) para ${this.peliculaSeleccionada.titulo}. Tickets en ${usuario.email}`, "exito");

        this.cerrar();
        window.app.modales.cerrarConfirmacionCompra();
        this.datosCompra = null;
    }

    cancelarCompra() {
        window.app.modales.cerrarConfirmacionCompra();
        this.datosCompra = null;
    }
}
