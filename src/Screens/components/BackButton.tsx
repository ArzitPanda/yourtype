// BackButton.jsx
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react"; // You can replace with any icon you like

export default function BackButton({ label = "Back", to = -1 }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="absolute top-7  leading-5 flex items-center bg-white text-black   gap-2 px-3 py-1.5 rounded-full  hover:text-white text-sm hover:bg-transparent cursor-pointer transition-colors duration-200"
    >
      <ArrowLeft size={16} />
 
    </button>
  );
}
