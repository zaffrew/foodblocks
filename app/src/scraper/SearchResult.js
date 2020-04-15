export default function SearchResult(query, source, num, filters) {
    this.source = source;
    this.query = query;
    this.filters = filters;
    this.num = num;

    this.results = [];

    this.loaded = '';
}
