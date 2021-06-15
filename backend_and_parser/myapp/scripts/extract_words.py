from konlpy.tag import Okt
from myapp.models import MovieUserComment, EmotionWord
from hanspell import spell_checker

okt = Okt()

EmotionWord.objects.all().delete()

queryset = MovieUserComment.objects.filter(
    purified_body__isnull=False, expected_label_emotion__isnull=False
).order_by('id').values_list('id', 'body', 'expected_label_emotion')

LIST_OF_PARTS = ['Noun', 'Adverb', 'Adjective', 'Verb']

for _id, _body, emotion in queryset:
    try:
        body = spell_checker.check(_body).checked
    except:
        _body = body

    for word, part in okt.pos(body):
        if part in LIST_OF_PARTS:
            obj = EmotionWord.objects.create(
                word=word,
                part=LIST_OF_PARTS.index(part),
                emotion=emotion
            )
            print(obj)


from konlpy.tag import Okt
from myapp.models import MovieUserComment, EmotionWord
from django.db.models import Count


for word, count in EmotionWord.objects.all().values_list('word').annotate(count=Count('word')).order_by('-count', 'word').distinct():
    print(word)
    print(EmotionWord.objects.filter(word=word).values('emotion').annotate(count=Count('emotion')).order_by('-count'))
