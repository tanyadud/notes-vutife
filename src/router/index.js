import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: {layout: "empty", title: "Войти - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {layout: "empty", title: "Зарегистрироваться - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/",
    name: "Home",
    meta: {auth: true, title: "Главная  - NotesApp"},
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/history",
    name: "History",
    meta: {auth: true, title: "История записей  - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/History.vue")
  },
  {
    path: "/record",
    name: "Record",
    meta: {auth: true, title: "Создать запись  - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "record" */ "../views/Record.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {auth: true, title: "Профиль  - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/edit/:id",
    name: "Edit",
    meta: {auth: true, title: "Изменить  - NotesApp"},
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue")
  },

  {
    path: "/note/:id",
    name: "SingleNote",
    meta: {auth: true, title: "Заметка  - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/SingleNote.vue")
  },
  {
    path: "/404",
    name: "404",
    meta: {layout: "empty", title: "Страница не найдена - NotesApp"},
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/NotFound.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);
  document.title = to.meta.title;
  if (!user && requireAuth) {
    next("/login?message=login");
  } else if (user && !requireAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
