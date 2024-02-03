import '@fortawesome/fontawesome-free/js/all';  // To import the npm installed fontawesome packages // /js/all to get the JS
import { Modal, Collapse } from 'bootstrap';    // Modal are 'litle' windows (set daily limit)
import './css/bootstrap.css';
import './css/style.css';

// Tracalorie App

// Calorie Tracker Part (project_diagram.png - green)
import CalorieTracker from './Tracker';

// Meal and Workout Part (project_diagram.png - lilac)
import { Meal, Workout } from './Item';


// -----------------------------------------------------------------------------------------------------------
// App Part (project_diagram.png - yellow) - Initializer
class App {
    constructor() {
        this._tracker = new CalorieTracker(); // To create a new tracker
        this._loadEventListeners();
        this._tracker.loadItems();  // To call the loadItems method from the CalorieTracker part which loads all items from local storage
    }

    _loadEventListeners() {
        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));  // To add a new meal to the tracker via form // without .bind(this) .this would just refer to <form id="meal-form"> but it should refer to App {_tracker: CalorieTracker} (to the _newItem(type, e) method) - 'meal' after this is just a parameter we typed in to be able to distinguish between meal and workout
        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));    // To add a new workout to the tracker via form // without .bind(this) .this would just refer to <form id="meal-form"> but it should refer to App {_tracker: CalorieTracker} - 'workout' after this is just a parameter we typed in to be able to distinguish between meal and workout
        document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));   // To delete a meal item // without .bind(this) .this would just refer to the clicked icon but it should refer to App {_tracker: CalorieTracker} - 'meal' after this is just a parameter we typed in to be able to distinguish between meal and workout
        document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));   // To delete a meal item // without .bind(this) .this would just refer to the clicked icon but it should refer to App {_tracker: CalorieTracker} - 'meal' after this is just a parameter we typed in to be able to distinguish between meal and workout
        document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));   // To filter meals // without .bind(this) .this would just refer to the filter field but it should refer to App {_tracker: CalorieTracker} - 'meal' after this is just a parameter we typed in to be able to distinguish between meal and workout
        document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));   // To delete a meal item // without .bind(this) .this would just refer to the filter field but it should refer to App {_tracker: CalorieTracker} - 'meal' after this is just a parameter we typed in to be able to distinguish between meal and workout
        document.getElementById('reset').addEventListener('click', this._reset.bind(this));   // To reset the day // without .bind(this) .this would just refer to the reset button but it should refer to App {_tracker: CalorieTracker}
        document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));   // To be able to set a limit // without .bind(this) .this would just refer to the set limit button but it should refer to App {_tracker: CalorieTracker}
    }

    _newItem(type, e) {   // To call the private method newItem (type is the argument = meal or workout)
        e.preventDefault(); // To prevent the submission
        // console.log(this);
        const nameField = document.getElementById(`${type}-name`);    // To get the meal / workout name field from the input form + Add Meal / Workout
        const caloriesField = document.getElementById(`${type}-calories`);    // To get the meal / workout calories field from the input form + Add Meal / Workout

        // Validate inputs
        if (nameField.value === '' || caloriesField.value === '') {
            alert('Please fill in all fields');
            return;
        }

        // To add the typed in meal to the tracker
        if (type === 'meal') {
            const meal = new Meal(nameField.value, +caloriesField.value);   // To create a new meal - the plus sign changes the string-type caloriesValue to the number-type
            this._tracker.addMeal(meal); // To add the meal to the tracker
        } else {
            const workout = new Workout(nameField.value, +caloriesField.value);   // To create a new workout - the plus sign changes the string-type caloriesValue to the number-type
            this._tracker.addWorkout(workout); // To add the workout to the tracker
        }

        // To clear the form after submitting a new meal
        nameField.value = '';
        caloriesField.value = '';

        // To collapse the form after submission
        const collapseMeaOrWorkoutlDiv = document.getElementById(`collapse-${type}`);   // The div where the meal / workout form is in
        const bsCollapse = new Collapse(collapseMeaOrWorkoutlDiv, {    // We have access to it because of the boostrap JS file
            toggle: true
        })
    }; 

    // To remove items by clicking the delete (x) icon of the respective item
    _removeItem(type, e) {
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) { // if the clicked target is either the delete button or its icon 
            if (confirm('Are you sure?')) { // if we confirm to delete in the popped up window
                // console.log('delete');  // Just to check whether it works up to this point
                const id = e.target.closest('.card').getAttribute('data-id')   // .closest() is a method to get the closest whatever - in this case the closest '.card' to get the respective ID
                // console.log(id);    // Just to check whether it works - dea768b5cee138

                // To remove the item from the tracker - that all stats are updated
                type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);

                // To remove the item from the DOM
                e.target.closest('.card').remove()
            }
        }
    }

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        // console.log(text);   // Just for testing
        document.querySelectorAll(`#${type}-items .card`).forEach(item => {  // ${type}-items .card to get either the div with the id of meal-items or workout-items and then we select all cards (with the class of card) in #meal-items / #workout-items 
            const name = item.firstElementChild.firstElementChild.textContent;  // item is a card of meal-items / workout-items - then we go down in the hierarchy until we reach <h4 class="mx-1">${workout.name}</h4> where we get the name

            if (name.toLowerCase().indexOf(text) !== -1) {  // if there is an item whose name matches the text entered
                item.style.display = 'block';   // To show the matched item / card in the DOM
            } else {
                item.style.display = 'none';    // To not show the unmatched item / card in the DOM
            }
        });
    }

    _reset() {
        this._tracker.reset()   // To call the reset function of the tracker which resets all tracked values

        // To delete everything from the DOM
        document.getElementById('meal-items').innerHTML = '';   // To delete all items
        document.getElementById('workout-items').innerHTML = '';     // To delete all items
        document.getElementById('filter-meals').value = ''; // To clear the filter input field
        document.getElementById('filter-workouts').value = '';  // To clear the filter input field
    }

    _setLimit(e) {
        e.preventDefault();

        const limit = document.getElementById('limit');

        if (limit.value === '') {
            alert('Please add a limit')
            return
        }

        this._tracker.setLimit(+limit.value);   // To call the method with the argument of +limit.value (+ to chnage the string into a value)
        limit.value = '';   // To clear the limit form

        // To close the bootstrap modal (the window which pops up)
        const modalEl = document.getElementById('limit-modal'); // To get the element
        const modal = Modal.getInstance(modalEl);
        modal.hide();   // To collapse the modal after we typed in a value

    }
}

const app = new App();  // Initializer