-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-09-2020 a las 22:15:08
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `beneficiarios_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `canCreateBen` tinyint(1) NOT NULL,
  `canSeeExp` tinyint(1) NOT NULL,
  `role` int(11) NOT NULL,
  `haveImage` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `name`, `email`, `password`, `canCreateBen`, `canSeeExp`, `role`, `haveImage`, `deleted`) VALUES
(4, 'Luismiguel Ortiz Alvarez nuevo 5111', 'api.test.beneficiarios@gmail.com', '$2b$10$iyK3xxeWTKJJlEWD/lWrfOBRLO7ae.BXFls5Kb5vqKDfZnyFOf8fO', 1, 1, 0, 0, 0),
(5, 'Luismiguel Ortiz Alvarez', 'luismi.luu@gmail.com', '$2b$10$KWTgs.PoRgpOYi4OBdAUMOnvaoeNv6rLC/kiiVv68sb4lQRfVRNxu', 1, 1, 0, 0, 0),
(6, 'test 23r', 'luismi.lssuu@gmail.com', '$2b$10$rnl20pvHPp8no7rFQd9ZouuigI.7g6ZgFj5cgSB/loM6KcUJIpTMS', 1, 0, 0, 0, 1),
(7, 'el test 3dsdsdsd', 'luismi.lussssssu@gmail.com', '$2b$10$lmjZdN8ShXyC8hqA1WaaXeBJxaMC4YvcyE0DMk4F8btpnqu2ZJ5Ye', 1, 1, 0, 0, 0),
(8, 'Luismiguel Ortiz Alvarez', 'luismi.luudsds@gmail.com', '$2b$10$qk2VQRVUWzCiWqcprYUHxOznQphMjmkRQS7vCAMEG04GKukzkb9Dq', 1, 1, 0, 1, 0),
(9, 'el test nuevo', 'luismi.ldsdsdsdsuu@gmail.com', '$2b$10$C2Wvzh9BrZthjZt0W/EGFODNPHeO4YQC9OxgwrkSi9cbytPo9/rqO', 1, 1, 0, 0, 0),
(10, 'Luismiguel Ortiz Alvarez', 'luismi.luu@gdsdsmail.com', '$2b$10$.3NO7I2SsQFFmV9C.nnAz.5PS4LKej3JjtMOxf0sGerKoaKAO9O.e', 1, 1, 0, 0, 0),
(11, 'Luismiguel Ortiz Alvarez', 'luismi.luasdasdafu@gmail.com', '$2b$10$fprNfP6mag11D2khOyK63eeL5PvoD4yoknw0WJTN5ybMxfivvDmrW', 0, 0, 0, 0, 0),
(12, 'Luismiguel Ortiz ', 'dsdsdluismi.luu@gmail.com', '$2b$10$20ZKRm3DiozXd2OJVrcrbe/BxFxpwXrknRO54Ycpunp/738jCF.DW', 0, 1, 0, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `users_UN` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
