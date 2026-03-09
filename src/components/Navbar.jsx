import { Link, useLocation } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Film className="logo-icon" size={28} />
          <h1>CinePick</h1>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            <Heart size={18} />
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
