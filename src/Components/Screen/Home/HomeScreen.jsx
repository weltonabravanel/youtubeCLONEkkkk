import React, { useEffect } from 'react'
import './HomeScreen.scss'
import { Col } from 'react-bootstrap'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import Video from '../../Video/Video'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosByCategory } from '../../../Redux/Actions/video.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeletonVideo from '../../Skeletons/SkeletonVideo'

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByCategory("All"));
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(state => state.homeVideos);

  const fetchData = () => {
    dispatch(getVideosByCategory(activeCategory));
    console.log(activeCategory)
  }

  return (
    <div>
      <CategoriesBar />
      <div>
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={true}
          next={fetchData}
          loader={
            <div className="d-flex w-100 justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
          className="video-container row"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {!loading ?
            videos.map((videos, index) => (
              <Col key={index}>
                <Video videos={videos} loading={loading} />
              </Col>
            )) :
            [...new Array(20)].map((element, index) => (
              <Col key={index}>
                <SkeletonVideo />
              </Col>
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home