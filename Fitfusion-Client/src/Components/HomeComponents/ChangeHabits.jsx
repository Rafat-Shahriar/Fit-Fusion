import SharedTitle from "../Shared/SharedTitle";


const ChangeHabits = () => {
  const habits = [
    { image: 'https://i.ibb.co.com/x7vtswy/image2.png', title: 'Movement', description: 'We believe fitness should be accessible to everyone' },
    { image: 'https://i.ibb.co.com/PFWp3y2/image3.png', title: 'Time', description: 'We believe fitness should be accessible to everyone' },
    { image: 'https://i.ibb.co.com/bXydZdF/image4.png', title: 'Practice', description: 'We believe fitness should be accessible to everyone' },
    { image: 'https://i.ibb.co.com/THXV5Br/image5.png', title: 'Weight Loss', description: 'We believe fitness should be accessible to everyone' },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <SharedTitle heading="Change Your Habits"/>     
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {habits.map((habit, index) => (
          <div key={index} className="text-center">
            <img src={habit.image} alt={habit.title} className="w-40 h-40 mx-auto rounded-full mb-4" />
            <h4 className="text-xl font-semibold mb-2">{habit.title}</h4>
            <p className="text-gray-400">{habit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChangeHabits;