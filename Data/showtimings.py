import pandas as pd
from datetime import time

ids = [1, 2, 3, 4]
names = ['Morning','Afternoon','First Show','Second Show']
start_times = [time(10, 30), time(14, 30), time(17, 00), time(20, 30)]
end_times = [time(13, 30), time(17, 30), time(20, 00), time(23, 30)]

df = pd.DataFrame(columns=["show_timings_id", "name", "start_time", "end_time"])
df["show_timings_id"] = ids
df["name"] = names
df["start_time"] = start_times
df["end_time"] = end_times

df.to_csv("show_timings.csv", index = False)