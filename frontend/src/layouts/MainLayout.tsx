import { TopBar } from "../components";
import { Layout } from "../pages";

const MainLayout = () => {
  return (
    <section className="min-h-screen bg-base-200 relative overflow-hidden">
      <TopBar />

      <Layout />
    </section>
  );
};

export default MainLayout;
