import numpy as np

tokenizer = Tokenizer(num_words=len(train_data))
tokenizer.fit_on_texts(train_data)

max_words = 35000
X_train = tokenizer.texts_to_sequences(train_data)

test_data = train_data[700:]
test_data_idx = train_data[700:]
train_data = train_data[:700]
train_dtat_idx = train_data[:700]

X_train = sequence.pad_sequences(X_train)
Y_train = np.array(Y_train)

X_test = X_train[700:]
X_train = X_train[:700]
Y_test = Y_train[700:]
Y_train = Y_train[:700]