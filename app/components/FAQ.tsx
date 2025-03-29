"use client";

import { useState, useEffect } from 'react';
import { Plus, X, Building, MapPin, Ticket, Home, Car, Activity } from 'lucide-react';

type FAQCategory = 'Tours Booking' | 'Activities' | 'Destinations' | 'Hotels Booking' | 'Rental Car' | 'Property' | 'Tickets Booking';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: FAQCategory;
  isOpen?: boolean;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  categories?: FAQCategory[];
  items?: FAQItem[];
}

const FAQ = ({
  title = "Frequently Asked Questions",
  subtitle = "You need to come at least once in your life",
  categories = ['Tours Booking', 'Activities', 'Destinations', 'Hotels Booking', 'Rental Car', 'Property', 'Tickets Booking'],
  items = defaultFAQs
}: FAQProps) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'All'>('All');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({ "01": true });
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleFAQ = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Filter FAQs by active category and search term
  const filteredFAQs = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const getCategoryIcon = (category: FAQCategory | 'All') => {
    switch (category) {
      case 'All':
        return <Building className="w-5 h-5 mr-2" />;
      case 'Tours Booking':
        return <Ticket className="w-5 h-5 mr-2" />;
      case 'Activities':
        return <Activity className="w-5 h-5 mr-2" />;
      case 'Destinations':
        return <MapPin className="w-5 h-5 mr-2" />;
      case 'Hotels Booking':
        return <Building className="w-5 h-5 mr-2" />;
      case 'Rental Car':
        return <Car className="w-5 h-5 mr-2" />;
      case 'Property':
        return <Home className="w-5 h-5 mr-2" />;
      case 'Tickets Booking':
        return <Ticket className="w-5 h-5 mr-2" />;
      default:
        return <Ticket className="w-5 h-5 mr-2" />;
    }
  };
  
  // Animated plane background
  const [planePosition, setPlanePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlanePosition({
        x: Math.floor(Math.random() * 80),
        y: Math.floor(Math.random() * 80),
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Animated airplane */}
      <div 
        className="absolute transition-all duration-[15000ms] ease-in-out opacity-10"
        style={{ 
          top: `${planePosition.y}%`, 
          left: `${planePosition.x}%`,
          transform: `rotate(${45 + planePosition.x}deg)`
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-40 right-0 opacity-5">
        <svg width="350" height="350" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.59 4.59A2 2 0 1014.83 8.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.41 19.41A2 2 0 109.65 15.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.61 14.83L17.66 12.56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.88 9.11L12.61 17.16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="absolute bottom-40 left-0 opacity-5">
        <svg width="350" height="350" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 2L12 9 5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16L5 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16L19 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="max-w-5xl mx-auto text-center mb-10">
        <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          Travel Support
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
        <p className="text-gray-600 max-w-xl mx-auto">{subtitle}</p>
        
        {/* Search box */}
        <div className="mt-8 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <svg 
            className="absolute right-4 top-3.5 text-gray-400" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-5xl mx-auto overflow-x-auto py-2">
        <button
          key="all"
          onClick={() => setActiveCategory('All')}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'All' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Building className="w-5 h-5 mr-2" />
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category)}
            {category}
          </button>
        ))}
      </div>
      
      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white backdrop-blur-sm bg-opacity-80">
        {filteredFAQs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or category filters</p>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div 
              key={faq.id}
              className={`border-b border-gray-200 last:border-b-0 transition-all ${openItems[faq.id] ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div 
                className="flex justify-between items-start p-6 cursor-pointer"
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex items-start gap-6">
                  <div className={`text-3xl font-bold ${openItems[faq.id] ? 'text-blue-600' : 'text-gray-900'} transition-colors`}>{faq.id}</div>
                  <h3 className={`text-lg font-semibold ${openItems[faq.id] ? 'text-blue-600' : 'text-gray-900'} pt-1 transition-colors`}>
                    {faq.question}
                  </h3>
                </div>
                <button 
                  className={`p-2 rounded-full transition-all ${
                    openItems[faq.id] 
                      ? 'bg-blue-600 text-white rotate-0' 
                      : 'bg-gray-100 text-gray-700 rotate-0'
                  }`}
                >
                  {openItems[faq.id] ? <X size={20} /> : <Plus size={20} />}
                </button>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems[faq.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 ml-16">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Contact support section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <p className="text-gray-600 mb-4">Still have questions? We're here to help</p>
        <a
          href="/contact"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
        >
          Contact Support
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

const defaultFAQs: FAQItem[] = [
  {
    id: "01",
    question: "How do I make a reservation on your website",
    answer: "Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.",
    category: "Tours Booking"
  },
  {
    id: "02",
    question: "What documents do I need for my trip, and how do I obtain them?",
    answer: "Different destinations require different travel documents. Generally, you'll need a valid passport with at least six months validity beyond your travel dates. Some countries require visas, which can be obtained through their embassy or consulate. For specific documentation requirements, check the official government website of your destination country or contact our customer service for assistance.",
    category: "Destinations"
  },
  {
    id: "03",
    question: "In the event that I need to modify or cancel my reservation, what are the policies in place?",
    answer: "Our modification and cancellation policies vary depending on the type of booking and the provider. Most reservations can be modified or cancelled up to 24-48 hours before the scheduled service. For hotels, many offer free cancellation up to a certain date. Please refer to the specific terms and conditions provided at the time of booking, or contact our customer service team for assistance with your particular reservation.",
    category: "Hotels Booking"
  },
  {
    id: "04",
    question: "Can you specify the types of credit/debit cards, digital wallets, or other online payment methods accepted?",
    answer: "We accept major credit and debit cards including Visa, Mastercard, American Express, and Discover. Digital payment options include PayPal, Apple Pay, Google Pay, and Stripe. We also support regional payment methods in certain countries. All payment transactions are secure and encrypted to ensure your financial information remains protected.",
    category: "Property"
  },
  {
    id: "05",
    question: "What are the working hours, and what can I expect in terms of response times?",
    answer: "Our customer service team is available 24/7 to assist with urgent matters. For general inquiries, we operate from 8 AM to 8 PM (GMT) Monday through Saturday, and 10 AM to 6 PM on Sundays. Email responses are typically provided within 24 hours, while live chat support aims to connect you with an agent within 5 minutes. Phone support wait times average under 3 minutes during regular business hours.",
    category: "Activities"
  },
  {
    id: "06",
    question: "How can I find the best deals and offers for my trip?",
    answer: "To find the best deals, we recommend booking early and using our price comparison tools. You can also sign up for our newsletter to receive exclusive offers, set price alerts for your desired destinations, and check our seasonal promotions page. Our 'Last Minute Deals' section features discounted rates for spontaneous travelers, and our loyalty program members get access to special rates and early-bird discounts.",
    category: "Tours Booking"
  },
  {
    id: "07",
    question: "What are your policies regarding travel insurance?",
    answer: "We strongly recommend purchasing travel insurance for all bookings. Our platform offers comprehensive insurance options that cover trip cancellations, medical emergencies, lost luggage, and travel delays. You can add insurance during the checkout process, and policies can be customized based on your specific needs and destination. For international travel, medical coverage is particularly important as your home country's health insurance may not provide coverage abroad.",
    category: "Rental Car"
  },
  {
    id: "08",
    question: "How can I access my booking details and itinerary?",
    answer: "You can access your booking details by logging into your account on our website or mobile app. Navigate to the 'My Trips' section to view all your current and past bookings. From there, you can download or print your itinerary, access e-tickets, view reservation details, and make changes if needed. We also send confirmation emails with all relevant information, and you can set up mobile notifications for travel updates.",
    category: "Tickets Booking"
  }
];

export default FAQ; 