import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#fcd34b]">Re-Elect Sheriff Weisburn</h3>
            <p className="mb-4">Working for a safer community.</p>
            <p className="text-sm">© {currentYear} Sheriff Weisburn Campaign. All Rights Reserved.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#fcd34b]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#fcd34b] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#fcd34b] transition">About</Link></li>
              <li><Link to="/events" className="hover:text-[#fcd34b] transition">Events</Link></li>
              <li><Link to="/contribute" className="hover:text-[#fcd34b] transition">Contribute</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#fcd34b]">Contact</h3>
            <p className="mb-2">Campaign Headquarters</p>
            <p className="mb-2">123 Main Street</p>
            <p className="mb-2">Anytown, USA 12345</p>
            <p className="mb-2">Phone: (555) 123-4567</p>
            <p>Email: info@weisburn4sheriff.com</p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p>Paid for by the Committee to Re-Elect Sheriff Weisburn</p>
        </div>
      </div>
    </footer>
  );
};
