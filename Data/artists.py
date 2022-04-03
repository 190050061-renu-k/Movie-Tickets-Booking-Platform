import functools
import json
import pandas as pd
import numpy as np

df=pd.read_csv("./Movies/archive/credits.csv")
df=df.filter(['cast'])

def red_cast(a,b):
    cast=b
    for item in json.loads(cast.replace("'",'"').replace("None", '"None"')):
        # moviegenres_df.append({'movie_id':movie_id,'genre_id':item['id']}, ignore_index = True)
        a[item['id']]=item['name']
    return a

# def construct_moviecast(a,b):
#     genres=b[0]
#     movie_id=b[1]
#     for item in json.loads(genres.replace("'",'"')):
#         a.append((movie_id,item['id']))
#     return a

artist_dict=functools.reduce(red_cast,df['cast'],{})
# role_dict=functools.reduce()

# moviecast_list=functools.reduce(construct_moviecast,df[['cast','id']].apply(tuple,axis=1),[])

artists_df=pd.DataFrame(artist_dict.items(),columns=['artist_id','name'])
# # print(moviegenres_df[:10])
# moviegenres_df=pd.DataFrame(moviecast_list,columns=['movie_id','genre_id'])
# moviegenres_df.to_csv('movie-genres.csv', index=False)
artists_df.to_csv('artists.csv', index=False)