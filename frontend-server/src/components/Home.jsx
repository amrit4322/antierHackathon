// import styled from 'styled-components';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';
// import { sliderImages } from '../utils/images';
// import Product from './Product';
// import ImageSlider from './ImageSlider';
import Product from './Product';
import ImageSlider from './Slider';



const Home = () => {
  return (
    <div >
      
      {/* Other content */}
      <ImageSlider />
      <Product/>
      {/* Other content */}
    </div>
  );
};

export default Home;
