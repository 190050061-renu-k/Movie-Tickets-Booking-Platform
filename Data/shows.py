from matplotlib.cbook import flatten
import pandas as pd
import datetime
import itertools
import numpy as np

start_date=datetime.date(2021,1,1)
dates_list=[start_date+datetime.timedelta(days=idx) for idx in range(360)]

movies_list=list(flatten(pd.read_csv("movies.csv").filter(['id']).sample(frac=1).values.tolist()))
show_timings_list=pd.read_csv("show_timings.csv").filter(["show_timings_id"])['show_timings_id']
screens_list = pd.read_csv("screens.csv").values.tolist()


shows_df=pd.DataFrame(columns=['show_id','show_timings_id','screen_num','theatre_id','show_date','movie_id','ticket'])

show_index=0

for i in range(36):
    #show_timings_id, screen_num,theatre_id
    dates_range=dates_list[10*i:10*(i+1)]
    movies_range=movies_list[i*20:20*(i+1)]
    shows_list=itertools.product(show_timings_list,np.array(screens_list)[np.random.randint(len(screens_list),size=100)],dates_range)
    shows_list=[list(flatten(show)) for show in shows_list]
    for show_ in shows_list:
        shows_df.loc[show_index]=list(flatten([show_index,show_,np.random.choice(movies_range), np.random.randint(5,10)*50]))
        show_index=show_index+1

shows_df.to_csv("shows.csv",index=False)