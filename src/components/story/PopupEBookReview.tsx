import { useContext, useState } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'
import { useTranslation, Trans } from 'react-i18next'
import { submitPreference } from '@services/storyApi'

import EBCSS from '@stylesheets/e-book.module.scss'

type PopupEBookReviewProps = {
  changeRatingShow: (state: boolean) => void
}

import ChooseRating from './ChooseRating'

export default function PopupEBookReview({
  changeRatingShow,
}: PopupEBookReviewProps) {
  const { t } = useTranslation()
  const { bookInfo, studyInfo, handler } = useContext(
    AppContext,
  ) as AppContextProps

  const [starCount, setStarCount] = useState(3)

  const changeStarCount = (count: number) => {
    setStarCount(count)
  }

  const doPreference = async () => {
    const res = await submitPreference(
      studyInfo.studyId,
      studyInfo.studentHistoryId,
      starCount * 10,
    )

    if (res.success) {
      handler.changeView('quiz')
    }
  }

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
          <div className={EBCSS.txtQuestion}>How do you like this book?</div>
          <div className={EBCSS.groupChooseRating}>
            <ChooseRating
              starCount={starCount}
              changeStarCount={changeStarCount}
            />
          </div>
          <div className={EBCSS.groupConfirm}>
            <button
              className={`${EBCSS.btnConfirm} ${EBCSS.gray}`}
              onClick={() => {
                changeRatingShow(false)
              }}
            >
              {t('story.다시 읽기')}
            </button>
            <button
              className={`${EBCSS.btnConfirm} ${EBCSS.blue}`}
              onClick={() => {
                if (handler.isPreference) {
                  handler.changeView('quiz')
                } else {
                  doPreference()
                }
              }}
            >
              {t('story.퀴즈 풀기')}
            </button>
          </div>
        </div>
        <div className={EBCSS.groupComment}>
          <span className={EBCSS.icoExclamationMark}></span>
          <span className={EBCSS.txtComment}>
            <Trans
              i18nKey="story.모든 학습을 완료하고 평균 70점을 넘어야 포인트를 획득 할 수 있습니다."
              components={{ b: <b /> }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
