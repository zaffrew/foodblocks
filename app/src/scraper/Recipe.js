export default function Recipe(URL) {
    this.URL = URL;
    this.name = "";
    this.ingredients = [];
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
    this.timeOfScrape = "";
    this.servings = "";

    this.loaded = {
        page: false,
        thumbnail: false,
    }
}
