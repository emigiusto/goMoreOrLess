import moment from 'moment'

/* Form validations:
    -The user shouldn't choose same origin and destination city
    -The user must choose a trip date in the future or today
    -The price of the trip should be a number greater than 0
*/
const formValidation = (tripData) => {
    console.log(tripData)
    var valOne = (tripData.fromCity === tripData.toCity) ? ('Error: Origin and destination city cannot be the same \n') : '';
    var valTwo = (moment(tripData.tripDate,"YYYY-MM-DD").isSameOrAfter(moment(), 'day')) ? '' : ('Error: Please choose a date in the future \n');
    var valThree =  (parseInt(tripData.price) >0) ? '' : ('Error: Price should be a number higher than 0');

    var response = { 
        success: (valOne==='' && valTwo==='' && valThree===''),
        error: valOne.concat(valTwo,valThree)
    };

    return response;
}

export default formValidation