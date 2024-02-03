// Storage Part (project_diagram.png - rose) - Initializer
import Storage from "./Storage";

// Calorie Tracker Part (project_diagram.png - green)
class CalorieTracker {
    constructor() { // The constructor runs immediately when the class is instanciated
        this._calorieLimit = Storage.getCalorieLimit(2000);  // To call the static method getCalorieLimit with a default value of 2000 (directly on the class Storage) // _ because we want to juse the property just in this class
        this._totalCalories = Storage.getTotalCalories(0);   // To call the static method getTotalCalories
        this._meals = Storage.getMeals();   // To get the meals array from local storage
        this._workouts = Storage.getWorkouts();   // To get the workout array from local storage
        this._displayCaloriesLimit();   // To display the calorie limit
        this._displayCaloriesTotal();   // To display the total calories
        this._displayCaloriesConsumed();   // To display all consumed calories
        this._displayCaloriesBurned();   // To display all burned calories
        this._displayCaloriesRemaining();   // To display the remaining calories
        this._displayCaloriesProgress();    // To display the calorie progress
        document.getElementById('limit').value = this._calorieLimit;   // To set the current calorie limit as blind text into the calorie limit input field
    }

    // Public Methods / API's (public API's to use outside of the class)
    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;   // Updates the totalCalories on memory
        Storage.updateTotalCalories(this._totalCalories);   // Updates the totalCalories on local storage
        Storage.saveMeal(meal); // To save the new meal to local storage
        this._displayNewMeal(meal);
        this._render(); // To render / update the values (total calories) - DOM
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;    // Updates the totalCalories on memory
        Storage.updateTotalCalories(this._totalCalories);   // Updates the totalCalories on local storage
        Storage.saveWorkout(workout); // To save the new meal to local storage
        this._displayNewWorkout(workout);
        this._render(); // To render / update the values (total calories) - DOM
    }

    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);  // Loops through the meals array - each element is an meal object which has an id key-value pair - findIndex() gives -1 if it doesn't match
        if (index !== -1) { // For the case that a meal with the correct ID was found
            const meal = this._meals[index];    // To separat the resprective meal from the _meals array
            this._totalCalories -= meal.calories;   // To subtract the calories of the meal which will be deleted
            Storage.updateTotalCalories(this._totalCalories);   // Updates the totalCalories on local storage
            this._meals.splice(index, 1);   // To delete the respective meal from the _meals array
            Storage.removeMeal(id); // To call the method removeMeal
            this._render(); // To render / update the values
        }
    }

    removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);  // Loops through the workouts array - each element is an workout object which has an id key-value pair - findIndex() gives -1 if it doesn't match
        if (index !== -1) { // For the case that a workout with the correct ID was found
            const workout = this._workouts[index];    // To separat the resprective workout from the _workouts array
            this._totalCalories += workout.calories;   // To subtract the calories of the workout which will be deleted
            Storage.updateTotalCalories(this._totalCalories);   // Updates the totalCalories on local storage
            this._workouts.splice(index, 1);   // To delete the respective workout from the _workouts array
            Storage.removeWorkout(id); // To call the method removeWorkout
            this._render(); // To render / update the values
        }
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }

    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;  // To set the limit
        Storage.setCalorieLimit(calorieLimit);  // To set the limit to local storage
        this._displayCaloriesLimit();   // To display the limit
        this._render(); // To render / update the DOM
    }

    loadItems() {
        this._meals.forEach(meal => this._displayNewMeal(meal));
        this._workouts.forEach(workout => this._displayNewWorkout(workout));
    }

    // Private Methods _
    _displayCaloriesTotal() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumedCalories = this._meals.reduce(    // To loop through the array meals which has all Meal objects
            (total, meal) => total + meal.calories, // To add all calories together
            0   // To initialize that total starts at 0
        );  
        caloriesConsumedEl.innerHTML = consumedCalories;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burnedCalories = this._workouts.reduce(    // To loop through the array meals which has all Meal objects
            (total, workout) => total + workout.calories, // To add all calories together
            0   // To initialize that total starts at 0
        );  
        caloriesBurnedEl.innerHTML = burnedCalories;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const caloriesProgressEl = document.getElementById('calorie-progress');
        const remainingCalories = this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.innerHTML = remainingCalories;

        if (remainingCalories <= 0) {    // To toggle the class between bg-light (if the remainig calories are > 0) and else bg-danger
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            caloriesProgressEl.classList.remove('bg-success');
            caloriesProgressEl.classList.add('bg-danger');
        } else {
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesProgressEl.classList.add('bg-success');
            caloriesProgressEl.classList.remove('bg-danger');
        }
    }

    _displayCaloriesProgress() {
        const caloriesProgressEl = document.getElementById('calorie-progress');
        const percentageOfCalorieProgress = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentageOfCalorieProgress, 100);   // .min takes the lower value of percentageOfCalorieProgress and 100 - for the case percentageOfCalorieProgress is geater than 100
        caloriesProgressEl.style.width = `${width}%`;
    }

    _displayNewMeal(meal) { // To display new added meal items
        const mealsEl = document.getElementById('meal-items');  // The div where all meal items goes in
        const mealEl = document.createElement('div');   // To create an element for the new added meal
        mealEl.classList.add('card', 'my-2');  // To add the needed classes to the new created div
        mealEl.setAttribute('data-id', meal.id);    // To create an attribute with the name data-id with the value meal.id to be able to chose the respective div later
        mealEl.innerHTML = `              
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
          ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        </div>`;    // This is the hardcoded code block from the HTML file

        mealsEl.appendChild(mealEl);    // To finally append the new createt meal item to the meal-items div
    }

    _displayNewWorkout(workout) { // To display new added meal items
        const workoutsEl = document.getElementById('workout-items');  // The div where all workout items goes in
        const workoutEl = document.createElement('div');   // To create an element for the new added workout
        workoutEl.classList.add('card', 'my-2');  // To add the needed classes to the new created div
        workoutEl.setAttribute('data-id', workout.id);    // To create an attribute with the name data-id with the value workout.id to be able to chose the respective div later
        workoutEl.innerHTML = `              
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
          ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        </div>`;    // This is the hardcoded code block from the HTML file

        workoutsEl.appendChild(workoutEl);    // To finally append the new createt meal item to the meal-items div
    }

    _render() { // To render / update the values (total calories...) - DOM
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

export default CalorieTracker;