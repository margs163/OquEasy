import Image from "next/image";
import LoginForm from "../ui/LoginForm";
import LoginProviders from "../ui/LoginProviders";
import RegisterForm from "../ui/RegisterForm";

export default function Page() {
  return (
    <div className="shadow-xl grid grid-cols-[1.16fr_1.1fr] justify-items-stretch items-stretch w-[950px] mx-auto min-h-[600px] gap-0 my-auto">
      <div className="w-full rounded-l-lg col-start-1 col-end-1 flex justify-center items-center h-full">
        <Image
          src={"/11673.jpg"}
          width={400}
          height={400}
          className="rounded-l-xl w-full h-full object-cover"
          alt="students.png"
        />
      </div>
      <LoginForm className="h-full col-start-2 col-end-2">
        <LoginProviders>Or Sign Up Using</LoginProviders>
      </LoginForm>
    </div>
  );
}
