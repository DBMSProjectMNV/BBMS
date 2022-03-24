CREATE DATABASE medstore;
use medstore;

CREATE TABLE User_Accounts (
	User_id int PRIMARY KEY AUTO_INCREMENT,
	Password_hash varchar(60)
);

CREATE TABLE Retailers (
	Retailer_id varchar(10) PRIMARY KEY,
	Retailer_name varchar(60),
	Retailer_contact varchar(10),
	Retailer_email varchar(60),
	Retailer_address varchar(100),
	User_id int,
	FOREIGN KEY (User_id) REFERENCES User_Accounts(User_id)
);

CREATE TABLE Inventory (
	Retailer_id varchar(10),
	Medicine_name varchar(50),
	MRP decimal(8,2),
	Stock int,
	PRIMARY KEY (Retailer_id, Medicine_name),
	FOREIGN KEY (Retailer_id) REFERENCES Retailers(Retailer_id)
);

CREATE TABLE Suppliers (
	Retailer_id varchar(10),
	Supplier_id varchar(10),
	Supplier_name varchar(50),
	Supplier_address varchar(50),
	Supplier_contact varchar(10),
	Supplier_email varchar(50),
	PRIMARY KEY (Retailer_id, Supplier_id),
	FOREIGN KEY (Retailer_id) REFERENCES Retailers(Retailer_id)
);

CREATE TABLE Orders (
	Retailer_id varchar(10),
	Order_id varchar(10),
	Medicine_name varchar(50),
	Quantity int,
	MRP decimal(8,2),
	Order_date date,
	Supplier_id varchar(10),
	Order_status enum("COMPLETED","PENDING","CANCELED"),
	PRIMARY KEY (Retailer_id, Order_id),
	FOREIGN KEY (Retailer_id, Supplier_id) REFERENCES Suppliers(Retailer_id, Supplier_id)
);

CREATE TABLE Staffs (
	Retailer_id varchar(10),
	Staff_id int,
	Staff_name varchar(50),
	Staff_contact bigint,
	Staff_address varchar(80),
	Staff_email varchar(50),
	Job_role varchar(25),
	Salary decimal(10,2),
	User_id int,
	PRIMARY KEY (Retailer_id, Staff_id),
	FOREIGN KEY (User_id) REFERENCES User_Accounts(User_id),
	FOREIGN KEY (Retailer_id) REFERENCES Retailers(Retailer_id)
);

INSERT INTO User_Accounts VALUES
(1, "$2b$10$nIWM/jXU8XwTNZSdd3.gdedDYqknBPWKF/4LHjZx0pxCmoYqywccm");

INSERT INTO Retailers VALUES
("0", "owner", "9876543201", "owner@medstore.com", "owner's address is this", 1);

CREATE USER 'project'@'localhost' IDENTIFIED BY 'iampassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON medstore.* TO 'project'@'localhost';
