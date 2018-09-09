# voucher-info

Uno bot de Telegram (@voucherinfobot) que te responde el voucher actual de la red AlumnosInfo en la Facultad de Informática de la UNLP

<p align="center">
  <img src="https://github.com/vmari/voucher-info/blob/master/homero.gif">
</p>

Si, seguro te estás preguntando, ¿Cómo le escribo al bot si no tengo internet?
La verdad es que el token cambia una vez por semana, y si lo pedis cuando tenés internet, te queda guardado en el historial, podes copiarlo en el portapapeles y listo. Además evita que abras el navegador y cargues una página completa (lafuente,instagram,unlp, etc) para traer solo el voucher, ahorra tiempo y datos.

Si tenés alguna idea, PR son bienvenidos. Si lo usaste y te gustó esperamos tu ★Star

## Entorno de desarrollo

Para poder probar el bot y hacer el tuyo, hay un par de herramientas interesantes para facilitar el development-flow del bot.

Primero que nada, para que Telegram envíe los mensajes a tu servidor, necesitas una URI pública, lo que se complica cuando tenes una conexión a internet con firewall o con IP dinámica. Por lo tanto usamos `ngrok`, que es un servicio de proxy.

Para poder levantar el server precisas [Node.js](http://nodejs.org/)

Si querés hacer tu propio deploy a Heroku, vas a precisar [Heroku CLI](https://cli.heroku.com/)

Una vez seteado el entorno, podes clonar el repo y empezar a modificar y probar cosas copadas:

```sh
$ git clone git@github.com:vmari/voucher-info.git # también podes clonar tu propio fork! :)
$ cd voucher-info
$ npm install
```

Para poder ejecutar el server, vas a tener que crear un archivo `.env` en donde va a estar almacenada la información sensible de la aplicación. En este archivo se espera que estén las credenciales de autenticación del bot y de una base de datos de mongodb, junto al puerto en el que va a correr el servidor.

```env
TELEGRAM_TOKEN=666777888:adsjkhqwepauisdyewoirwskdflasdoiufy
MONGODB=mongodb://user:pass@host:port/db
PORT=5000
```

El bot debería estar corriendo y si todo salió bien, vas a ver la URI de ngrok en donde Telegram va a enviar los mensajes de tu Bot.

## Bot de Telegram

### Creando un Bot
Para poder crear tu propio Bot, podés escribirle a @BotFather y te va a dar las credenciales de autenticación.

### ¿Cómo funciona?
Hay dos formas de recibir mensajes de un Bot de Telegram, una es por /polling/ y la otra es por /webhooks/.

*polling*
 - En este modelo, vos te conectas a Telegram y le preguntas por mensajes nuevos. Es ineficiente ya que requiere que te conectes periodicamente y puede que no tengas mensajes nuevos.

*webhooks*
 - Esta modalidad es más eficiente pero requiere que tengas tu servidor levantado 24hs para recibir el mensaje. Si tenes downtime no te preocupes, Telegram envía los mensajes hasta que le respondas 200 OK en un periodo de 24Hs

Eso es todo! ¿Esperabas más?
Ahora que está todo andando, seguro tenes una banda de ganas de agregarle cosas, no? Te dejo un par de ideas y vos podés agregar las tuyas.

 - Suscripción a cambios de token (cada vez que cambia te llega un mensaje)
 - ... ay creo que le habla a usted.
