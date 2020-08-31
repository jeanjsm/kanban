import { required, email } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "O campo é obrigatório"
});

extend("email", {
  ...email,
  message: "O campo deve conter um email válido"
});
