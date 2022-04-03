import pandas as pd
import itertools

labels="ABCDEFGHIJKLM"
cols = list(range(1, 11))
seats = list(itertools.product(labels, cols))
seats = [[i + 1, seats[i][0], seats[i][1]] for i in range(130)]
pd.DataFrame(seats, columns=["seat_id", "label", "column"]).to_csv("seats.csv", index=False)