//? Styles -----------------------------------------------------
import styles from "./LogIn.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//? Hooks ------------------------------------------------------
import useAuth from "../../hooks/auth/useAuth";

//? login --------------------------------------------------
export default function Login() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { signIn, token } = useAuth();

  token && navigate("/select");

  return (
    <section className={styles.login_page}>
      <h1>Login Page</h1>
      <form
        onSubmit={handleSubmit((data) => {
          signIn(data);
          setValue("email", "");
          setValue("password", "");
        })}
      >
        <fieldset>
          <legend>Email</legend>
          <input
            {...register("email", { required: true })}
            type="mail"
            id="email"
            placeholder="dnd123@mail.com"
            required
          />
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            placeholder="enter a password"
            required
          />
        </fieldset>
        <button value="submit">log in</button>
      </form>
    </section>
  );
}
