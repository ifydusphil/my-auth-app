export default function Button({ children, loading }) {
    return (
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
      >
        {loading ? "Please wait..." : children}
      </button>
    );
  }
  