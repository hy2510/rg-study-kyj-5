import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import { PlayState } from '@hooks/study/useStudyAudio'
import { IVocabulary1Quiz } from '@interfaces/IVocabulary'

import BtnPlayWord from './BtnPlayWord'
import { LottieRecordAni } from '@components/common/LottieAnims'
import { useMicrophonePermissionChecker } from '@hooks/speak/useMicrophonePermissionChecker'

type CardWordProps = {
  playState: PlayState
  cardInfo: IVocabulary1Quiz
  playWord: () => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function CardWord({
  playState,
  cardInfo,
  playWord,
}: CardWordProps) {

  const micCheck = useMicrophonePermissionChecker()

  return (
    <>
      <div className={`${style.wordCard} animate__animated`}>
        <div className={style.wordImage}>
          <img src={cardInfo.Question.Image} width={'100%'} />
        </div>
        {/* 녹음중일 때 스크린 블록 실행 */}
        {/* <div className={style.screenBlock}></div> */}
        <div className={style.wordText}>
          <BtnPlayWord
            playState={playState}
            cardInfo={cardInfo}
            playWord={playWord}
          />
          <div className={style.btnRec} onClick={() => {micCheck.micPermission === 'denied' && alert(micCheck.alertMessage)}}>
            {/* 녹음 대기 */}
            <div className={style.recIcon}></div>
            {/* 녹음중 */}
            {/* <LottieRecordAni /> */}
          </div>
        </div>
      </div>
      {/* 스피크 결과 */}
      {/* <SpeakResult
        playState={playState}
        cardInfo={cardInfo}
        playWord={playWord}
      /> */}
    </>
  )
}

// 스피크 결과
const SpeakResult = ({
  playState,
  cardInfo,
  playWord,
}: CardWordProps) => {
  return (
    <>
      <div className={style.speakResultVoca1}>
        <div className={style.container}>
          {/* 단어 */}
          <div className={style.wordText}>{cardInfo.Question.Text}</div>
          {/* 음소 */}
          <div className={style.phonemes}>
            <div className={style.phonemeItem}>
              <div className={`${style.phoneme} ${style.green}`}>P</div>
              <div className={style.phonemeScore}>70%</div>
            </div>
            <div className={style.phonemeItem}>
              <div className={`${style.phoneme} ${style.orange}`}>A</div>
              <div className={style.phonemeScore}>69%</div>
            </div>
            <div className={style.phonemeItem}>
              <div className={`${style.phoneme} ${style.red}`}>EE</div>
              <div className={style.phonemeScore}>10%</div>
            </div>
          </div>
        </div>
        {/* Good Job */}
        <div className={`${style.signBox} ${style.goodJob}`}>
          <div className={style.txt}>Good Job</div>
          <div className={style.iconArrow}></div>
        </div>
        {/* Try Again */}
        {/* <div className={`${style.signBox} ${style.tryAgain}`}>
          <div className={style.txt}>Try Again</div>
          <div className={style.iconArrow}></div>
        </div> */}
      </div>
    </>
  )
}