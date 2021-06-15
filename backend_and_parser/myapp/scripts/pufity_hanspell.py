from hanspell import spell_checker
from myapp.models import MovieUserComment

query_result = MovieUserComment.objects.filter(
    purified_body__isnull=True
).values_list('id', 'body')[:1000]

for _id, _body in query_result:
    print(spell_checker.check(_body).checked)
    spelled_sent = spell_checker.check(sent)
