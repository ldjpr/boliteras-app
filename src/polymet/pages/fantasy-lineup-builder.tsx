import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import FantasyLineupBuilder from "@/polymet/components/fantasy-lineup-builder";

export default function FantasyLineupBuilderPage() {
  const navigate = useNavigate();

  const handleSaveLineup = (lineup: any) => {
    console.log("Lineup saved:", lineup);
    // In a real app, this would save to the backend
    // For now, we'll just navigate back to the fantasy league page
    navigate("/fantasy-league");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="p-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Set Your Lineup
              </h1>
              <p className="text-sm text-gray-600">
                Liga Boricua Elite • Week 4
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lineup Builder Component */}
      <FantasyLineupBuilder salaryCap={50000} onSaveLineup={handleSaveLineup} />
    </div>
  );
}
