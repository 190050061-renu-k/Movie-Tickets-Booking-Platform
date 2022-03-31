import functools
import json
from shutil import move
import pandas as pd
import numpy as np

df=pd.read_csv("./Movies/archive/movies_metadata.csv")

df_new=df.filter(['id','title','release_date','poster_path','overview','homepage'])

#our columns- id,name,release_date,count_theatres,upcoming,poster_img,imdb_rating,description
df_new.rename(columns={'title':'name'}, inplace=True)
df_new.rename(columns={'poster_path':'poster_img'},inplace=True)
df_new.rename(columns={'overview':'description'},inplace=True)
df_new['count_theatres']=0
df_new['upcoming']=True

df_new['imdb_rating']=np.random.random_sample(df_new.shape[0])*(5)+5
df_new.to_csv('movies.csv')


def red_genres(a,b):
    genres=b
    for item in json.loads(genres.replace("'",'"')):
        # moviegenres_df.append({'movie_id':movie_id,'genre_id':item['id']}, ignore_index = True)
        # print(moviegenres_df)
        a[item['id']]=item['name']
    return a

def construct_moviegenres(a,b):
    genres=b[0]
    movie_id=b[1]
    for item in json.loads(genres.replace("'",'"')):
        a.append((movie_id,item['id']))
    return a

genres_dict=functools.reduce(red_genres,df['genres'],{})

moviegenres_list=functools.reduce(construct_moviegenres,df[['genres','id']].apply(tuple,axis=1),[])

genres_df=pd.DataFrame(genres_dict.items(),columns=['genre_id','name'])
# print(moviegenres_df[:10])
moviegenres_df=pd.DataFrame(moviegenres_list,columns=['movie_id','genre_id'])
moviegenres_df.to_csv('movie-genres.csv')
genres_df.to_csv('genres.csv')