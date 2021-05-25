predict = model.predict(X_test)
predict_labels = np.argmax(predict, axis=1)
original_labels = np.argmax(Y_test, axis=1)

wrong_cnt = 0
idx = 0
for predict_label in predict_labels:
    if predict_label != original_labels[idx]:
        wrong_cnt += 1
    idx += 1

print("정확도 : %s" % (wrong_cnt / len(predict_labels)) * 100)