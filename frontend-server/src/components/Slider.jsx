import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { sliderImages } from '../utils/images';


const ImageSlider = () => {
  // reference link for settings: https://kenwheeler.github.io/slick/
  const settings = {
    className: "center",
    arrows: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 900,
    autoplay: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 442,
        settings: {
          slidesToShow: 1,
          dots: false
        }
      },
      
    ]
  };

  return (
    <ImageSliderWrapper className='section'>
      <Slider { ...settings } className='game-slider'>
        {
          sliderImages.map((image, idx) => (
            <div className='slider-item img-fit-cover' key = { idx }>
              <img src = { image }   style={{ height: '200px', width: '220px' }} className='slider-item-img' />
            </div>
          ))
        }
      </Slider>
      
    </ImageSliderWrapper>
   
  )
}

export default ImageSlider;

const ImageSliderWrapper = styled.div`
  
  

  .game-slider{
    .slider-item{
      
      padding: 10px 0;
      outline: 0;

      img{
        border: 6px solid var(--clr-pink-normal);
        
        transition: all 1s ease;
      }
    }

    .slick-list{
      padding-top: 80px!important;
      padding-bottom: 80px!important;
    }

    .slick-dots{
      li{
        height: 10px;
        width: 60px;
        button{
          &::before{
            width: 100%!important;
            height: 100%!important;
            border: 2px solid var(--clr-pink-normal);
            color: unset;
            transition: var(--transition-default);
          }
        }

        &.slick-active{
          background-color: var(--clr-pink-normal);
        }
      }
    }

    .slick-center{
      transform: scale(1.5);
    }

    .slick-prev{
      position: absolute;
      left: 16px!important;
      z-index: 5;
      transform: scale(1);
    }

    .slick-next{
      position: absolute;
      right: 16px!important;
      z-index: 5;
      transform: scale(1);
    }
  }
`;
