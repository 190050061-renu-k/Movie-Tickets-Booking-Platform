CREATE EXTENSION IF NOT EXISTS postgis;
--Defining tables
DROP SEQUENCE IF EXISTS user_id_seq CASCADE;
DROP SEQUENCE IF EXISTS theatre_id_seq CASCADE;
DROP SEQUENCE IF EXISTS movie_id_seq CASCADE;
DROP SEQUENCE IF EXISTS artist_id_seq CASCADE;
DROP SEQUENCE IF EXISTS show_id_seq CASCADE;
DROP SEQUENCE IF EXISTS booking_id_seq CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS theatres CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS show_timings CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS movie_artists CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS movie_genres CASCADE;
DROP TABLE IF EXISTS movie_languages CASCADE;
DROP TABLE IF EXISTS screens CASCADE;
DROP TABLE IF EXISTS seats CASCADE;
DROP TABLE IF EXISTS shows CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS booking_seat CASCADE;
DROP TABLE IF EXISTS user_languages CASCADE;
DROP TABLE IF EXISTS user_genres CASCADE;
DROP TABLE IF EXISTS user_movie CASCADE;
DROP TABLE IF EXISTS user_theatre CASCADE;


-- Table : movie(trigger to be added)
create table movies(
	movie_id INT,
	name TEXT NOT NULL,
    release_date DATE,
    count_theatres INT NOT NULL CHECK(count_theatres>=0) DEFAULT 0,
    upcoming BOOLEAN DEFAULT FALSE,
    poster_img TEXT,
    imdb_rating NUMERIC(4,2) CHECK(imdb_rating>=0 and imdb_rating<=10),
    description TEXT,
    homepage TEXT,
	PRIMARY KEY (movie_id)	
);

-- Table : city
create table cities(
	city_id INT,
	city TEXT NOT NULL,
	PRIMARY KEY (city_id)	
);

-- Table : theatre - location attribute to be added
create table theatres(
	theatre_id INT,
	name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    city INT,
	location GEOMETRY NOT NULL, 
    FOREIGN KEY (city) references cities on delete set null,
	PRIMARY KEY (theatre_id)	
);

-- Table : User
create table users(
	user_id INT,
	userName TEXT NOT NULL,
    age INT CHECK(age>0),
    mobileNumber CHAR(10) UNIQUE NOT NULL CHECK(mobileNumber not like '%[^0-9]%' and LENGTH(mobileNumber)=10), 
    password TEXT NOT NULL,
	city_id INT,
	PRIMARY KEY (user_id)	
);

-- Table : show_timings 
create table show_timings(
    show_timings_id INT,
	name TEXT CHECK(name in('Morning','Afternoon','First Show','Second Show')),
    start_time TIME,
    end_time TIME CHECK(end_time>start_time),
	PRIMARY KEY (show_timings_id)	
);



-- Table : artist
create table artists(
	artist_id INT,
	name TEXT NOT NULL,
	PRIMARY KEY (artist_id)	
);

-- Table : cast
create table movie_artists(
	artist_id INT,
    movie_id INT,
    FOREIGN KEY (artist_id) references artists on delete set null,
    FOREIGN KEY (movie_id) references movies on delete set null,
	PRIMARY KEY (artist_id,movie_id)	
);

-- Table : genre
create table genres(
	genre_id INT,
	name TEXT NOT NULL,
	PRIMARY KEY (genre_id)	
);

-- Table : language
create table languages(
	language_id INT,
	name TEXT NOT NULL,
	PRIMARY KEY (language_id)	
);

-- Table : movie_genre
create table movie_genres(
	movie_id INT,
	genre_id INT,
    FOREIGN KEY (movie_id) references movies on delete set null,
    FOREIGN KEY (genre_id) references genres on delete set null,
	PRIMARY KEY (movie_id, genre_id)	
);

-- Table : movie_language
create table movie_languages(
	movie_id INT,
	language_id INT,
    FOREIGN KEY (movie_id) references movies on delete set null,
    FOREIGN KEY (language_id) references languages on delete set null,
	PRIMARY KEY (movie_id, language_id)	
);

-- Table : screen
create table screens(
	screen_num INT NOT NULL,
	theatre_id INT,
    FOREIGN KEY (theatre_id) references theatres on delete set null,
	PRIMARY KEY (screen_num, theatre_id)	
);

-- Table : seat
create table seats(
	seat_id INT,
	label CHAR CHECK(label like '%[A-M]%' and LENGTH(label)=1),
    column_ INT CHECK(column_ in (1,2,3,4,5,6,7,8,9,10)),
    CONSTRAINT seat_unique UNIQUE (label,column_),
	PRIMARY KEY (seat_id)	
);

-- Table : show
create table shows(
	show_id INT,
    show_timings_id INT,
    movie_id INT,
	theatre_id INT,
    screen_num INT,
    ticket INT NOT NULL CHECK(ticket>0),
    show_date DATE NOT NULL,
    FOREIGN KEY (show_timings_id) references show_timings on delete set null,
    FOREIGN KEY (movie_id) references movies on delete set null,
    FOREIGN KEY (screen_num, theatre_id) references screens on delete set null,
    CONSTRAINT sow_unique UNIQUE (show_id,show_timings_id,movie_id,screen_num,theatre_id,show_date),
	PRIMARY KEY (show_id)	
);

-- Table : booking
create table bookings(
	show_id INT,
    user_id INT,
    booking_id INT,
    book_date DATE not null,
    book_type TEXT CHECK(book_type in('online','offline')),
    FOREIGN KEY (show_id) references shows on delete set null,
    FOREIGN KEY (user_id) references users on delete set null,
	PRIMARY KEY (booking_id),
    CONSTRAINT booking_unique UNIQUE (booking_id, show_id, user_id)
);

create table booking_seat(
    booking_id INT,
    seat_id INT,
    PRIMARY KEY(booking_id, seat_id),
    FOREIGN KEY (booking_id) references bookings on delete set null
);

--  Table : user_language
create table user_languages(
	user_id INT,
    language_id INT,
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (language_id) references languages on delete set null,
	PRIMARY KEY (user_id,language_id)
);

--  Table : user_genre
create table user_genres(
	user_id INT,
    genre_id INT,
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (genre_id) references genres on delete set null,
	PRIMARY KEY (user_id,genre_id)
);

--  Table : movie_user
create table user_movie(
	user_id INT,
    movie_id INT,
    notif BOOLEAN default False,
    rating INT CHECK((rating>=1 and rating<=5) or rating is null),
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (movie_id) references movies on delete set null,
	PRIMARY KEY (user_id,movie_id)
);

--  Table : user_theatre
create table user_theatre(
	user_id INT,
    theatre_id INT,
    rating INT CHECK(rating>=1 and rating<=5),
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (theatre_id) references theatres on delete set null,
	PRIMARY KEY (user_id,theatre_id)
);

-- auto increment id for user and theatre
CREATE SEQUENCE movie_id_seq START WITH 470000 INCREMENT BY 1;
ALTER TABLE movies alter movie_id set default nextval('movie_id_seq');

CREATE SEQUENCE user_id_seq START WITH 20001 INCREMENT BY 1;
ALTER TABLE users alter user_id set default nextval('user_id_seq');

CREATE SEQUENCE artist_id_seq START WITH 1910000 INCREMENT BY 1;
ALTER TABLE artists alter artist_id set default nextval('artist_id_seq');

CREATE SEQUENCE theatre_id_seq START WITH 600 INCREMENT BY 1;
ALTER TABLE theatres alter theatre_id set default nextval('theatre_id_seq');

CREATE SEQUENCE show_id_seq START WITH 144000 INCREMENT BY 1;
ALTER TABLE shows alter show_id set default nextval('show_id_seq');

CREATE SEQUENCE booking_id_seq START WITH 81000 INCREMENT BY 1;
ALTER TABLE bookings alter booking_id set default nextval('booking_id_seq');

-- CREATE TRIGGER upcoming
--     AFTER INSERT
--     ON show
--     FOR EACH ROW 
--     EXECUTE PROCEDURE change_upcoming()

--views creation


CREATE view all_bookings AS
SELECT show_id, user_id, bookings.booking_id, book_date, book_type, COUNT(*) seats_booked 
FROM bookings, booking_seat 
WHERE bookings.booking_id = booking_seat.booking_id 
GROUP BY show_id, user_id, bookings.booking_id, book_date, book_type;


--trigger
CREATE OR REPLACE FUNCTION change_upcoming()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
    AS 
$$
BEGIN 
    UPDATE movies
    SET upcoming_movie = FALSE
    WHERE movie_id = NEW.movie_id;
END;
$$
