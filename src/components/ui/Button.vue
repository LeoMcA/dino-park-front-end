<template>
  <button type="button" class="button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
};
</script>

<style>
.button {
  text-align: center;
  text-decoration: none;
  padding: 1.1em 2em;
  display: block;
  font-family: inherit;
  font-size: 0.9em;
  letter-spacing: 0.05em;
  border-radius: 2.5em;
  background-color: var(--blue-60);
  color: var(--white);
  border: 1px solid transparent;
  transition: background-color 0.1s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
}
.button:hover {
  background-color: var(--white);
  border-color: var(--blue-60);
  color: var(--blue-60);
  text-decoration: none;
}
.button img,
.button svg {
  vertical-align: middle;
  margin-right: 0.5em;
}

.button--secondary {
  border-color: var(--gray-50);
  background-color: transparent;
  color: var(--black);
}

.button--secondary:hover {
  background-color: var(--black);
  color: var(--white);
  border-color: transparent;
}
.button--secondary:hover svg > path {
  fill: var(--white);
}

.button--secondary:active {
  background-color: transparent;
  color: var(--black);
}

.button--action {
  color: var(--blue-60);
  border-color: var(--blue-60);
}
.button--action:hover {
  color: var(--white);
  background-color: var(--blue-60);
}

.button--text-only {
  background-color: transparent;
  border-color: transparent;
  color: var(--black);
}

.button--text-only:hover {
  background-color: transparent;
  border-color: transparent;
  color: var(--blue-60);
}

.button--small {
  padding: 0.5em 1.5em;
  font-size: 0.9em;
}

.button--full-width {
  width: 100%;
}

.button--less-padding {
  padding: 0.5em 1em;
}

.button--icon-only {
  padding: 0.5em;
  border-color: var(--gray-30);
  border-radius: var(--cardRadius);
}
.button--icon-only:hover {
  background-color: var(--gray-20);
  color: var(--black);
}
.button--icon-only img,
.button--icon-only svg {
  vertical-align: middle;
  margin-right: 0;
}

.button--icon-end {
  display: flex;
}
.button--icon-end img,
.button--icon-end svg {
  order: 10;
  margin-left: 0.75em;
  margin-right: 0;
}

.button[disabled] {
  color: var(--gray-50);
  background-color: var(--gray-20);
  border-color: transparent;
}
</style>
