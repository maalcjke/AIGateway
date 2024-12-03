# 🚀 Стек:
- NestJS (Typeorm, Swagger, Typescript), PostgreSQL, Docker 

- [О том, как все устроено в приложении и как добавлять новые модели](https://github.com/maalcjke/AIGateway/wiki/Как-добавить-новую-модель%3F)

**Готовый образ AIGateway + PostgreSQL**  
   ```dotenv
   docker pull ghcr.io/maalcjke/aigateway/aigateway:latest
   ```

## 🛠️ Как запустить  

1. **Клонируйте репозиторий**  
   ```bash  
   git clone <URL вашего репозитория>  
   cd <название папки с репозиторием>  
   ```  

2. **Создайте `.env` файл**  
   В корне проекта создайте файл `.env` и добавьте следующие переменные:  
   ```dotenv  
    #Database settings
    POSTGRES_HOST=postgres
    POSTGRES_USER=postgres
    POSTGRES_DB=dbname
    POSTGRESS_PASSWORD=root
    POSTGRESS_PORT=5432

    #Security settings
    JWT_SECRET=vsemHiThisIsSecretKey
    JWT_EXPIRES_IN=1d  
   ```  

3. **Соберите и запустите контейнеры**  
   Выполните следующую команду:  
   ```bash  
   docker-compose up -d
   ```  

4. **Откройте приложение в браузере**  
   После успешного запуска приложение будет доступно по адресу:  
   [http://localhost:3000](http://localhost:3000) 
   

   Swagger (OpenAPI) находится по адресу:
   [http://localhost:3000/docs](http://localhost:3000/docs)
   

## 🗂️ Структура проекта  

- `src/` — Исходный код приложения на NestJS  
- `docker-compose.yml` — Конфигурация для Docker Compose  
- `Dockerfile` — Docker-образ для приложения  
- `.env` — Конфигурация окружения  
