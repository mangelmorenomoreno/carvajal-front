# CarvajalFront

CarvajalFront es una aplicación web interactiva que permite a los usuarios comunicarse a través de publicaciones y comentarios en un formato similar al de una red social. Este proyecto está construido con Angular versión 17.2.3 en el frontend y utiliza Spring Boot versión 2.6.3 en el backend, siguiendo una arquitectura hexagonal y de microservicios para lograr modularidad y escalabilidad.

## Arquitectura de la Aplicación

La aplicación emplea una combinación de arquitectura hexagonal y microservicios, utilizando un servidor ActiveMQ para la gestión de colas de mensajes que facilitan el envío eficiente y desacoplado de notificaciones por correo electrónico.

## Backend

El backend está desarrollado con Spring Boot 2.6.3 y se encarga de las operaciones de lógica de negocio. Para el manejo de correos electrónicos, utilizamos la API de correo de Spring Boot con ActiveMQ.

### Funcionalidades del Backend:
- **Spring Boot 2.6.3:** Para la creación de microservicios robustos.
- **ActiveMQ:** Manejo de colas para el envío de notificaciones por correo electrónico.
- **PostgreSQL:** Como base de datos para el almacenamiento de datos relacionales.
- **Testing Backend:** Implementado con Mockito y JUnit para pruebas unitarias.

## Frontend

El frontend está creado con Angular 17.2.3 y usa Bootstrap para un diseño de interfaz de usuario moderno y adaptable.

### Características del Frontend:
- **Bootstrap:** Para una interfaz de usuario atractiva y responsiva.
- **JWT (JSON Web Tokens):** Para la gestión de sesiones y autorización.

## Base de Datos

Elegimos PostgreSQL como sistema de gestión de bases de datos debido a su robustez y características de ACID. El script SQL para la creación de las tablas es el siguiente:

`-- -- facetime.usuarios definition

-- Drop table

-- DROP TABLE facetime.usuarios;

CREATE TABLE facetime.usuarios (
	user_id serial4 NOT NULL,
	nombre varchar(100) NOT NULL,
	correo_electronico varchar(150) NOT NULL,
	fecha_creacion timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	apellido varchar(100) NULL,
	estado bool NULL,
	CONSTRAINT usuarios_correo_electronico_key UNIQUE (correo_electronico),
	CONSTRAINT usuarios_pkey PRIMARY KEY (user_id)
);


-- facetime.credenciales definition

-- Drop table

-- DROP TABLE facetime.credenciales;

CREATE TABLE facetime.credenciales (
	credencial_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	hash_contraseña varchar(1000) NULL,
	token_reset_password varchar(1000) NULL,
	token_reset_expiry timestamptz NULL,
	CONSTRAINT credenciales_pkey PRIMARY KEY (credencial_id),
	CONSTRAINT fk_usuario FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);


-- facetime.publicaciones definition

-- Drop table

-- DROP TABLE facetime.publicaciones;

CREATE TABLE facetime.publicaciones (
	post_id bigserial NOT NULL,
	user_id int4 NOT NULL,
	titulo varchar(200) NULL,
	contenido text NOT NULL,
	fecha_publicacion timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT publicaciones_pkey PRIMARY KEY (post_id),
	CONSTRAINT publicaciones_user_id_fkey FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);


-- facetime.comentarios definition

-- Drop table

-- DROP TABLE facetime.comentarios;

CREATE TABLE facetime.comentarios (
	comment_id bigserial NOT NULL,
	post_id int8 NULL,
	user_id int4 NOT NULL,
	contenido text NOT NULL,
	fecha_comentario timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT comentarios_pkey PRIMARY KEY (comment_id),
	CONSTRAINT comentarios_post_id_fkey FOREIGN KEY (post_id) REFERENCES facetime.publicaciones(post_id),
	CONSTRAINT comentarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);


-- facetime.respuestas_comentarios definition

-- Drop table

-- DROP TABLE facetime.respuestas_comentarios;

CREATE TABLE facetime.respuestas_comentarios (
	respuesta_id bigserial NOT NULL,
	comment_id int8 NOT NULL,
	user_id int4 NOT NULL,
	contenido text NOT NULL,
	fecha_respuesta timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT respuestas_comentarios_pkey PRIMARY KEY (respuesta_id),
	CONSTRAINT respuestas_comentarios_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES facetime.comentarios(comment_id),
	CONSTRAINT respuestas_comentarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);
``sql

# CarvajalFront

CarvajalFront es una aplicación web interactiva que permite a los usuarios comunicarse a través de publicaciones y comentarios en un formato similar al de una red social. Este proyecto está construido con Angular versión 17.2.3 en el frontend y utiliza Spring Boot versión 2.6.3 en el backend, siguiendo una arquitectura hexagonal y de microservicios para lograr modularidad y escalabilidad.

## Arquitectura de la Aplicación

La aplicación emplea una combinación de arquitectura hexagonal y microservicios, utilizando un servidor ActiveMQ para la gestión de colas de mensajes que facilitan el envío eficiente y desacoplado de notificaciones por correo electrónico.

## Backend

El backend está desarrollado con Spring Boot 2.6.3 y se encarga de las operaciones de lógica de negocio. Para el manejo de correos electrónicos, utilizamos la API de correo de Spring Boot con ActiveMQ.

### Funcionalidades del Backend:
- **Spring Boot 2.6.3:** Para la creación de microservicios robustos.
- **ActiveMQ:** Manejo de colas para el envío de notificaciones por correo electrónico.
- **PostgreSQL:** Como base de datos para el almacenamiento de datos relacionales.
- **Testing Backend:** Implementado con Mockito y JUnit para pruebas unitarias.

## Frontend

El frontend está creado con Angular 17.2.3 y usa Bootstrap para un diseño de interfaz de usuario moderno y adaptable.

### Características del Frontend:
- **Bootstrap:** Para una interfaz de usuario atractiva y responsiva.
- **JWT (JSON Web Tokens):** Para la gestión de sesiones y autorización.

## Base de Datos

Elegimos PostgreSQL como sistema de gestión de bases de datos debido a su robustez y características de ACID. El script SQL para la creación de las tablas es el siguiente:

\```sql
---- -- facetime.usuarios definition

-- Drop table

-- DROP TABLE facetime.usuarios;

CREATE TABLE facetime.usuarios (
	user_id serial4 NOT NULL,
	nombre varchar(100) NOT NULL,
	correo_electronico varchar(150) NOT NULL,
	fecha_creacion timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	apellido varchar(100) NULL,
	estado bool NULL,
	CONSTRAINT usuarios_correo_electronico_key UNIQUE (correo_electronico),
	CONSTRAINT usuarios_pkey PRIMARY KEY (user_id)
);


-- facetime.credenciales definition

-- Drop table

-- DROP TABLE facetime.credenciales;

CREATE TABLE facetime.credenciales (
	credencial_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	hash_contraseña varchar(1000) NULL,
	token_reset_password varchar(1000) NULL,
	token_reset_expiry timestamptz NULL,
	CONSTRAINT credenciales_pkey PRIMARY KEY (credencial_id),
	CONSTRAINT fk_usuario FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);


-- facetime.publicaciones definition

-- Drop table

-- DROP TABLE facetime.publicaciones;

CREATE TABLE facetime.publicaciones (
	post_id bigserial NOT NULL,
	user_id int4 NOT NULL,
	titulo varchar(200) NULL,
	contenido text NOT NULL,
	fecha_publicacion timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT publicaciones_pkey PRIMARY KEY (post_id),
	CONSTRAINT publicaciones_user_id_fkey FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);


-- facetime.comentarios definition

-- Drop table

-- DROP TABLE facetime.comentarios;

CREATE TABLE facetime.comentarios (
	comment_id bigserial NOT NULL,
	post_id int8 NULL,
	user_id int4 NOT NULL,
	contenido text NOT NULL,
	fecha_comentario timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT comentarios_pkey PRIMARY KEY (comment_id),
	CONSTRAINT comentarios_post_id_fkey FOREIGN KEY (post_id) REFERENCES facetime.publicaciones(post_id),
	CONSTRAINT comentarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);


-- facetime.respuestas_comentarios definition

-- Drop table

-- DROP TABLE facetime.respuestas_comentarios;

CREATE TABLE facetime.respuestas_comentarios (
	respuesta_id bigserial NOT NULL,
	comment_id int8 NOT NULL,
	user_id int4 NOT NULL,
	contenido text NOT NULL,
	fecha_respuesta timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT respuestas_comentarios_pkey PRIMARY KEY (respuesta_id),
	CONSTRAINT respuestas_comentarios_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES facetime.comentarios(comment_id),
	CONSTRAINT respuestas_comentarios_user_id_fkey FOREIGN KEY (user_id) REFERENCES facetime.usuarios(user_id)
);
--
\```

## Despliegue

Para desplegar la aplicación, se deben configurar y ejecutar ActiveMQ y PostgreSQL, seguido del despliegue de los microservicios de Spring Boot y la aplicación Angular.

### Pasos para el Despliegue:
1. Configurar ActiveMQ.
2. Configurar PostgreSQL con el script SQL proporcionado.
3. Desplegar los microservicios Spring Boot.
4. Ejecutar `ng serve` para iniciar la aplicación Angular.

## Testing

Se han realizado pruebas unitarias para el backend con Mockito y JUnit. El frontend en Angular está pendiente de pruebas unitarias.

## Estrategia de Ramificación (GitFlow)

Hemos seguido la estrategia de GitFlow, trabajando con ramas `feature`, `dev`, `test`, `staging` y `main` para una gestión de código fuente organizada y eficiente.

