import * as Yup from "yup"
export const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password should contain atleast 8 charaters').required('Required').matches(/[0-9]/, "Password must contain a number").matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one capital letter
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'), // At least one special character,
})
export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password should contain atleast 8 charaters').required('Required').matches(/[0-9]/, "Password must contain a number").matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one capital letter
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'), // At least one special character,
})