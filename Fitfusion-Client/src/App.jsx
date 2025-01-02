import { Outlet } from "react-router-dom";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";


const App = () => {
  return (
    <div className="bg-gray-900 text-white font-inter">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet></Outlet>
      </main>
      <Footer/>
    </div>
  );
};
export default App;
