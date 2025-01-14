**-??? Додати необхідні файли для маршрутизації Vite** - 6.

**??? чи потрібно зробти** - npm install --save-dev typescript @types/react @types/react-dom

1. Створення проекту:
   - в терміналі переходімо в папку проекта;
   - npm create vite@latest my-react-app -- --template react-ts;
     my-react-app - це назва проекту, ім'я папки;
     template react-ts - прапорець, що вказує Vite використовувати шаблон React із TypeScript для нового проекту.
     npm install -> npm run dev (Запустить проєкт)
   - замінюємо папку src на папку src з 8 д/з;
   - з **видаленного src** вставити в новий src vite-env.d.ts
2. js jsx - перейменувати на ts, tsx. Також в маршрутах.
3. У файлі main.tsx типізуйте кореневий елемент. Після document.getElementById("root") додайте as HTMLElement.
4. додати файл .prettier.json;
5. нормалізація стилів (npm i modern-normalize). В main.jsx імпортуємо стилі
   нормалізації (import "modern-normalize");
6. папка App в ній два файла:

   - App.tsx — основний файл компонента.
   - App.types.ts — файл, який містить типи для використання у компоненті App

7. npm:

   - npm install react-redux (Для використання React та Redux разом);
   - npm i redux-persist - бібліотека як LocalStorige для Redux;
   - npm install @reduxjs/toolkit (встановлення Redux Toolkit);
   - npm install react-router-dom
   - npm i clsx - додавання декількох класів на елемент;
   - Formik(npm i formik) + yup(npm i yup) валідація;
   - npm install axios (запит на бекенд замість fetch)
   - npm install react-hot-toast ((сповіщення)). Toaster в main біля App
   - npm i react-icons
   - npm i react-loader-spinner
   - ???? npm i nanoid (генерування id) - автоматично є в Redux

8. **Типізація сторонніх бібліотек**
   npm install --save-dev @types/ім'я_бібліотеки (наприклад: npm install --save-dev @types/react-router-dom)
9. встановити бібліотеку і перевірити **чи підтримує TypeScripte з коробки**
   - axios (npm install axios)
   - formik (npm i formik)
   - yup (npm i yup)
   - modern-normalize (npm i modern-normalize) ❌ - це лише CSS-бібліотека, і вона не потребує визначення типів або підтримки TypeScript, оскільки не містить JavaScript або TypeScript коду;
     в crs додати globals.d.ts (якщо підкресленний modern-normalize)
   - prop-types" (npm i prop-types ) ❓ встановити npm install --save-dev @types/prop-types ✅;
   - react-hot-toast (npm install react-hot-toast),
   - react-loader-spinner (npm install react-loader-spinner --save),
   - react-modal (npm install react-modal) ❓, встановити npm install --save-dev @types/react-modal ✅
10. Перевірка:
    - Зробіть запит на npm:
      npm info <назва_бібліотеки> types
      Якщо повертається шлях до типів (наприклад, dist/index.d.ts), це означає, що бібліотека підтримує TypeScript.
    - або в node_modules d папці бібліотеки в package.json - "typings": "dist/index.d.ts",
    - або node*modules/<назва*бібліотеки> є index.d.ts або папка types, це означає, що бібліотека підтримує TypeScript "з коробки".

- Додати типізацію до:

  - в main () as HTMLElement ✅;
  - ## Redux:
    - ?достатньо? store:
      - ✅ export type RootState = ReturnType<typeof store.getState>;
      - ✅ export type AppDispatch = typeof store.dispatch;
        // MyComponent.tsx
        //const dispatch: AppDispatch = useDispatch()
      - ✅ useSelector: створити типізований хук в hooks.ts
        // export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
        //в компонентах використовуємо useAppSelector замість useSelector
      - ???? persistConfig
    - operation (auth, contact) ✅;
    - slice (auth, contact, filters) ✅;
      / типізація методів operation і slice повинна відповідати один одниму;
    - selector (auth, contact, filter) ✅;
  - ## Components:
    / функції типізуємо React.FC або {FC} - при повернені JSX.Element (розмітка)
    - App достатньо???
    -
  - компонентів,
  - пропсів,
  - стану,
  - хуків,
  - обробників подій,
  - HTTP-функцій,
  - будь-яких інших функцій.
  <!--  -->

6. **Деплой на Vercel**, при маршрутизації додати файл.
   Для правильної роботи додатка з маршрутизацією після розгортання на Vercel, слід додати файл налаштувань vercel.json в кореневу папку проекту.

<!-- =8=8=8=8=8=8=8=8 -->

Способ - Когда использовать
interface - Если структура сложная или требуется наследование.
type - Для простых структур или если вы используете type в других местах.
Декомпозиция - Если вы хотите передавать каждый пропс отдельно без вложенности.
Pick/Omit - Если у вас есть существующий тип данных и нужно выделить или исключить поля.
PropsWithChildren - Если вы хотите поддерживать children внутри компонента.
