import { useCallback } from "react";
import { API_BASE_URL } from "../api";
import { LoanDataType, LoanExtraDataType } from ".";

export type AvailableLoanType = {
  id: string;
  lender: string;
  apr: string;
  balance: number;
  issueDate: string;
  monthlyPayments: number;
  originalAmount: number;
  originalMonths: number;
  remainingMonths: number;
  automobile: {
    isRefinanceable: boolean;
    id: string;
    vin: string;
    year: string;
    make: string;
    model: string;
    mileage: number;
    estimatedListPrice: number | null;
    registrationDate: string;
    state: string | null;
    imageSource: string;
  };
};

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const useApi = () => {
  const fetchExtraData = useCallback(async (payload: LoanDataType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });
      return (await response.json()) as LoanExtraDataType;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const submitLoan = useCallback(
    async (payload: LoanDataType & { offerId: string }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/submissions`, {
          method: "POST",
          headers: DEFAULT_HEADERS,
          body: JSON.stringify(payload),
        });
        if (response.status === 500) {
          throw new Error("Server Error");
        }
        return (await response.json()) as { userId: string; error: boolean };
      } catch (error) {
        return {
          userId: undefined,
          error: true,
        };
      }
    },
    []
  );

  const fetchUserLoans = useCallback(async ({ userId }: { userId: string }) => {
    const response = await fetch(`${API_BASE_URL}/loans?userId=${userId}`);
    return (await response.json()) as {
      loansAvailable: Array<AvailableLoanType>;
    };
  }, []);

  return {
    fetchExtraData,
    fetchUserLoans,
    submitLoan,
  };
};
