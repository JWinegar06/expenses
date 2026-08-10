import React, { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const { googleLoginHandler } = useContext(authContext);

  return (
    <main className="container mx-auto max-w-2xl px-6 py-10">
      <section className="ff-panel overflow-hidden">
        <div className="relative min-h-52 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(111,183,255,.24),transparent_60%),linear-gradient(145deg,#101b2d,#05080e)] p-8 text-center">
          <div className="absolute inset-5 border border-sky-200/10" />
          <div className="relative z-10 flex min-h-40 flex-col items-center justify-center">
            <p className="ff-kicker text-xs">Crown City of Insomnia</p>
            <h1 className="ff-title mt-3 text-4xl font-light sm:text-5xl">
              Royal Treasury
            </h1>
            <div className="ff-divider my-5 w-48" />
            <p className="max-w-md text-sm leading-6 text-slate-400">
              Secure access to your personal gil, income records, and
              expenditure archives.
            </p>
          </div>
        </div>

        <div className="p-6 text-center sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Authentication Required
          </p>
          <button
            onClick={googleLoginHandler}
            className="mx-auto mt-5 flex items-center gap-3 rounded-md border border-sky-200/20 bg-slate-950/60 px-5 py-3 text-sm font-medium text-slate-100 hover:border-sky-300/50"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
        </div>
      </section>
    </main>
  );
}

export default SignIn;
