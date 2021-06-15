from konlpy.tag import Okt

from myapp.models import EmotionWord, MovieUserComment
from hanspell import spell_checker

LIST_OF_PARTS = ['Noun', 'Adverb', 'Adjective', 'Verb']
INDEX_OF_RAITO = {0: 1, 1: 0, 2: -1}

queryset = MovieUserComment.objects.filter(
    purified_body__isnull=False, expected_label_emotion__isnull=False
).values_list('id', 'body', 'expected_label_emotion')

okt = Okt()


def calculate_accuracy(part: str):
    _part = LIST_OF_PARTS.index(part)

    cnt_all = 0
    cnt_match = 0

    for _id, _body, expected_label_emotion in queryset:
        try:
            body = spell_checker.check(_body).checked
        except:
            body = _body

        raito = [0, 0, 0]

        for word, __part in okt.pos(body):
            if part != __part:
                continue

            pos = EmotionWord.objects.filter(word=word, emotion=1).count()
            neu = EmotionWord.objects.filter(word=word, emotion=0).count()
            neg = EmotionWord.objects.filter(word=word, emotion=-1).count()
            _sum = pos + neu + neg
            if _sum == 0:
                continue

            raito[0] += pos / _sum
            raito[1] += neu / _sum
            raito[2] += neg / _sum

        if raito[0] == raito[1] == raito[2]:
            continue

        cnt_all += 1
        if expected_label_emotion == INDEX_OF_RAITO[raito.index(max(raito))]:
            cnt_match += 1

    return cnt_match / cnt_all