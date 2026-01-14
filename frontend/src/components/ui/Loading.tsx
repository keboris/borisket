import { useLanguage, useTheme } from "../../contexts";

const Loading = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const text = theme === "dark" ? "text-white" : "text-black";

  return (
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-base-200
    "
    >
      <div className="text-center">
        <div
          className="
          animate-spin rounded-full h-12 w-12 mx-auto
          border-b-2
          border-blue-600 dark:border-blue-400
        "
        ></div>

        <p
          className={`
          ${text}
          mt-4
        `}
        >
          {t("loading")}
        </p>
      </div>
    </div>
  );
};

export default Loading;
