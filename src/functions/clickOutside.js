const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {

      // check that click is outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {

        // if it is, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

export default clickOutside;