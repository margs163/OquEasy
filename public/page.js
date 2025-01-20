import RegisterForm from "../components/RegisterForm";
import LoginProviders from "../components/LoginProviders";

export default function page() {
  return (
    <div className="bg-img h-screen flex justify-center items-center">
      <RegisterForm>
        <LoginProviders>Or Sign Up Using</LoginProviders>
      </RegisterForm>
    </div>
  );
}
