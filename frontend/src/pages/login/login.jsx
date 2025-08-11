//? Styles -----------------------------------------------------
import styles from "./LogIn.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//? login --------------------------------------------------
export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  return (
    <section className={styles.login_page}>
      <h1>Login Page</h1>
      <form
        onSubmit={handleSubmit((data) => {
          navigate("/select");
        })}
      >
        <fieldset>
          <legend>Email</legend>
          <input
            {...register("mail", { required: false })}
            type="mail"
            id="mail"
            placeholder="dnd123@mail.com"
            // required
          />
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <input
            {...register("password", { required: false })}
            type="password"
            id="password"
            placeholder="enter a password"
            // required
          />
        </fieldset>
        <button value="submit">log in</button>
      </form>
    </section>
  );
}
