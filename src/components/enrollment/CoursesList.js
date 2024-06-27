import H2 from '../H2';
import Card from '../Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

function CoursesList({ title, data, itemcount = false }) {
    const slidesToShow = itemcount ? 1 : 3;

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: '#1A468C', color: 'black', borderRadius: '50%' }} // Change color here
                onClick={onClick}
            />
        );
    }

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: '#1A468C', color: 'black', borderRadius: '50%' }} // Change color here
                onClick={onClick}
            />
        );
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    };

    return (
        <div className='basis-full px-8'>
            <div className='basis-full flex justify-center'>
                <H2 value={title} className="mb-6 text-lg " />
            </div>

            <Slider {...settings}>
                {
                    data.map((data) => (
                        <Link href={`/enrollment/${data.courseid}`} key={data.courseid} >
                            <Card title={data.coursecode} description={data.mode?.modeofdelivery} />
                        </Link>
                    ))
                }
            </Slider>

        </div>
    )
}

export default CoursesList