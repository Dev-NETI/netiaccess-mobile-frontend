import H2 from '../H2';
import Card from '../Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CoursesList({ title, data, itemcount = false }) {
    const slidesToShow = itemcount ? 1 : 3;
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className='w-full'>
                <H2 value={title} className="mb-6 text-xl" />
            </div>
            
                <Slider {...settings}>
                    {
                        data.map((data) => <Card title={data.coursecode} key={data.courseid} /> )
                    }
                </Slider>
                
        </>
    )
}

export default CoursesList