import functools
import json
import pandas as pd
import numpy as np
import re

df=pd.read_csv("./Movies/archive/credits.csv")
df=df.filter(['cast'])

def red_cast(a,b):
    cast=b
    pattern1 = r"'character': .*?'credit_id'"
    cast = re.sub(pattern1, "'credit_id'", cast)
    pattern2 = r''''name': ".*?",'''
    cast = re.sub(pattern2, ''''name': 'Ariana',''', cast)
    pattern3 = r'".*?"'
    cast = re.sub(pattern3, "James", cast)
    cast=cast.replace("None",'"None"')
    cast = cast.replace("'",'"')
    
    if ('\\' in cast ) or ('?' in cast):
        return a
    for item in json.loads(cast):
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