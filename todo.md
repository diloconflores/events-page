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
[x] Hay que mover las imagenes desde `/Users/raymundo.salazar/Desktop/Dilo con Flores/Eventos fotos/` hasta `/public/` de este proyecto pasando cada imagen por un proceso de optimización en donde bajemos el peso de cada imagen a menos de `200kb`, sin perdida de calidad y las convirtamos a `webp`.
[x] De cada imagen hay que hacer un thumbnail de la misma imagen, de menor tamaño, respetando proporcion real de la imagen original. Cada thumbnail debe tener un ancho maximo de 400px y un alto maximo de 400px, pero recuerda que debes respetar la proporción real de la imagen original.
[x] para hacer la transferencia hay que revisar las imagenes que actualmente existen en el proyecto y usando solo la parte del nombre de la imagen de la url, dividir por guión bajo `_`, tomar la primer parte de eso, y cambiar el guión medio por un guión bajo
[x] En el boton de whatsapp, necesito que uses exactamente el mismo svg que tiene en `diloconflores.com`
[x] En modo mobile no debe aparecer eel boton `Solicitar propuesta ->` flotante. Este hay que eliminarlo.

### Menu

[x] El nav, ahora tiene un fondo en modo escritorio. No debería tenerlo. En modo mobile si.
[x] En modo mobile debe ocupar el 80% de la pantalla y el 100% del alto de la pantalla, el fondo debe ser el mismo color que el fondo del header cuando tiene fondo.
[x] El boton para cerrar o abrir el menu en modo mobile no debe tener ningun fondo, ni backdrop blur. Debe ser totalmente transparente

### Inpiración

[ ] Esta sección deberá estar separada del template siendo un organismo separado.
[ ] La distribución del header de esta sección deberá ser caption, titulo y descripción. Todo hacia abajo ocupando el 100% del ancho de la pantalla/contenedor con un `max-width` de `830px`

### Bento grid

En la plataforma hay dos bento grids, estas acciones aplicarán para ambos.

[ ] Crear un organismo/molecula bento grid a modo de galeria, debe tener la capacidad de recibir items, cada item debe tener thumbnail, original image, caption, title, subtitle, descripción, tags.
[ ] El bento grid se organizará según el orden en que se envien las imagenes.
[ ] El bento grid deberá tener la capacidad de limitar la cantidad de imagenes que muestra, y en caso de que sean más items que la cantidad a mostrar, la ultima. imagen deberá mostrar un overlay con la cantidad faltante, es decir, si estoy enviando 15 items, pero solo permito que se vean 10 el utlimo debería poner encima del overlay oscuro, con letra sofucientemente grande `+5`, limitado a `+99`
[ ] El bento grid deberá tener la capacidad de indicar cual es la cantidad maxima de columnas, esta se utilizará para poder ajustarse en dispositivos moviles, tables o pantallas más pequeñas.
[ ] Cada item del bento grid deberá tener un alto y un ancho definido para evitar que se rompa la distribución de la pagina.
[ ] Cada item del bento grid deberá mostrar el caption, title y subtitle. Todo debe estar en la parte baja de la imagen y debe tener un overlay ligero con un degradado desde abajo de negro a transparaente. Este degradado debe responder al siguiente css `linear-gradient(180deg,transparent 25%,rgba(10,7,9,.82))`
[ ] El caption en la card del bento debe ser un `small` con un `font-size` de `10px`, en mayusculas, con `letter-spacing` en `.18rem` y color `rgba(255, 255, 255, .72)`. Todo esto en tailwind
[ ] El title en la card del bento debe ser un `strong` con un `font-size` de `clamp(1rem,1.2vw,1.2rem)`, `line-height` en `1.05` y `font-weight` en `700`. Todo esto en tailwind
[ ] El subtitle en la card del bento debe ser un `em` con un `font-size` de `12px`, `font-style` en `normal`, `color = rgba(255,255,255,.78)` y `line-height` en `1.35`. Todo esto en tailwind
[ ] Al hacer clic en cualquier item del bento grid, se debe mostrar un modal que deberá estar constituido por un overlay oscuro con `backdrop blur`, encima sin card ni fondo. Centrado tanto vertical como horizontalmente. Del lado derecho la imagen ocupando el 100% del alto disponible y el 100% del ancho disponible. El ancho disponble será 2 terceras partes. La imagen deber mantener su proporción original. Se debe mostra la imagen original, NO el thumbnail. La image deberá tener esquinas rendondeadas respetando el diseño del resto de imagenes del proyecto. Encima de la imagen en la esquina superior derecha deberá tener un pill en color oscuro con transparencia y backdrop blur el contador `XX / YY` en donde mostrará la cantidad de imagenes totales `YY` y la imagen actual `XX`. En la esquina inferior izquierda deberá mostra el `caption`.
[ ] Debajo de la imagen y centrado deberá mostrar los dots indicando la cantidad de items que tiene el carrousel visualmente.
[ ] Debe haber una separación entre dots de `8px`
[ ] Todos los dots deberan ser circulos de `9px` de diametro en color `rgba(255,255,255,.28)`
[ ] El dot que representa el item seleccionado debe ser color rosa dilo `#e72371` y debe tener un ancho de `28px` y un alto de `9px`
[ ] Ocupando el otro tercio restante deberá mostrarse el titulo, el subtitulo, la descripción y los tags como pills.
[ ] A la izquiera y derecha del todo se debe mostrar, sin moverse los botones para ir a la siguiente y anterior imagen. Deberán ser unos circulos de diametro de `54px`, debe tener un fondo `rgba(255, 255, 255, .08)` y un borde `1px solid rgba(255, 255, 255, .18)`. Al hacer hover debe cambiar el color de fondo a `rgba(255,255,255,.16)` y un `scale` de `1.1`. Cada boton debe tener un `chevron` de lucide icons correspondientemente
[ ] Con exactamente el mismo diseño de los botones de prev y next. En la parte superior derecha de todo viewport debe estar un botonp para poder cerrar el modal/carrousel.
[ ] Se debe poder cerrar el modal/carroussel al darle clic al overlay
[ ] Se debe poder cerrar el modal/carroussel al precionar la tecla `esc`
[ ] Al momento de abrir/cerrar el modal/carrousel debe hacerlo con un fade in/out, el contenido debe crecer de `0.8` a `1` y al momento de cierre debe hacerlo al reves y tambien con un fade in/out.
[ ] Al momento de cambiar de slide debe hacer con un swipe, es decir, debe desplazarse todo el contenido hacia a la derecha o izquierda dependiendo de si la imagen que se va a mostrar es mayor o menor a la actual.
[ ] Al llegar al final y darle clic a siguiente debe mostrar la primera, lo mismo cuando estemos en la primera y le demos clic en anterior debe mostrar la ultima. Debe ser un carrousel infinito
[ ] Este carrousel y su contenido debe ser 100% responsivo y reaccionar al movimiento del tamaño de la pantalla.
[ ] En modo mobile la imagen debe respetar la proporcion original y ocupar el 100% del ancho de la pantalla. El espacio del ultimo tercio, es decir, donde esta contenido debe pasar a colocarse en la parte baja de la imagen.
[ ] En modo mobile el modal debera poder contar con scroll ya que puede irse mas abajo del alto del dispositivo.
[ ] Los botones de prev y next deberán ahora estar por encima de la imagen pero respetando estar a los laterales correspondientes. El boton de cerrar deberá colorcarse en la esquina superior derecha de la imagen mientras que el contador que antes estaba en esta esquina moverse a la esquina inferiror derecha.
[ ] En modo mobile se deberá poder avanzar o retroceder en el carrouse con solo hacer swipe con el dedo sobre la pantalla.

### Por qué elegirnos.

[ ] Esta sección deberá estar separada del template siendo un organismo separado.
[ ] Esta sección no debe estar dentro de un card.
[ ] El contenido debe comenzar desde el centro hacia la derecha de la pantalla teniendo como limite el mismo ancho que el resto de secciones.
[ ] El caption deberá tener un `font-size` de `12px`, color `rgba(255, 255, 255, .72)`, un `letter-spacing` en `.18em`, un `font-weight` de `700` y debe estar en mayusculas. Todo esto en tailwind.
[ ] El titulo deberá tener un `font-size` en `clamp(2rem,5vw,3.45rem)` y color blanco
[ ] El contenido deberá ser color blanco.
[ ] Los bulltes deberán ser `ul > li`.
[ ] El `ul` debera tener un `padding: 0`, `margin: 30px 0px` y `list-style: none`
[ ] Cada `li` deberá tener un dot a la izquierda del todo en color rosa dilo, debe ser de diametro de `7px` y debe estar completamente a la izquierda del todo y centrado veticalmente.
[ ] Cada `li` deberá tener un `padding: 15px 0 15px 28px` y un `border-top: 1px solid rgba(255, 255, 255, .16)`
[ ] Al final del todo deberá esta un boton en color blanco con texto negro y una flecha a la derecha. El boton debera tener `rounded-full`
[ ] El alto de la sección deberá corresponder exactamente al alto del contenido no más
[ ] El contenido deberá estar separado de arriba y abajo por `72px` desde los bordes superior e inferior.

### Así trabajamos

[ ] Esta sección deberá estar separada del template siendo un organismo separado.
[ ] La distribución del header de esta sección deberá ser caption, titulo y descripción. Todo hacia abajo ocupando el 100% del ancho de la pantalla/contenedor con un `max-width` de `830px`
[ ] La sección de bullets haremos que sea como una linea de tiempo descendente, cada item debe contener `El número con el caption`, `un titulo` y una descripción o detalle
[ ] Debe ser una linea vertical desde el primer punto hasta el ultimo a la izquierda de todo el contenedor.
[ ] El caption debe ser color rosa dilo, en mayusuclas y un `font-size: 10px`, `font-weight: 700`, `letter-spacing: 0.18em;`
[ ] El titilo será negro con un `font-size: clamp(24px, 2.6vw, 34px)`, `font-weight: 700`, `line-height: 1.12`
[ ] Cada item debe tener un estado inactive, conforme vayamos avanzando con el scroll se deberá ir mostrando activo cada item.
[ ] A la izquierda de cada item debe haber un dot color gris dentro de un circulo color gris. Solo cuando el item este activo se verá el dot completamente rosa con el numero del item dentro del dot y debe estar pulsando.
