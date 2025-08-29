export default function InputField({ type = "text", placeholder, register, name, error }) {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
  