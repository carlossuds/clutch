import { CSSInterpolation, styled } from "@mui/material";

type ClassNames = [
  "Card",
  "LenderName",
  "MonthlyFee",
  "CarDetails",
  "Image",
  "CarName",
  "CarMileage",
  "TimeAndAPR"
];

const Styles: Record<ClassNames[number], CSSInterpolation> = {
  Card: {
    boxShadow: "0px 1px 3px #d6d6d6, 1px 1px 3px #d6d6d6, -1px 1px 3px #d6d6d6",
    borderRadius: 8,
    "& > div": {
      margin: 16,
    },
    width: 360,
  },
  LenderName: {
    display: "block",
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
  },
  MonthlyFee: {
    display: "block",
    textAlign: "center",
    fontSize: 14,
  },
  CarDetails: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    "& > button": {
      padding: 0,
    },
  },
  Image: {
    height: 60,
    width: 60,
    objectFit: "cover",
    borderRadius: 8,
  },
  CarName: {
    fontSize: 16,
    fontWeight: 700,
    display: "block",
    maxWidth: 210,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  CarMileage: {
    fontSize: 12,
    color: "#888",
  },
  TimeAndAPR: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export const StyledCard = styled("li")(() => Styles.Card);
export const StyledLenderName = styled("span")(() => Styles.LenderName);
export const StyledMonthlyFee = styled("span")(() => Styles.MonthlyFee);
export const StyledCarDetails = styled("div")(() => Styles.CarDetails);
export const StyledImage = styled("img")(() => Styles.Image);
export const StyledCarName = styled("strong")(() => Styles.CarName);
export const StyledCarMileage = styled("span")(() => Styles.CarMileage);

export const StyledTimeAndAPR = styled("div")(() => Styles.TimeAndAPR);
