import filters from "../../data/filters.json"; 

export const INITIAL_FILTER = prepareFilterState();

function prepareFilterState() {
  const state = {};
  for (let filterType in filters) {
    state[filterType] = filters[filterType].map((filterName) => {
      return {
        name: filterName,
        isSelected: false
      };
    });
  }
  state.sort = "";
  return state;
}

function resetFilter(filter) {
  return INITIAL_FILTER;
}

function updateBrandFilter(filter, { brand: brandName }) {
  const filterCopy = { ...filter };
  filterCopy.brands = filterCopy.brands.map((brand) => {
    if (brandName === brand.name) {
      const brandCopy = { ...brand };
      brandCopy.isSelected = !brandCopy.isSelected;
      return brandCopy;
    }
    return brand;
  });
  return filterCopy;
}

function updateIdealForFilter(filter, { idealFor: idealForName }) {
  const filterCopy = { ...filter };
  filterCopy.idealFor = filterCopy.idealFor.map((idealFor) => {
    if (idealForName === idealFor.name) {
      const idealForCopy = { ...idealFor };
      idealForCopy.isSelected = !idealForCopy.isSelected;
      return idealForCopy;
    }
    return idealFor;
  });
  return filterCopy;
}

function updateSizeFilter(filter, { size: sizeCode }) {
  const filterCopy = { ...filter };
  filterCopy.sizes = filterCopy.sizes.map((size) => {
    if (sizeCode === size.name) {
      const sizeCopy = { ...size };
      sizeCopy.isSelected = !sizeCopy.isSelected;
      return sizeCopy;
    }
    return size;
  });
  return filterCopy;
}

function updateSort(filter, { sortType }) {
  const filterCopy = { ...filter };
  filterCopy.sort = sortType === "ASC" ? "LOW_TO_HIGH" : "HIGH_TO_LOW";
  return filterCopy;
}

export function filterReducer(filter, action) {
  switch (action.type) {
    case "UPDATE_BRAND":
      return updateBrandFilter(filter, action.payload);
    case "UPDATE_IDEAL_FOR":
      return updateIdealForFilter(filter, action.payload);
    case "UPDATE_SIZE":
      return updateSizeFilter(filter, action.payload);
    case "TOGGLE_SORT":
      return updateSort(filter, action.payload);
    case "CLEAR_FILTER":
      return resetFilter(filter);
    default:
      return filter;
  }
}
