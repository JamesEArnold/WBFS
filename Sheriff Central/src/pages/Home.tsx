import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#fcd34b] to-[#fcd34b]/70 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">RE-ELECT SHERIFF WEISBURN</h1>
              <p className="text-xl mb-6">Dedicated to protecting our community with integrity and experience.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="campaign-button">
                  Learn More
                </Link>
                <Link to="/contribute" className="bg-[#fcd34b] text-black border-2 border-black font-bold py-3 px-6 rounded-md hover:bg-[#f7c948] transition duration-200">
                  Support Our Campaign
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-lg transform rotate-3 translate-x-2 translate-y-2"></div>
                <div className="relative bg-gray-200 rounded-lg overflow-hidden border-4 border-black shadow-xl w-64 h-80 md:w-80 md:h-96">
                  {/* This would be the sheriff's image - using a placeholder */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    Sheriff Portrait
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Issues Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">PRIORITIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md border-l-4 border-[#fcd34b]">
              <h3 className="text-xl font-bold mb-3">Public Safety</h3>
              <p>Committed to maintaining and improving the safety and security of all residents through proactive policing and community engagement.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md border-l-4 border-[#fcd34b]">
              <h3 className="text-xl font-bold mb-3">Fiscal Responsibility</h3>
              <p>Ensuring taxpayer dollars are used efficiently while maintaining the highest standards of service and protection.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md border-l-4 border-[#fcd34b]">
              <h3 className="text-xl font-bold mb-3">Community Partnerships</h3>
              <p>Building strong relationships between law enforcement and the community through transparency, accountability, and mutual respect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="section-title">UPCOMING EVENTS</h2>
            <Link to="/events" className="text-black font-semibold hover:text-[#fcd34b] transition">
              View All Events →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="bg-[#fcd34b] text-center p-6 md:w-1/4">
                <div className="text-2xl font-bold">JUL</div>
                <div className="text-5xl font-black">25</div>
                <div className="text-xl">2025</div>
              </div>
              <div className="p-6 md:w-3/4">
                <h3 className="text-2xl font-bold mb-2">Golf Outing</h3>
                <p className="text-gray-600 mb-4">Arrowhead Country Club</p>
                <p className="mb-4">Join Sheriff Weisburn for a day of golf to support the campaign. Early registration available!</p>
                <div className="flex items-center">
                  <span className="bg-black text-[#fcd34b] px-3 py-1 rounded-md font-bold mr-4">SAVE THE DATE</span>
                  <Link to="/events" className="text-black font-semibold hover:underline">
                    More Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Sheriff Weisburn's Campaign</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Help us continue building a safer community with your contribution to our campaign.</p>
          <Link to="/contribute" className="bg-[#fcd34b] text-black font-bold py-3 px-8 rounded-md text-xl hover:bg-[#f7c948] transition duration-200">
            CONTRIBUTE TODAY
          </Link>
        </div>
      </section>
    </div>
  );
};
