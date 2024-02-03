// Storage Part (project_diagram.png - rose) - Initializer
class Storage { 
    static getCalorieLimit(defaultLimit = 2300) {   // All methods are static because we don't need multiple instances (local storage) 
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null) {    // To check whether there is already an item called calorieLimit in local storage
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultCalories = 0) { 
        let totalCalories;
        if (localStorage.getItem('totalCalories') === null) {    // To check whether there is already an item called totalCalories in local storage
            totalCalories = defaultCalories;
        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static updateTotalCalories(calories) {
        localStorage.setItem('totalCalories', calories);
    }

    static getMeals() { 
        let meals;
        if (localStorage.getItem('meals') === null) {    // To check whether there is already an item called meals in local storage
            meals = []; // This will be stored as stringified array
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));  // JSON.parse because meals is stored as stringified array
        }
        return meals;
    }

    static saveMeal(meal) {
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));    // JSON.stringify to stringify the meals array
    }

    static removeMeal(id) {
        const meals = Storage.getMeals();
        meals.forEach((meal, index) => {
            if (meal.id === id) {
                meals.splice(index, 1);
            }
        });
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static getWorkouts() { 
        let workouts;
        if (localStorage.getItem('workouts') === null) {    // To check whether there is already an item called workouts in local storage
            workouts = []; // This will be stored as stringified array
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));  // JSON.parse because workouts is stored as stringified array
        }
        return workouts;
    }

    static saveWorkout(workout) {
        const workouts = Storage.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));    // JSON.stringify to stringify the workouts array
    }

    static removeWorkout(id) {
        const workouts = Storage.getWorkouts();
        workouts.forEach((workout, index) => {
            if (workout.id === id) {
                workouts.splice(index, 1);
            }
        });
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static clearAll() {
        // To clear all from local storage
        // localStorage.clear();   

        // To let the calorieLimit in local storage we have to delete all other variables from local storage
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('meals');
        localStorage.removeItem('workouts');
    }
};

export default Storage;