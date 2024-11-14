import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import { IPhonemeResult } from '@interfaces/ISpeak'
import { PlayBarState } from '@pages/study/VocabularyPractice3'

import {
  SCORE_SPEAK_PASS,
  SCORE_SPEAK_ORANGE,
  SCORE_SPEAK_GREEN,
} from '@constants/constant'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

type ResultSpeakProps = {
  word: string
  phonemeScore: IPhonemeResult | undefined
  changePlayBarState: (state: PlayBarState) => void
}

export default function ResultSpeak({
  word,
  phonemeScore,
  changePlayBarState,
}: ResultSpeakProps) {
  return (
    <>
      <div className={style.speakResult}>
        {phonemeScore && (
          <>
            {/* 단어 */}
            <div className={style.word}>{word}</div>

            <div className={style.phonemes}>
              {phonemeScore.words.map((word) => {
                return (
                  <>
                    {word.phonemes.map((phoneme) => {
                      return (
                        <div className={style.phonemeItem}>
                          <div
                            className={`${style.phoneme} 
                        ${phoneme.score < SCORE_SPEAK_ORANGE && style.red}
                        ${
                          phoneme.score >= SCORE_SPEAK_ORANGE &&
                          phoneme.score < SCORE_SPEAK_GREEN &&
                          style.orange
                        }  
                        ${phoneme.score >= SCORE_SPEAK_GREEN && style.green}  
                        `}
                          >
                            {phoneme.phoneme}
                          </div>
                          <div className={style.phonemeScore}>
                            {Math.floor(phoneme.score)}%
                          </div>
                        </div>
                      )
                    })}
                  </>
                )
              })}
            </div>
          </>
        )}
      </div>

      <div
        className={style.speakResultSign}
        onClick={() => changePlayBarState('')}
      >
        {phonemeScore &&
        phonemeScore.average_phoneme_score >= SCORE_SPEAK_PASS ? (
          <div className={`${style.signBox} ${style.goodJob}`}>
            <div className={style.txt}>Good Job</div>
            <div className={style.iconArrow}></div>
          </div>
        ) : (
          <div className={`${style.signBox} ${style.tryAgain}`}>
            <div className={style.txt}>Try Again</div>
            <div className={style.iconArrow}></div>
          </div>
        )}
      </div>
    </>
  )
}
