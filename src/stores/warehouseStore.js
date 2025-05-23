import { defineStore } from 'pinia';

export const useWarehouseStore = defineStore('warehouse', {
    state: () => ({
        warehouses: [],
        isTableView: localStorage.getItem('viewMode') !== 'card',
        itemsPerPage: 10,
        currentPage: 1,
        searchField: '',
    }),
    getters: {
        paginatedWarehouses: (state) => {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + parseInt(state.itemsPerPage);
            return state.filteredWarehouses.slice(start, end);
        },
        filteredWarehouses: (state) => {
            let filtered = [...state.warehouses];
            if (state.searchQuery && state.searchField) {
                const query = state.searchQuery.toLowerCase();
                filtered = filtered.filter((warehouse) => {
                    const fieldValue = warehouse[state.searchField]?.toString().toLowerCase() || '';
                    return state.isLikeSearch
                        ? fieldValue.includes(query)
                        : fieldValue === query;
                });
            }
            return filtered;
        },
        resultCount: (state) => state.filteredWarehouses.length,
    },
    actions: {
        async fetchData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                console.log(data);
                this.warehouses = data.map((el) => ({
                    ...el,
                    hm: 1,
                    organization: el.company?.name,
                    address: `${el.address?.city} ${el.address?.state} ${el.address?.suite}`,
                    worker: '',
                    products: el.website ? 1 : 0,
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        toggleView(bool) {
            this.isTableView = bool;
            localStorage.setItem('viewMode', bool ? 'table' : 'card');
        },
        setCurrentPage(page) {
            this.currentPage = page;
        },
        setItemsPerPage(value) {
            this.itemsPerPage = value;
        },
        setSearchField(value) {
            this.searchField = value;
        },
    },
});