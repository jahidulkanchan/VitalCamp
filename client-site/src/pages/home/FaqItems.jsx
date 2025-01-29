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
    <div className="px-2 container py-10 mx-auto md:px-5">
      <h2 className="text-2xl md:text-4xl text-center mb-5">Frequently Asked Questions</h2>
      <div className='md:flex gap-8 items-center'>
        <div>
          <img className='max-w-[300px] md:max-w-[350px]  lg:max-w-[450px] w-fit mb-5' src={faqIcon} alt="" />
        </div>
      <div className="faq-list">
        {data.map((item, index) => (
          <div key={index} className="faq-item border-b py-3">
            <div 
              className="faq-question cursor-pointer font-semibold"
              onClick={() => toggleAnswer(index)}
            >
              <span>{item.question}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer mt-2 text-gray-700">
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

