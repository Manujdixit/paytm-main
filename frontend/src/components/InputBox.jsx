export function InputBox({ label, placeholder, onChange }) {
  return (
    <>
      <div className="text-sm font-medium text-left pt-2 pb-1">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md w-full px-2 py-1 mb-2"
      />
    </>
  );
}
