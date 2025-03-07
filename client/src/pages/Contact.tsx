import "../styles/Contact.css";


const Contact = () => {
    return (
     <div className="contact-container">
        <h2 className="contact-title">
          Got questions? We've got noodles AND answers!
         </h2>
     <div className="contact-content">
     <div className="contact-info">
                                <h3 className="contact-subtitle">Contact Us</h3>
                                {/* <p><Mail /> hello@slurpsociety.com</p>
                                <p><Phone /> (555) 123-4567</p>
                                <p><MapPin /> 123 Noodle Lane, Ramen City, USA</p> */}
                            </div>
         <p className="contact-description">
          Whether you're craving ramen recommendations, need help with an order, or just want to say hi, we'd love to hear from you!
         </p>
                
      <div className="contact-grid">
        <div className="contact-team">
         <h3 className="contact-subtitle">Our Team</h3>
             <ul className="contact-list">
                   <li className="contactLi"><span>Anthony Schwab:</span> <a className="contactA" href="https://github.com/ant-codes-42">@ant-codes-42</a></li>
                  <li className="contactLi"><span>Vincent Thao:</span> <a className="contactA" href="https://github.com/vincentt94">@vincentt94</a></li>
                     <li className="contactLi"><span>Lindsey Vigesaa:</span> <a className="contactA" href="https://github.com/lindsey078">@lindsey078</a></li>
                     <li className="contactLi"><span>Tristan Persaud:</span> <a className="contactA" href="https://github.com/TristanPPersaud">@TristanPPersaud</a></li>
                                </ul>
                            </div>
        
                            
                        </div>
                    </div>
                    <p className="contact-footer">
                        Slurp Society – where every bowl is a hug for your soul!
                    </p>
                </div>
            );
        };
        
        export default Contact;