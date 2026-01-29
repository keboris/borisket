import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "../../contexts";

const Back = ({ backPath }: { backPath: string }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.07 }}
      onClick={() => navigate(backPath)}
      className="
        group relative
        bg-base-100 rounded-2xl
        flex flex-col items-center justify-center
        p-4 text-center
        cursor-pointer w-full
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
      <span
        className="text-xs sm:text-sm
          whitespace-nowrap
          overflow-hidden
          text-ellipsis
          relative z-10
          max-w-full
        "
      >
        {t("back")}
      </span>
    </motion.button>
  );
};

export default Back;
