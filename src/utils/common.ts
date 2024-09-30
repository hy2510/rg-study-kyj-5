// 공통적인 함수를 넣어놓을 곳

import sndSpeakNext from '@assets/sounds/next.mp3'

let currentAud: HTMLAudioElement
const audSoundNext = new Audio(sndSpeakNext)

/** [ 음원을 재생할 때 사용 ]
 * @param src 음원의 url이나 음원
 * */
const playAudio = (src: string) => {
  currentAud = new Audio(src)
  currentAud.volume = 0.7

  const playAudio = () => {
    currentAud.play()
  }

  playAudio()
}

/** [ Speak 띠로링]
 * @param src 음원의 url이나 음원
 * */
const playSpeakNextSnd = () => {
  audSoundNext.play()
}

export { playAudio, playSpeakNextSnd }
