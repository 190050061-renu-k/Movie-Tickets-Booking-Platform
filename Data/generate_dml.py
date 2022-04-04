import pandas as pd

f = open("InsertData.sql","w")

# tables_list = ["theatres"]
tables_list = ["movies", "genres", "movie_genres", "languages", "movie_languages", "users", "cities", "theatres", "artists", "movie_artists", "seats", "screens", "show_timings", "user_theatre", "user_movie", "shows", "bookings", "booking_seat", "user_languages","user_genres"]

for tab in tables_list:
    f.write("DELETE FROM "+tab+";\n")

f.write("\n\n")

for tab in tables_list:
    if tab=='theatres':
        df = pd.read_csv(tab+".csv")
        columns  = list(df.columns)
        for index,row in df.iterrows():
            f.write("INSERT INTO "+tab+"(")
            new_columns = columns.copy()
            new_columns.remove('lat')
            new_columns.remove('lon')
            new_columns+=['location']
            f.write(','.join(list(new_columns)))
            f.write(") VALUES (")
            row = ['"'+str(item).replace('"','\\"').replace("'","\\'")+'"' if isinstance(item,str) else str(item) for item in row]
            row+=["ST_GeomFromText('POINT("+row[2]+" "+row[1]+")',4326)"]
            row=row[:1]+row[3:]
            f.write(','.join(row)+");\n")
        f.write("\n\n\n")

    else:
        df = pd.read_csv(tab+".csv")
        columns  = df.columns
        for index,row in df.iterrows():

            f.write("INSERT INTO "+tab+"(")
            f.write(','.join(list(columns)))
            f.write(") VALUES (")
            row = ['"'+str(item).replace('"','\\"').replace("'","\\'")+'"' if isinstance(item,str) else str(item) for item in row]
            f.write(','.join(row)+");\n")
        f.write("\n\n\n")
