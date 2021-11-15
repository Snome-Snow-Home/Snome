-- to run this file:
-- psql -U zach -d test -f snome_test_query.sql


DROP DATABASE  IF EXISTS  snome_testing;

CREATE DATABASE snome_testing;

\c snome_testing;

create table snome (
  id serial,
  owner_id int not null,
  location_id int not null,
  header text not null,
  time_to_mountain  text not null,
  mountain_access text not null, --maybe array?
  availability_start text not null,
  availability_end text not null,
  street_address text not null,
  bedrooms numeric(3,1) not null,
  bathrooms numeric(3,1) not null,
  number_of_beds numeric(3,1) not null,
  perks text,
  snome_description text not null,
  primary key(id)
);

copy snome(id, owner_id, location_id, header, time_to_mountain, mountain_access, availability_start, availability_end, street_address, bedrooms, bathrooms, number_of_beds, perks, snome_description)
from '/Users/zach/Workspace/postHR/practice/db-practice/snome_dummy_data/snome.csv'
delimiter ','
csv header;

create table snome_user (
id serial,
name text not null,
travel_start text not null,
travel_end text not null,
user_photo text not null,
about text not null,
video_tour text,
primary key(id)
);

copy snome_user
from '/Users/zach/Workspace/postHR/practice/db-practice/snome_dummy_data/user.csv'
delimiter ','
csv header;

create table snome_like (
id serial,
snome_user_id int not null,
snome_id int not null,
has_been_read boolean DEFAULT false,
primary key(id)
);

copy snome_like
from '/Users/zach/Workspace/postHR/practice/db-practice/snome_dummy_data/like.csv'
delimiter ','
csv header;

create table match (
id serial,
snome_user_id int not null,
snome_id int not null,
has_been_read boolean,
primary key(id)
);

-- -- on ubuntu -- --
-- \copy answers
-- from 'csv/answers.csv'
-- delimiter ','
-- csv header;

-- create table answers_photos (
-- id serial,
-- answer_id int,
-- url text,
-- primary key(id)
-- );

-- \copy answers_photos
-- from 'csv/answers_photos.csv'
-- delimiter ','
-- csv header;

-- select * from questions where (asker_name='jbilas');
-- select * from answers where (answerer_name='marcanthony');
-- select * from answers_photos where (answer_id='5');
