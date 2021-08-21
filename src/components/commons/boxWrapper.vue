<template>
  <div class="flex w-full h-full">
    <div class="m-2 rounded-md w-full bg-bluegray-700 shadow-sm">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "box-wrapper",
};
</script>

<style>
</style>