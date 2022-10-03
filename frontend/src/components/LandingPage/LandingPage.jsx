import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import './LandingPage.scss'
import restaurant from '../../assets/restaurant.jpg'
import { jarallax, jarallaxElement} from 'jarallax'
import './Jarallax.css'

const LandingPage = () => {

    const navigate = useNavigate()

    useEffect(() => {

    jarallaxElement();

    jarallax(document.querySelectorAll("[data-jarallax-element]"));

    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.5,
      });

    }, [jarallaxElement])

    

    return(
        <div className='body1' onClick={()=>navigate('/restaurantes')}>
            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 -200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant} className="jarallax-img"/>
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
                            <img src={restaurant} className="jarallax-img"/>
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
                            <img src={restaurant} className="jarallax-img"/>
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
                            <img src={restaurant} className="jarallax-img"/>
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quas ducimus itaque? Quam suscipit illum labore nihil quod molestias eius unde nemo ratione fuga fugiat hic, incidunt quibusdam earum fugit.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage