import writingActivityCSS from '@stylesheets/writing-activity.module.scss'
import writingActivityCSSMobile from '@stylesheets/mobile/writing-activity.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'

const isMobile = useDeviceDetection()

const style = isMobile ? writingActivityCSSMobile : writingActivityCSS

type RevisionReportProps = {
  revisionImageTop: string
  revisionImageBottom: string
  comment: string
}

export default function RevisionReport({
  revisionImageTop,
  revisionImageBottom,
  comment,
}: RevisionReportProps) {
  return (
    <div className={style.revisionReport}>
      <img src={revisionImageTop} alt="" />

      <img src={revisionImageBottom} alt="" />

      <span>{comment}</span>
    </div>
  )
}
