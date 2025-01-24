import { useState } from "react";
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "How does the loyalty program work?",
      answer:
        "Our loyalty program rewards you with points for every purchase. These points can be redeemed for discounts on future orders.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, PayPal, and other popular payment methods. You can also use gift cards or store credit.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "Yes, you can modify or cancel your order within 2 hours of placing it. After that, the order is processed and cannot be changed.",
    },
    {
      question: "Do you have a size guide?",
      answer:
        "Yes, each product page includes a detailed size guide to help you find the perfect fit.",
    },
    {
      question: "What if my product arrives damaged?",
      answer:
        "If your product arrives damaged, please contact our support team within 7 days for a replacement or refund.",
    },
  ];

  return (
    <div className="w-full mx-auto my-10 p-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-blue-800 dark:text-blue-300 mb-8 text-center">
        Help Center
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`transition-all duration-300 rounded-lg overflow-hidden shadow-md ${
              openIndex === index
                ? "bg-white dark:bg-gray-700"
                : "bg-blue-200 dark:bg-gray-800"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-xl font-semibold text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <span>{faq.question}</span>
              <span
                className={`text-2xl transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <p className="px-6 py-4 text-gray-700 dark:text-gray-200">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
