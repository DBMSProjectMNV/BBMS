CREATE DATABASE medstore;
use medstore;

CREATE TABLE Retailers (
	Retailer_id varchar(10) PRIMARY KEY,
	Retailer_name varchar(30),
	Retailer_contact varchar(10),
	Retailer_email varchar(50),
	Retailer_address varchar(80)
);

CREATE TABLE User_Accounts (
	User_id int PRIMARY KEY AUTO_INCREMENT,
	Password_hash binary(60),
	Hint_question varchar(50),
	Answer varchar(30),
	Retailer_id varchar(10),
	FOREIGN KEY (Retailer_id)
		REFERENCES Retailers(Retailer_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Inventory (
	Retailer_id varchar(10),
	Medicine_name varchar(50),
	MRP int,
	Stock int,
	PRIMARY KEY (Retailer_id, Medicine_name),
	FOREIGN KEY (Retailer_id)
		REFERENCES Retailers(Retailer_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Suppliers (
	Retailer_id varchar(10),
	Supplier_id varchar(10),
	Supplier_name varchar(30),
	Supplier_contact varchar(10),
	Supplier_email varchar(50),
	Supplier_address varchar(80),
	PRIMARY KEY (Retailer_id, Supplier_id),
	FOREIGN KEY (Retailer_id)
		REFERENCES Retailers(Retailer_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Orders (
	Retailer_id varchar(10),
	Order_id int NOT NULL AUTO_INCREMENT,
	Medicine_name varchar(50),
	Quantity int,
	MRP int,
	Order_date date,
	Supplier_id varchar(10),
	Order_status enum("COMPLETED","PENDING","CANCELLED"),
	PRIMARY KEY (Order_id),
	FOREIGN KEY (Retailer_id, Supplier_id)
		REFERENCES Suppliers(Retailer_id, Supplier_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Staffs (
	Retailer_id varchar(10),
	Staff_id int,
	Staff_name varchar(30),
	Staff_contact varchar(10),
	Staff_email varchar(50),
	Staff_address varchar(80),
	Job_role varchar(25),
	Salary int,
	PRIMARY KEY (Retailer_id, Staff_id),
	FOREIGN KEY (Retailer_id)
		REFERENCES Retailers(Retailer_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

INSERT INTO Retailers VALUES
("101", "Vishal", "9909874532", "vishal@shop.com", "vishal's address"),
("102", "Ram", "9909874533", "ram@shop.com", "ram's address"),
("103", "Shyam", "9909874534", "shyam@shop.com", "shyam's address");

INSERT INTO Staffs VALUES
("101", "1", "Ashish", "9909904567", "ashish@shop.com", "ashish address", "Finance", 23000),
("101", "2", "Pushkar", "9909904568", "pushkar@shop.com", "pushkar address", "Accountant", 43000),
("102", "1", "Abhishek", "9909904569", "abhishek@shop.com", "abhishek address", "Finance", 25000),
("102", "2", "Saurav", "9909904561", "saurav@shop.com", "saurav address", "Accountant", 44000),
("103", "1", "Anil", "9909904562", "anil@shop.com", "anil address", "Finance", 22000),
("103", "2", "Manju", "9909904563", "manju@shop.com", "manju address", "Accountant", 42000),
("103", "3", "Vijay", "9909904564", "vijay@shop.com", "vijay address", "Finance", 22000);

INSERT INTO User_Accounts(Password_hash, Hint_question, Answer, Retailer_id) VALUES
("$2b$10$XEMYmyOaZtRwAQsBl8rVCekDA8i9IGYK0viBIK.KMBgfbrQtLyREe", "question", "answer", "101"), /* vishal123456 */
("$2b$10$dKk4suD3BEpfnpUEByXJXu3KXQxG8YAM2WAPVr8qVws9RDNn1O2Ea", "question", "answer", "102"), /* ram123456 */
("$2b$10$qUEaf8WTF6kEIKH2vDtrFeF3z7mR1r/VRIX5OlxLaV4teedlIoO4q", "question", "answer", "103"); /* shyam123456 */

INSERT INTO Suppliers VALUES
("101", "1", "Ashwin", "9871989945", "ashwin@shop.com", "ashwin address"),
("101", "2", "Joseph", "9871989946", "joseph@shop.com", "joseph address"),
("102", "1", "Ayush", "9871989947", "ayush@shop.com", "ayush address"),
("102", "2", "Priya", "9871989948", "priya@shop.com", "priya address"),
("103", "1", "Mehul", "9871989941", "mehul@shop.com", "mehul address"),
("103", "2", "Praveen", "9871989942", "praveen@shop.com", "praveen address");

INSERT INTO Inventory VALUES
("101","Paracetemol",100,5);

INSERT INTO Orders VALUES
("102", NULL, "meidicine", 43, 25, "2022/02/25", "1", "PENDING");

CREATE USER 'project'@'localhost' IDENTIFIED BY 'iampassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON medstore.* TO 'project'@'localhost';
