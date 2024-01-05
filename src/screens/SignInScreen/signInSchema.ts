import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha deve conter no mínimo 6 dígitos."),
});
