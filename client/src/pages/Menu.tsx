<<<<<<< HEAD
import '../app.css';

const Menu = () => {
    return (
        <>  {/* Opening React fragment */}
            <div className="menu-container">
                <h2 className="menu-title">Menu</h2>
                <h3 className="menu-subtitle">Specialty Bowls</h3>
                <ul className="menu-list">
                    <li className="menu-item">
                        <h4 className="menu-item-title">The Scrumptious Schwab</h4>
                        <p>A rich, creamy tonkotsu pork broth simmered for 12 hours, topped with tender chashu pork belly, marinated soft-boiled egg, bamboo shoots, wood ear mushrooms, sweet corn, and a drizzle of black garlic oil. Finished with a sprinkle of sesame seeds and fresh scallions.</p>
                    </li>
                    <li className="menu-item">
                        <h4 className="menu-item-title">The Vital Vincent</h4>
                        <p className="menu-item-description">A vibrant, spicy miso broth with grilled chicken thigh, crisp bok choy, bean sprouts, pickled ginger, and soft tofu cubes. Garnished with a soft-boiled egg, chili threads, and a splash of lime.</p>
                    </li>
                    <li className="menu-item">
                        <h4 className="menu-item-title">The Legendary Lindsey</h4>
                        <p className="menu-item-description">A classic shoyu broth with seared duck breast slices, menma, nori seaweed, green onions, and narutomaki. Accented with truffle oil and microgreens.</p>
                    </li>
                    <li className="menu-item">
                        <h4 className="menu-item-title">The Tasty Tristan</h4>
                        <p className="menu-item-description">A light and aromatic shio broth with grilled shrimp, tender calamari, and scallops, enhanced with fresh spinach, thinly sliced radish, and crispy fried shallots with a squeeze of yuzu.</p>
                    </li>
                </ul>
            </div>
        </>
    );  {/* Close return block*/}
}

export default Menu;
=======
 const Menu = () => {
    return (
     <>
         <div className="menuH2">
            <h2>Menu</h2>
        </div>

        <div>
            <h3>Specialty Bowls</h3>
        </div>

        <div>
            <ul>
                <li>
                    <h4>The Scrumptious Schwab</h4>
                </li>
                <li>
                    <h4>The Vital Vincent</h4>
                    <p></p>
                </li>
                <li>
                    <h4>The Legendary Lindsey</h4>
                </li>
                <li>
                    <h4>The Tasty Tristan</h4>
                </li>
            </ul>
        </div>
     </>
    )
}

export default Menu;

>>>>>>> 16148701104e4d911d63867511bc586d3a963d34
