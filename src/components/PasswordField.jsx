import { useState } from "react";

export default function PasswordField({ placeholder, register, name, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register(name)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* Eye / Eye-Off icons */}
      <img
        src={show ? "/assets/icons/eye-off.svg" : "/assets/icons/eye.svg"}
        alt="toggle password"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-3 w-5 h-5 cursor-pointer"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
