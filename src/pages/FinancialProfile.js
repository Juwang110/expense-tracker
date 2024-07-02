import React from "react";
import FinancialSurvey from "../components/FinancialSurvey";
import FinancePie from "../components/FinancePie";

export default function FinancialProfile() {
  return (
    <div>
      <FinancialSurvey></FinancialSurvey>
      <FinancePie></FinancePie>
    </div>
  );
}
