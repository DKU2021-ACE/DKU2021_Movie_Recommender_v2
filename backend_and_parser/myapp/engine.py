import os
import sys
import django

sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'movie_parser.settings')
django.setup()

import numpy as np
from keras.layers import Embedding, Dense, LSTM
from keras.models import Sequential
from keras.preprocessing import sequence
from keras.preprocessing.text import Tokenizer

import konlpy
from konlpy.tag import Okt
from myapp.models import MovieUserComment


# 긍정 & 부정 단어셋 만들기
# 빠르게 자동으로 하기 위함이나 -> 이건 우선 생략
def build_pos_neg_wordset():
    with open("negative_words_self.txt", encoding='utf-8') as neg:
        negative = neg.readlines()

    with open("positive_words_self.txt", encoding='utf-8') as pos:
        positive = pos.readlines()

    negative = [neg.replace("\n", "") for neg in negative]
    positive = [pos.replace("\n", "") for pos in positive]

# 라벨링 - 생략

# 모델을 만들기 위한 전처리 작업

okt = Okt()
# TODO: 의미없은 1글자 데이터 추가
stopwords = [
    '의', '가', '이', '은', '들', '는', '좀', '잘', '걍', '과', '도', '를', '으로', '자', '에', '와', '한', '하다',
    '서', '본', '요', '중', '엔', '다'
]
for num in range(0, 10):
    stopwords.append(str(num))

train_data = []
train_data_idx = []
Y_train = []


# body data를 토큰화하고, 불용 단어를 제거합니다.
# 긍정 부정 중립 - y_test.append([0, 0, 1]) 1,0,0 | 0,1,0 | 0,0,1 의 형태 추가
for _id, sentence, expected_emotion in MovieUserComment.objects.all().order_by('id').values_list(
        'id', 'body', 'expected_label_emotion')[:100]:
    words = okt.morphs(sentence, stem=True)
    words = [word for word in words if word not in stopwords]
    train_data.append(words)
    train_data_idx.append(_id)
    Y_train.append(MovieUserComment.get_emotion_vector(expected_emotion))


tokenizer = Tokenizer(num_words=len(train_data))
tokenizer.fit_on_texts(train_data)
# Tokenizer().texts_to_sequence() -> 무조건 전체 데이터만을 한꺼번에 입력?
X_train = tokenizer.texts_to_sequences(train_data)


# 모델 생성

# TODO: 각 모델 및 알고리즘에 대한 설명

# 내용 추가 : 우선 사람 손으로 모델링해서 테스트
# 최대 사용하는 단어의 갯수
max_words = 35000


X_train = sequence.pad_sequences(X_train)
Y_train = np.array(Y_train)
model = Sequential()
model.add(Embedding(max_words, 100))
model.add(LSTM(128))
model.add(Dense(3, activation='softmax'))
model.compile(optimizer='rmsprop', loss='categorical_crossentropy', metrics=['accuracy'])
history = model.fit(X_train, Y_train, epochs=10, batch_size=10, validation_split=0.1)


# 생성 결과 저장
predict = model.predict(X_train)
predict_labels = np.argmax(predict, axis=1)
for i in range(100):
    print("데이터 : ", train_data[i], "/\t 계산된 라벨 : ", predict_labels[i])




