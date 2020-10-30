-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-10-2020 a las 01:26:13
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
-- Estructura de tabla para la tabla `beneficiarys`
--

CREATE TABLE `beneficiarys` (
  `idBeneficiary` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `motherLastName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `gender` int(11) NOT NULL DEFAULT 0,
  `birthDay` datetime NOT NULL,
  `phone1` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone2` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `civilStatus` int(11) NOT NULL DEFAULT -1,
  `occupation` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `scholarship` int(11) NOT NULL DEFAULT -1,
  `curp` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `rfc` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createDate` datetime NOT NULL,
  `haveImage` tinyint(1) NOT NULL DEFAULT 0,
  `idUserRegister` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `beneficiarys`
--

INSERT INTO `beneficiarys` (`idBeneficiary`, `name`, `lastName`, `motherLastName`, `gender`, `birthDay`, `phone1`, `phone2`, `civilStatus`, `occupation`, `scholarship`, `curp`, `rfc`, `active`, `createDate`, `haveImage`, `idUserRegister`) VALUES
(2, 'luismiguel', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-27 20:39:51', 0, 4),
(3, 'luismiguel', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-28 01:19:44', 0, 4),
(4, 'luismiguel', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-28 01:22:16', 0, 4),
(5, 'luismiguel', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-28 02:00:39', 0, 4),
(6, 'luismiguel', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-28 02:03:45', 0, 4),
(8, 'luismiguel', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-28 02:05:44', 0, 4),
(12, 'floedsds', 'ortiz', 'alvarez', 1, '1994-01-17 06:00:00', '6394740742', '', 2, 'Estudiante', 3, 'OIAL940118HCHRLS05', 'nigungo', 1, '2020-10-29 23:34:28', 0, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `economicStudyForm`
--

CREATE TABLE `economicStudyForm` (
  `idEconomicStudyForm` int(11) NOT NULL,
  `idBeneficiary` int(11) NOT NULL,
  `medicalService` int(11) DEFAULT -1,
  `haveDisability` tinyint(1) DEFAULT 0,
  `causeDisability` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `disabilityTime` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `haveChronicDisease` tinyint(1) DEFAULT 0,
  `chronicDiseaseType` int(11) DEFAULT -1,
  `other` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colony` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `street` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postalCode` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `references` varchar(400) COLLATE utf8_unicode_ci DEFAULT NULL,
  `typeHousing` int(11) DEFAULT -1,
  `numberRooms` int(11) DEFAULT 0,
  `numberBathrooms` int(11) DEFAULT 0,
  `numberBedrooms` int(11) DEFAULT 0,
  `housingConditions` int(11) DEFAULT -1,
  `floor` int(11) DEFAULT -1,
  `ceiling` int(11) DEFAULT -1,
  `termsFurniture` int(11) DEFAULT -1,
  `timeAtHome` int(11) DEFAULT -1,
  `haveStove` tinyint(1) DEFAULT 0,
  `haveCar` tinyint(1) DEFAULT 0,
  `haveFridge` tinyint(1) DEFAULT 0,
  `haveMicrowave` tinyint(1) DEFAULT 0,
  `haveWashingMachine` tinyint(1) DEFAULT 0,
  `haveComputer` tinyint(1) DEFAULT 0,
  `haveTelevision` tinyint(1) DEFAULT 0,
  `haveAirConditioning` tinyint(1) DEFAULT 0,
  `houseDescription` varchar(1500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diagnostic` varchar(1500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL,
  `monthlyIncome` double DEFAULT 0,
  `monthlyFamilyIncome` double DEFAULT 0,
  `phone` double DEFAULT 0,
  `internet` double DEFAULT 0,
  `gasoline` double DEFAULT 0,
  `rent` double DEFAULT 0,
  `monthlyPasses` double DEFAULT 0,
  `light` double DEFAULT 0,
  `predial` double DEFAULT 0,
  `education` double DEFAULT 0,
  `transport` double DEFAULT 0,
  `water` double DEFAULT 0,
  `gas` double DEFAULT 0,
  `medicalExpenses` double DEFAULT 0,
  `cableTV` double DEFAULT 0,
  `dress` double DEFAULT 0,
  `others` double DEFAULT 0,
  `feeding` double DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evidenceImages`
--

CREATE TABLE `evidenceImages` (
  `idEvidenceImages` int(11) NOT NULL,
  `idEconomicStudyForm` int(11) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familyBeneficiarys`
--

CREATE TABLE `familyBeneficiarys` (
  `idFamilyBeneficiarys` int(11) NOT NULL,
  `idEconomicStudyForm` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `motherLastName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `birthDay` datetime DEFAULT NULL,
  `scholarship` int(11) DEFAULT NULL,
  `occupation` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `civilState` int(11) DEFAULT NULL,
  `relationship` int(11) DEFAULT NULL,
  `input` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(4, 'Luismiguel Ortiz Alvarez nuevo 5', 'api.test.beneficiarios@gmail.com', '$2b$10$iyK3xxeWTKJJlEWD/lWrfOBRLO7ae.BXFls5Kb5vqKDfZnyFOf8fO', 1, 1, 0, 0, 0),
(5, 'Luismiguel Ortiz Alvarez', 'luismi.luu@gmail.com', '$2b$10$KWTgs.PoRgpOYi4OBdAUMOnvaoeNv6rLC/kiiVv68sb4lQRfVRNxu', 1, 1, 0, 1, 0),
(6, 'test 23r', 'luismi.lssuu@gmail.com', '$2b$10$rnl20pvHPp8no7rFQd9ZouuigI.7g6ZgFj5cgSB/loM6KcUJIpTMS', 1, 0, 0, 0, 1),
(7, 'el test ', 'luismi.lussssssu@gmail.com', '$2b$10$lmjZdN8ShXyC8hqA1WaaXeBJxaMC4YvcyE0DMk4F8btpnqu2ZJ5Ye', 1, 1, 0, 0, 0),
(8, 'Luismiguel Ortiz Alvarez', 'luismi.luudsds@gmail.com', '$2b$10$qk2VQRVUWzCiWqcprYUHxOznQphMjmkRQS7vCAMEG04GKukzkb9Dq', 1, 1, 0, 1, 0),
(9, 'el test nuevo', 'luismi.ldsdsdsdsuu@gmail.com', '$2b$10$C2Wvzh9BrZthjZt0W/EGFODNPHeO4YQC9OxgwrkSi9cbytPo9/rqO', 1, 1, 0, 0, 0),
(10, 'Luismiguel Ortiz Alvarez', 'luismi.luu@gdsdsmail.com', '$2b$10$.3NO7I2SsQFFmV9C.nnAz.5PS4LKej3JjtMOxf0sGerKoaKAO9O.e', 1, 1, 0, 0, 0),
(11, 'Luismiguel Ortiz Alvarez', 'luismi.luasdasdafu@gmail.com', '$2b$10$fprNfP6mag11D2khOyK63eeL5PvoD4yoknw0WJTN5ybMxfivvDmrW', 0, 0, 0, 0, 0),
(12, 'Luismiguel Ortiz ', 'dsdsdluismi.luu@gmail.com', '$2b$10$20ZKRm3DiozXd2OJVrcrbe/BxFxpwXrknRO54Ycpunp/738jCF.DW', 0, 1, 0, 1, 1),
(13, 'Luismiguel Ortiz Alvarez', 'luismi.dsadsluu@gmail.com', '$2b$10$w7Tx10f7uOw.GQkT5lRkb.K.44WEw2/26X/jMGBJcNSQVAGQ7asF.', 1, 1, 0, 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `beneficiarys`
--
ALTER TABLE `beneficiarys`
  ADD PRIMARY KEY (`idBeneficiary`),
  ADD UNIQUE KEY `beneficiarys_UN` (`idBeneficiary`),
  ADD KEY `beneficiarys_FK` (`idUserRegister`);

--
-- Indices de la tabla `economicStudyForm`
--
ALTER TABLE `economicStudyForm`
  ADD PRIMARY KEY (`idEconomicStudyForm`),
  ADD UNIQUE KEY `economicStudyForm_UN` (`idEconomicStudyForm`),
  ADD KEY `economicStudyForm_FK` (`idBeneficiary`);

--
-- Indices de la tabla `evidenceImages`
--
ALTER TABLE `evidenceImages`
  ADD PRIMARY KEY (`idEvidenceImages`),
  ADD UNIQUE KEY `evidenceImages_UN` (`idEvidenceImages`),
  ADD KEY `evidenceImages_FK` (`idEconomicStudyForm`);

--
-- Indices de la tabla `familyBeneficiarys`
--
ALTER TABLE `familyBeneficiarys`
  ADD PRIMARY KEY (`idFamilyBeneficiarys`),
  ADD UNIQUE KEY `familyBeneficiarys_UN` (`idFamilyBeneficiarys`),
  ADD KEY `familyBeneficiarys_FK` (`idEconomicStudyForm`);

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
-- AUTO_INCREMENT de la tabla `beneficiarys`
--
ALTER TABLE `beneficiarys`
  MODIFY `idBeneficiary` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `economicStudyForm`
--
ALTER TABLE `economicStudyForm`
  MODIFY `idEconomicStudyForm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `evidenceImages`
--
ALTER TABLE `evidenceImages`
  MODIFY `idEvidenceImages` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `familyBeneficiarys`
--
ALTER TABLE `familyBeneficiarys`
  MODIFY `idFamilyBeneficiarys` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `beneficiarys`
--
ALTER TABLE `beneficiarys`
  ADD CONSTRAINT `beneficiarys_FK` FOREIGN KEY (`idUserRegister`) REFERENCES `users` (`idUser`);

--
-- Filtros para la tabla `economicStudyForm`
--
ALTER TABLE `economicStudyForm`
  ADD CONSTRAINT `economicStudyForm_FK` FOREIGN KEY (`idBeneficiary`) REFERENCES `beneficiarys` (`idBeneficiary`);

--
-- Filtros para la tabla `evidenceImages`
--
ALTER TABLE `evidenceImages`
  ADD CONSTRAINT `evidenceImages_FK` FOREIGN KEY (`idEconomicStudyForm`) REFERENCES `economicStudyForm` (`idEconomicStudyForm`);

--
-- Filtros para la tabla `familyBeneficiarys`
--
ALTER TABLE `familyBeneficiarys`
  ADD CONSTRAINT `familyBeneficiarys_FK` FOREIGN KEY (`idEconomicStudyForm`) REFERENCES `economicStudyForm` (`idEconomicStudyForm`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
