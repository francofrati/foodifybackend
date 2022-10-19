import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jarallax, jarallaxElement } from 'jarallax'

import restaurant from '../../assets/restaurant.jpg'
import './LandingPage.scss'
import './Jarallax.css'
import { useDispatch, useSelector } from "react-redux"
import { fetchCreds } from "../../Redux/thunks/userThunks"

const LandingPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {

        if (user) {
            if (user.type === 'restaurant') navigate('/negocios')
        } else {
            const token = window.localStorage.getItem('token')
            if (token) {
                dispatch(fetchCreds(token))
            }
        }
    }, [user])

    useEffect(()=>{
        if(user && user.type==='restaurant')navigate('/negocios')
    },[user])

    useEffect(() => {

        jarallaxElement();

        jarallax(document.querySelectorAll("[data-jarallax-element]"));

        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5,
        });

    }, [])



    return (
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
    )
}

export default LandingPage