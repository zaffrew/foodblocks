export default function Recipe(URL) {
    this.URL = URL;
    this.source = ''
    this.name = "";
    this.ingredients = [];
    this.cleanIngredients = [];
    this.nutrition = {
        calories: '',
        totalFat: '',
        saturatedFat: '',
        carbohydrates: '',
        protein: '',
        cholesterol: '',
        sodium: '',
    };
    this.author = "";
    this.description = "";
    this.directions = [];
    this.image = "";
    this.time = {
        prep: "",
        cook: "",
        active: "",
        inactive: "",
        ready: "",
        total: ""
    };
    this.servings = "";

    this.loaded = {
        page: false,
        thumbnail: false,
    }
}
