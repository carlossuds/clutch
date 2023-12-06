import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { CheckOutlined, Paid, MoreVert } from "@mui/icons-material";

import { API_BASE_URL } from "../api";

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

// ToDo: create styles file

export const Confirmation = () => {
  const [loansAvailable, setLoansAvailable] = useState<
    Array<AvailableLoanType>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // ToDo: use userId from url
      const response = await fetch(`${API_BASE_URL}/loans?userId=userId`);
      setIsLoading(false);
      const { loansAvailable } = await response.json();
      setLoansAvailable(loansAvailable);
    })();
  }, []);

  return (
    <div>
      <Box color="#FFFFFF" bgcolor="#0288D1" p={4}>
        <Box display="flex" flexDirection="column" gap={4} width={300} m="auto">
          <Box
            border="1px solid #FFFFFF"
            height={60}
            width={60}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
          >
            <CheckOutlined />
          </Box>

          <Typography variant="h5" fontWeight={700}>
            Thank you!
          </Typography>

          <p>
            A loan officer will reach out to you shortly. If you have any
            questions please reach us at (202) 555-0139.
          </p>

          <span>Want to speed up the process?</span>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mt={4}
      >
        <Divider sx={{ width: "200px", color: "#888888" }} />
        <Box
          display="flex"
          gap={1}
          bgcolor="#FFC941"
          color="#fff"
          fontSize={12}
          alignItems="center"
          px={1}
          py={0.5}
          borderRadius={6}
        >
          <Paid /> SAVINGS AVAILABLE
        </Box>
        <Divider sx={{ width: "200px", color: "#888888" }} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={4}
        mt={4}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          loansAvailable.map((loan) => (
            <Box
              key={loan.id}
              boxShadow="0px 1px 3px #d6d6d6, 1px 1px 3px #d6d6d6, -1px 1px 3px #d6d6d6"
              borderRadius={2}
            >
              <Box m={2}>
                <Typography fontSize={16} textTransform="initial">
                  {loan.lender}
                </Typography>
                <Typography>${loan.monthlyPayments}/month</Typography>
              </Box>
              <Divider />

              <Box m={2}>
                <img
                  src={loan.automobile.imageSource}
                  alt={loan.automobile.model}
                />

                <Box>
                  <strong>{loan.automobile.model}</strong>
                  <span>
                    estimated <strong>{loan.automobile.mileage}mi</strong>
                  </span>
                </Box>

                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              <Divider />

              <Box m={2} display="flex" justifyContent="space-between">
                APR
                <strong>{loan.apr}%</strong>
              </Box>
              <Divider />

              <Box m={2} display="flex" justifyContent="space-between">
                Time remaining
                <strong>{loan.remainingMonths}mo</strong>
              </Box>
              <Divider />

              <Button
                color="info"
                variant="contained"
                sx={{ borderRadius: 2, width: "calc(100% - 32px)", margin: 2 }}
              >
                START SAVING
              </Button>
            </Box>
          ))
        )}
      </Box>
    </div>
  );
};
