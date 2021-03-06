<template>
  <main class="profile container">
    <div
      :class="
        'profile__section' +
          (this.editing === 'personal-info' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-personal-info" class="profile__anchor"></a>
      <EditPersonalInfo
        v-if="this.editing === 'personal-info'"
        v-bind="{
          staffInformation,
          initialValues: {
            alternativeName,
            description,
            firstName,
            lastName,
            funTitle,
            location,
            primaryUsername,
            picture,
            pronouns,
            timezone,
          },
        }"
      />
      <ViewPersonalInfo
        v-else
        v-bind="{
          alternativeName,
          staffInformation,
          primaryUsername,
          primaryEmail,
          phoneNumbers,
          timezone,
          firstName,
          lastName,
          pronouns,
          funTitle,
          picture,
          location,
          description,
          uris,
          userOnOwnProfile,
        }"
      />
    </div>
    <ProfileNav
      :links="profileNav"
      :onStaffProfile="staffInformation.staff.value"
    ></ProfileNav>

    <section v-if="staffInformation.staff.value" class="profile__section">
      <a id="nav-relations" class="profile__anchor"></a>
      <ViewColleagues :username="primaryUsername.value"></ViewColleagues>
    </section>

    <section
      v-if="identitiesWrapper.anyIdentity() || this.editing === 'identities'"
      :class="
        'profile__section' +
          (this.editing === 'identities' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-identities" class="profile__anchor"></a>
      <EditIdentities
        v-if="this.editing === 'identities'"
        v-bind="{ identities: identitiesWrapper }"
      />
      <ViewIdentities
        v-else
        v-bind="{ identities: identitiesWrapper, userOnOwnProfile }"
      />
    </section>
    <EmptyCard
      v-else
      nav="identities"
      title="Identities"
      :message="
        userOnOwnProfile
          ? `You haven't added any identities yet.`
          : `No identities have been added yet.`
      "
    >
      <template v-slot:header>
        <EditButton
          v-if="userOnOwnProfile"
          section="identities"
          sectionId="identities"
        ></EditButton>
      </template>
    </EmptyCard>

    <section
      :class="
        'profile__section' +
          (this.editing === 'contact' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-contact" class="profile__anchor"></a>
      <EditContact
        v-if="this.editing === 'contact'"
        v-bind="{
          username: primaryUsername.value,
          initialPrimaryEmail: primaryEmail,
          initialPhoneNumbers: phoneNumbers,
          initialValues: {
            primaryEmail,
            phoneNumbers,
            uris,
          },
        }"
      />
      <ViewContact
        v-else
        v-bind="{ primaryEmail, phoneNumbers, userOnOwnProfile }"
      ></ViewContact>
    </section>

    <section
      v-if="sections.accounts"
      :class="
        'profile__section' +
          (this.editing === 'accounts' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-accounts" class="profile__anchor"></a>
      <EditAccounts
        v-if="this.editing === 'accounts'"
        v-bind="{
          username: primaryUsername.value,
          initialValues: { uris },
          initialUris: uris,
        }"
      ></EditAccounts>
      <ViewAccounts v-else v-bind="{ uris, userOnOwnProfile }"></ViewAccounts>
    </section>
    <EmptyCard
      v-else
      nav="accounts"
      title="Accounts"
      :message="
        userOnOwnProfile
          ? `You haven't added any accounts yet.`
          : `No accounts have been added yet.`
      "
    >
      <template v-slot:header>
        <EditButton
          v-if="userOnOwnProfile"
          section="accounts"
          sectionId="accounts"
        ></EditButton>
      </template>
    </EmptyCard>

    <section
      v-if="sections.languages"
      :class="
        'profile__section' +
          (this.editing === 'languages' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-languages" class="profile__anchor"></a>
      <EditLanguages
        v-if="this.editing === 'languages'"
        v-bind="{
          username: primaryUsername.value,
          initialValues: { languages },
          initialLanguages: languages,
        }"
      ></EditLanguages>
      <ViewLanguages
        v-else
        v-bind="{ languages, userOnOwnProfile }"
      ></ViewLanguages>
    </section>
    <EmptyCard
      v-else
      nav="languages"
      title="Languages"
      :message="
        userOnOwnProfile
          ? `You haven't added any languages yet.`
          : `No languages have been added yet.`
      "
    >
      <template v-slot:header>
        <EditButton
          v-if="userOnOwnProfile"
          section="languages"
          sectionId="languages"
        ></EditButton>
      </template>
    </EmptyCard>

    <section
      v-if="sections.tags"
      :class="
        'profile__section' +
          (this.editing === 'tags' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-tags" class="profile__anchor"></a>
      <EditTags
        v-if="this.editing === 'tags'"
        v-bind="{
          username: primaryUsername.value,
          initialValues: { tags },
          initialTags: tags,
        }"
      ></EditTags>
      <ViewTags v-else v-bind="{ tags, userOnOwnProfile }"></ViewTags>
    </section>
    <EmptyCard
      v-else
      nav="tags"
      title="Tags"
      :message="
        userOnOwnProfile
          ? `You haven't added any tags yet.`
          : `No tags have been added yet.`
      "
    >
      <template v-slot:header>
        <EditButton
          v-if="userOnOwnProfile"
          section="tags"
          sectionId="tags"
        ></EditButton>
      </template>
    </EmptyCard>

    <section
      v-if="sections.keys"
      :class="
        'profile__section' +
          (this.editing === 'keys' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-keys" class="profile__anchor"></a>
      <EditKeys
        v-if="this.editing === 'keys'"
        v-bind="{
          username: primaryUsername.value,
          sshPublicKeys,
          pgpPublicKeys,
        }"
      />
      <ViewKeys
        v-else
        v-bind="{ pgpPublicKeys, sshPublicKeys, userOnOwnProfile }"
      ></ViewKeys>
    </section>
    <EmptyCard
      v-else
      nav="keys"
      title="Keys"
      :message="
        userOnOwnProfile
          ? `You haven't added any keys yet.`
          : `No keys have been added yet.`
      "
    >
      <template v-slot:header>
        <EditButton
          v-if="userOnOwnProfile"
          section="keys"
          sectionId="keys"
        ></EditButton>
      </template>
    </EmptyCard>

    <section
      v-if="
        Object.keys(accessInformation.mozilliansorg.values || {}).length > 0
      "
      class="profile__section"
    >
      <a id="nav-access-groups" class="profile__anchor"></a>
      <ViewAccessGroups
        v-bind="{ accessInformation, userOnOwnProfile }"
      ></ViewAccessGroups>
    </section>
    <EmptyCard
      v-else
      nav="access-groups"
      title="Access Groups"
      message="Support for Access Group management is coming soon."
    >
    </EmptyCard>
  </main>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import EditButton from '@/components/profile/edit/EditButton.vue';
import EditAccounts from './edit/EditAccounts.vue';
import EditContact from './edit/EditContact.vue';
import EditKeys from './edit/EditKeys.vue';
import EditLanguages from './edit/EditLanguages.vue';
import EditIdentities from './edit/EditIdentities.vue';
import EditPersonalInfo from '@/components/profile/edit/EditPersonalInfo.vue';
import EditTags from './edit/EditTags.vue';
import EmptyCard from '@/components/profile/view/EmptyCard.vue';
import Identities from '@/assets/js/identities';
import ProfileNav from './ProfileNav.vue';
import ViewAccessGroups from './view/ViewAccessGroups.vue';
import ViewAccounts from './view/ViewAccounts.vue';
import ViewContact from './view/ViewContact.vue';
import ViewKeys from './view/ViewKeys.vue';
import ViewIdentities from './view/ViewIdentities.vue';
import ViewLanguages from './view/ViewLanguages.vue';
import ViewPersonalInfo from './view/ViewPersonalInfo.vue';
import ViewColleagues from './view/ViewColleagues.vue';
import ViewTags from './view/ViewTags.vue';

export default {
  name: 'Profile',
  props: {
    alternativeName: Object,
    accessInformation: Object,
    description: Object,
    editing: String,
    firstName: Object,
    funTitle: Object,
    identities: Object,
    languages: Object,
    lastName: Object,
    location: Object,
    pgpPublicKeys: Object,
    phoneNumbers: Object,
    picture: Object,
    primaryEmail: Object,
    pronouns: Object,
    sshPublicKeys: Object,
    staffInformation: Object,
    tags: Object,
    timezone: Object,
    uris: Object,
    uuid: Object,
    primaryUsername: Object,
  },
  mixins: [AccountsMixin],
  components: {
    EditAccounts,
    EditButton,
    EditContact,
    EditKeys,
    EditIdentities,
    EditLanguages,
    EditPersonalInfo,
    EditTags,
    EmptyCard,
    ProfileNav,
    ViewAccessGroups,
    ViewAccounts,
    ViewContact,
    ViewKeys,
    ViewIdentities,
    ViewLanguages,
    ViewPersonalInfo,
    ViewColleagues,
    ViewTags,
  },
  methods: {
    alphabetise(array) {
      return array ? array.sort() : null;
    },
  },
  computed: {
    sections() {
      return {
        relations: this.staffInformation.staff,
        contact: true,
        accounts:
          this.editing === 'accounts' ||
          (this.uris.values &&
            Object.entries(this.uris.values).filter(([k]) =>
              this.isAccountKey(k),
            ).length > 0 &&
            true) ||
          false,
        languages:
          this.editing === 'languages' ||
          (this.languages.values &&
            Object.entries(this.languages.values).length > 0 &&
            true) ||
          false,
        tags:
          this.editing === 'tags' ||
          (this.tags.values &&
            Object.entries(this.tags.values).length > 0 &&
            true) ||
          false,
        keys:
          this.editing === 'keys' ||
          ((this.pgpPublicKeys.values || this.sshPublicKeys.values) &&
            (Object.entries(this.pgpPublicKeys.values).length > 0 ||
              Object.entries(this.sshPublicKeys.values).length > 0)) ||
          false,
      };
    },
    userOnOwnProfile() {
      return this.$store.state.user.uuid.value === this.uuid.value;
    },
    identitiesWrapper() {
      return new Identities(this.identities);
    },
  },
  mounted() {
    if (this.$route.query.identityAdded) {
      let content = null;
      switch (this.$route.query.identityAdded) {
        case 'github':
          content = 'Saved GitHub identity';
          break;
        case 'bugzilla':
          content = 'Saved Bugzilla identity';
          break;
        case 'error':
          content = 'Failed to verify identity';
          break;
        default:
          content = 'Unkown error while verifying an identity';
      }
      this.$router.push({
        name: 'Profile',
        params: { username: this.$store.state.user.primaryUsername.value },
        hash: '#nav-identites',
      });
      this.$root.$emit('toast', { content });
      // Ideally our router should handle this.
      setTimeout(() => {
        const el = document.getElementById('nav-identities');
        if (el) {
          el.scrollIntoView();
        }
      }, 500);
    }
  },
  data() {
    return {
      profileNav: [
        {
          id: 'nav-relations',
          iconId: 'org-chart',
          label: 'Colleagues',
          staffOnly: true,
        },
        {
          id: 'nav-identities',
          iconId: 'chain',
          label: 'Identities',
        },
        {
          id: 'nav-contact',
          iconId: 'envelope',
          label: 'Contact',
        },
        {
          id: 'nav-accounts',
          iconId: 'at-sign',
          label: 'Accounts',
        },
        {
          id: 'nav-languages',
          iconId: 'world',
          label: 'Languages',
        },
        {
          id: 'nav-tags',
          iconId: 'bookmark',
          label: 'Tags',
        },
        {
          id: 'nav-keys',
          iconId: 'keys',
          label: 'Keys',
        },
        {
          id: 'nav-access-groups',
          iconId: 'lock',
          label: 'Access Groups',
        },
      ],
    };
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 2em;
    align-items: start;
    padding: 2em;
  }
}

.profile__section {
  border: 4px solid var(--gray-50);
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
  position: relative;
}
@supports (--key: value) {
  .profile__section {
    border-color: transparent;
    box-shadow: var(--shadowCard);
  }
}
.profile__section--disabled {
  background-color: var(--gray-20);
  color: var(--gray-50);
  border: 2px solid var(--gray-30);
}
.profile__section--editing {
  border-color: var(--blue-60);
}
.profile__section:first-child {
  grid-column: 1 / -1;
}
.profile__section h3 {
  margin: 1.5em 0 1em;
}
.profile__section .reporting-structure h3 {
  margin-top: 0;
}

.profile__section-header {
  padding: 1.5em;
  margin: -1.5em -1.5em 1.5em -1.5em;
  border-bottom: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.profile__section-header h2 {
  margin: 0 0 0.75em 0;
  width: 100%;
}
@media (min-width: 35em) {
  .profile__section-header h2 {
    margin: 0;
    width: auto;
  }
}

.profile__anchor {
  top: -13.5em;
  position: relative;
}
@media (min-width: 57.5em) {
  .profile__anchor {
    top: -7em;
  }
}
</style>
