"use client";

import { useGetPaymentSummary } from "@/hooks/usePayment";

const PaymentSummaryCard = () => {
  const { data, isLoading, error } = useGetPaymentSummary();
  console.log(data);
  return <div>Payment Summary Card</div>;
};

export default PaymentSummaryCard;
