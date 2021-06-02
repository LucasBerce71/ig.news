export default function formatCurrency(currencyValue: number) {
  const currencyFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency', 
    currency: 'USD'
  }).format(currencyValue); 

  return currencyFormatted;
}