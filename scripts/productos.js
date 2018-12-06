var catalogo = "catalogo.xml";

function inicializa () {
	document.getElementById("botonblanco").addEventListener("click", function() {cargarTipo("Blanco")}, false);
	document.getElementById("botondulce").addEventListener("click", function() {cargarTipo("Dulce")}, false);
	document.getElementById("botontodo").addEventListener("click", cargarTodo, false);
	document.getElementById("botonnombre").addEventListener("click", BusquedaPorNombre, false);

	cargarTodo();
	cargarNombres();
}

function inizializarBusquedaPorNombre (peticion) {
	var xml = peticion.responseXML;
	var x = xml.getElementsByTagName("PAN");
	var nombres = new Array();
	var select = document.getElementById("pornombre");

	for (var i = 0; i < x.length; i++)
		nombres.push(x[i].getElementsByTagName("NOMBRE")[0].childNodes[0].nodeValue);

	for (var i = 0; i < nombres.length; i++) {
		var option = document.createElement("option");
		option.value = nombres[i];
		option.innerHTML = nombres[i];
		select.appendChild(option);
	}
}

function BusquedaPorNombre () {
	var nombre = document.getElementById("pornombre").value;
	var loc = window.location.href;
	loc = loc.substring(0, loc.lastIndexOf("/")+1) + catalogo;

	try {
		var peticion = new XMLHttpRequest();
		peticion.onreadystatechange = function () {
			if (peticion.readyState == 4 && peticion.status == 200) {
				document.getElementById("lista").innerHTML = this.responseText;
			}
		}
		peticion.open("GET", "scripts/productos.php?nombre=" + nombre + "&direccion=" + loc, true);
		peticion.send(null);
	} catch (e) {
		alert("No se pudo procesar: " + e);
	}
}

function cargarNombres () {
	try {
		var peticion = new XMLHttpRequest();
		peticion.onreadystatechange = function () {
			if (peticion.readyState == 4 && peticion.status == 200) {
				inizializarBusquedaPorNombre(this);
			}
		}
		peticion.open("GET", catalogo, true);
		peticion.send(null);
	} catch (e) {
		alert("No se pudo procesar: " + e);
	}
}

function cargarTodo () {
	try {
		var peticion = new XMLHttpRequest();
		peticion.onreadystatechange = function () {
			if (peticion.readyState == 4 && peticion.status == 200) {
				mostrarTodo(this);
			}
		}
		peticion.open("GET", catalogo, true);
		peticion.send(null);
	} catch (e) {
		alert("No se pudo procesar: " + e);
	}
}

function cargarTipo (tipo) {
	try {
		var peticion = new XMLHttpRequest();
		peticion.onreadystatechange = function () {
			if (peticion.readyState == 4 && peticion.status == 200) {
				mostrarTipo(this, tipo);
			}
		}
		peticion.open("GET", catalogo, true);
		peticion.send(null);
	} catch (e) {
		alert("No se pudo procesar: " + e);
	}	
}

function pan_to_string (pan) {
	var nombre = pan.getElementsByTagName("NOMBRE")[0].childNodes[0].nodeValue;
	var tipo = pan.getElementsByTagName("TIPO")[0].childNodes[0].nodeValue;
	var precio = pan.getElementsByTagName("PRECIO")[0].childNodes[0].nodeValue;
	var descripcion = pan.getElementsByTagName("DESCRIPCION")[0].childNodes[0].nodeValue;
	var rating = pan.getElementsByTagName("RATING")[0].childNodes[0].nodeValue;
	var imagen = pan.getElementsByTagName("IMAGEN")[0].childNodes[0].nodeValue;
	
	var texto = "<article itemtype='https://schema.org/individualproduct' class='producto'>";

	//Imagen
	texto += "<img class='imgProducto' src='" + imagen + "' alt='" + nombre + "'>";

	//Titulo
	texto += "<div class='card-body'><h4 class='card-title'>" + nombre + "</h4>";

	//Precio
	texto += "<h5>$" + precio + "</h5>";

	//Descripcion
	texto += "<p class='card-text'>" + descripcion + "</p></div>";

	//Rating
	texto += "<div class='card-footer'><small>" + rating + "</small></div>";

	texto += "</article>";
	return texto;
}

function mostrarTodo (peticion) {
	var xml = peticion.responseXML;
	var x = xml.getElementsByTagName("PAN");
	var html = "<h2>Todo</h2>";

	for (var i = 0; i < x.length; i++)
		html += pan_to_string(x[i]);

	document.getElementById("lista").innerHTML = html;
}

function mostrarTipo (peticion, opcion) {
	var xml = peticion.responseXML;
	var x = xml.getElementsByTagName("PAN");
	var html = "<h2>Pan " + opcion + "</h2>";

	for (var i = 0; i < x.length; i++)
		if (x[i].getElementsByTagName("TIPO")[0].childNodes[0].nodeValue == opcion)
				html += pan_to_string(x[i]);

	document.getElementById("lista").innerHTML = html;
}

function FunctionBarras () {
	var x = document.getElementById("barraNav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

window.addEventListener("load", inicializa, false);