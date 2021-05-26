# ДЗ

## Как делать:

0. Сделать форк этого репозитория в свой аккаунт (только 1 раз в самом начале).

1. Перед выполнением ДЗ сделайте пул мастера этого репозитория себе в форк (чтобы иметь актуальный код);
2. Обновить зависимости `yarn` или `npm i`;
3. Создайте новую ветку от актуального мастера для выполнения ДЗ;
4. Выполните ДЗ в этой ветке;
5. Сделайте Pull Request этой ветки в мастер моего репозитория;
6. Напишите мне (a.koretskiy@javascript.info) письмо со ссылкой на PR.

**Важно! В результате всех этих манипуляций в вашем мастере должны быть только мои комиты, все ваши комиты должны быть в отдельных ветках под каждую домашку.**

Дедлайн – 22:00 по Москве/Киеву за день до занятия.

## HT1

1. Создать компонент **Rate**, который принимает рейтинг (число от 1 до 5) и отображает его используя SVG со звездочками. Например `<Rate value={3} />`.
2. Создать компонент **Review**, который принимает все ревью по одному ресторану и отображает имена и отзывы про ресторан, а так же рейтинг с помощью компонента **Rate**.
3. Создать компонент **Restaurant** (рендерить там, где сейчас **Menu**). В **Restaurant** показывать **Menu** и **Review**. Так же в **Restaurant** посчитать средний рейтинг по этому ресторану и отобразить с помощью компоненты **Rate**.
