use uber_data; 

<<<<<<< HEAD
DROP USER IF EXISTS uber ;
CREATE USER uber IDENTIFIED BY 'Uber_Uber123';
GRANT ALL ON uber_data.* TO uber;
=======
-- DROP USER IF EXISTS uber;
-- CREATE USER uber IDENTIFIED BY 'Uber_Uber123';
-- GRANT ALL ON uber_data.* TO uber;
>>>>>>> 760f0643098159150932180a008e828cfc22ddd9

DROP TABLE IF EXISTS ref_table;
DROP TABLE IF EXISTS issues_table;
DROP TABLE IF EXISTS driver_details;

create table issues_table(
						id int not null auto_increment primary key,
						issue text
						);

create table driver_details (
							id int not null primary key auto_increment,
							name varchar(35),
							surname varchar(35),
							cell_number int,
							email varchar(35)
							);


create table ref_table(
					ref_no int not null primary key auto_increment,
					issues varchar(20),
					driver_details_id int not null,
					date date,
					foreign key(driver_details_id) references driver_details(id)
					);
