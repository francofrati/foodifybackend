import * as yup from "yup";


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const nameRules =  /^[a-zA-Z\s]*$/; 

export const registrationSchema = yup.object().shape({
    email: yup.string().email("Email invalido").required("Requerido"),
    password: yup
      .string()
      .min(6,'La contraseña debe ser de 6 o mas caracteres')
      .matches(passwordRules,'La contraseña debe contener una minuscula, una mayuscula y un numero')
      .required('Requerido'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Requerido"),
      name:yup
      .string()
      .min(3)
      .matches(nameRules,'Solo se pueden usar letras')
      .required('Requerido')
  });