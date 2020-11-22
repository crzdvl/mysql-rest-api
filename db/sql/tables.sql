CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verify` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `products_tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_id` bigint DEFAULT NULL,
  `tag_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `sellers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verify` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

