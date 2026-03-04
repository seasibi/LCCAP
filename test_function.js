// Test the getFirstDayOfMonth function
const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

// Test with current date
const testDate = new Date();
console.log('Testing getFirstDayOfMonth function:');
console.log('Input date:', testDate);
console.log('Result:', getFirstDayOfMonth(testDate));
