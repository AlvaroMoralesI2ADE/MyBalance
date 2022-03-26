const bcrypt = require("bcryptjs");


const rondasDeSal = 10;

bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal, (err, palabraSecretaEncriptada) => {
	if (err) {
		console.log("Error hasheando:", err);
	} else {
		console.log("Y hasheada es: " + palabraSecretaEncriptada);
	}
});






// Recuerda. Los argumentos son: texto plano, encriptada, y callback
bcrypt.compare(palabraSecretaProporcionadaPorUsuario, palabraSecretaHasheada, (err, coinciden) => {
	if (err) {
		console.log("Error comprobando:", err);
	} else {
		console.log("¿La contraseña coincide?: " + coinciden);
	}
});






module.exports = { getConnection }


