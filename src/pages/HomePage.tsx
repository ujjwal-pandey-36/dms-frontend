import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { FileText, Users, Settings } from "lucide-react";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      bg: "bg-blue-100",
      title: "Document Management",
      description: "Upload, organize, and manage all your documents.",
      path: "/dashboard",
    },
    {
      icon: <Settings className="h-8 w-8 text-teal-600" />,
      bg: "bg-teal-100",
      title: "Accounting",
      description: "Manage your financial records and transactions.",
      path: "/accounting",
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      bg: "bg-amber-100",
      title: "RPT Module",
      description: "Real Property Tax management and assessment.",
      path: "/rpt",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 md:px-16 py-10">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-3xl font-bold text-blue-800">Welcome to DMS</h1>
        <p className="mt-2 text-lg text-gray-600">
          Select a module to begin working with your documents
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className="cursor-pointer transition-transform transform hover:scale-[1.02] hover:shadow-md border border-gray-200 rounded-2xl"
          >
            <Card className="h-full">
              <CardContent className="p-6 sm:p-8 text-center flex flex-col h-full">
                <div className="flex flex-col items-center mb-4">
                  <div className={`${card.bg} p-3 rounded-full`}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
