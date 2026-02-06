class GestorPeliculas {
    constructor() {
        this.peliculas = [];
        this.$contenedor = $('.contenedor-peliculas');
        this.PRECIO_ENTRADA = 5000.00;
        this.DATOS_POR_DEFECTO = [
            { id: "civilWar", titulo: "Civil War", edadRequerida: 18, poster: "Imagenes/Civil war.jpg" },
            { id: "ironman", titulo: "Ironman", edadRequerida: 25, poster: "Imagenes/Ironman.jpg" },
            { id: "spiderman", titulo: "Spiderman", edadRequerida: 13, poster: "Imagenes/Spiderman.jpg" },
            { id: "thor", titulo: "Thor", edadRequerida: 15, poster: "Imagenes/Thor.jpg" }
        ];
    }

    async cargar() {
        if (window.location && window.location.protocol === 'file:') {
            this.peliculas = this.DATOS_POR_DEFECTO;
            this.renderizar();
            return;
        }

        try {
            const respuesta = await fetch('JSON/peliculas.json');
            if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
            const tipoContenido = respuesta.headers.get('content-type') || '';
            if (tipoContenido.includes('text/html')) throw new Error('HTML response');
            this.peliculas = await respuesta.json();
            this.renderizar();
        } catch (error) {
            this.peliculas = this.DATOS_POR_DEFECTO;
            this.renderizar();
        }
    }

    renderizar() {
        this.$contenedor.empty();
        this.peliculas.forEach(p => {
            $('<img>')
                .attr('id', p.id)
                .attr('src', p.poster)
                .attr('alt', p.titulo)
                .attr('title', 'Haz clic para comprar')
                .click(() => window.app.modalCompra.abrir(p.id))
                .appendTo(this.$contenedor);
        });
    }

    obtenerPorId(id) { return this.peliculas.find(p => p.id === id); }
    obtenerTodas() { return this.peliculas; }
}
