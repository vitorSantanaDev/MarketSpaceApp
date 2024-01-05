import * as yup from "yup";

export const signUpSchema = yup.object({
  name: yup.string().required("Informe um nome"),
  email: yup.string().required("Informe um e-mail.").email("E-mail inválido"),
  phone: yup
    .string()
    .required("Informe um telefone.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Telefone inválido"
    )
    .max(11, "Telefone inválido"),
  password: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
  password_confirmation: yup
    .string()
    .oneOf(["", yup.ref("password")], "As senhas devem ser iguais.")
    .required("Por favor, confirme sua senha."),
});
