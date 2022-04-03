import pandas as pd
import numpy as np

theatre_df=pd.read_csv("./theatres.csv")

theatre_screen_df=pd.DataFrame(columns=["screen_num","theatre_id"])
theatre_screen_index=0
for theatre in theatre_df['theatre_id']:
    screen_list=set(range(1,np.random.randint(4,7)))
    for screen in screen_list:
        theatre_screen_df.loc[theatre_screen_index]=[screen,theatre]
        theatre_screen_index=theatre_screen_index+1

theatre_screen_df.to_csv("./screens.csv")