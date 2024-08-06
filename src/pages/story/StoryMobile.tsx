import { useEffect, useState, useContext } from 'react'
import { AppContext, AppContextProps } from '@contexts/AppContext'

import { saveBookMark } from '@services/storyApi'
import { StoryMobileProps } from '@interfaces/IStory'

import useStoryAudioMobile from '@hooks/story/useStoryAudioMobile'

import StorySideMenu from '@components/story/common/StorySideMenu'
import StoryBodyMobile from '@components/story/mobile/StoryBodyMobile'
import StoryPage from '@components/story/common/StoryPage'
import StoryBottomMenuMobile from '@components/story/mobile/StoryBottomMenuMobile'
import EBookVocaNote from '@components/story/EBookVocaNote'

export default function StoryMoblie({
  isRatingShow,
  isMovieShow,
  storyData,
  changeRatingShow,
  toggleMovieShow,
}: StoryMobileProps) {
  const { bookInfo, studyInfo, handler } = useContext(
    AppContext,
  ) as AppContextProps

  /**
   * 헤더 메뉴 클릭하는 기능
   */
  const changeSideMenu = (state: boolean) => {
    setSideOpen(state)
  }

  // audio
  const {
    pageNumber,
    playState,
    pageSeq,
    currentTime,
    readCnt,
    playAudio,
    pauseAudio,
    pauseAudioByWord,
    resumeAudio,
    changePlaySpeed,
    changeDuration,
    changeVolume,
    changePageNumber,
    changeAutoNextPage,
  } = useStoryAudioMobile({
    studyId: studyInfo.studyId,
    studentHistoryId: studyInfo.studentHistoryId,
    pageData: storyData,
    storyMode: handler.storyMode,
    changeSideMenu: changeSideMenu,
    changeStoryMode: handler.changeStoryMode,
    changeReadingComplete: handler.changeReadingComplete,
  })

  // 좌측 하단 드랍다운 메뉴
  const [isAutoNextPage, setAutoNextPage] = useState(true)
  const [isTextShow, setIsText] = useState<boolean>(true)
  const [isMute, setIsMute] = useState<boolean>(false)
  const [isHighlight, setIsHighlight] = useState<boolean>(true)

  // 단어장
  const [isVocaOpen, setVocaOpen] = useState<boolean>(false)

  // 좌하단 3줄 메뉴
  const [isSideOpen, setSideOpen] = useState<boolean>(false)

  // 터치
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const progressWidth =
    (pageNumber / storyData[storyData.length - 1].Page) * 100

  useEffect(() => {
    if (
      studyInfo.bookmarkPage > 0 &&
      pageNumber === 1 &&
      handler.storyMode === 'Story' &&
      !handler.isReadingComplete &&
      Number(bookInfo.BookLevel.substring(0, 1)) > 1
    ) {
      const isMarkedRead = confirm('책갈피된 곳부터 읽으시겠습니까?')

      if (isMarkedRead) {
        changePageNumber(
          studyInfo.bookmarkPage % 2 === 0
            ? studyInfo.bookmarkPage - 1
            : studyInfo.bookmarkPage,
        )
      }
    }
  }, [])

  ///////////////////////
  // 모바일 핑거 스와이프
  //////////////////////
  useEffect(() => {
    if (touchStart - touchEnd > 5) {
      turnPageRight()
    } else if (touchStart - touchEnd < 0) {
      turnPageLeft()
    }
  }, [touchEnd])

  useEffect(() => {
    if (isRatingShow || isMovieShow) pauseAudio()

    if (!isRatingShow && !isMovieShow && playState === 'pause') resumeAudio()
  }, [isRatingShow, isMovieShow])

  /////////////////////////
  // eBook 페이지 넘기기 기능
  /////////////////////////
  const turnPageLeft = () => {
    if (pageNumber > 1) {
      setTimeout(() => {
        if (handler.storyMode === 'Story') changePageNumber(pageNumber - 1)
      }, 160)
    }
  }

  /////////////////////
  // 오디오 음소거
  ////////////////////
  useEffect(() => {
    changeVolume(isMute ? 0 : 1)
  }, [isMute])

  const turnPageRight = () => {
    if (pageNumber + 1 <= storyData[storyData.length - 1].Page) {
      setTimeout(() => {
        if (handler.storyMode === 'Story') changePageNumber(pageNumber + 1)
      }, 160)
    }
  }

  const onTouchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const x = e.changedTouches[0].pageX

    setTouchStart(x)
  }

  const onTouchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const x = e.changedTouches[0].pageX

    setTouchEnd(x)
  }

  /**
   * 문장 클릭한 경우
   * @param pageNumber 페이지 번호
   * @param sequence  재생 중인 문장
   */
  const clickSentence = (pageNumber: number, sequence: number) => {
    if (handler.storyMode === 'Story') changeDuration(pageNumber, sequence)
  }

  // 좌측 하단 읽기 모드
  const changeTextShow = (isShow: boolean) => {
    setIsText(isShow)
  }

  const changeMuteAudio = (isMute: boolean) => {
    setIsMute(isMute)
  }

  const changeHighlight = (isHighlight: boolean) => {
    setIsHighlight(isHighlight)
  }

  const changeAutoNext = (isAuto: boolean) => {
    setAutoNextPage(isAuto)
    changeAutoNextPage(isAuto)
  }
  // 좌측 하단 읽기 모드 메뉴 end

  /**
   * 단어장
   */
  const changeVocaOpen = (state: boolean) => {
    setVocaOpen(state)
  }

  /**
   * 책갈피 저장
   */

  /**
   * 책갈피 저장
   */
  const submitBookMark = async () => {
    const isBookMarking = Number(bookInfo.BookLevel.substring(0, 1)) > 1

    if (isBookMarking) {
      const result = await saveBookMark(
        studyInfo.studyId,
        studyInfo.studentHistoryId,
        pageNumber,
      )

      if (result.success) {
        try {
          window.onExitStudy()
        } catch (e) {
          location.replace('/')
        }
      } else {
        alert(
          '책갈피 저장에 실패했습니다. 본사로 문의해주시기 바랍니다 1599-0533',
        )

        try {
          window.onExitStudy()
        } catch (e) {
          location.replace('/')
        }
      }
    } else {
      try {
        window.onExitStudy()
      } catch (e) {
        location.replace('/')
      }
    }
  }

  return (
    <>
      <StoryBodyMobile
        onTouchStartHandler={onTouchStartHandler}
        onTouchEndHandler={onTouchEndHandler}
      >
        <StoryPage
          isTextShow={isTextShow}
          pageSeq={pageSeq}
          pageNumber={pageNumber}
          storyData={storyData}
          currentTime={currentTime}
          readCnt={readCnt}
          isHighlight={isHighlight}
          clickSentence={clickSentence}
        />
      </StoryBodyMobile>

      {/* 모바일 하단 메뉴 */}
      <StoryBottomMenuMobile
        progressWidth={progressWidth}
        isAutoNextPage={isAutoNextPage}
        pageSeq={pageSeq}
        playState={playState}
        turnPageLeft={turnPageLeft}
        turnPageRight={turnPageRight}
        changeTextShow={changeTextShow}
        changeMuteAudio={changeMuteAudio}
        changeHighlight={changeHighlight}
        changePlaySpeed={changePlaySpeed}
        changeAutoNext={changeAutoNext}
        playAudio={playAudio}
        pauseAudio={pauseAudio}
        resumeAudio={resumeAudio}
        changeVocaOpen={changeVocaOpen}
        changeSideMenu={changeSideMenu}
      />

      {/* 사이드 메뉴 */}
      <StorySideMenu
        isSideOpen={isSideOpen}
        changeSideMenu={changeSideMenu}
        changeRatingShow={changeRatingShow}
        toggleMovieShow={toggleMovieShow}
        submitBookMark={submitBookMark}
      />

      {/* 단어장 */}
      <EBookVocaNote
        isVocaOpen={isVocaOpen}
        playState={playState}
        changeVocaOpen={changeVocaOpen}
        pauseStoryAudio={pauseAudioByWord}
        resumeStoryAudio={resumeAudio}
      />
    </>
  )
}
