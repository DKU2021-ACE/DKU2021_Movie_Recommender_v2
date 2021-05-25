from konlpy.tag import Okt
from keras.preprocessing import sequence
from keras.preprocessing.text import Tokenizer

okt = Okt()

# 학습에 사용될 데이터 (tokenized)
train_data = []
# 학습에 사용될 데이터 (결과 저장용 db idx)
train_data_idx = []

# 테스트에 사용될 데이터 (tokenized)
test_data = []
# 테스트에 사용될 데이터 (결과 저장용 db idx)
test_data_idx = []

# 학습에 사용될 결과 (vector)
Y_train = []
# 테스트에 사용될 결과 (vector)
Y_test = []

queryset = MovieUserComment.objects.filter(
    purified_body__isnull=False, expected_label_emotion__isnull=False
).order_by('id').values_list('id', 'purified_body', 'expected_label_emotion')

for _id, sentence, expected_emotion in queryset[:700]:
    words = okt.morphs(sentence, stem=True)
    train_data.append(words)
    train_data_idx.append(_id)
    Y_train.append(MovieUserComment.get_emotion_vector(expected_emotion))

for _id, sentence, expected_emotion in queryset[700:889]:
    words = okt.morphs(sentence, stem=True)
    test_data.append(words)
    test_data_idx.append(_id)
    Y_test.append(MovieUserComment.get_emotion_vector(expected_emotion))