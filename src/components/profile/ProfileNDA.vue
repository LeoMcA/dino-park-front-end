<template>
  <strong v-if="display" class="profile__nda-active">NDA Active</strong>
</template>

<script>
export default {
  name: 'ProfileNDA',
  props: {
    accessInformation: Object,
  },
  computed: {
    display() {
      return 'nda' in (this.accessInformation.mozilliansorg.values || {});
    },
  },
};
</script>

<style>
.profile__nda-active {
  font-weight: 700;
  color: var(--gray-50);
  text-transform: uppercase;
  display: block;
  line-height: 1.5em;
  margin-top: -2.75em;
  margin-bottom: 1.25em;
}
</style>
