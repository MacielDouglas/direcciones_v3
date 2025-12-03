import { GpsPinIcon } from "@/components/icons/icons";
import LoginButton from "@/components/LoginButton/loginButton";

export default function LoginPage() {
  return (
    <div
      className="w-full h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/street.webp')" }}
    >
      <div className="max-w-md h-[600px] w-full p-10 m-4 sm:m-0 flex flex-col justify-evenly bg-neutral-200/70 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Bienvenido a{" "}
          <span className="text-bold text-5xl text-orange-500">
            Direcciones
          </span>
        </h1>
        <div className="flex justify-center">
          <GpsPinIcon />
        </div>
        <p className="mb-6 text-lg">
          Para comenzar, inicie sessión con su cuenta{" "}
          <span className="font-semibold">Google</span>
        </p>
        <LoginButton />
      </div>
    </div>
  );
}
