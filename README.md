# CarvajalFront

CarvajalFront es una aplicación web interactiva que permite a los usuarios comunicarse a través de publicaciones y comentarios en un formato similar al de una red social. Este proyecto está construido con Angular versión 17.2.3 y utiliza Spring Boot versión 2.6.3 en el backend, siguiendo una arquitectura hexagonal y de microservicios para lograr modularidad y escalabilidad.

## Arquitectura de la Aplicación

La aplicación emplea una combinación de arquitectura hexagonal y microservicios, utilizando un servidor ActiveMQ para la gestión de colas de mensajes que facilitan el envío eficiente y desacoplado de notificaciones por correo electrónico.

## Backend

El backend, desarrollado con Spring Boot, se encarga de las operaciones de lógica de negocio. Para el manejo de correos electrónicos, se utiliza la API de correo de Spring Boot con ActiveMQ.

### Funcionalidades del Backend
- **Spring Boot :** Creación de microservicios robustos.
- **ActiveMQ:** Manejo de colas para envío de notificaciones por correo electrónico.
- **PostgreSQL:** Base de datos para almacenamiento de datos relacionales.
- **Testing Backend:** Pruebas unitarias implementadas con Mockito y JUnit.

## Frontend

El frontend se ha creado con Angular 17.2.3, empleando Bootstrap para un diseño moderno y adaptable.

### Características del Frontend
- **Bootstrap:** Interfaz de usuario atractiva y responsiva.
- **JWT (JSON Web Tokens):** Gestión de sesiones y autorización.

## Base de Datos

Se ha elegido PostgreSQL como sistema de gestión de bases de datos por su robustez y características de ACID.

### Script SQL para Crear las Tablas

```sql
-- facetime.usuarios definition

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

-- Permissions

ALTER TABLE facetime.usuarios OWNER TO postgres;
GRANT ALL ON TABLE facetime.usuarios TO postgres;


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

-- Permissions

ALTER TABLE facetime.credenciales OWNER TO postgres;
GRANT ALL ON TABLE facetime.credenciales TO postgres;


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

-- Permissions

ALTER TABLE facetime.publicaciones OWNER TO postgres;
GRANT ALL ON TABLE facetime.publicaciones TO postgres;


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

-- Permissions

ALTER TABLE facetime.comentarios OWNER TO postgres;
GRANT ALL ON TABLE facetime.comentarios TO postgres;


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

-- Permissions

ALTER TABLE facetime.respuestas_comentarios OWNER TO postgres;
GRANT ALL ON TABLE facetime.respuestas_comentarios TO postgres;

```
### Despliegue

Para desplegar la aplicación, se deben configurar y ejecutar ActiveMQ y PostgreSQL, seguido del despliegue de los microservicios de Spring Boot y la aplicación Angular.

1. Pasos para el Despliegue
2. Configurar ActiveMQ.
3. Configurar PostgreSQL con el script SQL proporcionado.
4. Desplegar los microservicios Spring Boot.
4. Ejecutar ng serve para iniciar la aplicación Angular.
5. Testing
6. Pruebas unitarias realizadas para el backend con Mockito y JUnit. Pruebas para el frontend en Angular están pendientes.

### Estrategia de Ramificación (GitFlow)
Se utiliza GitFlow para una gestión de código fuente organizada y eficiente.

### Contribución
Agradecemos cualquier contribución a nuestro proyecto. Para contribuir, por favor sigue las pautas establecidas en nuestras Directrices de Contribución.

### Contacto
Para preguntas o colaboraciones, contáctanos a través de correo electrónico.
