import { useEffect, useRef, useState } from 'react'

import SpeakCSS from '@stylesheets/speak.module.scss'

import { playSpeakNextSnd } from '@utils/common'

import { IRecordResultData } from '@interfaces/ISpeak'
import Visualizer from './Visualizer'
import getBlobDuration from 'get-blob-duration'

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
  const audioRef = useRef(new Audio())
  const audio = audioRef.current
  audio.autoplay = true

  const intervalRef = useRef<string | number | NodeJS.Timeout | undefined>()
  let audioInterval = intervalRef.current

  const [audioController, setAudioController] = useState<{
    src: string
    type: '' | 'native' | 'user'
  }>({
    src: '',
    type: '',
  })

  const [nativeCur, setNativeCur] = useState(0)
  const [userCur, setUserCur] = useState(0)

  const [togglePhonemes, setTogglePhonemes] = useState(false)

  useEffect(() => {
    playSpeakNextSnd()
  }, [])

  useEffect(() => {
    if (audioController.src !== '') {
      audio.src = audioController.src

      if (audioController.type === 'user') {
        const onCanPlayThrough = () => {
          audio.play()
        }

        const onPlayingHandler = async () => {
          const duration = await getBlobDuration(audioController.src)

          audioInterval = setInterval(() => {
            const per = audio.currentTime / duration

            if (per === 0) {
              clearInterval(audioInterval)
            } else {
              setUserCur(per)
            }
          }, 25)

          audio.play()
        }

        const onErrorHandler = (e: any) => {
          console.log(e.error)
          alert(e.error)
        }
        const onPauseHanlder = () => {
          clearInterval(audioInterval)
        }
        const onEndedHandler = () => {
          setUserCur(0)

          clearInterval(audioInterval)
        }

        audio.addEventListener('canplaythrough', onCanPlayThrough)
        audio.addEventListener('playing', onPlayingHandler)
        audio.addEventListener('error', onErrorHandler)
        audio.addEventListener('pause', onPauseHanlder)
        audio.addEventListener('ended', onEndedHandler)

        return () => {
          audio.removeEventListener('canplaythrough', onCanPlayThrough)
          audio.removeEventListener('playing', onPlayingHandler)
          audio.removeEventListener('error', onErrorHandler)
          audio.removeEventListener('pause', onPauseHanlder)
          audio.removeEventListener('ended', onEndedHandler)

          audio.pause()
          audio.currentTime = 0
          setNativeCur(0)
          setUserCur(0)

          clearInterval(audioInterval)
        }
      } else {
        const onCanPlayThrough = () => {
          audio.play()
        }

        const onPlayingHandler = () => {
          audioInterval = setInterval(() => {
            const per = audio.currentTime / audio.duration

            if (per === 0) {
              clearInterval(audioInterval)
            } else {
              setNativeCur(per)
            }
          }, 25)

          audio.play()
        }

        const onErrorHandler = (e: any) => {
          console.log(e.error)
          alert(e.error)
        }
        const onPauseHanlder = () => {
          clearInterval(audioInterval)
        }
        const onEndedHandler = () => {
          setNativeCur(0)

          clearInterval(audioInterval)
        }

        audio.addEventListener('canplaythrough', onCanPlayThrough)
        audio.addEventListener('playing', onPlayingHandler)
        audio.addEventListener('error', onErrorHandler)
        audio.addEventListener('pause', onPauseHanlder)
        audio.addEventListener('ended', onEndedHandler)

        return () => {
          audio.removeEventListener('canplaythrough', onCanPlayThrough)
          audio.removeEventListener('playing', onPlayingHandler)
          audio.removeEventListener('error', onErrorHandler)
          audio.removeEventListener('pause', onPauseHanlder)
          audio.removeEventListener('ended', onEndedHandler)

          audio.pause()
          audio.currentTime = 0
          setNativeCur(0)
          setUserCur(0)

          clearInterval(audioInterval)
        }
      }
    }
  }, [audioController])

  const playNativeAudio = () => {
    audio.pause()

    if (audioController.type === 'native') {
      audio.play()
    } else {
      setAudioController({
        src: nativeAudio,
        type: 'native',
      })
    }
  }

  const playUserAudio = () => {
    audio.pause()

    if (audioController.type === 'user') {
      audio.play()
    } else {
      setAudioController({
        src: userAudio,
        type: 'user',
      })
    }
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

          {((sentenceScore.speech_detected &&
            sentenceScore.total_score >= 40 &&
            sentenceScore.phoneme_result.sentence_score >= 40 &&
            (sentenceScore.total_score +
              sentenceScore.phoneme_result.sentence_score) /
              2 >=
              40) ||
            isRetry) && (
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
              color={
                sentenceScore.speech_detected &&
                sentenceScore.total_score >= 40 &&
                sentenceScore.phoneme_result.sentence_score >= 40 &&
                (sentenceScore.total_score +
                  sentenceScore.phoneme_result.sentence_score) /
                  2 >=
                  40
                  ? '#3ab6ff'
                  : '#ff2424'
              }
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
                  sentenceScore.speech_detected &&
                  sentenceScore.total_score >= 40 &&
                  sentenceScore.phoneme_result.sentence_score >= 40 &&
                  (sentenceScore.total_score +
                    sentenceScore.phoneme_result.sentence_score) /
                    2 >=
                    40
                    ? SpeakCSS.passed
                    : null
                }`}
              >
                <div className={SpeakCSS.progressArrow}></div>
              </div>
            </div>
          </div>

          <div className={SpeakCSS.sentence}>
            {sentenceScore.phoneme_result.words.map((word, i) => {
              const sentenceWord = sentence.split(' ')

              return (
                <div
                  className={`${SpeakCSS.word} ${
                    sentenceScore.phoneme_result.sentence_score < 30
                      ? SpeakCSS.red
                      : ''
                  }`}
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
            sentenceScore.speech_detected &&
            sentenceScore.total_score >= 40 &&
            sentenceScore.phoneme_result.sentence_score >= 40 &&
            (sentenceScore.total_score +
              sentenceScore.phoneme_result.sentence_score) /
              2 >=
              40
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
          {sentenceScore.speech_detected &&
          sentenceScore.total_score >= 40 &&
          sentenceScore.phoneme_result.sentence_score >= 40 &&
          (sentenceScore.total_score +
            sentenceScore.phoneme_result.sentence_score) /
            2 >=
            40 ? (
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
