SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Species;
DROP TABLE IF EXISTS Officers;
DROP TABLE IF EXISTS Position;
DROP TABLE IF EXISTS Rank;
DROP TABLE IF EXISTS Starship;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Assignment;
DROP TABLE IF EXISTS Explorer;
DROP TABLE IF EXISTS Battleship;
DROP TABLE IF EXISTS Science;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE Department(
	name varchar(20) PRIMARY KEY,
	color varchar(10)
);

CREATE TABLE Rank(
	number int PRIMARY KEY AUTO_INCREMENT,
	title varchar(15)
);

CREATE TABLE Speices(
	code int PRIMARY KEY AUTO_INCREMENT,
	name varchar(50),
	lifespan int,
	planetName varchar(50),
	planetLeader varchar(50),
	proclivity varchar(20),
	FOREIGN KEY (proclivity) REFERENCES Department(name)
);


CREATE TABLE Officers(
	serviceNumber int PRIMARY KEY AUTO_INCREMENT,
	fname varchar(25),
	lname varchar(25),
	rank int,
	techLevel int,
	species int,
	status varchar(10),
	FOREIGN KEY (rank) REFERENCES Rank(number),
	FOREIGN KEY (species) REFERENCES Species(code)
);

CREATE TABLE Position(
	id int PRIMARY KEY AUTO_INCREMENT,
	name varchar(50),
	suggestedRank int,
	suggestedExp int,
	department varchar(20),
	FOREIGN KEY (department) REFERENCES Department(name)
);

CREATE TABLE Starship(
	registryNumber int PRIMARY KEY AUTO_INCREMENT,
	name varchar(25),
	class int,
	FOREIGN KEY (class) REFERENCES Class(id)
);

CREATE TABLE Class(
	id int PRIMARY KEY AUTO_INCREMENT,
	name varchar(25),
	crewSize int,
	maxSpeed float(3),
	fuelCapacity int,
	techLevel int
);

CREATE TABLE Assignment(
	positionId int,
	starshipId int,
	officerId int,
	FOREIGN KEY (positionId) REFERENCES Position(id),
	FOREIGN KEY (starshipId) REFERENCES Starship(registryNumber),
	FOREIGN KEY (officerId) REFERENCES Officers(serviceNumber)
);

CREATE TABLE Explorer(
	id int PRIMARY KEY AUTO_INCREMENT,
	regionSpecialty int,
	FOREIGN KEY (id) REFERENCES Class(id)
);

CREATE TABLE Battleship(
	id int PRIMARY KEY AUTO_INCREMENT,
	phaserStrength int,
	torpedoType int,
	FOREIGN KEY (id) REFERENCES Class(id)
);

CREATE TABLE Science(
	id int PRIMARY KEY AUTO_INCREMENT,
	sensorRange int,
	labType int,
	FOREIGN KEY (id) REFERENCES Class(id)
);