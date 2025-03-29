"use client";

const securityFeatures = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Security Assurance',
    description: 'Advanced encryption protocols protecting your personal and payment information at all times',
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'User Privacy',
    description: 'Your privacy is our priority with strict data handling policies and GDPR compliance',
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 5v2M15 17v2M5 12h2M17 12h2" />
        <circle cx="12" cy="12" r="7" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Round-the-clock customer support team to assist you before, during, and after your travels',
  },
  {
    id: 4,
    icon: (
      <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: 'Secure Payments',
    description: 'Multiple trusted payment options with fraud protection and transaction monitoring',
  }
];

export default function WhyTravelWithUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block h-1 w-12 bg-pink-500 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Why Travel With Us?</h2>
          <p className="text-gray-600">The best booking platform you can trust</p>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature) => (
            <div 
              key={feature.id} 
              className={`p-6 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                feature.id === 1 ? 'bg-blue-50 hover:bg-blue-100' : 
                feature.id === 2 ? 'bg-pink-50 hover:bg-pink-100' : 
                feature.id === 3 ? 'bg-purple-50 hover:bg-purple-100' : 
                'bg-green-50 hover:bg-green-100'
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <div className="mt-auto">
                  <button className="text-sm font-medium flex items-center text-gray-700 hover:text-gray-900 group">
                    Learn More
                    <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {feature.id === 2 && (
                <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 