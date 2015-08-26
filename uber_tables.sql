create table driver_details (
							id int not null primary key auto_increment,
							name varchar(35),
							surname varchar(35),
							cell_number int,
							email varchar(35)
							);


create table ref_table(
ref_no int not null primary key auto_increment,
driver_details_id int not null foreign key(driver_details.id),
issue_id int not null foreign key(issue_table.id),
date date
);