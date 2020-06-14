import {store} from '../state/State'

export default function getActiveFilters() {
    return store.getState().user_info.filters.filter(({active}) => active).map(filterObj => filterObj.name);
}
