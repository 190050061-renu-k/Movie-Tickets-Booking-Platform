import string
import pandas as pd
import numpy as np
import random

df=pd.read_csv("./Theatres/indian-movie-theatres.txt")

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

df_loginids=pd.read_csv("./Theatres/UserList.csv")
df_loginids=df_loginids.filter(['username'])
df_new=pd.concat([df_new,df_loginids[:df_new.shape[0]]],axis=1)


df_new['password']=[''.join(random.choice(string.ascii_letters+string.digits) for i in range(np.random.randint(8,12))) for j in range(df_new.shape[0])]

theatre_ids = set()
while len(theatre_ids) < df.shape[0] :
    theatre_ids.add(''.join(random.choice(string.digits) for i in range(np.random.randint(4, 8))))
df_new["theatre_id"] = list(theatre_ids)
df_new.to_csv("theatres.csv", index=False)