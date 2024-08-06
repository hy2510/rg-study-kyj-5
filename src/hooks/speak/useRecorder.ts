import { useState } from 'react'

import axios from 'axios'
import { IRecordResultData } from '@interfaces/ISpeak'
import { PlayBarState } from '@pages/containers/SpeakContainer'

import { isIOS } from 'react-device-detect'

const API_URL = 'https://api.readinggate.elasolution.com'
const API_KEY = 'e874641aac784ff6b9d62c3483f7aaaa'

export default function useRecorder() {
  const [userAudio, setUserAudio] = useState('')

  /**
   * 녹음 시작
   * @param text
   * @param changeSentenceScore
   */
  const startRecording = (
    text: string,
    nativeAudio: string,
    changePlayBarState: (state: PlayBarState) => void,
    changeSentenceScore: (data: IRecordResultData) => void,
  ) => {
    try {
      const audio = new Audio(nativeAudio)

      // 오디오의 duration을 구한 뒤 녹음 시작
      const onRecordHandler = () => {
        const additionSec = audio.duration >= 5 ? 1.4 : 1.2
        const recordDuration = Math.ceil(audio.duration * 1000 * additionSec)

        if (navigator.mediaDevices.getUserMedia) {
          console.log('The mediaDevices.getUserMedia() method is supported.')

          // user media 권한 얻기 성공
          const onSuccGetUserMedia = (stream: MediaStream) => {
            changePlayBarState('recording')

            const recorder = new MediaRecorder(stream)
            const chunks: BlobPart[] | undefined = []

            recorder.ondataavailable = (event) => {
              chunks.push(event.data)
            }

            recorder.onstop = () => {
              stream.getTracks().forEach(function (track) {
                track.stop()
              })

              const audioBlob = new Blob(chunks, { type: recorder.mimeType })
              const studentAudio = new File([audioBlob], 'student_audio.mp3', {
                type: 'audio/mp3',
              })

              setUserAudio(URL.createObjectURL(audioBlob))

              pron_v2(studentAudio, nativeAudio, text, changeSentenceScore)
            }

            recorder.onerror = (e) => {
              alert(e)
            }

            recorder.start()

            setTimeout(() => {
              recorder.stop()
            }, recordDuration)
          }

          // user media 권한 얻기 실패
          const onFailGetUserMedia = (err: string) => {
            changePlayBarState('reset')
            console.error('The following error occured: ' + err)
          }

          const constraints = { audio: true }
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(onSuccGetUserMedia, onFailGetUserMedia)
            .catch((err) => {
              console.log(err.name)
              console.log(err.message)
            })
        } else {
          changePlayBarState('reset')
          alert('MediaDevices.getUserMedia() not supported on your browser!')
        }
      }

      if (isIOS) {
        audio.addEventListener('loadedmetadata', onRecordHandler)
      } else {
        audio.addEventListener('canplaythrough', onRecordHandler)
      }
    } catch (e) {
      alert(e)
    }
  }

  /**
   * 에듀템 테스트
   * @param audioBlob
   * @param text
   */
  const pron_v2 = async (
    studentAudio: File,
    nativeAudio: string,
    text: string,
    changeSentenceScore: (score: IRecordResultData) => void,
  ) => {
    const nativeFile = await convertURLtoFile(nativeAudio)

    const formData = new FormData()
    formData.append('student_audio', studentAudio)
    formData.append('text', text)
    // @ts-ignore
    formData.append('get_phoneme_result', true)
    // @ts-ignore
    formData.append('native_audio', nativeFile)

    axios
      .post(`${API_URL}/pron_v2/`, formData, {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((data) => {
        console.log(data)
        switch (data.status) {
          case 200:
            // 정상적으로 완료된 경우
            changeSentenceScore(data.data)
            break

          case 401:
            // 인증키가 잘못된 경우
            alert('인증키가 잘못되었습니다. 리딩게이트로 전화주세요. 1599-0533')
            break

          case 403:
            // Forbidden
            alert(data.data)
            break

          case 422:
            // Validation Error
            alert(data.data)
            break
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    userAudio,
    startRecording,
  }
}

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url)
  const data = await response.blob()
  const ext = url.split('.').pop() // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop() // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` }
  return new File([data], filename!, metadata)
}

export { useRecorder }
