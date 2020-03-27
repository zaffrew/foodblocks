export default function SearchResult(query, source, num) {
    this.source = source;
    this.query = query;
    this.num = num;

    this.loaded = false;
    this.results = [];
}
