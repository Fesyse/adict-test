# Adict Test

<img src="./public/preview.png" alt="Preview" width="100%">
 
## Запуск

- Установите Node.js, npm и pnpm (по желанию).

- Установите зависимости:

```bash
pnpm install
```

- Запустите сервер:

```bash
pnpm dev
```

После запуска сервера вы можете открыть страницу на <http://localhost:3000>

## Функциональность

- Просмотр всех постов
  - Фильтрация по заголовку
  - Фильтрация по пользователям
- Создание поста
- Детальный просмотр поста
- Редактирование поста
- Удаление поста
- Просмотр комментариев поста

CRUD операции выполнены с помощью **msw**, удаление, изменение и добавление постов сохраняется в файле `data/posts.json`.

## Структура проекта

Frontend

- `/src` - код приложения
- `/src/components` - компоненты приложения
- `/src/hooks` - хуки для работы с API
- `/src/pages` - страницы приложения
- `/src/services` - сервисы для работы с API
- `/src/types` - типы

Backend (моковые данные)

- `/data` - данные для моковых запросов
- `/src/mocks/server` - моковый сервер
- `/src/mocks/handlers` - моковые обработчики запросов

В `package.json` указаны зависимости для разработки и сборки приложения.

## Примечания

Использовал tailwind CSS и Shadcn UI для более быстрой разработки.
