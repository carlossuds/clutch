import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

const LOAN_PURPOSES = ["Debt Consolidation", "Personal", "API error"] as const;
const LOAN_TERM_OPTIONS = [12, 24, 36, 48];

type LoanDataType = {
  loanPurpose: (typeof LOAN_PURPOSES)[number] | null;
  amount: number | null;
  terms: number | null;
};
type LoanExtraDataType = {
  monthlyPayments: number | null;
  apr: number | null;
  id: string | null;
};

export const useHome = () => {
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

  const fetchExtraData = useCallback(async (payload: LoanDataType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setLoanExtraData(await response.json());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (Object.values(loanData).every(Boolean)) {
      (async () => await fetchExtraData(loanData))();
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
    setHasApiError(false);
    try {
      const response = await fetch(`${API_BASE_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerId: loanExtraData.id,
          ...loanData,
        }),
      });
      if (response.status === 500) {
        setHasApiError(true);
        return;
      }
      const { userId } = await response.json();
      console.log(userId);
    } catch (error) {
      setHasApiError(true);
    }
  }, [loanData, loanExtraData]);

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
