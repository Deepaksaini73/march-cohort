import Image from 'next/image';

const AMVR = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side with heading and stats */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <div className="inline-flex items-center bg-yellow-400 rounded-full px-4 py-2 mb-4">
                <Image src="/images/globe.svg" alt="Globe" width={20} height={20} className="mr-2" />
                <span className="text-sm font-medium">Why book at Travila?</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-4">Embracing Adventure Since 2003</h2>
              <p className="text-gray-700 mb-8">
                Choose one style or create a package, fill your passports with adventures together.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-4xl font-bold mb-1">45+</h3>
                <p className="text-gray-600">
                  Global <br />
                  Branches
                </p>
              </div>
              
              <div>
                <h3 className="text-4xl font-bold mb-1">29K</h3>
                <p className="text-gray-600">
                  Destinations <br />
                  Collaboration
                </p>
              </div>
              
              <div>
                <h3 className="text-4xl font-bold mb-1">20+</h3>
                <p className="text-gray-600">
                  Years <br />
                  Experience
                </p>
              </div>
              
              <div>
                <h3 className="text-4xl font-bold mb-1">168K</h3>
                <p className="text-gray-600">
                  Happy <br />
                  Customers
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side with feature cards */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-red-50 rounded-xl p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image src="/images/globe.svg" alt="Experiences" width={24} height={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">300,000+ Experiences</h3>
              <p className="text-gray-600 text-center">
                Make memories around the world.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image src="/images/file.svg" alt="Reviews" width={24} height={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Trusted Reviews</h3>
              <p className="text-gray-600 text-center">
                4.8 stars from 160,000+ Trustpilot reviews.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image src="/images/window.svg" alt="Reserve" width={24} height={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Reserve now, Pay later</h3>
              <p className="text-gray-600 text-center">
                Book your spot first, pay later.
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-6">
              <div className="mb-4 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image src="/images/file.svg" alt="Security" width={24} height={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Security Assurance</h3>
              <p className="text-gray-600 text-center">
                Data security through encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AMVR; 