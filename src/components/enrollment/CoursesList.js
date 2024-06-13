import H2 from '../H2';
import Card from '../Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

function CoursesList({ title, data, itemcount = false }) {
    const slidesToShow = itemcount ? 1 : 3;
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className='w-full'>
                <H2 value={title} className="mb-6 text-lg" />
            </div>

            <Slider {...settings}>
                {
                    data.map((data) => (
                        <Link href={`/enrollment/${data.courseid}`} key={data.courseid} >
                            <Card title={data.coursecode}   />
                        </Link>
                    ))
                }
            </Slider>

        </>
    )
}

export default CoursesList