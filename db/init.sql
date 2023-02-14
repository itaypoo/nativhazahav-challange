CREATE TABLE `plane_data` (
  `mass` int NOT NULL,
  `takeoff_time` float NOT NULL,
  `takeoff_position` float NOT NULL,
  `mass_to_remove` float DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci