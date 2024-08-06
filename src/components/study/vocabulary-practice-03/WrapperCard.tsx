import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import { IVocabulary3Practice } from '@interfaces/IVocabulary'
import { PlayState } from '@hooks/study/useStudyAudio'

import {
  IcoArrowRight,
  IcoArrowRightSkip,
  IcoReturn,
} from '@components/common/Icons'
import Gap from '@components/study/common-study/Gap'
import BtnPlayWord from './BtnPlayWord'
import Mean from './Mean'
import Input from './Input'
import { LottieRecordAni } from '@components/common/LottieAnims'
import { useEffect } from 'react'

type WrapperCardProps = {
  isSpeakMode: boolean
  isRecord: boolean
  isSideOpen: boolean
  playState: PlayState
  quizData: IVocabulary3Practice
  quizNo: number
  tryCount: number
  inputVal: string
  playWord: () => void
  changeInputVal: (value: string) => void
  checkAnswer: (skipType?: string) => Promise<void>
  setIsRecord: any
}

const isMobile = useDeviceDetection()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function WrapperCard({
  isSideOpen,
  playState,
  quizData,
  quizNo,
  tryCount,
  inputVal,
  playWord,
  changeInputVal,
  checkAnswer,
  isSpeakMode,
  isRecord,
  setIsRecord,
}: WrapperCardProps) {
  useEffect(() => {
    setTimeout(() => {
      setIsRecord(false)
    }, 2000)
  }, [isRecord])

  return (
    <div className={style.wordCard}>
      <div className={style.wordTyping}>
        {isSpeakMode ? (
          <>
            {/* 스피킹 모드 */}
            {/* 재생 버튼 */}
            <BtnPlayWord playState={playState} playWord={playWord} />
            {/* 녹음할 단어 */}
            <div className={style.speakQuestionText}>
              <div
                className={`${style.word} ${
                  quizData.Quiz[quizNo - 1].Question.Text.length > 20
                    ? style.overLength
                    : ''
                }`}
              >
                {quizData.Quiz[quizNo - 1].Question.Text}
              </div>
              {/* 녹음 시간을 보여주는 프로그레스바 */}
              <div
                className={style.recProgress}
                style={{ width: '10%', maxWidth: 'calc(100% - 4px)' }}
              ></div>
            </div>
            <div
              className={style.btnRec}
              onClick={() => {
                !isRecord && setIsRecord(true)
              }}
            >
              {/* 녹음전 아이콘 */}
              {!isRecord ? (
                <div className={style.recIcon}>
                  <img
                    src="src/assets/images/icons/icon_rec.svg"
                    alt=""
                    width={14}
                    height={26}
                  />
                </div>
              ) : (
                <></>
              )}

              {/* 녹음중일 때 보여지는 애니메이션 */}
              {isRecord ? <LottieRecordAni /> : <></>}
            </div>
          </>
        ) : (
          <>
            {/* 타이핑 모드 */}
            {/* 재생 버튼 */}
            <BtnPlayWord playState={playState} playWord={playWord} />

            {/* 입력창 */}
            <Input
              isSideOpen={isSideOpen}
              isEnabledTyping={quizData.IsEnabledTyping}
              quizData={quizData}
              quizNo={quizNo}
              tryCount={tryCount}
              inputVal={inputVal}
              changeInputVal={changeInputVal}
              checkAnswer={checkAnswer}
            />

            {/* 우측 버튼 */}
            <div className={style.enterButton} onClick={() => checkAnswer()}>
              <div className={style.enterIcon}>
                {/* (삭제: 스킵버튼은 우측 상단에 표시함) */}
                {/* {quizData.IsSkipAvailable ? (
                  <IcoArrowRightSkip width={20} height={20} />
                ) : (
                  <IcoReturn width={20} height={20} />
                )} */}

                <IcoReturn width={20} height={20} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 스킵버튼 */}
      {quizData.IsSkipAvailable && <SkipButton />}

      <Gap height={isMobile ? 30 : 20} />

      {/* 단어뜻 */}
      {/* <Mean
        meanData={quizData.Quiz[quizNo - 1]}
        mainMeanLang={quizData.MainMeanLanguage}
      /> */}

      {/* 스피크 결과 (단어뜻이 사라지고 결과가 나옴) */}
      <SpeakResult />
    </div>
  )
}

// 스킵 버튼 (다음 문제로 넘어가기)
const SkipButton = () => {
  return (
    <div className={style.skipButton}>
      <span>SKIP</span>
      <IcoArrowRight width={14} height={14} />
    </div>
  )
}

// 스피크 결과 (파닉스 음소, 정오답 표시)
const SpeakResult = () => {
  return (
    <>
      <div className={style.speakResult}>
        {/* 단어 */}
        <div className={style.word}>Word</div>
        <div className={style.phonemes}>
          {/* 파닉스 음소 */}
          <div className={style.phonemeItem}>
            {/* 스코어 30 미만 red, 30이상 70미만 orange, 70이상 green */}
            <div className={`${style.phoneme} ${style.red}`}>WW</div>
            <div className={style.phonemeScore}>10</div>
          </div>
          <div className={style.phonemeItem}>
            {/* 스코어 30 미만 red, 30이상 70미만 orange, 70이상 green */}
            <div className={`${style.phoneme} ${style.orange} `}>WW</div>
            <div className={style.phonemeScore}>10</div>
          </div>
          <div className={style.phonemeItem}>
            {/* 스코어 30 미만 red, 30이상 70미만 orange, 70이상 green */}
            <div className={`${style.phoneme} ${style.green}`}>WW</div>
            <div className={style.phonemeScore}>10</div>
          </div>
        </div>
      </div>

      <div className={style.speakResultSign}>
        {/* Good Job 메세지 */}
        {/* <div className={`${style.signBox} ${style.goodJob}`}>
          <div className={style.txt}>Good Job</div>
          <div className={style.iconArrow}></div>
        </div> */}

        {/* Try Again 메세지 */}
        <div className={`${style.signBox} ${style.tryAgain}`}>
          <div className={style.txt}>Try Again (1/3)</div>
          <div className={style.iconArrow}></div>
        </div>
      </div>
    </>
  )
}
