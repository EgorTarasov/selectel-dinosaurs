
![selectel](  https://chatwoot.selectel.ru/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhaREZtT0dkb2IyeDNjRGw2YURkeWNHRmhOV0pyTURabU1HdHJiZ1k2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpTzJsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SWpjMkxUSXVjRzVuSWpzZ1ptbHNaVzVoYldVcVBWVlVSaTA0SnljM05pMHlMbkJ1WndZN0JsUTZFV052Ym5SbGJuUmZkSGx3WlVraURtbHRZV2RsTDNCdVp3WTdCbFE2RVhObGNuWnBZMlZmYm1GdFpUb0tiRzlqWVd3PSIsImV4cCI6IjIwMjQtMDItMjRUMDk6NTk6MTguNTI0WiIsInB1ciI6ImJsb2Jfa2V5In19--c5bc1ce3d92d7d06f6fd1903aa8e8329c2246e07/76-2.png)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![DonorSearch](https://donorsearch.org/static/images/newLogoIcon.svg)

# DonorPet
## Описание 

Проект DonorPet - это сервис, разработанный для решения проблемы нехватки крови у животных путем сбора информации о донорах и больных питомцах в одном месте. Мы объединяем владельцев домашних животных, которые нуждаются в переливании крови, и тех, кто готов помочь, упрощая процесс донорства для питомцев. 
## Особенности 
- Сбор информации: Мы собираем информацию о донорах и больных питомцах в одном месте, что позволяет пользователям удобно найти нужную кровь для своего питомца или найти донора, готового помочь в непростой ситуации.   
- Интеграция с вк: сбор данных с групп и сообществ, где публикуются посты, о нуждающихся питомцах. Настроен удобный интерфейс для получения данных из постом с использованием opensource LLM модели Llama2. 
- Удобство использования: На нашей платформе пользователи могут легко найти информацию о наличии нужной крови для своего питомца и связаться с потенциальными донорами через удобный интерфейс или забронировать кровь в банке крови
- Авторизация через вк позволит пользователям упростить процесс, путем пропуска нудного заполнения формы авторизации
## Как начать 
Чтобы начать использовать сервис DonorPet, просто зайдите на нашу веб-страницу и зарегистрируйтесь. 

### [Ссылка на прототип](https://selectel.larek.tech)
### [Ссылка на техническую документацию к backend](https://api.selectel.larek.tech)


# Техническая  часть

## Стек приложения
__Бэкенд__: Docker, фреймворк FastApi, база данных: PostgreSQL,  llm Модель llama2

__Фронтенд__: React, Tailwind, TypeScript, MobX

# Запуск приложения

## Установка 

  
Для запуска приложения сначала требуется скачать его исходный код с GitHub, используя Git. Убедитесь, что у вас установлен Git, следуя инструкциям для вашей операционной системы (Windows, Mac, Linux). После установки выполните следующую команду в терминале:



```bash
git clone https://github.com/karisDev/selectel-dinosaurs
```

Перед запуском приложения необходимо убедиться, что все значения переменных окружения в файле `backend/.env` заполнены корректно. Для этого скопируйте файл `.env.example` и вставьте валидные значения. Вы можете выполнить следующую команду в терминале для копирования:

bashCopy code

`cp backend/.env.example backend/.env`

Затем откройте файл `backend/.env` в текстовом редакторе и внесите необходимые значения для переменных окружения, такие как база данных, ключи API и другие конфигурационые параметры, которые могут быть необходимы для вашего приложения. После этого вы будете готовы к запуску вашего приложения.

Далее, для упрощения развертывания приложения, требуется установить Docker. Вы можете скачать и установить Docker и docker-compose с официального сайта [Docker](https://www.docker.com/). После установки Docker выполните следующую команду в терминале, находясь в каталоге `backend` :

```bash
docker compose up -d
```

Это запустит приложение в контейнерах Docker, обеспечивая изоляцию и портативность.

После запуска приложения будет доступна техническая документация по ссылке `http://<domain из .env>/docs`


### Парсинг данных с помощью llm

Для этого нам потребуется компьютер с GPU для запуска модели.  Для этого используется ПО [Ollama](https://github.com/ollama/ollama) развернутая в докере


```bash
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

Далее необходимо скачать модель llama2 размера, которого позволяет видеокарта (для видеокарт до 8 GB) рекомендуется использовать модели с 7B параметрами 

```
 docker exec -it ollama ollama pull llama2
```

после чего можно запустить парсинг и обработку в jupyter-notebook, для предварительной валидации группы в дальнейшем планируется полная автоматизация процесса, после сбора всех сообществ по этой теме.


## Команда
[Кирилл, Frontend](https://t.me/biskwiq)

[Женя, Frontend](https://t.me/shmate)

[Лиза, Product designer](https://t.me/lissey_t)

[Егор, Backend](https://t.me/tarasov_egor)

[Ваня, Backend](https://t.me/using_namespace)

