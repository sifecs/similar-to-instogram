import Unsplash, {toJson} from 'unsplash-js';

  // Создаем экземпляр объекта для доступа к API
export const unsplash = new Unsplash({
  // Application ID из настроек вашего приложения
  applicationId: "d3fdde747630d9f32e87a1f68fe8f8756cc8973ec35c1f369f059f144681b417",
  // Application Secret из настроек вашего приложения
  secret: "ee12b26de36a9ccc38e289ea9ac0d809c2be6c79ee8aa02daa26afc00cb0ca52",
  // Полный адрес страницы авторизации приложения (Redirect URI)
  // Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
  callbackUrl: "http://cu40768.tmweb.ru///"
});

export const authenticationUnsplash = (unsplash) => {
  // Генерируем адрес страницы аутентификации на unsplash.com
  // и указываем требуемые разрешения (permissions)
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
  ]);

  // Отправляем пользователя по этому адресу
  location.assign(authenticationUrl);
}

export const getToken = (unsplash) => {
    if (localStorage.getItem('token')) {
      return unsplash.auth.setBearerToken(localStorage.getItem('token'));

    };
    const code = location.search.split('code=')[1];
    if (code) {
      return unsplash.auth.userAuthentication(code)
        .then(toJson)
        .then(resp => {
          localStorage.setItem('token', resp.access_token);
          unsplash.auth.setBearerToken(resp.access_token);
        });
    }
}

export const getUser = (unsplash) => {
  return unsplash.currentUser.profile()
    .then(toJson)
    .then(resp => resp)
}

export const getPhotos = (unsplash, amount = 9) => {
  return (
    unsplash.photos.listPhotos(1, amount, 'latest')
      .then(toJson)
      .then(resp => resp)
  )
}

export const likePhoto = (unsplash, id) => {
  return (
    unsplash.photos.likePhoto(id)
      .then(toJson)
      .then(resp => resp)
  )
}

export const unlikePhoto = (unsplash, id) => {
  return (
    unsplash.photos.unlikePhoto(id)
      .then(toJson)
      .then(resp => resp)
  )
}
