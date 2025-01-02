
import Feature from '../../Components/HomeComponents/Feature';
import Progress from '../../Components/HomeComponents/Progress';
import Testimonials from '../../Components/HomeComponents/Testimonials';
import CommunityAchivment from '../../Components/HomeComponents/CommunityAchivment';
import CalltoAction from '../../Components/HomeComponents/CalltoAction';
import ChangeHabits from '../../Components/HomeComponents/ChangeHabits';
import Banner from '../../Components/HomeComponents/Banner';

const HomePage = () => {

  return (
    <div className="min-h-screen bg-black text-white">
      <Banner/>
      <Feature />
      <ChangeHabits/>
      <Progress /> 
      <CommunityAchivment/>
      <Testimonials />
      <CalltoAction/>
    </div>
  );
};

export default HomePage;