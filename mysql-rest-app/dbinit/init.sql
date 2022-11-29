CREATE DATABASE IF NOT EXISTS prospectsdb;

use prospectsdb;

DROP TABLE IF EXISTS prospects;

CREATE TABLE prospects (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) DEFAULT NULL,
    last_name  VARCHAR(255) DEFAULT NULL,
    email      VARCHAR(255) DEFAULT NULL,
    phone      VARCHAR(255) DEFAULT NULL,
    address    VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY_KEY(id),
    CONSTRAINT UQ_Prospect_Email UNIQUE(email)
);