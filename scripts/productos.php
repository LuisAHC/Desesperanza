<?php
function getValue ($element, $etiqueta) {
	for ($i = 0; $i < $element->length; $i++)
		if ($element->item($i)->nodeType == 1)
			if ($element->item($i)->nodeName == $etiqueta)
				return $element->item($i)->childNodes->item(0)->nodeValue;
	return "Error. Etiqueta no encontrada en catalogo.xml: " + $etiqueta;
}

$nombre = $_GET["nombre"];
$direccion = $_GET["direccion"];

$xml = new DOMDocument();
$xml->load($direccion);

$panes = $xml->getElementsByTagName("NOMBRE");
for ($i = 0; $i < $panes->length; $i++)
	if ($panes->item($i)->nodeType == 1)
		if ($panes->item($i)->childNodes->item(0)->nodeValue == $nombre)
			$temp = ($panes->item($i)->parentNode);
$pan = ($temp->childNodes);

$nombre = getValue($pan, "NOMBRE");
$tipo = getValue($pan, "TIPO");
$precio = getValue($pan, "PRECIO");
$descripcion = getValue($pan, "DESCRIPCION");
$rating = getValue($pan, "RATING");
$imagen = getValue($pan, "IMAGEN");

$texto = "<h2>Mostrando pan por nombre</h2>";
$texto .= "<article itemtype='https://schema.org/individualproduct' class='producto'>";

//Imagen
$texto .= "<img class='imgProducto' src='" . $imagen . "' alt='" . $nombre . "'>";

//Titulo
$texto .= "<div class='card-body'><h4 class='card-title'>" . $nombre . "</h4>";

//Precio
$texto .= "<h5>$" . $precio . "</h5>";

//Descripcion
$texto .= "<p class='card-text'>" . $descripcion . "</p></div>";

//Rating
$texto .= "<div class='card-footer'><small>" . $rating . "</small></div>";

$texto .= "</article>";

echo $texto;
?>