import moment from 'moment'

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