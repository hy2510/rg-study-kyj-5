import writingActivityCSS from '@stylesheets/writing-activity.module.scss'
import writingActivityCSSMobile from '@stylesheets/mobile/writing-activity.module.scss'

import useDeviceDetection from '@hooks/common/useDeviceDetection'
type RevisionReportProps = {
  revisionReportImageUrl: string
}

const isMobile = useDeviceDetection()

const style = isMobile ? writingActivityCSSMobile : writingActivityCSS

export default function RevisionReport({
    revisionReportImageUrl,
}: RevisionReportProps) {
  return (
    <div className={style.revisionReport}>
        <img src={revisionReportImageUrl} alt="" />
    </div>
  )
}
