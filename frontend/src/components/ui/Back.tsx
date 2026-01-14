import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "../../contexts";

const Back = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.07 }}
      onClick={() => navigate(-1)}
      className="
                  group relative
                  bg-base-100 rounded-2xl
                  flex flex-col items-center justify-center
                  p-4 text-center
                  cursor-pointer
                  transition-all duration-300
                  shadow-md hover:shadow-2xl shadow-gray-500/40
                  font-medium hover:font-bold
                "
    >
      {/* HALO */}
      <div
        className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    blur-xl shadow-gray-500/40"
      />

      {/* ICON */}
      <div className="w-8 h-8 mb-2 relative z-10 text-gray-500">
        <ArrowLeft />
      </div>

      {/* LABEL */}
      <span className="text-sm relative z-10">{t("back")}</span>
    </motion.button>
  );
};

export default Back;
