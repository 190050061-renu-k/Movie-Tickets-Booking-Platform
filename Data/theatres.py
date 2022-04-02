import functools
import json
from shutil import move
import pandas as pd
import numpy as np

df=pd.read_csv("./indian-movie-theatres.txt")

df_new=df.filter(['theatre_name','lat','lon','city'])
df_new.rename(columns={'theatre_name':'name'},inplace=True)
cities = set(df_new["city"])
cities = [(i, city) for i, city in enumerate(cities)]
city2id = dict()
for city in cities :
    city2id[city[1]] = city[0]

city_df = pd.DataFrame(cities, columns=["city_id", "city"])
city_df.to_csv("cities.csv", index=False)

df_new["city"] = df_new['city'].apply(lambda city : city2id[city])
df_new.to_csv("thetres.csv", index=False)

