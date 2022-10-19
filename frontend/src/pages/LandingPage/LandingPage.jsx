import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jarallax, jarallaxElement } from 'jarallax'
import Footer from '../Footer/Footer.jsx'
import restaurant from '../../assets/restaurant.jpg'
import './LandingPage.scss'
import './Jarallax.css'
import HeaderLandingPage from "./HeaderLandingPage.jsx"
import {Slideshow, Slide, TextoSlide} from '../../components/Slider/Slider'

const LandingPage = () => {

    const navigate = useNavigate()

    useEffect(() => {

        jarallaxElement();

        jarallax(document.querySelectorAll("[data-jarallax-element]"));

        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5,
        });

    }, [])



    return (
        <div>
        < HeaderLandingPage/>
        <div className="slidermargin">
                <Slideshow controles={true} autoplay={true} velocidad="6000" intervalo="5000">
				<Slide>
					
						<img src={restaurant} alt=""/>
					
					<TextoSlide>
					{/* <TextoSlide colorFondo="navy"> */}
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
				<Slide>
					
						<img src={restaurant} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
                <Slide>
					
						<img src={restaurant} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
                <Slide>
					
						<img src={restaurant} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
			</Slideshow>
                </div>
        <div className='body1' onClick={() => navigate('/restaurantes')}>
            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 -200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas ducimus itaque? Quam suscipit illum labore nihil quod molestias eius unde nemo ratione fuga fugiat hic, incidunt quibusdam earum fugit.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas ducimus itaque? Quam suscipit illum labore nihil quod molestias eius unde nemo ratione fuga fugiat hic, incidunt quibusdam earum fugit.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 -200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas ducimus itaque? Quam suscipit illum labore nihil quod molestias eius unde nemo ratione fuga fugiat hic, incidunt quibusdam earum fugit.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas ducimus itaque? Quam suscipit illum labore nihil quod molestias eius unde nemo ratione fuga fugiat hic, incidunt quibusdam earum fugit.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer />
        </div>
    )
}

export default LandingPage