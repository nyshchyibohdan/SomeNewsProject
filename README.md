_**Some news project**_

Веб платформа для перегляду новин на різні теми, розробку своїх новин і статей, поширення цих статей для інших користувачів.
Кожен користувач може вподобати статті для подальшого прочитання, а також зарепостити їх для інших користувачів, якщо новина справила враження.
Новини на різні теми будуть генеруватись з допомогою news.api, а також будуть публікуватись користувачами в будь-який момент.

**Реєстрація та авторизація**

На початку роботи з веб-додатком, користувача зустрічає вікно авторизації, де він може ввести дані для входу в свій акаунт, якщо він вже існує в системі. Дані для авторизації складають електронна пошта, яка використовувалась при реєстрації, та пароль для входу в акаунт. Передбачається перевірка на правильність введення електронної пошти

![image](https://github.com/user-attachments/assets/1d8960a6-29e9-4918-999d-ccbf5fd0ebf7)

**Рис. 1. Логін форма.**

Не маючи акаунта, користувач може натиснути на кнопку «Don’t have account?» щоб перейти до вікна реєстрації, де додаток запропонує користувачу створити акаунт. В поле nickname користувач має ввести ім’я, яке буде відображатись у його профілі та використовуватись для позначення автора статей. Наступне поле – електронна адреса, що буде використовуватись в акаунті. Два наступні поля призначенні для вписування паролю для входу під час авторизації та підтвердження введеного паролю (відповідно). Якщо ж користувач випадково опинився на сторінці для реєстрації, він може повернутись до авторизації з допомогою кнопки «Already have account?».

![image](https://github.com/user-attachments/assets/cf156490-4842-4b66-9852-c42eca8b60a2)

**Рис. 2. Форма реєстрації.**

**Сесія користувача**

Після авторизації чи реєстрації користувач опиняється на головній сторінці, де відображені загальні новини та статті з різних тем. Користувач може відкрити будь-яку та прочитати її докладніше.

![image](https://github.com/user-attachments/assets/34dfe0aa-3d2e-464c-ad96-d8955520ec67)

**Рис. 3. Хедер веб-додатку**

У верхній частині будь-якої сторінки додатку є навігація. Тут з лівого краю назва проекту, а праворуч посилання на інші сторінки додатку, в яких знаходяться тематичні новини та статті. Крайнє посилання веде на сторінку репостів спільноти. Там користувач зможе знайти найпопулярніші статті, які зарепостили багато інших користувачів.
Крайню праву частину панелі навігації займає посилання на профіль користувача. Це посилання представлене фотографією, яку користувач поставив як фото профілю.

![image](https://github.com/user-attachments/assets/83af5ff9-308b-40cf-8fc2-2cd06b44bfd4)

**Рис. 4. Головна сторінка веб-додатку.**

Припустимо користувачу закортіло переглянути одну з новин, які запропонував додаток. Він вибрав її використовуючи кнопку «Read more».
Перед ним з’явилась сторінка конкретної новини, яку він тепер може читати, репостити, або лайкати, якщо вона йому сподобалась. Він може дізнатись, скільки репостів цієї новини було зроблено, поглянувши лівіше від кнопки «Repost», а також знизу тексту статті поглянути, хто є автором.
Варто зазначити, що і тут користувача супроводжують хедер і футер.

![image](https://github.com/user-attachments/assets/a3494544-2f4b-45a9-ba77-5901cb9b04e6)

**Рис. 5. Сторінка конкретної новини.**

**Профіль, репости, лайки, новини користувача**

Після перегляду новини, користувач вирішив перейти в свій профіль. Він натискає на своє фото профілю у панелі навігації та його перекидує на сторінку профілю.
Тут користувач може помітити своє фото профілю, а поруч з ним nickname, який він вписував під час реєстрації. Нижче є три кнопки.

1. «Reposts» перекидує на сторінку новин, репост яких зробив користувач. Тут він може переглянути їх знову;
2. «Likes» перекидує на сторінку новин, які користувач вподобав. Зовні вона не відрізняється від сторінки «Reposts», проте різниця в тому, що інші користувачі не можуть бачити лайки одне одного.
3. «News» перекидує на сторінку новин, автором яких є сам користувач. Тут, з допомогою кнопки «New» він може створити нову статтю для публікації. Для створення такої статті користувачу необхідно написати текст, який задовільняє правило про мінімальну та максимальну кількість символів. Така стаття може супроводжуватись фото.

![image](https://github.com/user-attachments/assets/85c5122f-35ae-4350-95dd-ea06978e7b5c)

**Рис. 6. Сторінка профілю.**

Далі внизу знаходиться місце для опису акаунта чи біографії користувача. Його можна відредагувати в будь який момент, натиснувши кнопку «Edit».
Остання частина сторінки профілю представляє собою керування акаунтом. Користувач може вийти з акаунта з допомогою кнопки «Logout».
Далі, для зміни паролю користувач може натиснути кнопку «Change».
Зрештою, для видалення акаунта користувач може натиснути кнопку «Delete». Звісно додаток запитає підтвердження такої дії.

![image](https://github.com/user-attachments/assets/4492bd41-1512-4c39-95bc-f60420208f5f)

**Рис. 7. Сторінка репостів користувача.**

![image](https://github.com/user-attachments/assets/c82cc7a0-9a75-4ae0-abe9-0503ffc8f3ba)

**Рис. 8. Сторінка новин, автором яких є користувач.**

![image](https://github.com/user-attachments/assets/5fa71a93-5277-4e8b-ad42-25ae661bc0b3)

**Рис. 9. Сторінка створення нової статті**

Примітка: редагувати опубліковані новини неможливо, проте їх можна видалити.

**Висновок:** Some news project реалізує функціонал перегляду, поширення та створення новин чи статей. В додатку буде реалізована можливість зручно зареєструватись, авторизуватись та змінити пароль в будь-який момент. Користувачу доступний набір тематик, які можна обрати в панелі навігації, котрі будуть взяті з допомогою news.api, який надає можливість використовувати величезну базу новин і статей на різні теми. Користувач зможе лайкати та репостити новини, які сподобались, так само як видаляти новину з вподобань та знімати репост, а також створювати власні статті для публікування на платформі. Користувач зможе змінювати свій профіль, та навіть видалити акаунт за бажанням.
