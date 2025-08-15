const AuthButton = ({ text, w }) => {
  return (
    <button
      type="submit"
      className={`${w} px-4 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
