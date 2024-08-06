import { useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import EBCSS from '@stylesheets/e-book.module.scss'

export default function PopupEBookDecreasePoint() {
  const { bookInfo, handler } = useContext(AppContext) as AppContextProps

  return (
    <div className={`${EBCSS.ebookRating}`}>
      <div className={`${EBCSS.container} animate__animated animate__zoomIn`}>
        <div className={EBCSS.groupBookcover}>
          <img
            className={EBCSS.imgBookcover}
            src={`${bookInfo.SurfaceImage}`}
          />
        </div>
        <div className={EBCSS.groupComment}>
          <span className={EBCSS.txtComment}>
            <div>
              이미 한번 <b>포인트를 획득한 학습</b>입니다.
            </div>
            <div>두번째 학습을 통과하여도 50% 포인트만 획득할 수 있습니다.</div>
            <div>계속 학습하시겠습니까?</div>
          </span>
        </div>

        <div className={EBCSS.groupChoose}>
          <div className={EBCSS.groupConfirm}>
            <button
              className={`${EBCSS.btnConfirm} ${EBCSS.blue}`}
              onClick={() => {
                handler.changeView('quiz')
              }}
            >
              네
            </button>
            <button
              className={`${EBCSS.btnConfirm} ${EBCSS.gray}`}
              onClick={() => {
                try {
                  window.onExitStudy()
                } catch (e) {
                  location.replace('/')
                }
              }}
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
