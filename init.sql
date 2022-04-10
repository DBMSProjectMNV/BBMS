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
	FOREIGN KEY (Retailer_id) REFERENCES Retailers(Retailer_id)
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
	Supplier_name varchar(30),
	Supplier_contact varchar(10),
	Supplier_email varchar(50),
	Supplier_address varchar(80),
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
	Order_status enum("COMPLETED","PENDING","CANCELLED"),
	PRIMARY KEY (Retailer_id, Order_id),
	FOREIGN KEY (Retailer_id, Supplier_id) REFERENCES Suppliers(Retailer_id, Supplier_id)
);

CREATE TABLE Staffs (
	Retailer_id varchar(10),
	Staff_id int,
	Staff_name varchar(30),
	Staff_contact varchar(10),
	Staff_email varchar(50),
	Staff_address varchar(80),
	Job_role varchar(25),
	Salary decimal(10,2),
	PRIMARY KEY (Retailer_id, Staff_id),
	FOREIGN KEY (Retailer_id) REFERENCES Retailers(Retailer_id)
);

INSERT INTO Retailers VALUES
("101AAA", "Vishal", "9909874532", "vishal@shop.com", "vishal's address"),
("102AAA", "Ram", "9909874533", "ram@shop.com", "ram's address"),
("103AAA", "Shyam", "9909874534", "shyam@shop.com", "shyam's address");

INSERT INTO Staffs VALUES
("101AAA", "1", "Ashish", "9909904567", "ashish@shop.com", "ashish address", "Finance", 23000),
("101AAA", "2", "Pushkar", "9909904568", "pushkar@shop.com", "pushkar address", "Accountant", 43000),
("102AAA", "1", "Abhishek", "9909904569", "abhishek@shop.com", "abhishek address", "Finance", 25000),
("102AAA", "2", "Saurav", "9909904561", "saurav@shop.com", "saurav address", "Accountant", 44000),
("103AAA", "1", "Anil", "9909904562", "anil@shop.com", "anil address", "Finance", 22000),
("103AAA", "2", "Manju", "9909904563", "manju@shop.com", "manju address", "Accountant", 42000),
("103AAA", "3", "Vijay", "9909904564", "vijay@shop.com", "vijay address", "Finance", 22000);

INSERT INTO User_Accounts(Password_hash, Hint_question, Answer, Retailer_id) VALUES
("$2b$10$XEMYmyOaZtRwAQsBl8rVCekDA8i9IGYK0viBIK.KMBgfbrQtLyREe", "question", "answer", "101AAA"), /* vishal123456 */
("$2b$10$dKk4suD3BEpfnpUEByXJXu3KXQxG8YAM2WAPVr8qVws9RDNn1O2Ea", "question", "answer", "102AAA"), /* ram123456 */
("$2b$10$qUEaf8WTF6kEIKH2vDtrFeF3z7mR1r/VRIX5OlxLaV4teedlIoO4q", "question", "answer", "103AAA"); /* shyam123456 */

INSERT INTO Suppliers VALUES
("101AAA", "1", "Ashwin", "9871989945", "ashwin@shop.com", "ashwin address"),
("101AAA", "2", "Joseph", "9871989946", "joseph@shop.com", "joseph address"),
("102AAA", "1", "Ayush", "9871989947", "ayush@shop.com", "ayush address"),
("102AAA", "2", "Priya", "9871989948", "priya@shop.com", "priya address"),
("103AAA", "1", "Mehul", "9871989941", "mehul@shop.com", "mehul address"),
("103AAA", "2", "Praveen", "9871989942", "praveen@shop.com", "praveen address");

CREATE INDEX staff_retail ON Staffs (Retailer_id);
CREATE INDEX supp_retail ON Suppliers (Retailer_id);
CREATE INDEX order_retail ON Orders (Retailer_id);
CREATE INDEX inventory_retail ON Inventory (Retailer_id);

CREATE USER 'project'@'localhost' IDENTIFIED BY 'iampassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON medstore.* TO 'project'@'localhost';
