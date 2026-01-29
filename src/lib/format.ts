export function formatUSD(amount: number) {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUYU(amount: number) {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceDual(usdAmount: number, usdToUyuRate: number) {
  const uyu = Math.round(usdAmount * usdToUyuRate);
  return {
    usd: formatUSD(usdAmount),
    uyu: formatUYU(uyu),
    uyuAmount: uyu,
  };
}
