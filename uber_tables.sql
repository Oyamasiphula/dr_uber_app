create table driver_details (
							id int not null primary key auto_increment,
							name varchar(35),
							surname varchar(35),
							cell_number int,
							email varchar(35)
							);


create table ref_table(
<<<<<<< HEAD
ref_no int not null primary key auto_increment,
driver_details_id int not null foreign key(driver_details.id),
issue_id int not null foreign key(issue_table.id),
date date
);
=======
						ref_no int not null primary key auto_increment,
						driver_details_id int not null,
						issues varchar(20) not null,
						date date,
						foreign key(driver_details_id) references driver_details(id)
						);
>>>>>>> fd4e96827446a47fb65c82d567cd46b4e0c66851
