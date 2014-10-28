/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener('DOMContentLoaded', states);

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
      if (r == true) {
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

      if (requiredFields.forEach(validateRequiredField, form) && validateOccupation(occupation) && validateZip(zip) && validateBirthdate(birthdate)) {
         return true;
      } else {
         return false;
      }

   } //validateForm()

/* validateRequiredField()
 * This function validates a field that is required. If the field does not have a value, or has only spaces,
 * it will mark the field as invalid and return false. Otherwise it will return true.
 * */
function validateRequiredField(field) {
      if (0 == this[field].value.trim().length) {

         this[field].style.border = "1px solid #FF0000";
         return false;
      } else {
         this[field].style.border = "none";
         return true;
      }

   } //validateRequiredField()

//validates the occupation field to make sure the occupationOther field is filled in
//when other is chosen
function validateOccupation(field) {
   var elem = document.getElementById(occupation);
   if (elem.value === 'other') {
      if (document.getElementById(occupationOther).value.trim().length !== 0) {
         document.getElementById(occupationOther).style.border = "1px solid #FF0000";
      }

   }
}

//validates zip to make sure that it is a 5 digit number
function validateZip(field) {
   var elem = document.getElementById(zip);
   var zipRegExp = new RegExp('^\\d{5}$');
   if (zipRegExp.test(elem.value)) {
      elem.style.border = "1px solid #FF0000";
   }


}

//validates birthdate to make sure that the user is over the age of 13
function validateBirthdate(field) {
   var elem = document.getElementById(birthdate);
   var age = getAge(elem.value);
   if (age < 13) {

      document.getElementById("birthdateMessage").innerHTML = "You must be 13 years or older to signup";
      document.getElementById("birthdateMessage").style.display = 'inline';
   }
}

//calculates the age from the birthdate
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}


function onSubmit(evt) {
   var valid = validateForm(this);
   console.log("onsubmit worked");
   if (!valid && evt.preventDefault) {
      evt.preventDefault();
   }
   evt.returnValue = valid;
   return valid;
}