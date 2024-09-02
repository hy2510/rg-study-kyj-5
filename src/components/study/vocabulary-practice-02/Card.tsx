import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

import { IVocabulary2Quiz } from '@interfaces/IVocabulary'
import { MultiPlayStateProps } from '@pages/study/VocabularyPractice2'

import BtnPlayWord from './BtnPlayWord'
import BtnPlaySentence from './BtnPlaySentence'
import { LottieRecordAni } from '@components/common/LottieAnims'
import { useMicrophonePermissionChecker } from '@hooks/speak/useMicrophonePermissionChecker'

type CardProps = {
  cardInfo: IVocabulary2Quiz
  multiPlayState: MultiPlayStateProps
  playWord: () => void
  playSentence: () => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

export default function Card({
  cardInfo,
  multiPlayState,
  playWord,
  playSentence,
}: CardProps) {

  const micCheck = useMicrophonePermissionChecker()

  return (
    <>
      <div
        className={`${style.wordCard} animate__animated animate__slideInRight`}
      >
        <div className={style.wordImage}>
          <img src={cardInfo.Question.Image} width={'100%'} />
        </div>
        {/* 녹음중일 때 스크린 블록 실행 */}
        {/* <div className={style.screenBlock}></div> */}
        
        {/* 단어 */}
        <div className={`${style.wordText} ${style.word}`}>
          <BtnPlayWord
            multiPlayState={multiPlayState}
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

        {/* 뜻 */}
        <div className={style.wordText}>
          <BtnPlaySentence
            multiPlayState={multiPlayState}
            cardInfo={cardInfo}
            playSentence={playSentence}
          />
        </div>
      </div>
      {/* 스피크 결과 */}
      {/* <SpeakResult
        cardInfo={cardInfo}
        multiPlayState={multiPlayState}
        playWord={playWord}
        playSentence={playSentence}
      /> */}
    </>
  )
}

// 스피크 결과
const SpeakResult = ({
  cardInfo,
  multiPlayState,
  playWord,
  playSentence,
}: CardProps) => {
  return (
    <>
      <div className={style.speakResultVoca2}>
        <div className={style.container}>
          {/* 단어 */}
          <div className={style.wordText}>{cardInfo.Question.Word}</div>
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