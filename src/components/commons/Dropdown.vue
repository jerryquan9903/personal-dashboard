<template>
  <div class="">
    <Menu as="div" class="inline-block justify-center">
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
            mt-1
            origin-top-right
            bg-bluegray-800
            divide-y divide-gray-100
            rounded-sm
            shadow-lg
            ring-1 ring-black ring-opacity-5
            focus:outline-none
          "
          :class="menuWidth"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-bluegray-700' : '',
                  'group flex rounded-sm items-center w-full px-2 py-2 text-sm',
                ]"
              >
                Edit
              </button>
            </MenuItem>
          </div>
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
  props: ['menuWidth'],
};
</script>
