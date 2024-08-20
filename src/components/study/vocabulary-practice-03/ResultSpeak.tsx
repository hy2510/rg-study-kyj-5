import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'
import { IRecordResultData } from '@interfaces/ISpeak'
import { PlayBarState } from '@pages/study/VocabularyPractice3'

const isMobile = useDeviceDetection()
const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

type ResultSpeakProps = {
  sentenceScore: IRecordResultData | undefined
  tryCount: number
  changePlayBarState: (state: PlayBarState) => void
}

export default function ResultSpeak({
  sentenceScore,
  tryCount,
  changePlayBarState,
}: ResultSpeakProps) {
  return (
    <>
      <div className={style.speakResult}>
        {sentenceScore && (
          <>
            {/* 단어 */}
            <div className={style.word}>{sentenceScore.best_answer}</div>

            <div className={style.phonemes}>
              {sentenceScore.phoneme_result.words.map((word) => {
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
                          phoneme.score < 70 &&
                          style.orange
                        }  
                        ${phoneme.score >= 70 && style.green}  
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
        {sentenceScore && sentenceScore.total_score >= 40 ? (
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
