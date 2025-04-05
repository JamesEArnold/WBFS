import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Golf Outing',
      date: 'Friday, July 25, 2025',
      time: '8:00 AM - 4:00 PM',
      location: 'Arrowhead Country Club',
      description: 'Join Sheriff Weisburn for a day of golf to support the campaign. Early registration available with special pricing. All skill levels welcome!',
      featured: true
    },
    {
      id: 2,
      title: 'Town Hall Meeting',
      date: 'Tuesday, June 10, 2025',
      time: '7:00 PM - 8:30 PM',
      location: 'County Community Center',
      description: 'Sheriff Weisburn will discuss his plans for the department and answer questions from community members.',
      featured: false
    },
    {
      id: 3,
      title: 'Pancake Breakfast Fundraiser',
      date: 'Saturday, May 17, 2025',
      time: '8:00 AM - 11:00 AM',
      location: 'Veterans Memorial Hall',
      description: 'Enjoy a delicious breakfast while supporting the campaign. Meet Sheriff Weisburn and learn about his vision for the department.',
      featured: false
    },
    {
      id: 4,
      title: 'Campaign Kickoff Rally',
      date: 'Saturday, April 26, 2025',
      time: '1:00 PM - 3:00 PM',
      location: 'Downtown Square',
      description: 'Join us as Sheriff Weisburn officially kicks off his re-election campaign with special guest speakers and family activities.',
      featured: false
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Professional Page Header Section */}
      <section className="relative py-16 bg-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black uppercase tracking-wider">CAMPAIGN EVENTS</h1>
          <div className="h-1 w-32 bg-[#fcd34b] mx-auto mb-4"></div>
          <p className="text-xl max-w-3xl mx-auto">Join Sheriff Weisburn at these upcoming events and help support the campaign.</p>
        </div>
      </section>

      {/* Redesigned Featured Event */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">FEATURED EVENT</h2>
          <div className="relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[#fcd34b]/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-8 bg-black my-12 -rotate-12 transform" style={{ width: '150%' }} />
                ))}
              </div>
            </div>
            
            <div className="relative border-4 border-[#fcd34b] rounded-lg overflow-hidden shadow-xl">
              {/* Top ribbon */}
              <div className="bg-gradient-to-r from-[#fcd34b] to-[#f7c948] p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">★</span>
                  <span className="text-xl font-bold uppercase">Featured Event</span>
                  <span className="text-lg font-bold">★</span>
                </div>
                <div className="bg-black text-[#fcd34b] px-4 py-1 rounded-full text-sm font-bold">SAVE THE DATE</div>
              </div>
              
              <div className="p-8 bg-white">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Date box */}
                  <div className="md:w-1/3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black rounded-lg transform rotate-2 translate-x-1 translate-y-1"></div>
                      <div className="relative bg-[#fcd34b] text-black p-6 rounded-lg text-center border-2 border-black shadow-lg">
                        <div className="text-xl font-bold uppercase">Friday</div>
                        <div className="text-5xl font-black my-2">JULY 25</div>
                        <div className="text-xl font-bold">2025</div>
                        <div className="mt-2 pt-2 border-t-2 border-black/30 text-lg font-semibold">
                          8:00 AM - 4:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Event details */}
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-black text-[#fcd34b] rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold">!</span>
                      </div>
                      <h3 className="text-3xl font-bold">Golf Outing</h3>
                    </div>
                    
                    <div className="flex items-center mb-4 text-gray-700">
                      <Calendar className="mr-2 text-black" size={20} />
                      <span className="font-medium">Arrowhead Country Club</span>
                    </div>
                    
                    <p className="mb-6 text-lg">
                      Join Sheriff Weisburn for a day of golf to support the campaign. 
                      Early registration available with special pricing. All skill levels welcome!
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-black text-[#fcd34b] font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition shadow-md">
                        Register Now
                      </button>
                      <button className="border-2 border-black bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition">
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="section-title">UPCOMING EVENTS</h2>
          
          <div className="grid grid-cols-1 gap-8 mt-8">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-black text-[#fcd34b] p-6 md:w-1/5 flex flex-col justify-center items-center text-center">
                    <div className="text-lg font-semibold">
                      {event.date.split(',')[0]}
                    </div>
                    <div className="text-3xl font-bold my-1">
                      {event.date.split(',')[1].trim().split(' ')[0]} {event.date.split(',')[1].trim().split(' ')[1]}
                    </div>
                    <div className="text-lg">
                      {event.date.split(',')[1].trim().split(' ')[2]}
                    </div>
                  </div>
                  <div className="p-6 md:w-4/5">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="mr-2" size={16} />
                      <span>{event.time} • {event.location}</span>
                    </div>
                    <p className="mb-4">{event.description}</p>
                    <div className="flex gap-4">
                      <button className="bg-black text-[#fcd34b] font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition">
                        {event.id === 1 ? 'Register' : 'RSVP'}
                      </button>
                      <button className="border border-black text-black font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title inline-block">CAMPAIGN CALENDAR</h2>
          <p className="max-w-3xl mx-auto mb-8 mt-4">
            For a complete list of campaign events and appearances, 
            check our campaign calendar or sign up for email notifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-black text-[#fcd34b] font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition">
              View Full Calendar
            </button>
            <button className="bg-[#fcd34b] text-black border-2 border-black font-bold py-3 px-6 rounded-md hover:bg-[#f7c948] transition">
              Sign Up for Updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
