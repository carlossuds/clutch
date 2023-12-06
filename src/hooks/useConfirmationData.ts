import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AvailableLoanType, useApi } from ".";

export const useConfirmationData = () => {
  const [loansAvailable, setLoansAvailable] = useState<
    Array<AvailableLoanType>
  >([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUserLoans } = useApi();

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (!userId) return;
    setIsLoading(true);
    (async () => {
      const { loansAvailable } = await fetchUserLoans({ userId });
      setIsLoading(false);
      setLoansAvailable(loansAvailable);
    })();
  }, [searchParams, fetchUserLoans]);

  return {
    loansAvailable,
    isLoading,
  };
};
