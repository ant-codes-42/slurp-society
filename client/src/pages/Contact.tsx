import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="flex flex-col items-center p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-yellow-600 animate-bounce">
                Got questions? We've got noodles AND answers!
                </h2>
        <div className="w-full max-w-4xl">
            <p className="text-lg text center text-gray-700 max-w-xl mb-6">
                Whether you're craving ramen recommendations, need help with an order, or just want to say hi, we'd love to hear from you!
            </p>
        
        <div className="grid grid-cols-q md: grid-cols-2 gap-8">
            <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg hover: shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4">Our Team</h3>
                <ul className="space-y-4">
                   <li className="flex items-center space-x-4">
                         <span className="font-medium">Anthony Schwab:</span>
                                <a href="https://github.com/ant-codes-42" className="text-blue-600 hover:underline">@ant-codes-42</a>
                    </li>
                    <li className="flex items-center space-x-4">
                                 <a href="https://github.com/vincentt94" className="text-blue-600 hover:underline">@vincentt94</a>
                    </li>
                    <li className="flex items-center space-x-4">
                                <span className="font-medium">Lindsey Vigeesa:</span>
                                <a href="https://github.com/lindsey078" className="text-blue-600 hover:underline">@lindsey078</a>
                            </li>
                            <li className="flex items-center space-x-4">
                                <span className="font-medium">Tristan Persaud:</span>
                                <a href="https://github.com/TristanPPersaud" className="text-blue-600 hover:underline">@TristanPPersaud</a>
                            </li>
                        </ul>
                    </div>


                    <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-yellow-600" />
                            <span>hello@slurpsociety.com</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <Phone className="w-5 h-5 text-yellow-600" />
                            <span>(555) 123-4567</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-yellow-600" />
                            <span>123 Noodle Lane, Ramen City, USA</span>
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-gray-600 text-sm text-center">
                Slurp Society – where every bowl is a hug for your soul!
            </p>
        </div>
    );
};

export default Contact 