import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./LoginForm.module.css";

// Define the schema validation for the form
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Infer the type from the schema
type FormFields = z.infer<typeof schema>;

const LoginForm = () => {
  // React hook form
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "person@example.com",
    },
    // Use zod resolver to validate the form fields with the schema
    resolver: zodResolver(schema),
  });

  // Submit handler
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error();
      console.log(data);
      // Reset the form
      reset();
    } catch (error) {
      setError("root", {
        message: "This email is already taken. Please try another one.",
      });
    }
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
        {errors.email && (
          <small className={classes.textError}>{errors.email.message}</small>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <small className={classes.textError}>{errors.password.message}</small>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && (
        <small className={classes.textError}>{errors.root.message}</small>
      )}
    </form>
  );
};

export default LoginForm;
