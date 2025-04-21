import { Mic, Brain, Zap, Clock, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Mic,
    title: "Real-time Feedback",
    description: "Get instant feedback on your pitch, tone, and pronunciation",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze your speech patterns for improvement",
  },
  {
    icon: Zap,
    title: "Quick Progress",
    description: "See improvements in your speaking skills in just weeks",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Practice whenever you want, wherever you are",
  },
  {
    icon: Target,
    title: "Personalized Goals",
    description: "Set and track your personal voice coaching objectives",
  },
  {
    icon: Award,
    title: "Expert Techniques",
    description: "Learn professional voice coaching methods and exercises",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Our AI Voice Coach?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 p-3 rounded-lg w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
