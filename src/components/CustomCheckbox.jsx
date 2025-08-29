export default function CustomCheckbox({ label, register, name, error }) {
    return (
      <div>
        <label className="flex items-center cursor-pointer select-none">
          {/* Hidden real input */}
          <input
            type="checkbox"
            {...register(name)}
            className="hidden peer"
          />
  
          {/* Custom box */}
          <div className="w-5 h-5 border rounded flex items-center justify-center mr-2 peer-checked:bg-red-500">
            {/* Show check icon only if checked */}
            <img
              src="/assets/icons/check.svg"
              alt="checked"
              className="w-4 h-4 hidden peer-checked:block"
            />
          </div>
  
          {/* Label text */}
          <span className="text-sm">{label}</span>
        </label>
  
        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
  