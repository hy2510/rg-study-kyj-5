export const DEFAULT_STUDY_TIME = 1200

export const ACTIVITY = {
  LISTENING_1: 'ListeningActivity1',
  LISTENING_2: 'ListeningActivity2',
  LISTENING_3: 'ListeningActivity3',
  LISTENING_4: 'ListeningActivity4',
  VOCABULARY_1: 'Vocabulary1',
  VOCABULARY_2: 'Vocabulary2',
  VOCABULARY_3: 'Vocabulary3',
  VOCABULARY_4: 'Vocabulary4',
  VOCABULARY_PRACTICE_1: 'VocabularyPractice1',
  VOCABULARY_PRACTICE_2: 'VocabularyPractice2',
  VOCABULARY_PRACTICE_3: 'VocabularyPractice3',
  VOCABULARY_PRACTICE_4: 'VocabularyPractice4',
  VOCABULARY_TEST_1: 'VocabularyTest1',
  VOCABULARY_TEST_2: 'VocabularyTest2',
  VOCABULARY_TEST_3: 'VocabularyTest3',
  VOCABULARY_TEST_4: 'VocabularyTest4',
  READING_COMP_1: 'ReadingComprehension1',
  READING_COMP_2: 'ReadingComprehension2',
  READING_COMP_3: 'ReadingComprehension3',
  READING_COMP_4: 'ReadingComprehension4',
  SUMMARY_1: 'Summary1',
  SUMMARY_2: 'Summary2',
  TRUE_OR_FALSE: 'TrueOrFalse',
  CLOZE_1: 'ClozeTest1',
  CLOZE_2: 'ClozeTest2',
  CLOZE_3: 'ClozeTest3',
  WRITING_1: 'WritingActivity1',
  WRITING_2: 'WritingActivity2',
}

// 학습 조회
export const GET_STUDY_INFO_PATH = 'api/study/book-reading/quiz/info'

// e-book 조회
export const GET_BOOK_DATA_PATH = 'api/study/book-reading/quiz/e-book'

// 책 읽기 시작
export const SUBMIT_READING_START_PATH = 'api/study/book-reading/book/start'

// 책 읽기 종료
export const SUBMIT_READING_END_PATH = 'api/study/book-reading/book/end'

// 북마크
export const SUBMIT_BOOK_MARK_PATH = 'api/study/book-reading/book/book-mark'

// 별점 주기
export const SUBMIT_PREFERENCE_PATH = 'api/study/book-reading/book/preference'

// 무비북 시청 완료
export const SUBMIT_ANIMATION_COMPLETE_PATH =
  'api/study/book-reading/book/animation-complete'

// 학습 문제 조회
export const GET_QUIZ_DATA_PATH = 'api/study/book-reading/quiz/question'

// 답안 기록 조회
export const GET_RECORD_DATA_PATH = 'api/study/book-reading/quiz/record'

// 힌트 조회
export const GET_HINT_PATH = 'api/study/book-reading/quiz/hint'

// 답안 저장
export const SAVE_STUDENT_ANSWER_PATH = 'api/study/book-reading/quiz/save'

// 부분 답안 저장
export const SAVE_STUDENT_PARTIAL_ANSWER_PATH =
  'api/study/book-reading/quiz/save/partial-record'

// 글쓰기 저장
export const SAVE_WRITING_PATH = 'api/study/book-reading/quiz/save/writing'

// 학습 단어 연습 저장
export const SAVE_VOCA_PRACTICE_PATH =
  'api/study/book-reading/quiz/save/vocabulary-practice'

// 패널티 제거
export const DELETE_PENALTY_PATH =
  'api/study/book-reading/quiz/save/clear-penalty'

// speak 데이터 조회
export const GET_SPEAK_DATA_PATH = 'api/study/book-reading/speak/e-book'

// speak 답안 기록 조회
export const GET_SPEAK_RECORD_PATH = 'api/study/book-reading/speak/record'

// speak 답안 저장
export const SAVE_SPEAK_DATA_PATH = 'api/study/book-reading/speak/save'

// 세션 체크
export const CHECK_SESSION_PATH = 'api/study/check-session'
