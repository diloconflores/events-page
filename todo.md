# To Do List

## Mobile

### Header / Menu

[x] El icono de menu debe ser un hamburger menu icon con Lucide icons
[x] Los items se ven muy grandes y no estan alineados al diseño minimalista y elegante de la pagina.
[x] Cuando se hace scroll el menu pierde el fondo.
[x] Cuando el menu se esta mostrando y el scroll esta hasta arriba el logo blanco no se ve ya que el fondo del menu tambien es blanco.
[x] Cuando el menu se esta mostrando y el scroll esta hasta arriba el boton de cerrar no se ve ya que el fondo del menu es blanco.
[x] Cuando el menu se esta mostrando y el scroll esta hasta arriba el boton para mostrar el dropdown para cambiar entre ocasión y eventos no se ve ya que el fondo del menu es blanco.
[x] El dropdown, exclusivamnte en el dropdown del header, debería ocupar casí todo el ancho de la pantalla
[x] El menu debería ocupar el 1/6 aproximadamente del ancho de la pantalla y debe estar cargado a la derecha del todo
[x] Ocultar el boton de `Eventos`, el cual ayuda a cambiar entre eventos y arreglos de ocasión. Este debe estar dentro del menu, no a un lado del logo.

## General

[x] Integrar Google Analitycs y configuar los eventos en los clics y formularios.
[x] Agregar boton de whatsapp, replicar el boton tal cual se ve en `diloconflores.com`.
[x] En la sección `Inspiración` hay que definir el alto y ancho de las imagenes, ya que antes de que carguen, con el lazy load, se comprimen los altos y causa conflictos de layout
[ ] Hay que mover las imagenes desde `/Users/raymundo.salazar/Desktop/Dilo con Flores/Eventos fotos/` hasta `/public/` de este proyecto pasando cada imagen por un proceso de optimización en donde bajemos el peso de cada imagen a menos de `200kb`, sin perdida de calidad y las convirtamos a `webp`.
[ ] De cada imagen hay que hacer un thumbnail de la misma imagen, de menor tamaño, respetando proporcion real de la imagen original. Cada thumbnail debe tener un ancho maximo de 400px y un alto maximo de 400px, pero recuerda que debes respetar la proporción real de la imagen original.
[ ] para hacer la transferencia hay que revisar las imagenes que actualmente existen en el proyecto y usando solo la parte del nombre de la imagen de la url, dividir por guión bajo `_`, tomar la primer parte de eso, y cambiar el guión medio por un guión bajo
