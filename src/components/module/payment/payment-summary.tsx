"use client";

import { useGetPaymentSummary } from "@/hooks/usePayment";

const PaymentSummaryCard = () => {
  const { data, isLoading, error } = useGetPaymentSummary();
  console.log(data);
  return <div>Date:</div>;
};

export default PaymentSummaryCard;
