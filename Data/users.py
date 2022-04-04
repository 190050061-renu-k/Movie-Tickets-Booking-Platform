import numpy as np
import pandas as pd
import string
import random

df=pd.read_csv("./Users/bumble_google_play_reviews.csv")
df=df.filter(['userName'])[:20000]
df['age']=np.random.randint(18,60,df.shape[0])
df['mobileNumber']=[''.join(random.choice(string.digits) for i in range(10)) for j in range(df.shape[0])]
df['password']=[''.join(random.choice(string.ascii_letters+string.digits) for i in range(np.random.randint(8,12))) for j in range(df.shape[0])]
df["user_id"] = list(range(1,df.shape[0]+1))

df.to_csv("users.csv",index=False)

genre_df = pd.read_csv("genres.csv")
genre_ids = genre_df["genre_id"]
user_genre_df = pd.DataFrame(columns=["user_id", 'genre_id'])
user_genre_index=0
for user_id in df['user_id']:
    genre_list=set([random.choice(genre_ids) for i in range(0,3)])
    for genre in genre_list:
        user_genre_df.loc[user_genre_index]=[user_id,genre]
        user_genre_index=user_genre_index+1

user_genre_df.to_csv("user_genres.csv",index=False)

lang_df = pd.read_csv("languages.csv")
lang_ids = lang_df["language_id"]
user_lang_df = pd.DataFrame(columns=["user_id", 'language_id'])
user_lang_index=0
for user_id in df['user_id']:
    lang_list=set([random.choice(lang_ids) for i in range(0,3)])
    for lang in lang_list:
        user_lang_df.loc[user_lang_index]=[user_id,lang]
        user_lang_index=user_lang_index+1

user_lang_df.to_csv("user_languages.csv",index=False)
