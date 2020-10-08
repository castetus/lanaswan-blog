export const state = () => ({
    categories: []
  });
  
  export const mutations = {
    setCategories(state, cats){
      state.categories = cats;
    }
  };
  
  export const actions = {
    setAllCategories(vuexContext, cats){
      vuexContext.commit('setCategories', cats);
    }
  };
  
  export const getters = {
    loadedCategories(state){
      return state.categories;
    }
  };