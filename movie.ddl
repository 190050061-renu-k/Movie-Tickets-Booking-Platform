--Defining tables

-- Table : movie(trigger to be added)
create table movie(
	movie_id INT,
	movie_name TEXT NOT NULL,
    release_date DATE,
    num_theatres INT CHECK(num_theatres>=0),
    upcoming_movie BOOL,
    poster_img TEXT,
    imdb_rating NUMERIC(4,2) CHECK(imdb_rating>=0 and imdb_rating<=10),
    description TEXT,
    webpage TEXT,
	PRIMARY KEY (movie_id)	
);

-- Table : theater - location attribute to be added
create table theater(
	theater_id INT,
	theater_name TEXT NOT NULL,
    login_id TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    city_id INT,
    FOREIGN KEY (city_id) references city on delete set null
	PRIMARY KEY (theater_id)	
);

-- Table : User
create table user(
	user_id INT,
	user_name TEXT NOT NULL,
    age INT CHECK(age>0),
    mobile CHAR(10) UNIQUE NOT NULL CHECK(mobile like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'), 
    password TEXT NOT NULL,
	PRIMARY KEY (user_id)	
);

-- Table : show_timings 
create table show_timings(
    id INT,
	name TEXT CHECK(name in('Morning','Afternoon','First Show','Second Show')),
    start_time TIME,
    end_time TIME CHECK(end_time>start_time),
	PRIMARY KEY (id)	
);

-- Table : role
create table role(
	role_id INT,
	role_name TEXT NOT NULL,
	PRIMARY KEY (role_id)	
);

-- Table : artist
create table artist(
	artist_id INT,
	artist_name TEXT NOT NULL,
	PRIMARY KEY (artist_id)	
);