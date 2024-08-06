import { useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import EBCSS from '@stylesheets/e-book.module.scss'

type PopupReviewProps = {
  onUpdateReviewInform: () => void
}

export default function PopupReview({
  onUpdateReviewInform,
}: PopupReviewProps) {
  const { bookInfo } = useContext(AppContext) as AppContextProps

  return (
    <div className={`${EBCSS.ebookRating}`}>
      <div className={`${EBCSS.container} animate__animated animate__zoomIn`}>
        <div className={EBCSS.groupBookcover}>
          <img
            className={EBCSS.imgBookcover}
            src={`${bookInfo.SurfaceImage}`}
          />
        </div>
        <div className={EBCSS.groupChoose}>
          <div className={EBCSS.txtQuestion}>Let's start the study review.</div>

          <div className={EBCSS.groupConfirm}>
            <button
              className={`${EBCSS.btnConfirm} ${EBCSS.blue}`}
              onClick={() => {
                onUpdateReviewInform()
              }}
            >
              Go!
            </button>
          </div>
        </div>
        <div className={EBCSS.groupComment}>
          <span className={EBCSS.icoExclamationMark}></span>
          <span className={EBCSS.txtComment}>
            다시 보기 모드에서는 학습을 완료해도 포인트가 제공되지 않아요.
          </span>
        </div>
      </div>
    </div>
  )
}
