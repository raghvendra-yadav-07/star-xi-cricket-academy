-- STARXI Cricket Academy Relational Database Schema
CREATE DATABASE IF NOT EXISTS starxi_cricket_db;
USE starxi_cricket_db;

-- Table 1: Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age_category ENUM('Under 13', 'Under 16', 'Under 19', 'Senior') NOT NULL,
    notes TEXT,
    status ENUM('Pending', 'Contacted', 'Admitted', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created (created_at),
    INDEX idx_status (status)
);

-- Table 2: Coaches
CREATE TABLE IF NOT EXISTS coaches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role_title VARCHAR(100) NOT NULL,
    specialization VARCHAR(150),
    experience_years INT DEFAULT 0,
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Players (Top Players / Star Athletes)
CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age_category ENUM('Under 13', 'Under 16', 'Under 19', 'Senior') NOT NULL,
    speciality ENUM('Opening Batsman', 'Middle Order Batsman', 'Fast Bowler', 'Spin Bowler', 'All-rounder', 'Wicketkeeper') NOT NULL,
    matches_played INT DEFAULT 0,
    runs_scored INT DEFAULT 0,
    wickets_taken INT DEFAULT 0,
    is_top_player BOOLEAN DEFAULT TRUE,
    badge_label VARCHAR(50) DEFAULT 'Star Player',
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Tournaments
CREATE TABLE IF NOT EXISTS tournaments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Upcoming', 'Ongoing', 'Completed') DEFAULT 'Upcoming',
    winner_details VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Media Gallery
CREATE TABLE IF NOT EXISTS media_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    type ENUM('Photo', 'Video', 'LiveStream') NOT NULL,
    url TEXT NOT NULL,
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
