import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import MobileDetect from 'mobile-detect'
const md = new MobileDetect(navigator.userAgent)
const isMobile = md.phone()

import { IPhonemeResult } from '@interfaces/ISpeak'
import { PlayBarState } from '@pages/study/VocabularyPractice2'

type ResultSpeakProps = {
  word: string
  phonemeScore: IPhonemeResult | undefined
  changePlayBarState: (state: PlayBarState) => void
}

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function ResultSpeak({
  word,
  phonemeScore,
  changePlayBarState,
}: ResultSpeakProps) {
  return (
    <>
      <div className={style.speakResultVoca2}>
        <div className={style.container}>
          {phonemeScore && (
            <>
              {/* 단어 */}
              <div className={style.wordText}>{word}</div>

              <div className={style.phonemes}>
                {phonemeScore.words.map((word) => {
                  return (
                    <>
                      {word.phonemes.map((phoneme) => {
                        return (
                          <div className={style.phonemeItem}>
                            <div
                              className={`${style.phoneme} 
                        ${phoneme.score < 30 && style.red}
                        ${
                          phoneme.score >= 30 &&
                          phoneme.score < 60 &&
                          style.orange
                        }  
                        ${phoneme.score >= 60 && style.green}  
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

        {phonemeScore && phonemeScore.average_phoneme_score >= 40 ? (
          <div
            className={`${style.signBox} ${style.goodJob}`}
            onClick={() => changePlayBarState('')}
          >
            <div className={style.txt}>Good Job</div>
            <div className={style.iconArrow}></div>
          </div>
        ) : (
          <div
            className={`${style.signBox} ${style.tryAgain}`}
            onClick={() => changePlayBarState('')}
          >
            <div className={style.txt}>Try Again</div>
            <div className={style.iconArrow}></div>
          </div>
        )}
      </div>
    </>
  )
}
