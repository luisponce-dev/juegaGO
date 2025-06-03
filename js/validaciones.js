document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const limpiarBtn = document.getElementById('limpiarBtn');
    
    function validarPassword(password) {
        const tieneNumero = /\d/.test(password);
        const tieneMayuscula = /[A-Z]/.test(password);
        return tieneNumero && tieneMayuscula;
    }
    
    function validarEdad(fechaNacimiento) {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        
        return edad >= 13;
    }
    
    function validarCoincidenciaPasswords() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        return password === confirmPassword;
    }
    
    limpiarBtn.addEventListener('click', function() {
        form.reset();
        form.classList.remove('was-validated');
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const passwordValida = validarPassword(document.getElementById('password').value);
        const edadValida = validarEdad(document.getElementById('fechaNacimiento').value);
        const passwordsCoinciden = validarCoincidenciaPasswords();
        
        if (!passwordValida) {
            document.getElementById('password').classList.add('is-invalid');
        } else {
            document.getElementById('password').classList.remove('is-invalid');
        }
        
        if (!edadValida) {
            document.getElementById('fechaNacimiento').classList.add('is-invalid');
        } else {
            document.getElementById('fechaNacimiento').classList.remove('is-invalid');
        }
        
        if (!passwordsCoinciden) {
            document.getElementById('confirmPassword').classList.add('is-invalid');
        } else {
            document.getElementById('confirmPassword').classList.remove('is-invalid');
        }
        
        // Validación general del formulario
        form.classList.add('was-validated');
        
        if (form.checkValidity() && passwordValida && edadValida && passwordsCoinciden) {
            // Aquí iría el código para enviar el formulario al back
            alert('Registro exitoso!');
            form.reset();
            form.classList.remove('was-validated');
        }
    });
    
    document.getElementById('password').addEventListener('input', function() {
        if (this.value.length > 0) {
            const esValida = validarPassword(this.value);
            if (!esValida) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        }
    });
    
    document.getElementById('confirmPassword').addEventListener('input', function() {
        if (this.value.length > 0) {
            const coinciden = validarCoincidenciaPasswords();
            if (!coinciden) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        }
    });
});