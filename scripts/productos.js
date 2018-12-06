function cargarDatos () {
	try {
		var peticion = new XMLHttpRequest();
		peticion.onreadystatechange = function () {
			if (peticion.readyState == 4 && peticion.status == 200) {
				mostrarTodo(this)
		}
		}
		peticion.open("GET", "catalogo.xml", true);
		peticion.send(null);
	} catch (e) {
		alert("No se pudo procesar: " + e);
	}
}

function articulo_to_string (articulo) {
	var nombre = articulo.getElementsByTagName("NOMBRE")[0].childNodes[0].nodeValue;
	var tipo = articulo.getElementsByTagName("TIPO")[0].childNodes[0].nodeValue;
	var precio = articulo.getElementsByTagName("PRECIO")[0].childNodes[0].nodeValue;
	var descripcion = articulo.getElementsByTagName("DESCRIPCION")[0].childNodes[0].nodeValue;
	var rating = articulo.getElementsByTagName("RATING")[0].childNodes[0].nodeValue;
	var imagen = articulo.getElementsByTagName("IMAGEN")[0].childNodes[0].nodeValue;
	
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

	texto += "</article>"
	return texto;
}

function mostrarTodo (peticion) {
	var xml = peticion.responseXML;
	var x = xml.getElementsByTagName("PAN");
	var html = "";

	for (var i = 0; i < x.length; i++) {
		html += articulo_to_string(x[i]);
	}

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

window.addEventListener("load", cargarDatos, false);
