import { useEffect, useRef, useState } from 'react'

import SpeakCSS from '@stylesheets/speak.module.scss'

import { playSpeakNextSnd } from '@utils/common'

import { IRecordResultData } from '@interfaces/ISpeak'
import Visualizer from './Visualizer'

type ResultRecordProps = {
  isRetry: boolean
  sentence: string
  sentenceScore: IRecordResultData
  tryCount: number
  nativeAudio: string
  userAudio: string
  changeRecordResult: (state: boolean) => void
  changeRetry: (state: boolean) => void
}

export default function ResultRecord({
  isRetry,
  sentence,
  sentenceScore,
  tryCount,
  nativeAudio,
  userAudio,
  changeRecordResult,
  changeRetry,
}: ResultRecordProps) {
  const nativeAudioRef = useRef(new Audio(nativeAudio))
  const userAudioRef = useRef(new Audio(userAudio))
  const [nativeCur, setNativeCur] = useState(0)

  const nativeAud = nativeAudioRef.current
  const userAud = userAudioRef.current
  const [userCur, setUserCur] = useState(0)

  const [togglePhonemes, setTogglePhonemes] = useState(false)

  useEffect(() => {
    playSpeakNextSnd()
    let nativeIntervalId: string | number | NodeJS.Timeout | undefined
    let userIntervalId: string | number | NodeJS.Timeout | undefined

    const onPlayingHandlerNative = () => {
      nativeIntervalId = setInterval(() => {
        const per = nativeAud.currentTime / nativeAud.duration

        if (per === 0) {
          clearInterval(nativeIntervalId)
        } else {
          setNativeCur(per)
        }
      }, 25)
    }
    const onErrorHandlerNative = (e: any) => {
      console.log(e.error)
      alert(e.error)
    }
    const onPauseHanlderNative = () => {
      nativeAud.currentTime = 0
      clearInterval(nativeIntervalId)
      setNativeCur(0)
    }
    const onEndedHandlerNative = () => {
      clearInterval(nativeIntervalId)
      setNativeCur(0)
    }

    const onPlayingHandlerUser = () => {
      const additionSec = nativeAud.duration >= 5 ? 1.4 : 1.2
      const recordDuration = nativeAud.duration * additionSec

      userIntervalId = setInterval(() => {
        const per =
          userAud.currentTime /
          (userAud.duration === Infinity ? recordDuration : userAud.duration)

        if (per === 0) {
          clearInterval(userIntervalId)
        } else {
          setUserCur(per)
        }
      }, 25)
    }
    const onErrorHandlerUser = (e: any) => {
      console.log(e.error)
      alert(e.error)
    }
    const onPauseHanlderUser = () => {
      userAud.currentTime = 0
      clearInterval(userIntervalId)
      setUserCur(0)
    }
    const onEndedHandlerUser = () => {
      clearInterval(userIntervalId)
      setUserCur(0)
    }

    nativeAud.addEventListener('playing', onPlayingHandlerNative)
    nativeAud.addEventListener('error', onErrorHandlerNative)
    nativeAud.addEventListener('pause', onPauseHanlderNative)
    nativeAud.addEventListener('ended', onEndedHandlerNative)

    userAud.addEventListener('playing', onPlayingHandlerUser)
    userAud.addEventListener('error', onErrorHandlerUser)
    userAud.addEventListener('pause', onPauseHanlderUser)
    userAud.addEventListener('ended', onEndedHandlerUser)

    return () => {
      nativeAud.removeEventListener('playing', onPlayingHandlerNative)
      nativeAud.removeEventListener('error', onErrorHandlerNative)
      nativeAud.removeEventListener('pause', onPauseHanlderNative)
      nativeAud.removeEventListener('ended', onEndedHandlerNative)

      userAud.removeEventListener('playing', onPlayingHandlerUser)
      userAud.removeEventListener('error', onErrorHandlerUser)
      userAud.removeEventListener('pause', onPauseHanlderUser)
      userAud.removeEventListener('ended', onEndedHandlerUser)

      nativeAud.pause()
      userAud.pause()

      clearInterval(nativeIntervalId)
      clearInterval(userIntervalId)
    }
  }, [])

  const playNativeAudio = () => {
    userAud.pause()
    nativeAud.play()
  }

  const playUserAudio = () => {
    nativeAud.pause()
    userAud.play()
  }

  const closeResultRecord = () => {
    changeRecordResult(false)
  }

  return (
    <div className={SpeakCSS.screenBlock}>
      <div className={SpeakCSS.popUp}>
        <div className={SpeakCSS.row1}>
          <div
            className={`${SpeakCSS.btn} ${SpeakCSS.gray}`}
            onClick={() => playNativeAudio()}
          >
            <span>Native</span>
            <span className={SpeakCSS.iconSpeaker}></span>
          </div>

          <div
            className={`${SpeakCSS.btn} ${SpeakCSS.gray}`}
            onClick={() => playUserAudio()}
          >
            <span>My</span>
            <span className={SpeakCSS.iconSpeaker}></span>
          </div>

          {(sentenceScore.total_score >= 40 || isRetry) && (
            <>
              <div
                className={`${SpeakCSS.btn} ${SpeakCSS.retry}`}
                onClick={() => {
                  if (isRetry) {
                    closeResultRecord()
                  } else {
                    changeRetry(true)
                  }
                }}
              >
                <span className={SpeakCSS.iconRetry}></span>
              </div>
            </>
          )}
        </div>

        <div className={SpeakCSS.row2}>
          <div className={SpeakCSS.graph}>
            {/* 원어민 그래프 */}
            <Visualizer src={nativeAudio} color={'#d2d2d2'} />

            {/* 학생 그래프 */}
            <Visualizer
              src={userAudio}
              color={sentenceScore.total_score > 40 ? '#3ab6ff' : '#ff2424'}
            />

            <div className={SpeakCSS.wrapperProgress}>
              <div
                style={{ left: `${nativeCur * 100}%` }}
                className={`${SpeakCSS.progressBar} ${SpeakCSS.native}`}
              >
                <div className={SpeakCSS.progressArrow}></div>
              </div>
              <div
                style={{ left: `${userCur * 100}%` }}
                className={`${SpeakCSS.progressBar} ${SpeakCSS.student} ${
                  sentenceScore.total_score > 40 ? SpeakCSS.passed : null
                }`}
              >
                <div className={SpeakCSS.progressArrow}></div>
              </div>
            </div>
          </div>

          <div className={SpeakCSS.sentence}>
            {sentenceScore.phoneme_result.words.map((word, i) => {
              const avg =
                word.phonemes.reduce((cur, acc) => {
                  return cur + acc.score
                }, 0) / word.phonemes.length

              const sentenceWord = sentence.split(' ')

              return (
                <div
                  className={`${SpeakCSS.word} ${avg < 30 ? SpeakCSS.red : ''}`}
                >
                  {sentenceWord[i]}
                </div>
              )
            })}
          </div>

          <div
            className={SpeakCSS.phonemes}
            style={{ display: togglePhonemes ? 'flex' : 'none' }}
          >
            {sentenceScore.phoneme_result.words.map((word) => {
              return (
                <div className={SpeakCSS.wordContainer}>
                  <div className={SpeakCSS.row1}>{word.word}</div>
                  <div className={SpeakCSS.row2}>
                    {word.phonemes.map((phoneme) => {
                      return (
                        <div className={SpeakCSS.phonemeResult}>
                          <div
                            className={`${SpeakCSS.phoneme} 
                            ${phoneme.score < 30 && SpeakCSS.red}
                            ${
                              phoneme.score >= 30 &&
                              phoneme.score < 70 &&
                              SpeakCSS.orange
                            }  
                            ${phoneme.score >= 70 && SpeakCSS.green}  
                            `}
                          >
                            {phoneme.phoneme}
                          </div>
                          <div className={SpeakCSS.phonemeScore}>
                            {Math.floor(phoneme.score)}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div
            className={SpeakCSS.btnToggle}
            onClick={() => {
              togglePhonemes
                ? setTogglePhonemes(false)
                : setTogglePhonemes(true)
            }}
          >
            {togglePhonemes ? 'close' : 'detail'}
            <span
              className={`${SpeakCSS.icoChev} ${
                togglePhonemes && SpeakCSS.rotate
              }`}
            ></span>
          </div>
        </div>

        <div
          className={`${SpeakCSS.row3} ${
            sentenceScore.total_score >= 40
              ? SpeakCSS.goodJob
              : SpeakCSS.tryAgain
          }`}
          onClick={() => {
            if (isRetry) {
              changeRetry(false)
            } else {
              closeResultRecord()
            }
          }}
        >
          {sentenceScore.total_score >= 40 ? (
            <div className={SpeakCSS.txt}>Good Job!</div>
          ) : (
            <>
              {isRetry ? (
                <>
                  <div className={SpeakCSS.txt}>Try Again</div>
                </>
              ) : (
                <>
                  <div className={SpeakCSS.txt}>
                    Try Again ({tryCount + 1} / 3)
                  </div>
                </>
              )}
            </>
          )}
          <div className={SpeakCSS.iconArrow}></div>
        </div>
      </div>
    </div>
  )
}
