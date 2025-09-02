import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SportsLayout from "@/polymet/layouts/sports-layout";
import HomePage from "@/polymet/pages/home";
import FantasyPage from "@/polymet/pages/fantasy";
import LaBoliteraPage from "@/polymet/pages/la-bolitera";
import FantasyLeaguePage from "@/polymet/pages/fantasy-league";
import CommunityPage from "@/polymet/pages/community";
import GamesPage from "@/polymet/pages/games";
import StorePage from "@/polymet/pages/store";
import WalletPage from "@/polymet/pages/wallet";
import FantasyLineupBuilderPage from "@/polymet/pages/fantasy-lineup-builder";

export default function SportsPlatformPrototype() {
  return (
    <Router>
      <SportsLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/fantasy" element={<FantasyPage />} />

          <Route path="/la-bolitera" element={<LaBoliteraPage />} />

          <Route path="/fantasy-league" element={<FantasyLeaguePage />} />

          <Route path="/community" element={<CommunityPage />} />

          <Route path="/games" element={<GamesPage />} />

          <Route path="/store" element={<StorePage />} />

          <Route path="/wallet" element={<WalletPage />} />

          <Route
            path="/fantasy-lineup-builder"
            element={<FantasyLineupBuilderPage />}
          />
        </Routes>
      </SportsLayout>
    </Router>
  );
}
