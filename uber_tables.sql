use uber_data;

DROP table if exists ref_table;
DROP table if exists issues_table;
DROP table if exists driver_details;

create table driver_details (
							id int not null primary key auto_increment,
							name varchar(35),
							surname varchar(35),
							cell_number varchar(15),
							email varchar(35)
							);

create table issues_table(
						id int not null primary key auto_increment,
						issue text
						);

create table ref_table(
						ref_no int not null primary key auto_increment,
						driver_details_id int not null,
						issue_id int not null,
						date date,
						foreign key(issue_id) references issues_table(id),
						foreign key(driver_details_id) references driver_details(id)
						);