export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-3 text-gray-400 text-sm">{text}</p>
    </div>
  );
}