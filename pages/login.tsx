import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="flex relative md:bg-transparent bg-black h-screen w-screen md:items-center md:justify-center">
      <Head>
        <title>Nextflix - Login</title>
        <link rel="icon" href="https://rb.gy/ulxxee" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24	md:max-w-md md:px-14 space-y-8 rounded bg-black/75 py-10 px-5 md:mt-0"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="form-input"
            />
            {errors.email && (
              <span className="text-orange-500 p-1 font-light text-[15px]">
                This field is required
              </span>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="form-input"
            />
            {errors.password && (
              <span className="text-orange-500 p-1 font-light text-[15px]">
                This field is required
              </span>
            )}
          </label>
        </div>
        <button
          onClick={() => setLogin(true)}
          className="bg-[#E50914] w-full p-3 rounded"
        >
          Sign In
        </button>
        <div className="space-x-3">
          <span className="text-[gray]">New to Netflix?</span>
          <button
            onClick={() => setLogin(false)}
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
