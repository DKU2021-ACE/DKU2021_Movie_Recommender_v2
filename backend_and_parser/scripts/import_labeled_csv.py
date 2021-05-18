import os
import sys
import django

sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'movie_parser.settings')
try:
    django.setup()
except ModuleNotFoundError:
    print('오류: 프로젝트의 루트 디렉터리에서 실행해 주세요.')
    print('ex) python scripts/%s.py' % __name__)

from myapp.models import MovieUserComment
import csv


def main():
    _f = sys.argv[1]

    with open(_f, 'r', encoding='cp949') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            print(row)
            _id, body, expected_label_emotion = row
            if not _id.isdigit():
                continue

            MovieUserComment.objects.filter(id=_id).update(
                expected_label_emotion=expected_label_emotion
            )
            print('%s updated' % _id)


if __name__ == '__main__':
    main()
