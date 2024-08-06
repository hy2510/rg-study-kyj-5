import { ReactElement, useContext, useEffect, useState } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import QuizContainer from './QuizContainer'
import PopupPBookRating from '@components/story/PopupPBookRating'

const PBookContainer: React.FC<{}> = (s) => {
  const { handler } = useContext(AppContext) as AppContextProps

  // 컴포넌트 생성
  let component: ReactElement

  if (handler.isPreference) {
    component = <QuizContainer />
  } else {
    component = <PopupPBookRating />
  }

  return component
}
export default PBookContainer
