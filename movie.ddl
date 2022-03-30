--Defining tables

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

-- Table : theater - location attribute to be added
create table theater(
	theater_id INT,
	theater_name TEXT NOT NULL,
    login_id TEXT UNIQUE NOT NULL,
    pswd TEXT NOT NULL,
    city_id INT,
    FOREIGN KEY (city_id) references city on delete set null
	PRIMARY KEY (theater_id)	
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

-- Table : cast
create table cast(
	role_id INT,
	artist_id INT,
    movie_id INT,
    FOREIGN KEY (role_id) references role on delete set null,
    FOREIGN KEY (artist_id) references artist on delete set null,
    FOREIGN KEY (movie_id) references movie on delete set null,
	PRIMARY KEY (role_id,artist_id,movie_id)	
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

-- Table : city
create table city(
	city_id INT,
	city_name TEXT NOT NULL,
	PRIMARY KEY (city_id)	
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
	theater_id INT,
    FOREIGN KEY (theater_id) references theater on delete set null,
	PRIMARY KEY (screen_num, theater_id)	
);

-- Table : seat
create table seat(
	seat_id INT,
	label CHAR CHECK(label like '[A-M]'),
    column INT CHECK(column in '[1-10]'),
    CONSTRAINT UNIQUE (seat_id,label,column),
	PRIMARY KEY (seat_id)	
);

-- Table : show
create table screen(
	show_id INT,
    show_timings_id INT,
    movie_id INT,
	theater_id INT,
    screen_num INT,
    ticket INT NOT NULL CHECK(ticket>0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL CHECK(end_date>start_date),
    FOREIGN KEY (show_timings_id) references show_timings on delete set null,
    FOREIGN KEY (movie_id) references movie on delete set null,
    FOREIGN KEY (screen_num, theater_id) references screen on delete set null,
    CONSTRAINT UNIQUE (show_id,show_timings_id,movie_id, screen_num, theater_id),
	PRIMARY KEY (show_id)	
);

-- Table : booking
create table booking(
	show_id INT,
    user_id INT,
    seat_id INT,
    book_date DATE,
    book_type TEXT CHECK(book_type in('online','offline')),
    FOREIGN KEY (show_id) references show on delete set null,
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (seat_id) references seat on delete set null,
	PRIMARY KEY (show_id, user_id,seat_id)
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

--  Table : user_theater
create table user_theater(
	user_id INT,
    theater_id INT,
    rating INT CHECK(rating>=1 and rating<=5),
    FOREIGN KEY (user_id) references users on delete set null,
    FOREIGN KEY (theater_id) references theater on delete set null,
	PRIMARY KEY (user_id,theater_id)
);