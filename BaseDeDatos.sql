drop schema if exists proyectoIntegrador;
CREATE SCHEMA proyectoIntegrador;

USE proyectoIntegrador;

CREATE TABLE usuarios( 
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(225),
email VARCHAR(225) UNIQUE,
nacimiento date,
contraseña VARCHAR(225) NOT NULL,
telefono VARCHAR(20),
imagen VARCHAR(225)
);



CREATE TABLE posteos(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
imagen VARCHAR(225),
descripcion VARCHAR(250),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
usuario_id INT UNSIGNED,
FOREIGN KEY(usuario_id) REFERENCES usuarios(id) -- relacion entre la tabla de posteos y usuarios
);


CREATE TABLE comentarios(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
comentario VARCHAR(250),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
usuario_id INT UNSIGNED,
FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
posteo_id INT UNSIGNED,
FOREIGN KEY(posteo_id) REFERENCES posteos(id)
);

CREATE TABLE seguir(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
seguidor INT UNSIGNED,
seguido INT UNSIGNED,
FOREIGN KEY(seguidor) REFERENCES usuarios(id),
FOREIGN KEY(seguido) REFERENCES usuarios(id)
);



INSERT INTO usuarios values
(DEFAULT, 'Martina Unaunzaga', 'mar@gmail.com', '2001-11-18', 'holahola', '1167257560', '/imagenes/perfil.jpg'),
(DEFAULT, 'Lautaro Espiño', 'laue@hotmail.com', '2000-11-18', 'loros', '1144352578', '/imagenes/hola.jpg'),
(DEFAULT, 'Julieta Rodriguez', 'jular@gmail.com', '2001-10-02', '1234j', '1122681396', '/imagenes/fot.jpg'),
(DEFAULT, 'Martina Liparini', 'mlipa@yahoo.com', '2001-10-08', 'rocco', '1149971187', '/imagenes/jamaica.jpg'),
(DEFAULT, 'José Gimenez', 'josecito@hotmail.com', '1997-06-23', 'pajaros', '1199786534', '/imagenes/porfile.jpg');




INSERT INTO posteos values
(DEFAULT, '/images/wine.jpg', 'El mejor vino que vas a probar en tu vida', default,default, 1),
(DEFAULT, '/images/losvinos.jpg', 'Siempre con un tinto en la mano', default,default, 3),
(DEFAULT, '/images/tinto.jpg', 'Para este domingo que mejor?', default,default, 5),
(DEFAULT, '/images/rutini.jpg', 'Tomate un Rutini', default,default, 2),
(DEFAULT, '/images/blanco.jpg', 'Siempre brindando con un vino blanco', default,default, 5),
(DEFAULT, '/images/rosado.jpg', 'Te gusta el rosado?', default,default, 4),
(DEFAULT, '/images/losmejores.jpg', 'Los mejores vinos los tenemos nosotros', default,default, 1),
(DEFAULT, '/images/malbec.jpg', 'Sabado con Malbec', default,default, 3),
(DEFAULT, '/images/vinos.jpg', 'Disfruta de unas copas con amigos', default,default, 2),
(DEFAULT, '/images/tuvino.jpg', 'El vino que estas buscando', default,default, 1);

INSERT INTO comentarios values
(DEFAULT, 'Muy buen vino la verdad', default,default, 3, 1),
(DEFAULT, 'La calidad no es muy buena', default,default, 4, 1),
(DEFAULT, 'El mas rico!', default,default, 1, 1),
(DEFAULT, 'Demasiado caro', default,default, 2, 1),
(DEFAULT, '@flor te gusta??', default,default, 1, 2),
(DEFAULT, 'Lo voy a comprar ya mismo', default,default, 2, 2),
(DEFAULT, 'El precio es muy elevado.', default,default, 3, 2),
(DEFAULT, 'Me encanta este vino!', default,default, 4, 2),
(DEFAULT, 'Buenisimooooo', default,default, 1, 3),
(DEFAULT, 'Lo tendria que probar...', default,default, 2, 3),
(DEFAULT, 'Lo probe y no me parecio tan bueno', default,default, 3, 3),
(DEFAULT, 'Quiero una copaa', default,default, 4, 3),
(DEFAULT, 'Lo voy a probar', default,default, 1, 4),
(DEFAULT, 'No me gustó', default,default, 2, 4),
(DEFAULT, 'Quiero el rosadoo', default,default, 3, 4),
(DEFAULT, 'Quiero probarlo', default,default, 4, 4),
(DEFAULT, '@tomas compro uno para hoy?', default,default, 1, 5),
(DEFAULT, 'Prefiero un Malbec', default,default, 2, 5),
(DEFAULT, 'El mas rico!', default,default, 3, 5),
(DEFAULT, 'Muy buen vino', default,default, 4, 5),
(DEFAULT, 'Quiero mill', default,default, 1, 6),
(DEFAULT, 'Ayer compré el mismo', default,default, 2, 6),
(DEFAULT, '@josefina este es para vos!', default,default, 3, 6),
(DEFAULT, 'Podrá ser tan bueno?', default,default, 4, 6),
(DEFAULT, 'Amo!!', default,default, 5, 7),
(DEFAULT, 'Quieroo', default,default, 5, 7),
(DEFAULT, 'Siiiiii', default,default, 5, 7),
(DEFAULT, 'No lo recomiendo', default,default, 1, 7),
(DEFAULT, 'No es tan rico', default,default, 2, 8),
(DEFAULT, 'El dia se presta para eso', default,default, 3, 8),
(DEFAULT, 'Delicioso', default,default, 4, 8),
(DEFAULT, '@julianr lo probamos??', default,default, 5, 8),
(DEFAULT, 'Que ganas de un vinitoo', default,default, 1, 9),
(DEFAULT, 'Perdon pero yo soy fan del blanco', default,default, 2, 9),
(DEFAULT, 'Siempre elijo el mismo', default,default, 3, 9),
(DEFAULT, '@maruna el sabado con estee', default,default, 4, 9),
(DEFAULT, 'Quiero todosss', default,default, 5, 10),
(DEFAULT, 'No me gustó tanto', default,default, 1, 10),
(DEFAULT, 'Riquisimo', default,default, 2, 10),
(DEFAULT, 'Voy a probarlo', default,default, 3, 10);










