import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageData, Pages } from "../enums/pages";
import { useApi } from "./useApi";

const LOAN_PURPOSES = ["Debt Consolidation", "Personal", "API error"] as const;
const LOAN_TERM_OPTIONS = [12, 24, 36, 48];

export type LoanDataType = {
  loanPurpose: (typeof LOAN_PURPOSES)[number] | null;
  amount: number | null;
  terms: number | null;
};
export type LoanExtraDataType = {
  monthlyPayments: number | null;
  apr: number | null;
  id: string | null;
};

export const useHomeData = () => {
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState<LoanDataType>({
    loanPurpose: null,
    amount: null,
    terms: null,
  });
  const [loanExtraData, setLoanExtraData] = useState<LoanExtraDataType>({
    id: null,
    monthlyPayments: null,
    apr: null,
  });
  const [hasApiError, setHasApiError] = useState(false);

  const { fetchExtraData, submitLoan } = useApi();

  useEffect(() => {
    if (Object.values(loanData).every(Boolean)) {
      (async () => {
        const data = await fetchExtraData(loanData);
        if (data) {
          setLoanExtraData(data);
        }
      })();
    }
  }, [loanData, fetchExtraData]);

  const onFieldChange = useCallback(
    ({
      field,
      value,
    }: {
      field: keyof LoanDataType;
      value: number | string | null;
    }) => {
      setLoanData((data) => ({ ...data, [field]: value }));
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (!loanExtraData.id) {
      return;
    }
    setHasApiError(false);

    const { userId, error } = await submitLoan({
      ...loanData,
      offerId: loanExtraData.id,
    });
    if (userId && !error) {
      navigate(`${PageData[Pages.CONFIRMATION].path}?userId=${userId}`);
    }
    setHasApiError(error);
  }, [loanData, loanExtraData?.id, navigate, submitLoan]);

  return {
    hasApiError,
    loanData,
    loanExtraData,
    loanPurposeOptions: LOAN_PURPOSES,
    loanTermsOptions: LOAN_TERM_OPTIONS,
    onFieldChange,
    onSubmit,
  };
};
