 

const daysBetween =  (fromDate ,toDate) => {
    const from = new Date(fromDate );
    const to   = new Date(toDate);
      
    // To calculate the time difference of two dates
    const Difference_In_Time = to.getTime() - from.getTime();  
    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    return Difference_In_Days > 0 ? Difference_In_Days : 0 
}

module.exports = {  daysBetween}