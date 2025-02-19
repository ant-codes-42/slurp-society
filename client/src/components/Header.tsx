import '../styles/Header.css'
import ramenImg from '../assets/images/ramen-image.jpg'

function Header() {
    return (
        <div className="headerDiv">
            <header className="header">

                <img className="headerImg" src={ramenImg} alt='ramen' />
                <h1 className="h1">Slurp Society</h1>
                <img className="headerImg" src={ramenImg} alt='ramen' />

            </header>
        </div>
    );
};

export default Header;