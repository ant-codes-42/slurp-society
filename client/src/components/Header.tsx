import '../styles/Header.css'

function Header() {
    return (
       <div className="headerDiv">
       <header className="header">

            <img className="headerImg" src='/assets/images/ramen-image.jpg' alt='ramen' />
            <h1 className="h1">Slurp Society</h1>
            <img className="headerImg" src='./assets/images/ramen-image.jpg' alt='ramen' />

        </header>
        </div>
    );
};

export default Header;