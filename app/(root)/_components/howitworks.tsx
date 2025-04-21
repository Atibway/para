import { Component, Settings, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Component,
    title: "Record Your Voice",
    description: "Start by recording a sample of your speech or reading provided text.",
  },
  {
    icon: Settings,
    title: "AI Analysis",
    description: "Our AI analyzes your voice patterns, tone, and pronunciation.",
  },
  {
    icon: Sparkles,
    title: "Get Personalized Feedback",
    description: "Receive detailed feedback and specific exercises to improve.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="mb-6 mx-auto bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
