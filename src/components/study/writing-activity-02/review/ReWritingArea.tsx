import writingActivityCSS from '@stylesheets/writing-activity.module.scss'
import writingActivityCSSMobile from '@stylesheets/mobile/writing-activity.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'
type WritingAreaProps = {
  wordMinCount: number
  wordMaxCount: number
  answerData: string[]
  isRewriting: boolean
  onChangeHandler: (text?: string) => void
}

const isMobile = useDeviceDetection()

const style = isMobile ? writingActivityCSSMobile : writingActivityCSS

export default function ReWritingArea({
  wordMinCount,
  wordMaxCount,
  answerData,
  isRewriting,
  onChangeHandler,
}: WritingAreaProps) {
  return (
    <div className={style.writingArea}>
      <textarea
        placeholder={`Please fill out within ${wordMinCount} to ${wordMaxCount} characters.`}
        disabled={!isRewriting}
        onChange={(e) => onChangeHandler(e.currentTarget.value)}
        value={answerData.join('\n\n')}
      />
    </div>
  )
}