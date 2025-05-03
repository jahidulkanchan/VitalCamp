import { useState } from 'react';
import faqIcon from '../../assets/faq.svg';

const FaqItems = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    {
      question: "What is the purpose of the Medical Camp Management System?",
      answer: "The MCMS is designed to help organizers plan, manage, and coordinate medical camps efficiently. It allows both organizers and participants to handle registrations, schedules, and other camp-related activities with ease."
    },
    {
      question: "How can I register for a medical camp?",
      answer: "To register for a medical camp, simply browse the available camps, select the one you're interested in, and fill out the registration form. You can then receive confirmation and updates about the camp."
    },
    {
      question: "Can I organize a medical camp?",
      answer: "Yes, if you’re a medical professional or an authorized entity, you can create and organize your own medical camp through the system. You’ll be able to manage registrations, schedules, and participant communication."
    },
    {
      question: "How do I know which medical camps are available?",
      answer: "You can explore available medical camps by browsing the listings on the platform. Filters and search options help you find camps based on location, date, and specialization."
    },
    {
      question: "How do I communicate with participants?",
      answer: "Our system provides communication tools for organizers to send out updates, notifications, and messages to participants. This can be done through the camp’s dashboard."
    },
    {
      question: "Is the system available on mobile?",
      answer: "Yes, the Medical Camp Management System is fully responsive and can be accessed on both mobile and desktop devices. You can manage your camp or register for one from anywhere."
    },
    {
      question: "Can participants leave feedback on the camps?",
      answer: "Yes, after attending a medical camp, participants can provide feedback through the platform, helping future organizers improve their camps."
    }
  ];

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="px-4 container py-12 mx-auto md:px-6 lg:max-w-6xl dark:bg-darkBg">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-darkLight mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Find answers to common questions about our medical camps</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* FAQ Image */}
        <div className="md:w-1/2 flex justify-center">
          <img className="w-full max-w-[300px] md:max-w-none md:w-[350px] lg:w-[400px] transition-transform duration-500 hover:scale-105" src={faqIcon} alt="Illustration of people asking questions" />
        </div>

        {/* FAQ List */}
        <div className="md:w-1/2 space-y-4">
          {data.map((item, index) => (
            <div key={index} className={`border-b border-gray-200 dark:border-gray-700 pb-4 transition-all duration-300 ${activeIndex === index ? 'bg-gray-50 dark:bg-darkCard rounded-lg p-4' : ''}`}>
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAnswer(index)}>
                <h3 className="text-lg md:text-xl text-gray-800 dark:text-gray-200">{item.question}</h3>
                <span className="text-primary text-xl">{activeIndex === index ? '−' : '+'}</span>
              </div>

              {activeIndex === index && (
                <div className="mt-3 text-gray-600 dark:text-gray-300 pl-2 animate-fadeIn">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqItems;

