# 아직 정제되지 않는 열들을 불러옵니다.
query_result = MovieUserComment.objects.filter(
    purified_body__isnull=True).values_list('id', 'body')[:1000]

re_has_another_lang = re.compile('[a-zA-Z一-龥]')
pattern_quotes = r'[\'\"`]'
pattern_special_letters = r'[!@#$%^&*()\-_=+/~;:><]'
pattern_single_han = r'[ㄱ-ㅎㅏ-ㅞ]'

for _id, _body in query_result:
    # 한글 외의 다른 언어가 사용됨
    if re_has_another_lang.search(_body):
        continue

    # 따옴표 형태의 문자열을 공백으로 변경
    _body = re.sub(pattern_quotes, ' ', _body)
    # 다른 특수문자들을 공백으로 변경
    _body = re.sub(pattern_special_letters, ' ', _body)
    # 단음절 한글 문자를 제거
    _body = re.sub(pattern_single_han, '', _body)

    MovieUserComment.objects.filter(id=_id).update(purified_body=_body)
    print(_id, _body)