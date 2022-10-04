import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Formik, Form,  Field, ErrorMessage} from 'formik'
import axios from 'axios'
import swal from 'sweetalert'

import { fetchAllFoods, fetchAllDiets } from "../../../Redux/thunks/foodsThunks";

import style from './CreateFood.module.scss'


const CreateFood = () => {
    const [send, setSend] = useState(false);
    const dispatch = useDispatch()
    let navigate = useNavigate()  

    const { diets } = useSelector((state) => state.foods)

    useEffect(() => {
        if(diets.length === 0){
            dispatch(fetchAllDiets())
        }
    }, [dispatch, diets])


    return(
        <div className={style.container}>
            { diets ?  
        <div className={style.formulario}>
            <section>
                <Formik 
                    initialValues={{
                        title:"",
                        image:"", 
                        price:'', 
                        diets:'',
                        used:false,
                        description:''
                    }}
                    validate={(values) =>{
                        let errors ={};
                        //validacion nombre del plato  
                        if(!values.title){
                            errors.title = 'Please write the food name'
                        }else if(values.title.length < 3 || values.title.length > 40){
                            errors.title = 'Food title must have between 3 or 20 characters'
                        }

                        
                        
                      
                        //validacion dietas
                        if(!values.diets){
                            errors.diets = 'Please select the diet of the food'
                        }else if(values.diets === 'Diet'){
                            errors.diets = 'Please select the diet of the food'
                        }

                        

                        //validacion imagen
                        if(!values.image){
                            errors.image = 'Please enter the food image'
                        }
                    
                        //validacion precio  
                        if(!values.price){
                            errors.price = 'Please write the food price'
                        }else if(values.price < 0){
                            errors.price = 'The price must be possitive'
                        }

                        
                        
                        


                        return errors;
                    }}
                    onSubmit={(values, {resetForm})=>{
                        console.log(values)
                        console.log(values.file)
                        
                        
                        // console.log(imgC)
                        // console.log(values.file)

                        if(values.used === 'true'){
                            values.used = true
                        }else if(values.used === 'false'){
                            values.used = false
                        }
                        resetForm();
                        axios.post(`/foods/`, values)
                        swal({
                            title:'Congratulation',
                            text:'Food added successfully',
                            icon:'success',
                            button:'OK'
                          }).then(res => {
                            if(res){
                              dispatch(fetchAllFoods());
                              navigate('/')
                            }
                          })

                        resetForm();
                        // setSend(true)
                        // setTimeout(() => setSend(false), 3000)
                        console.log(values)

                        
         
                    }}
                >
                    {( {errors , setFieldValue, values} )=>(
                        <Form className={style.form}> 
                        <h2>Post new food</h2>
                        <div>
                            <label htmlFor="title">Food Name: </label>
                            <Field
                            type='text'
                            id="title"
                            placeholder="Type a name..."
                            name="title"
                            />
                            <ErrorMessage name="title" component={()=>(
                                <div className={style.error}>{errors.title}</div>
                            )} />
                        </div>
                        <div>
                            <label htmlFor="diet">Diet: </label>
                            <Field id="diets"  name="diets" as='select' className={style.select}>
                            <option value='Diet' selected> Diet </option>  
                            {
                                diets.map(diet=>{
                                    return (
                                        <option value={diet}>{diet}</option>
                                        )
                                    })
                                }
                             </Field>    
                            <ErrorMessage name="diets" component={()=>(
                                <div className={style.error}>{errors.diets}</div>
                            )} />
                        </div>
                        <div>
                            <label htmlFor="img">Image: </label>
                           
                        
                                <>
                                <img src={values.image}  
                                alt='imgFood'
                                onerror="this.src='../../assets/imgs/example.jpg';" className={style.portada}></img>
                                <Field
                                type="file"
                                id="image"
                                value =""
                                name="image"
                                // onChange ={(event) => setFieldValue("file", event.target.files[0])}
                                onChange ={(event) => {
                                    const formData = new FormData()
                                    // console.log(event)
                                    // console.log(event.target.files[0])
                                    formData.append("file", event.target.files[0])
                                    formData.append("upload_preset", "op9ii2j6")
                                    //console.log(formData)
                                    axios.post("https://api.cloudinary.com/v1_1/dlx7k9tef/image/upload", formData)
                                    .then((response) => {
                                    setFieldValue("image", response.data.url)
                                    // console.log(response)
                                    // console.log(response.data.url)
                                    }) 
                                     
                                }}
                            />
                            <ErrorMessage name="image" component={()=>(
                                <div className={style.error}>{errors.image}</div>
                            )} />
                            </>
                                
                

                        </div>
                        <div>
                            <label htmlFor="prc">Price: </label>
                            <Field
                                type="number"
                                id="prc"
                                placeholder="$9.50"
                                name="price"
                            />
                            <ErrorMessage name="price" component={()=>(
                                <div className={style.error}>{errors.price}</div>
                            )} />
                        </div>
                        
                        
                        <div>
                            <button type="submit">  Create </button>
                            {send && <p>Product added succecsfully</p>}
                        </div>  
                    </Form>
                    )}
                </Formik>
            </section>
        </div>:
        <div>
              <h1>Cargando</h1>
          </div>
          }
        </div>
    )

}


export default CreateFood