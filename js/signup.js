/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";



//Called when the DOM is loaded and ready for manipulation
//Populates the state select based on the usStates.js file
function states() {
   var state = usStates;
   console.log(state);

   var element = document.getElementById('state');
   console.log(element);
   for (var i = 0; i < state.length; i++) {
      var opt = document.createElement("option");
      opt.value = state[i].code;
      var text = document.createTextNode(state[i].name);
      opt.appendChild(text);
      element.appendChild(opt);
   }

   document.addEventListener('change', occupation);

   //Called when other is selected for occupation
   //opens up another input box to add what the job is
   function occupation() {
      var elem = document.getElementById('occupation');
      if (elem.value === 'other') {
         document.getElementById('occupationOther').style.display = "block";
      } else if (elem.value !== 'other') {
         document.getElementById('occupationOther').style.display = "none";
      }

   }

   document.getElementById("cancelButton").addEventListener('click', noThanks);

   //called when use clicks on the no thanks button. 
   //Asks them to confirm if they want to leave and if they do then takes them to google
   function noThanks() {
      var txt;
      var r = confirm("Do you really want to leave this page?");
      if (r === true) {
         location.replace("http://google.com");
      } else {
         location.reload();
      }
   }

   var ourForm = document.getElementById("signup");
   ourForm.addEventListener('submit', onSubmit);


}

//called when the user clicks the submit button. 
//validates all the required fields
function validateForm(form) {
      var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
      var valid = true;



      if (requiredFields.forEach(validateRequiredField, form)) {
         valid = true;
      } else {
         valid = false;
      }

      valid = validateOccupation(occupation, occupationOther);
      valid = validateZip(zip);
      valid = getAge(birthdate);

      return valid;

   } //validateForm()

/* validateRequiredField()
 * This function validates a field that is required. If the field does not have a value, or has only spaces,
 * it will mark the field as invalid and return false. Otherwise it will return true.
 * */
function validateRequiredField(field) {
      if (0 === this[field].value.trim().length) {

         this[field].style.border = "1px solid #FF0000";
         return false;
      } else {
         this[field].style.border = "none";
         return true;
      }

   } //validateRequiredField()

//validates the occupation field to make sure the occupationOther field is filled in
//when other is chosen
function validateOccupation(occupation, occupationOther) {
   //var occ= document.getElementById(occupation);
   if (occupation.value === 'other') {
      if (occupationOther.value.trim().length === 0) {
         occupationOther.style.border = "1px solid #FF0000";
         return false;
      } else {
         occupationOther.style.border = "none";
         return true;
      }

   }
}

//validates zip to make sure that it is a 5 digit number
function validateZip(zip) {
   //var zipCode = document.getElementById(zip);
   var zipRegExp = new RegExp('^\\d{5}$');
   if (zipRegExp.test(zip.value) === false) {
      zip.className = 'form-control';
      zip.style.border = "1px solid #FF0000";
      return false;
   } else {
      return true;
   }


}



//calculates the age from the birthdate
function getAge(birthdate) {
   var today = new Date();
   var birthDate = birthdate.valueAsDate;
   var age = today.getFullYear() - birthDate.getUTCFullYear();
   var m = today.getMonth() - birthDate.getUTCMonth();
   var d = today.getDate() - birthDate.getUTCDate();
   if (m < 0 || (m === 0 && d < 0)) {
      age--;
   }

   if (age < 13) {
      document.getElementById("birthdateMessage").innerHTML = "You must be 13 years or older to signup";
      birthdate.style.border = "1px solid #FF0000";
      return false;
   } else {
      document.getElementById("birthdateMessage").style.display = "none";
      return true;
   }

}

function onSubmit(evt) {
   console.log(" worked");
   var valid = validateForm(this);
   console.log("onsubmit worked");
   if (!valid) {
      evt.preventDefault();
      evt.returnValue = false;
      return false;
   }

}


document.addEventListener('DOMContentLoaded', states);