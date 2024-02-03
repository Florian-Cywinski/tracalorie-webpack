// Meal and Workout Part (project_diagram.png - lilac)
class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2)   // To generate a 14-digit hexadecimal number as an ID
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2)   // To generate a 14-digit hexadecimal number as an ID
        this.name = name;
        this.calories = calories;
    }
}

export { Meal, Workout };