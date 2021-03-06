<template>
  <EditMutationWrapper
    :editVariables="{
      phoneNumbers,
    }"
    :initialValues="initialValues"
    :novalidate="true"
    formName="Edit contact information"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Contact</h2>
    </header>
    <div class="edit-contact">
      <div class="edit-contact__header">
        <h3>Email</h3>
      </div>
      <div class="edit-contact__item">
        <Select
          class="options--chevron"
          label="Primary email adddress type"
          id="field-email-primary-type"
          :options="[{ label: 'Primary', value: 'Primary' }]"
          :disabled="true"
        />
        <label for="field-email-primary-value" class="visually-hidden"
          >Email 1</label
        >
        <input
          type="email"
          id="field-email-primary-value"
          :value="primaryEmail.value"
          placeholder="Email address"
          disabled
        />
        <PrivacySetting
          label="Primary email address privacy settings"
          id="field-email-primary-privacy"
          profileFieldName="primaryEmail"
          :profileFieldObject="primaryEmail"
          :disabled="true"
        />
        <Checkbox
          :checked="true"
          label="Show in Contact Me button"
          class="edit-contact__set-as-contact"
          :disabled="true"
        />
        <hr role="presentation" />
      </div>
      <div class="edit-contact__info">Email editing coming soon</div>
      <div class="edit-contact__header">
        <h3>Phone</h3>
        <PrivacySetting
          class="privacy-setting--large"
          label="Phone number 1 privacy settings"
          id="field-phone-number-1-privacy"
          profileFieldName="phoneNumbers"
          :profileFieldObject="phoneNumbers"
          :collapsedShowLabel="true"
        />
      </div>
      <div
        v-for="({ k, v: number }, index) in phoneNumbers.values"
        :key="index"
        class="edit-contact__item"
      >
        <Button
          class="button--icon-only"
          v-on:click="() => deletePhoneNumber(index)"
        >
          <Icon id="x" :width="17" :height="17"></Icon>
          <span class="visually-hidden">Remove phone number</span>
        </Button>
        <Select
          class="options--chevron"
          :label="`Phone number ${index} type`"
          :id="`field-phone-${index}-type`"
          :options="phoneNumberLabels(k, index)"
          v-model="phoneNumbers.values[index].k"
        />
        <label :for="`field-phone-${index}-value`" class="visually-hidden"
          >Phone number {{ `${index + 1}` }}</label
        >
        <input
          :id="`field-phone-${index}-value`"
          class="edit-contact__input-w-error"
          type="tel"
          pattern="\+[1-9][0-9 \-]*"
          placeholder="+1 163 7826 3789 (Phone number)"
          v-model="phoneNumbers.values[index].v"
        />
        <span class="edit-contact__error-msg">Enter country code +[1-9]</span>
        <Checkbox
          @input="(newValue) => togglePhoneNumberContactMe(newValue, index)"
          :checked="destructPhoneKey(k).contact"
          label="Show in Contact Me button"
          class="edit-contact__set-as-contact"
        />
        <hr role="presentation" />
      </div>
      <hr role="presentation" />
      <Button
        class="edit-contact__add-more button--secondary button--action"
        :disabled="phoneNumbers.values.length >= MAX_NUMBERS"
        v-on:click="addPhoneNumber"
        ><Icon id="plus" :width="16" :height="16" />Add Phone</Button
      >
    </div>
  </EditMutationWrapper>
</template>

<script>
import Checkbox from '@/components/ui/Checkbox.vue';
import PhoneNumbersMixin from '@/components/_mixins/PhoneNumbersMixin.vue';
import Button from '@/components/ui/Button.vue';
import EditMutationWrapper from './EditMutationWrapper.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Icon from '@/components/ui/Icon.vue';
import Select from '@/components/ui/Select.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  name: 'EditContact',
  props: {
    initialPrimaryEmail: Object,
    initialPhoneNumbers: Object,
    initialUris: Object,
    initialValues: Object,
    editVariables: Object,
  },
  mixins: [PhoneNumbersMixin],
  components: {
    Button,
    Checkbox,
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Select,
  },
  mounted() {
    this.$refs.header.focus();
  },
  methods: {
    addPhoneNumber() {
      const count = this.phoneNumbers.values.length;
      this.phoneNumbers.values.push({
        k: this.constructPhoneKey({ view: 'Mobile', num: count }),
        v: '',
      });
    },
    deletePhoneNumber(index) {
      if (this.phoneNumbers.values.length > index) {
        this.phoneNumbers.values.splice(index, 1);
      }
    },
    toggleContactMe(newValue, index, list, destruct, construct) {
      const field = destruct(list[index].k, index);
      field.contact = newValue;
      list[index].k = construct(field);
    },
    togglePhoneNumberContactMe(newValue, index) {
      this.toggleContactMe(
        newValue,
        index,
        this.phoneNumbers.values,
        this.destructPhoneKey,
        this.constructPhoneKey,
      );
    },
    labels(k, index, desctruct, construct, allOptions) {
      const current = desctruct(k).view;
      const names = allOptions.filter((name) => name !== current);
      const options = names.map((label) => {
        return {
          label,
          value: construct({ view: label, num: index }),
        };
      });
      options.push({ label: current, value: k });
      return options;
    },
    phoneNumberLabels(k, index) {
      return this.labels(
        k,
        index,
        this.destructPhoneKey,
        this.constructPhoneKey,
        ['Primary', 'Personal', 'Work', 'Home'],
      );
    },
  },
  data() {
    const {
      values: numbers,
      metadata: { display: numbersDisplay },
    } = this.initialPhoneNumbers;
    const {
      value: email,
      metadata: { display: emailDisplay },
    } = this.initialPrimaryEmail;
    return {
      MAX_NUMBERS: 5,
      primaryEmail: {
        value: email,
        display: emailDisplay || DISPLAY_LEVELS.private.value,
      },
      phoneNumbers: {
        values: Object.entries(numbers || {}).map(([k, v]) => {
          return { k, v };
        }),
        display: numbersDisplay || DISPLAY_LEVELS.private.value,
      },
    };
  },
};
</script>

<style>
.edit-contact__item {
  display: grid;
  grid-template-columns: auto 1fr 3fr auto;
  grid-gap: 1em;
}
@media (min-width: 57.5em) {
  .edit-contact__item {
    grid-template-columns: 3em 1fr 3fr auto;
  }
}
.edit-contact__item .button--icon-only {
  border-color: transparent;
  background-color: transparent;
  display: inline-block;
  vertical-align: baseline;
  margin-right: 0.5em;
  color: var(--blue-60);
  padding: 0;
}
.edit-contact__item .button--icon-only:hover {
  color: var(--black);
  background-color: transparent;
}
.edit-contact__item .options:first-child {
  grid-column: 2 / 3;
}
.edit-contact__item .options button {
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.edit-contact__item input[type='text'],
.edit-contact__item input[type='email'],
.edit-contact__item input[type='tel'],
.edit-contact__item input[type='password'] {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  grid-column: 2 / 4;
}
.edit-contact__item input[type='text']:hover,
.edit-contact__item input[type='email']:hover,
.edit-contact__item input[type='tel']:hover,
.edit-contact__item input[type='password']:hover,
.edit-contact__item input[type='text']:focus,
.edit-contact__item input[type='email']:focus,
.edit-contact__item input[type='tel']:focus,
.edit-contact__item input[type='password']:focus {
  border: 1px solid var(--blue-60);
}
@media (min-width: 57.5em) {
  .edit-contact__item input[type='text'],
  .edit-contact__item input[type='email'],
  .edit-contact__item input[type='tel'] {
    grid-column: 3 / 4;
  }
}
.edit-contact__item input[type='text'][disabled],
.edit-contact__item input[type='email'][disabled],
.edit-contact__item input[type='tel'][disabled] {
  color: inherit;
  background-color: var(--white);
  border: 2px solid var(--gray-20);
  cursor: not-allowed;
  opacity: 1;
  color: var(--gray-60);
  height: calc(100% - 4px); /* account for border */
}
.edit-contact__set-as-contact,
.edit-contact__item hr {
  grid-column: 2 / 5;
}
.edit-contact__item hr {
  margin: 1em 0;
}
.edit-contact__info {
  text-align: right;
  color: var(--gray-50);
}
.edit-contact__set-as-contact input {
  display: inline-block;
  vertical-align: baseline;
  margin-right: 1em;
}
.edit-contact__add-more {
  grid-column: 1 / 5;
  justify-self: end;
  margin-left: auto;
}
.edit-contact__header {
  display: flex;
}
.edit-contact__header .privacy-setting {
  margin-left: auto;
}
.edit-contact__header ~ .edit-contact__header {
  margin: 3em 0 1em;
}
input.edit-contact__input-w-error ~ .edit-contact__error-msg {
  grid-column: 2 / 4;
  color: var(--neon-red);
  margin-top: -0.5em;
  font-size: small;
}
@media (min-width: 57.5em) {
  input.edit-contact__input-w-error ~ .edit-contact__error-msg {
    grid-column: 3 / 4;
  }
}
input:focus:invalid.edit-contact__input-w-error ~ .edit-contact__error-msg,
input:valid.edit-contact__input-w-error ~ .edit-contact__error-msg {
  display: none;
}
input:invalid:not(focus).edit-contact__input-w-error
  ~ .edit-contact__error-msg {
  display: initial;
}
input:invalid:not(focus).edit-contact__input-w-error {
  border-color: var(--neon-red);
}
.edit-contact__item__info {
  grid-column: 2 / 4;
  color: var(--gray-60);
  font-size: small;
  margin-left: 3em;
  margin-bottom: 1em;
}
@media (min-width: 57.5em) {
  .edit-contact__item__info {
    margin-left: 1em;
  }
}
</style>
