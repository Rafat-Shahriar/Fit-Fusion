import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import SharedTitle from "../Shared/SharedTitle";

const Testimonials = () => {
    const testimonials = [
        { name: "Sarah J.", text: "This app completely transformed my fitness journey. Down 20 pounds and feeling stronger than ever!", avatar: "https://i.ibb.co.com/g9jSnjJ/premium-photo-1671656349218-5218.png" },
        { name: "Mike R.", text: "The workout planning feature is amazing. I've never been more consistent with my training.", avatar: "https://i.ibb.co.com/98r6dwc/premium-photo-1670884441012-c5cf.png" },
        { name: "Emily K.", text: "The daily reminders keep me on track. It's a game-changer for busy schedules.", avatar: "https://i.ibb.co.com/y4bcgKy/photo-1494790108377-be9c29b29330.png" },
        { name: "Sarah J.", text: "This app completely transformed my fitness journey. Down 20 pounds and feeling stronger than ever!", avatar: "https://i.ibb.co.com/g9jSnjJ/premium-photo-1671656349218-5218.png" },
        { name: "Mike R.", text: "The workout planning feature is amazing. I've never been more consistent with my training.", avatar: "https://i.ibb.co.com/98r6dwc/premium-photo-1670884441012-c5cf.png" },
        { name: "Emily K.", text: "The daily reminders keep me on track. It's a game-changer for busy schedules.", avatar: "https://i.ibb.co.com/y4bcgKy/photo-1494790108377-be9c29b29330.png" }
    ];

    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <SharedTitle heading="Success Stories" />
                
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000, 
                        disableOnInteraction: false, 
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                    modules={[Pagination, Autoplay]} 
                    className="testimonial-slider"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-gray-900 p-6 rounded-xl border border-red-500/20">
                                <div className="flex items-center mb-4">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" />
                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                </div>
                                <p className="text-gray-400">{testimonial.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
