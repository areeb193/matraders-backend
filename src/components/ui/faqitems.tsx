"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-yellow-400/50 rounded-xl overflow-hidden shadow-md bg-white"
        >
          {/* Question */}
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex justify-between items-center w-full px-5 py-4 text-left font-semibold text-gray-800 hover:bg-yellow-50 transition-all"
          >
            {faq.question}
            <ChevronDown
              className={`w-5 h-5 text-yellow-600 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Answer */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-4 text-gray-700 leading-relaxed"
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
