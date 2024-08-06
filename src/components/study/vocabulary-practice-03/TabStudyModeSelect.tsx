import vocabularyCSS from '@stylesheets/vocabulary-practice.module.scss'
import vocabularyCSSMobile from '@stylesheets/mobile/vocabulary-practice.module.scss'
import useDeviceDetection from '@hooks/common/useDeviceDetection'

const isMobile = useDeviceDetection()
const style = isMobile ? vocabularyCSSMobile : vocabularyCSS

type StudyModeSelectTabProps = {
  isSpeakMode: boolean
  setIsSpeakMode: any
}

export default function TabStudyModeSelect({
  isSpeakMode,
  setIsSpeakMode,
}: StudyModeSelectTabProps) {
  return (
    <div className={style.studyModeSelectTab}>
      <div
        className={`${style.btnTab} ${!isSpeakMode ? style.active : ''}`}
        onClick={() => {
          setIsSpeakMode(false)
        }}
      >
        Typing Mode
      </div>
      <div
        className={`${style.btnTab} ${isSpeakMode ? style.active : ''}`}
        onClick={() => {
          setIsSpeakMode(true)
        }}
      >
        Speak Mode
      </div>
    </div>
  )
}
