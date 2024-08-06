// 학습에 관련된 api
import axios from 'axios'
import {
  IResultType,
  IUserAnswer,
  IRecordAnswerType,
  IUserAnswerPartial,
  IStudyData,
  IUserAnswerWriting,
  IDeletePenaltyType,
} from '@interfaces/Common'

import { IStudyInfo } from '@interfaces/IStudyInfo'
import { BookInfo } from '@interfaces/IBookInfo'
import { Mode } from '@interfaces/Types'
import {
  DELETE_PENALTY_PATH,
  GET_RECORD_DATA_PATH,
  GET_STUDY_INFO_PATH,
  SAVE_STUDENT_ANSWER_PATH,
  SAVE_STUDENT_PARTIAL_ANSWER_PATH,
  SAVE_WRITING_PATH,
} from '@constants/constant'

/** 유저가 선택한 답안을 서버에 저장한 후 오류가 없다면 결과값을 반환한다.
 * @param userAnswer 유저의 답안 정보
 * */
const saveUserAnswer = async (
  mode: Mode,
  userAnswerData: IUserAnswer,
): Promise<IResultType> => {
  let result: IResultType = {
    result: '0',
    resultMessage: '',
  }

  if (mode === 'Quiz') {
    result = await axios
      .post(`/${SAVE_STUDENT_ANSWER_PATH}`, userAnswerData)
      .then((res) => res.data)
  }

  return result
}

/** 유저가 선택한 답안을 서버에 저장한 후 오류가 없다면 결과값을 반환한다.
 * @param userAnswer 유저의 답안 정보
 * */
const saveUserAnswerPartial = async (
  mode: Mode,
  userAnswerData: IUserAnswerPartial,
): Promise<IResultType> => {
  let result: IResultType = {
    result: '0',
    resultMessage: '',
  }

  if (mode === 'Quiz') {
    result = await axios
      .post(`/${SAVE_STUDENT_PARTIAL_ANSWER_PATH}`, userAnswerData)
      .then((res) => res.data)
  }

  return result
}

/**
 * Vocabulary Practice 저장
 */
const saveVocaPractice = async () => {
  // const result: IResultType = await axios
  //   .post(`/${SAVE_VOCA_PRACTICE_PATH}`, userAnswerData, {
  //     headers: {
  //       Authorization: getToken(),
  //     },
  //   })
  //   .then((res) => res.data)
  // console.log(result)
  // return result
}

/**
 * Writing Activity2 저장
 * save type에 의하여 동작이 결정된다.
 * S:첨삭용 제출, E:첨삭안하고 글 제출, R:글 안쓰고 마침, X:임시저장
 */
const saveWritingActivity = async (
  mode: Mode,
  userAnswerData: IUserAnswerWriting,
): Promise<IResultType> => {
  let result: IResultType = {
    result: '0',
    resultMessage: '',
  }

  if (mode === 'Quiz') {
    result = await axios
      .post(`/${SAVE_WRITING_PATH}`, userAnswerData)
      .then((res) => res.data)
  }

  return result
}

/** [ 기록된 학습 데이터를 가지고오는 함수 ]
 * @param path api 서버로 보낼 path값
 * return
 * recordedData 학습 정보가 담긴 데이터
 * */
const loadRecordedData = async (
  step: number | string,
  props: IStudyData,
): Promise<any> => {
  const recordedData: IRecordAnswerType[] = await axios
    .get(
      `/${GET_RECORD_DATA_PATH}/${step}?studyId=${props.studyId}&studentHistoryId=${props.studentHistoryId}`,
    )
    .then((res) => res.data)

  return recordedData
}

/** [ 패널티 완료 후 결과 저장 ]
 *
 */
const deletePenalty = async (userInfo: IDeletePenaltyType) => {
  const penaltyState: IResultType = await axios
    .post(`/${DELETE_PENALTY_PATH}`, userInfo)
    .then((res) => res.data)

  return penaltyState
}

/** [ 학습 완료 후 저장 ]
 * @param resultData api 서버로 보낼 data
 * @param path api 서버로 보낼 path값
 *
 * return  통신 완료 후 상태
 * */
const saveStudyData = async (path: string): Promise<IResultType> => {
  const result: IResultType = await axios
    .post(`/${path}`)
    .then((res) => res.data)

  return result
}

/** [ 패널티 저장 ]
 *
 * return
 * 통신 완료 후 상태
 */
const savePenalty = async (penaltyData: object): Promise<number> => {
  // todo 데이터에 따라 로직 개발

  return 200
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Quiz 데이터 조회
 * @param path
 * @param transformType JSON 객체를 Quiz 객체로 전환하는 함수
 * @returns 변환된 Quiz 객체
 */
async function getQuizData<T>(
  path: string,
  transformType: (rawData: any) => Promise<T>,
): Promise<T> {
  const requestUrl = `/${path}`
  let quiz: T

  try {
    const response = await axios.get(requestUrl)

    if (response.status >= 200 && response.status < 300) {
      const responseData: any = response.data
      quiz = await transformType(responseData)
    } else {
      throw new Error('QuizData Load Failed 1')
    }
  } catch (error: any) {
    console.error(error)
    throw new Error('QuizData Load Failed 2')
  }
  return quiz
}

// 힌트
async function getHint<T>(
  path: string,
  transformType: (rawData: any) => Promise<T>,
): Promise<T> {
  const requestUrl = `/${path}`
  let quiz: T
  try {
    const response = await axios.get(requestUrl)

    if (response.status >= 200 && response.status < 300) {
      const responseData: any = response.data
      quiz = await transformType(responseData)
    } else {
      throw new Error('API Load Failed 1')
    }
  } catch (error: any) {
    console.error(error)
    throw new Error('API Load Failed 2')
  }
  return quiz
}

// study info 가져오기
async function getStudyInfo(
  studyId: string,
  studentHistoryId: string,
  bookType: string,
): Promise<IStudyInfo> {
  const requestUrl = `/${GET_STUDY_INFO_PATH}/${bookType}?studentHistoryId=${studentHistoryId}&studyId=${studyId}`
  let studyInfo: IStudyInfo

  try {
    const res = await axios.get(requestUrl)

    if (res.status >= 200 && res.status < 300) {
      const response = res.data

      studyInfo = await response
    } else {
      throw new Error('API Load Failed 1')
    }
  } catch (err) {
    console.error(err)
    throw new Error('API Load Failed 2')
  }

  return studyInfo
}

// book info 가져오기
async function getBookInfo(
  studyId: string,
  studentHistoryId: string,
  levelRoundId: string,
): Promise<BookInfo> {
  const requestUrl = `/api/library/book-info?studentHistoryId=${studentHistoryId}&studyId=${studyId}&levelRoundId=${levelRoundId}`

  let bookInfo: BookInfo

  try {
    const res = await axios.get(requestUrl)

    if (res.status >= 200 && res.status < 300) {
      const response = res.data

      bookInfo = await response
    } else {
      throw new Error('API Load Failed 1')
    }
  } catch (err) {
    console.error(err)
    throw new Error('API Load Failed 2')
  }

  return bookInfo
}
export {
  loadRecordedData,
  saveUserAnswer,
  saveUserAnswerPartial,
  saveStudyData,
  saveVocaPractice,
  deletePenalty,
  saveWritingActivity,
  savePenalty,
  getQuizData,
  getHint,
  getStudyInfo,
  getBookInfo,
}
