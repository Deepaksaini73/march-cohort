import Image from 'next/image';
import { Globe, Award, Clock, CreditCard, ShieldCheck, Users, MapPin, BarChart4 } from 'lucide-react';

const AMVR = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 opacity-10 rounded-full transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 opacity-10 rounded-full transform -translate-x-40 translate-y-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Trusted by thousands of travelers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Experience the Travila Difference</h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Creating unforgettable adventures around the world since 2003
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-14">
          {/* Left side with heading and stats */}
          <div className="lg:w-1/2">
            <div className="mb-10">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full px-5 py-2 mb-5 shadow-sm">
                <Globe className="w-5 h-5 mr-2 text-white" />
                <span className="text-sm font-medium text-white">Why book at Travila?</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-5 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Embracing Adventure Since 2003</h2>
              <p className="text-gray-600 mb-10 text-lg border-l-4 border-yellow-400 pl-4">
                Choose one style or create a package, fill your passports with adventures together.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start">
                <div className="bg-yellow-100 p-3 rounded-full mr-4 shadow-inner">
                  <Globe className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-1 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">45+</h3>
                  <p className="text-gray-600">
                    Global <br />
                    Branches
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4 shadow-inner">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">29K</h3>
                  <p className="text-gray-600">
                    Destinations <br />
                    Collaboration
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4 shadow-inner">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-1 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">20+</h3>
                  <p className="text-gray-600">
                    Years <br />
                    Experience
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4 shadow-inner">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">168K</h3>
                  <p className="text-gray-600">
                    Happy <br />
                    Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side with feature cards */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-red-100 group">
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-md group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 mx-auto">
                  <Globe className="w-7 h-7 text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-red-700 transition-colors duration-300">300,000+ Experiences</h3>
              <div className="w-12 h-1 bg-red-300 mx-auto mb-4 rounded-full group-hover:bg-red-500 transition-colors duration-300"></div>
              <p className="text-gray-600 text-center">
                Make memories around the world with our carefully curated experiences.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100 group">
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-md group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 mx-auto">
                  <Award className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">Trusted Reviews</h3>
              <div className="w-12 h-1 bg-blue-300 mx-auto mb-4 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
              <div className="flex justify-center mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <svg 
                      key={index}
                      className={`w-5 h-5 ${index < 5 ? 'text-green-500' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-center mb-1">
                4.8 stars from 160,000+
              </p>
              <div className="flex justify-center mt-1">
                <div className="text-green-600 font-bold tracking-tight text-sm">
                  Trustpilot
                </div>
                <span className="text-gray-500 text-sm ml-1">reviews</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-indigo-100 group">
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-md group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 mx-auto">
                  <CreditCard className="w-7 h-7 text-indigo-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">Reserve now, Pay later</h3>
              <div className="w-12 h-1 bg-indigo-300 mx-auto mb-4 rounded-full group-hover:bg-indigo-500 transition-colors duration-300"></div>
              <p className="text-gray-600 text-center">
                Book your spot first, pay later with flexible payment options.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group">
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-md group-hover:bg-gray-700 group-hover:text-white transition-colors duration-300 mx-auto">
                  <ShieldCheck className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 group-hover:text-gray-700 transition-colors duration-300">Security Assurance</h3>
              <div className="w-12 h-1 bg-gray-300 mx-auto mb-4 rounded-full group-hover:bg-gray-500 transition-colors duration-300"></div>
              <p className="text-gray-600 text-center">
                Your data is safe with our advanced encryption and security measures.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <a href="#explore" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            Explore Our Adventures
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AMVR; 