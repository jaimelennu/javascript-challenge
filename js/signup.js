/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener('DOMContentLoaded', states);



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

   function occupation() {
      var elem = document.getElementById('occupation');

      if (elem.value === 'other') {
         document.getElementById('occupationOther').style.display = "block";
      } else if (elem.value !== 'other') {
         document.getElementById('occupationOther').style.display = "none";
      }

   }

   document.getElementById("cancelButton").addEventListener('click', noThanks);

   function noThanks() {
      var txt;
      var r = confirm("Do you really want to leave this page?");
      if (r == true) {
         location.replace("http://google.com");
      } else {
         location.reload();
      }
   }

}


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

function validateOccupation(field) {
   var elem = document.getElementById(occupation);
   if (elem.value === 'other') {
      if (document.getElementById(occupationOther).value.trim().length !== 0) {
         document.getElementById(occupationOther).style.border = "1px solid #FF0000";
      }

   }
}

function validateZip(field) {
   var elem = document.getElementById(zip);
   var zipRegExp = new RegExp('^\\d{5}$');
   if (zipRegExp.test(elem.value)) {
      elem.style.border = "1px solid #FF0000";
   }


}

function validateBirthdate(field) {
   var elem = document.getElementById(birthdate);
   if (elem.value < 13) {
      document.getElementById("birthdateMessage").innerHTML = "You must be 13 years or older to signup";
   }
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