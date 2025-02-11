import React from 'react';

const FacilityBox: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex flex-col items-center p-4">
    <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
      <div className="w-8 h-8">
        <svg className="w-full h-full fill-current text-gray-800">
          <use xlinkHref={`/images/sprite.svg#${icon}`} />
        </svg>
      </div>
    </div>
    <p className="text-center text-sm font-medium text-gray-700">{text}</p>
  </div>
);

const Facility: React.FC = () => {
  const facilities = [
    { icon: 'icon-airplane', text: 'FREE SHIPPING WORLD WIDE' },
    { icon: 'icon-credit-card-alt', text: '100% MONEY BACK GUARANTEE' },
    { icon: 'icon-credit-card', text: 'MANY PAYMENT GATWAYS' },
    { icon: 'icon-headphones', text: '24/7 ONLINE SUPPORT' },
  ];

  return (
    <section className="py-12 bg-gray-50" id="facility">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <FacilityBox
              key={index}
              icon={facility.icon}
              text={facility.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facility;
