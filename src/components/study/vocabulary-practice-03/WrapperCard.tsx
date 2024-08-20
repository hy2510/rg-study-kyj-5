import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import { IVocabulary3Practice } from '@interfaces/IVocabulary'
import { PlayBarState } from '@pages/study/VocabularyPractice3'
import { PlayState } from '@hooks/study/useStudyAudio'
import { IRecordResultData } from '@interfaces/ISpeak'

import { LottieRecordAni } from '@components/common/LottieAnims'
import ico_rec from '@assets/images/icons/icon_rec.svg'

import Gap from '@components/study/common-study/Gap'
import BtnPlayWord from './BtnPlayWord'
import Input from './Input'
import Mean from './Mean'
import ResultSpeak from './ResultSpeak'
import BtnSkip from './BtnSkip'

type WrapperCardProps = {
  isSideOpen: boolean
  quizData: IVocabulary3Practice
  quizNo: number
  tryCount: number
  inputVal: string
  playBarState: PlayBarState
  playState: PlayState
  isSpeakResult: boolean
  sentenceScore: IRecordResultData | undefined
  playWord: () => void
  changeInputVal: (value: string) => void
  startRecord: () => void
  checkAnswer: (skipType?: string) => Promise<void>
  changePlayBarState: (state: PlayBarState) => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function WrapperCardSpeak({
  isSideOpen,
  inputVal,
  playBarState,
  playState,
  quizData,
  quizNo,
  tryCount,
  isSpeakResult,
  sentenceScore,
  playWord,
  startRecord,
  checkAnswer,
  changeInputVal,
  changePlayBarState,
}: WrapperCardProps) {
  return (
    <div className={style.wordCard}>
      <div className={style.wordTyping}>
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
          disabled={playBarState === 'recording' ? true : false}
          changeInputVal={changeInputVal}
          checkAnswer={checkAnswer}
        />

        {inputVal === '' ? (
          <div
            className={style.btnRec}
            onClick={() => {
              startRecord()
            }}
          >
            {playBarState === 'recording' ? (
              <LottieRecordAni />
            ) : (
              <div className={style.recIcon}>
                {/* <img src={ico_rec} alt="" width={14} height={26} /> */}
              </div>
            )}
          </div>
        ) : (
          <div className={style.enterButton} onClick={() => checkAnswer()}>
            <div className={style.enterIcon}></div>
          </div>
        )}
      </div>

      {/* 스킵버튼 */}
      {quizData.IsSkipAvailable && <BtnSkip checkAnswer={checkAnswer} />}

      <Gap height={isMobile ? 30 : 20} />

      {!isSpeakResult ? (
        <>
          {/* 단어뜻 */}
          <Mean
            meanData={quizData.Quiz[quizNo - 1]}
            mainMeanLang={quizData.MainMeanLanguage}
          />
        </>
      ) : (
        <>
          {/* 스피크 결과 (단어뜻이 사라지고 결과가 나옴) */}
          <ResultSpeak
            sentenceScore={sentenceScore}
            tryCount={tryCount}
            changePlayBarState={changePlayBarState}
          />
        </>
      )}
    </div>
  )
}
