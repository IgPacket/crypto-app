# Crypto APP

## Инструкция по запуска

1) Скачать -> Разархивировать
2) Открыть crypto-app -> Открыть терминал внутри папки/по этому пути
3) Запустить/Открыть Docker
3) Ввести в терминал команду docker-compose up --build
4) Дождаться сборки проекта
5) Frontend запускается по адресу http://localhost:3000
6) Backend запускается по адресу http://localhost:3001

(В самом низу файла будут возможные тестовые запросы для curl на backend)

## Описание
Простое веб-приложение, которое позволяет пользователям:

1) Добавлять адрес приватного ключа (кнопка импорта)
2) Использование сид фразы вместо приватного ключа приносит дополнительные баллы
3) Иметь возможность просматривать балансы при нажатие на кнопку
4) Редактировать список валют
5) Автоматическая конвертация балансов в доллары
6) Список криптовалют и адресов на Ваше усмотрение, но не менее 5 криптовалют.
7) В рамках одной криптовалюты может быть несколько адресов.

## Требования
### Frontend: 
* NextJS
### Backend
* NodeJS
* KoaJS

## Взаимодействия
* Делается запрос на backend -> database -> выводится список валют и адреса
* Списки можно свернуть/развернуть
* Кнопка import - выводит окно для ввода private key / seed phrase
* В окне есть select для выбора типа ввода (private key / seed phrase) и для выбора валюты
* Значок карандаша (редактировать), позволяет перемещать адреса и удалять их
* Когда активно "редактирование", зайти в import нельзя
* Кнопка "Посмотреть баланс" выводит баланс валюты и последующий перевод в доллары

## Основные технологии
 - NodeJS
 - KoaJS
 - NextJS
 - React
 - PostgreSQL
 - Docker
 - (Также зависимости в package.json для backend и frontend соответственно)

## Основная Структура

- Backend
    - src
      - config 
      - controller
      - migrations 
      - models
      - route
      - service
      - util 
      - index.js 
      - Dockerfile 
- Frontend
  - components
  - pages
  - service
  - styles
  - Dockefile 
  - next.config.js
- docker-compose.yml 

### Тестовые CURL

curl -X GET http://localhost:3001/addresses/ethereum

curl -X GET http://localhost:3001/addresses/bitcoin

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "privateKey": "9e96b06f5b79e11e36fb62497ae8e5f514e3c7fdfd7f11e5b67e1ff3923e5b76"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "privateKey": "e331b6d69882b4e3d7d61dd1a2db24c0e0b1b06c6bd6a41e3e1711cc64ba5b43"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "seedPhrase": "squirrel whisper grape blame snake swing trip quiz marble eagle ghost syrup"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "seedPhrase": "pistol kit control beach sweep cactus merry budget syrup physical attend common"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "seedPhrase": "pistol kiwi foam firm lunar jar fever habit rib story dance cabbage"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "seedPhrase": "gesture habit trade raw maple bone approve device canoe party economy sing"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "bitcoin", "seedPhrase": "slice happy fish smile someone spray moon blast fantasy leave turtle aisle"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "privateKey": "0x4c0883a69102937d623847b0f5a6b8e63b0b1f10a3d0cd29b5c160e8ea1e4e9d"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "privateKey": "0x5c1f34c03f36f8d8327d80f4e25d73ac2f63e8350bc0eb5cf4c3aafecf0b6c4"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "privateKey": "0x9f35d458314c76f028e14eb9a6b0c4ff88a4db11cc1b3f0f6e4e0dbdd1f47909"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "privateKey": "0xe4ee4e081dd38f91e57405e9354f19c59a9e02d69e1bfe67a09bb3e2b98839a5"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "privateKey": "0x3d4eaf4fdeeec9f3f7c9121fcbdd9b16e067e0b708fba46291fd73e5eb4e5e05"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "seedPhrase": "nature agree civil arrange yard curve reflect acid eternal turtle couple"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "seedPhrase": "random oyster bird logic pilot flash oxygen amazing wood guard enroll wash"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "ethereum", "seedPhrase": "guard nephew monitor vendor invite champion paddle rival fetch sustain mercy desk"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "ripple", "privateKey": "ssqhbX5TPzKfNxy2vZDTffkjwFZqn"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "ripple", "seedPhrase": "pioneer abandon elite valve range trade clean shuffle toward reflect jungle present"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "stellar", "privateKey": "SBAAOHEU4WSWX6GBZ3VOXEGQGWRBJ72ZN3B3MFAJZWXRYGDIWHQO37SY"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "stellar", "seedPhrase": "acquire vocal heart panel artwork bronze donate umbrella caught lonely onion general"}'

POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "tron", "privateKey": "e6bfcf81e047b6b8b0f0807614d9fc30f27cc787073307073ebf72f8a89582f5"}'

curl -X POST http://localhost:3001/add-private-key \
-H "Content-Type: application/json" \
-d '{"currency": "tron", "privateKey": "68292d1dc4f6b520e3fee4d5e1bb8dda89b1d7720f42c58850e35936c218776f"}'

curl -X POST http://localhost:3001/add-seed-phrase \
-H "Content-Type: application/json" \
-d '{"currency": "tron", "seedPhrase": "crawl sphere old catalog agree decrease cruise vintage green pig volcano chalk garage lock clap dance tuition rule"}'

curl -X GET http://localhost:3001/balance/ethereum/0x4c0883a69102937d623847b0f5a6b8e63b0b1f10a3d0cd29b5c160e8ea1e4e9d \
-H "Content-Type: application/json"

curl -X GET http://localhost:3001/balance/bitcoin/9e96b06f5b79e11e36fb62497ae8e5f514e3c7fdfd7f11e5b67e1ff3923e5b76 \
-H "Content-Type: application/json"

curl -X GET http://localhost:3001/balance/ripple/rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh \
-H "Content-Type: application/json"

curl -X GET http://localhost:3001/balance/stellar/GBZDASGX6N6C3FBIFQQSNB2NPW6WB3Z5O4A65T7AFMLQ3MBITZKH5D3A \
-H "Content-Type: application/json"

curl -X GET http://localhost:3001/balance/tron/TTvPqZy8EZvXERMMh1vqkRLPzqToP4f4H6B \
-H "Content-Type: application/json"

curl -X GET http://localhost:3001/addresses \
-H "Content-Type: application/json"
