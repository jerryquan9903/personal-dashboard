<template>
  <div class="">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="
          flex
          justify-center
          items-center
          w-full
          text-white
          rounded-sm
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-opacity-75
        "
      >
        <slot name="button" />
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute z-10 left-0 max-w-sm px-4 mt-2 sm:px-0 lg:max-w-3xl"
          :class="menuWidth"
        >
          <div
            class="
              overflow-hidden
              rounded
              deep-shadow
              ring-1 ring-black ring-opacity-5
            "
          >
            <div class="bg-bluegray-800 p-2 lg:grid-cols-2">
              <slot name="content" />
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

export default {
  components: { Popover, PopoverButton, PopoverPanel },
  props: ["menuWidth", "data"],
  data() {
    return {};
  },
};
</script>