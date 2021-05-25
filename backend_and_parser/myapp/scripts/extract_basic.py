import pandas as pd
import pandas_profiling
from myapp.models import MovieUserComment

query_result = MovieUserComment.objects.all().values_list('id', 'body')[:1000]

# id 추출
index = [row[0] for row in query_result]
# 메세지 추출
values = [row for row in query_result]
columns = ['id', 'body']

df = pd.DataFrame(values, index=index, columns=columns)
pr = df.profile_report()
pr.to_file('./report.html')