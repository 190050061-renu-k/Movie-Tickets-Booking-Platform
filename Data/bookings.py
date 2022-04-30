import itertools
from matplotlib.cbook import flatten
import pandas as pd
import numpy as np

shows_df=pd.read_csv("shows.csv").filter(['show_id','show_date'])
shows_list=shows_df.values.tolist()
shows_list=np.array(shows_list)[np.random.randint(len(shows_list),size=1000)]
seats_list=list(range(1,101))

bookings_df = pd.DataFrame(columns=['show_id','book_date','seat_id','user_id','book_type'])

users_list = pd.read_csv("users.csv")['user_id']
booking_index=0
for show_seat in list(itertools.product(shows_list,seats_list)):
    row=list(flatten([show_seat,np.random.choice(users_list),np.random.choice(['online','offline'],p=[0.8,0.2])]))
    if row[-1]=='offline':
        row[-2]="None"
    bookings_df.loc[booking_index]=row
    booking_index=booking_index+1

bookings_df['booking_id'] = bookings_df.groupby(['show_id','book_date','user_id']).ngroup()

booking_seat_df = bookings_df.filter(['booking_id','seat_id'])
booking_seat_df.to_csv("booking_seat.csv",index=False)

bookings_df.filter(['booking_id','show_id','book_date','user_id','book_type']).drop_duplicates().to_csv("bookings.csv", index=False)