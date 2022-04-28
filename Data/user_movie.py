import itertools
from matplotlib.cbook import flatten
import pandas as pd
import numpy as np

users_list=pd.read_csv("users.csv")['user_id']
users_list=np.array(users_list)[np.random.randint(len(users_list),size=1000)]
movies_list=pd.read_csv("movies.csv")['movie_id']
movies_list=np.array(movies_list)[np.random.randint(len(movies_list),size=100)]

user_movie_df=pd.DataFrame(columns=['user_id','movie_id','rating','notif'])

user_movie_index=0
for user_movie in list(itertools.product(users_list,movies_list)):
    user_movie_df.loc[user_movie_index]=list(flatten([user_movie,np.random.randint(1,5),np.random.choice([True,False],p=[0.1,0.9])]))
    user_movie_index=user_movie_index+1
user_movie_df.to_csv("user_movie.csv",index=False)