<template>
  <div class="">
    <Menu as="div" class="flex justify-center">
      <MenuButton
        class="
          flex
          justify-center
          w-full
          h-full
          text-sm
          rounded-r-sm
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-opacity-75
        "
      >
        <slot />
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="
            absolute
            left-0
            top-full
            mt-2
            origin-top-left
            bg-bluegray-800
            divide-y divide-bluegray-700
            rounded-sm
            shadow-lg
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
          :class="menuWidth"
        >
          <template v-for="item in data" :key="item">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-bluegray-700' : '',
                    'group flex rounded-sm items-center w-full px-2 py-2 text-sm',
                  ]"
                >
                  {{item.name}}
                </button>
              </MenuItem>
            </div>
          </template>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  props: ["menuWidth", "data"],
};
</script>
