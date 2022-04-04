CREATE EXTENSION IF NOT EXISTS postgis;
--Defining tables
DROP SEQUENCE IF EXISTS user_id_seq CASCADE;
DROP SEQUENCE IF EXISTS theatre_id_seq CASCADE;
DROP SEQUENCE IF EXISTS movie_id_seq CASCADE;
DROP TABLE IF EXISTS movie CASCADE;
DROP TABLE IF EXISTS theatre CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS show_timings CASCADE;
DROP TABLE IF EXISTS artist CASCADE;
DROP TABLE IF EXISTS cast_ CASCADE;
DROP TABLE IF EXISTS genre CASCADE;
DROP TABLE IF EXISTS language CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS movie_genre CASCADE;
DROP TABLE IF EXISTS movie_language CASCADE;
DROP TABLE IF EXISTS screen CASCADE;
DROP TABLE IF EXISTS seat CASCADE;
DROP TABLE IF EXISTS show CASCADE;
DROP TABLE IF EXISTS booking CASCADE;
DROP TABLE IF EXISTS booking_seat CASCADE;
DROP TABLE IF EXISTS user_language CASCADE;
DROP TABLE IF EXISTS user_genre CASCADE;
DROP TABLE IF EXISTS movie_user CASCADE;
DROP TABLE IF EXISTS user_theatre CASCADE;


-- Table : movie(trigger to be added)
create table movie(
	movie_id INT,
	movie_name TEXT NOT NULL,
    release_date DATE,
    num_theatres INT CHECK(num_theatres>=0),
    upcoming_movie BOOLEAN,
    poster_img TEXT,
    imdb_rating NUMERIC(4,2) CHECK(imdb_rating>=0 and imdb_rating<=10),
    description TEXT,
    webpage TEXT,
	PRIMARY KEY (movie_id)	
);

-- Table : city
create table city(
	city_id INT,
	city_name TEXT NOT NULL,
	PRIMARY KEY (city_id)	
);

-- Table : theatre - location attribute to be added
create table theatre(
	theatre_id INT,
	theatre_name TEXT NOT NULL,
    login_id TEXT UNIQUE NOT NULL,
    pswd TEXT NOT NULL,
    city_id INT,
	location_name GEOMETRY, 
    FOREIGN KEY (city_id) references city on delete set null,
	PRIMARY KEY (theatre_id)	
);

-- Table : User
create table users(
	user_id INT,
	user_name TEXT NOT NULL,
    age INT CHECK(age>0),
    mobile CHAR(10) UNIQUE NOT NULL CHECK(mobile like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'), 
    pswd TEXT NOT NULL,
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
create table artist(
	artist_id INT,
	artist_name TEXT NOT NULL,
	PRIMARY KEY (artist_id)	
);

-- Table : cast
create table cast_(
	artist_id INT,
    movie_id INT,
    FOREIGN KEY (artist_id) references artist on delete set null,
    FOREIGN KEY (movie_id) references movie on delete set null,
	PRIMARY KEY (artist_id,movie_id)	
);

-- Table : genre
create table genre(
	genre_id INT,
	genre_name TEXT NOT NULL,
	PRIMARY KEY (genre_id)	
);

-- Table : language
create table language(
	language_id INT,
	language_name TEXT NOT NULL,
	PRIMARY KEY (language_id)	
);

-- Table : movie_genre
create table movie_genre(
	movie_id INT,
	genre_id INT,
    FOREIGN KEY (movie_id) references movie on delete set null,
    FOREIGN KEY (genre_id) references genre on delete set null,
	PRIMARY KEY (movie_id, genre_id)	
);

-- Table : movie_language
create table movie_language(
	movie_id INT,
	language_id INT,
    FOREIGN KEY (movie_id) references movie on delete set null,
    FOREIGN KEY (language_id) references language on delete set null,
	PRIMARY KEY (movie_id, language_id)	
);

-- Table : screen
create table screen(
	screen_num INT NOT NULL,
	theatre_id INT,
    FOREIGN KEY (theatre_id) references theatre on delete set null,
	PRIMARY KEY (screen_num, theatre_id)	
);

-- Table : seat
create table seat(
	seat_id INT,
	label_seat CHAR CHECK(label_seat like '[A-M]'),
    column_seat INT CHECK(column_seat in (1,2,3,4,5,6,7,8,9,10)),
    CONSTRAINT seat_unique UNIQUE (seat_id,label_seat,column_seat),
	PRIMARY KEY (seat_id)	
);

-- Table : show
create table show(
	show_id INT,
    show_timings_id INT,
    movie_id INT,
	theatre_id INT,
    screen_num INT,
    ticket INT NOT NULL CHECK(ticket>0),
    show_date DATE NOT NULL,
    FOREIGN KEY (show_timings_id) references show_timings on delete set null,
    FOREIGN KEY (movie_id) references movie on delete set null,
    FOREIGN KEY (screen_num, theatre_id) references screen on delete set null,
    CONSTRAINT sow_unique UNIQUE (show_id,show_timings_id,movie_id,screen_num,theatre_id,show_date),
	PRIMARY KEY (show_id)	
);

-- Table : booking
create table booking(
	show_id INT,
    user_id INT,
    booking_id INT,
    book_date DATE,
    book_type TEXT CHECK(book_type in('online','offline')),
    FOREIGN KEY (show_id) references show on delete set null,
    FOREIGN KEY (user_id) references users on delete set null,
	PRIMARY KEY (booking_id),
    CONSTRAINT booking_unique UNIQUE (booking_id, show_id, user_id)
);

create table booking_seat(
    booking_id INT,
    seat_id INT,
    PRIMARY KEY(booking_id, seat_id)
);

--  Table : user_language
create table user_language(
	user_id INT,
    language_id INT,
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (language_id) references language on delete set null,
	PRIMARY KEY (user_id,language_id)
);

--  Table : user_genre
create table user_genre(
	user_id INT,
    genre_id INT,
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (genre_id) references genre on delete set null,
	PRIMARY KEY (user_id,genre_id)
);

--  Table : movie_user
create table movie_user(
	user_id INT,
    movie_id INT,
    notif BOOLEAN,
    rating INT CHECK(rating>=1 and rating<=5),
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (movie_id) references movie on delete set null,
	PRIMARY KEY (user_id,movie_id)
);

--  Table : user_theatre
create table user_theatre(
	user_id INT,
    theatre_id INT,
    rating INT CHECK(rating>=1 and rating<=5),
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (theatre_id) references theatre on delete set null,
	PRIMARY KEY (user_id,theatre_id)
);

-- auto increment id for user and theatre
CREATE SEQUENCE user_id_seq START WITH 1 INCREMENT BY 1;
ALTER TABLE users alter user_id set default nextval('user_id_seq');

CREATE SEQUENCE theatre_id_seq START WITH 1 INCREMENT BY 1;
ALTER TABLE theatre alter theatre_id set default nextval('theatre_id_seq');

CREATE SEQUENCE movie_id_seq START WITH 470000 INCREMENT BY 1;
ALTER TABLE movie alter movie_id set default nextval('movie_id_seq');


--trigger
CREATE OR REPLACE FUNCTION change_upcoming()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
    AS 
$$
BEGIN 
    UPDATE movie
    SET upcoming_movie = FALSE
    WHERE movie_id = NEW.movie_id;
END;
$$
-- CREATE TRIGGER upcoming
--     AFTER INSERT
--     ON show
--     FOR EACH ROW 
--     EXECUTE PROCEDURE change_upcoming()
