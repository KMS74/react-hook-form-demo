import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./LoginForm.module.css";

type FormFields = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="person@example.com"
          id="email"
          {...register("email")}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
