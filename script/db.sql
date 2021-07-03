/*
	1- Create Database
	2- Create Schema
	3- Create Tables Inside Schema
*/

CREATE SCHEMA bms;

/* For Searching */
SELECT * FROM bms.book;
SELECT * FROM bms.store;

SELECT BOOK_ID, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER FROM BMS.BOOK;

/* Add Column */
ALTER TABLE bms.store ADD address varchar(200) NOT NULL;

CREATE TABLE bms.book (
	book_id serial NOT NULL,
	book_title varchar(300) NOT NULL,
	book_description varchar(1000) NOT NULL,
	book_author varchar(50) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);


CREATE TABLE bms.store (
	store_id serial NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

