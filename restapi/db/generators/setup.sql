drop table continent;
drop table country;
drop table city;
drop table countrylanguage;

create table continent(
name varchar(16) unique not null
);

insert into continent values('Africa');
insert into continent values('Asia');
insert into continent values('Antarctica');
insert into continent values('Europe');
insert into continent values('North America');
insert into continent values('Oceania');
insert into continent values('South America');


CREATE TABLE country(
code char(3) unique not null,
name varchar(52) default null,
continent varchar(16) not null,
region varchar(26) default null,
surfacearea float(10,2) not null default 0.0,
indepyear int default null,
population int not null default 0,
lifeexpectancy float(3,1) default null,
gnp float(10,2) default null,
gnpold float(10,2) default null,
localname varchar(45) default null,
governmentform varchar(32) not null default '',
headofstate varchar(32) default null,
capital int default null,
code2 char(2) unique not null,
foreign key(continent) references continent(name)
);

create table city (
name varchar(35)  not null,
countrycode char(3) not null,
district varchar(20) default null,
population int not null default 0,
foreign key(countrycode) references country(code)
);

create table countrylanguage (
countrycode char(3) not null,
language varchar(30) not null,
isofficial boolean default 'false' not null,
percentage float(4,1) not null default 0.0,
primary key(countrycode, language),
foreign key(countrycode) references country(code)
);

create table user (
	email varchar(64) unique not null,
	password blob not null,
	profile int not null default 99,
	bio text not null
);

create table course (
    course varchar(64) unique not null
);

create table exam (
    email varchar(64) not null,
    course varchar(64) not null,
    grade int not null
        check(grade between -3 and 12),
    juncture datetime not null,
    primary key(email, course, juncture),
    foreign key(email) references user(email),
    foreign key(course) references course(course)
);

insert into course values('Data Security');
insert into course values('Data Integration');
insert into course values('Integrated Development Environments');
insert into course values('Web programming I');
insert into course values('Web Programming II');
