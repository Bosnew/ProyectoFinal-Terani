class Usuario {
    constructor(nombre, edad, email) {
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
    }

    static guardar(usuario) {
        localStorage.setItem("Usuario", JSON.stringify(usuario));
    }

    static recuperar() {
        const usuarioGuardado = localStorage.getItem("Usuario");
        if (usuarioGuardado) {
            const datos = JSON.parse(usuarioGuardado);
            return new Usuario(datos.nombre, datos.edad, datos.email);
        }
        return null;
    }

    static limpiar() {
        localStorage.removeItem("Usuario");
    }

    validar() {
        if (!this.nombre || !this.edad || !this.email) {
            return { valido: false, error: "Todos los campos son requeridos" };
        }
        if (this.edad < 1 || this.edad > 120) {
            return { valido: false, error: "La edad debe estar entre 1 y 120 años" };
        }
        return { valido: true };
    }
}
