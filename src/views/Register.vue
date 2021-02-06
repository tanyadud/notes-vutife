<template>
  <!--  <form class="card auth-card" @submit.prevent="submitHandler">-->
  <!--    <div class="card-content">-->
  <!--      <span class="card-title">Зарегистрируйтесь</span>-->
  <!--      <div class="input-field">-->
  <!--        <input-->
  <!--          id="email"-->
  <!--          type="text"-->
  <!--          v-model.trim="email"-->
  <!--          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"-->
  <!--        >-->
  <!--        <label for="email">Email</label>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-if="$v.email.$dirty && !$v.email.required"-->
  <!--        >Поле E-mail не должно быть пустым</small>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-else-if="$v.email.$dirty && !$v.email.email"-->
  <!--        >Введите корректный E-mail</small>-->
  <!--      </div>-->
  <!--      <div class="input-field">-->
  <!--        <input-->
  <!--          id="password"-->
  <!--          type="password"-->
  <!--          v-model="password"-->
  <!--          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"-->
  <!--        >-->
  <!--        <label for="password">Пароль</label>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-if="$v.password.$dirty && !$v.password.required"-->
  <!--        >Введите пароль</small>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-else-if="$v.password.$dirty && !$v.password.minLength"-->
  <!--        >-->
  <!--          Минимальное количество символов {{ $v.password.$params.minLength.min }}. Сейчас оно {{ password.length }}-->
  <!--        </small>-->
  <!--      </div>-->
  <!--      <div class="input-field">-->
  <!--        <input-->
  <!--          id="name"-->
  <!--          type="text"-->
  <!--          v-model="name"-->
  <!--          :class="{invalid: $v.name.$dirty && !$v.name.minLength}"-->
  <!--        >-->
  <!--        <label for="name">Имя</label>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-if="$v.name.$dirty && !$v.name.minLength"-->
  <!--        >-->
  <!--          Минимальное количество символов {{ $v.name.$params.minLength.min }}. Сейчас оно {{ name.length }}-->
  <!--        </small>-->
  <!--      </div>-->
  <!--      <div class="input-field">-->
  <!--        <input-->
  <!--          id="surname"-->
  <!--          type="text"-->
  <!--          v-model="surname"-->
  <!--          :class="{invalid: $v.surname.$dirty && !$v.surname.minLength}"-->
  <!--        >-->
  <!--        <label for="surname">Фамилия</label>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-if="$v.surname.$dirty && !$v.surname.minLength"-->
  <!--        >-->
  <!--          Минимальное количество символов {{ $v.surname.$params.minLength.min }}. Сейчас оно {{ surname.length }}-->
  <!--        </small>-->
  <!--      </div>-->
  <!--      <p>-->
  <!--        <label>-->
  <!--          <input type="checkbox" v-model="agree"/>-->
  <!--          <span>С правилами согласен</span>-->
  <!--        </label>-->
  <!--      </p>-->
  <!--    </div>-->
  <!--    <div class="card-action">-->
  <!--      <div>-->
  <!--        <button-->
  <!--          class="btn waves-effect waves-light auth-submit"-->
  <!--          type="submit"-->
  <!--        >-->
  <!--          Зарегистрироваться-->
  <!--          <i class="material-icons right">send</i>-->
  <!--        </button>-->
  <!--      </div>-->

  <!--      <p class="center">-->
  <!--        Уже есть аккаунт?-->
  <!--        <router-link to="/login">Войти!</router-link>-->
  <!--      </p>-->
  <!--    </div>-->
  <!--  </form>-->
  <v-col cols="12" sm="10" md="6">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title
          :class="{fontXs: this.$mq === 'xs', fontSm: this.$mq === 'sm'}"
        >Форма регистрации</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form :lazy-validation="lazy" ref="registerForm">
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="alternate_email"
            type="text"
            v-model.trim="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            id="password"
            label="Пароль"
            name="password"
            prepend-icon="lock"
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
          ></v-text-field>

          <v-text-field
            id="name"
            label="Имя"
            name="name"
            prepend-icon="text_fields"
            type="text"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            id="surname"
            label="Фамилия"
            name="surname"
            prepend-icon="text_fields"
            type="text"
            v-model="surname"
            :rules="surnameRules"
            required
          ></v-text-field>

          <v-checkbox
            v-model="agree"
            label="Согласен с правилами использования"
            :rules="agreeRules"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" @click.prevent="submitHandler" :loading="loading">Зарегистрироваться</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Registration",
  data: () => ({
    valid: false,
    loading: false,
    lazy: false,
    password: "",
    passwordRules: [
      v => !!v || "Это поле обязательное",
      v => v.length >= 5 || "Минимум 5"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /.+@.+\..+/.test(v) || "Проверьте правильность написания своего e-mail"
    ],
    name: "",
    nameRules: [
      v => !!v || "Это поле обязательное",
      v => v.length <= 10 || "Максимум 10",
      v => v.length >= 2 || "Минимум 2"
    ],
    surname: "",
    surnameRules: [
      v => !!v || "Это поле обязательное",
      v => v.length <= 10 || "Максимум 10",
      v => v.length >= 2 || "Минимум 2"
    ],
    agree: false,
    agreeRules: [v => !!v || "Это поле обязательное"]
  }),
  beforeCreate() {
    if (this.$store.getters.info.name) this.$router.push("/");
  },
  methods: {
    async submitHandler() {
      if (!this.$refs.registerForm.validate()) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        surname: this.surname
      };

      try {
        this.loading = true;
        await this.$store.dispatch("register", formData);
        this.loading = false;
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>
