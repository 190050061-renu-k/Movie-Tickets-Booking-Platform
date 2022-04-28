import itertools
from matplotlib.cbook import flatten
import pandas as pd
import numpy as np

users_list=pd.read_csv("users.csv")['user_id']
users_list=np.array(users_list)[np.random.randint(len(users_list),size=1000)]
theatres_list=pd.read_csv("theatres.csv")['theatre_id']
theatres_list=np.array(theatres_list)[np.random.randint(len(theatres_list),size=100)]

user_theatre_df=pd.DataFrame(columns=['user_id','theatre_id','rating'])

user_theatre_index=0
for user_theatre in list(itertools.product(users_list,theatres_list)):
    user_theatre_df.loc[user_theatre_index]=list(flatten([user_theatre,np.random.randint(1,5)]))
    user_theatre_index=user_theatre_index+1
user_theatre_df.to_csv("user_theatre.csv",index=False)