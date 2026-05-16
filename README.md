# Inicialización y ejecución del proyecto DAEHWA

Este proyecto está compuesto por:

* **Frontend:** Angular (`DAEHWA_FRONTEND`)
* **Backend:** Django (`DAEHWA_BACKEND`)
* **Docker:**  `docker-compose`

A continuación se detallan los pasos necesarios para instalar dependencias, compilar el frontend y levantar los contenedores correctamente.

---

## 1. Instalar dependencias del Frontend

Entra en la carpeta del frontend:

```bash
cd DAEHWA_FRONTEND/daehwa-frontend
```
Instala las dependencias necesarias
```bash
npm install
```

## 2. Compilar el Frontend

Genera el build de Angular:
```bash
ng build
```
## 3. Levantar los contenedores con Docker

Desde la carpeta raíz del proyecto (APP_DAEHWA):
```bash
docker compose up --build
```

## 4. Apagar los contenedores

```bash
docker compose down
```

## 5. Acceder a la aplicacion 

Una vez levantado:

- Frontend Angular → http://localhost:4200

- Backend Django → http://localhost:8000

## 6. Notas

- Aunque se proporciona una base de datos con datos ficticios, puedes crear una nueva base de datos:

    - Situate en la carpeta DAEHWA-BACKEND
     ```bash
    cd DAEHWA-BACKEND
    ```

    - Crea el entorno virtual:
     ```bash
    py -m venv env
    env\Scripts\activate
    ```

    - Instala dependencias:
     ```bash
    pip install -r requirements.txt
    ```

    - Elimina los archivos db-sqlite3 y las migraciones **(IMPORTANTE: NO ELIMINAR EL __ INIT__.PY DE LA CARPETA MIGRATIONS)**.

    - Ejecuta los comandos: 

    ```bash
    py manage.py makemigrations

    py manage.py migrate

    py manage.py createsuperuser
    ```

    - Para arrancar la aplicación:
     ```bash
    py manage.py runserver
    ```

- Los usuarios no se pueden crear desde el Frontend, con lo cual tendrás que realizar los pasos anteriores y entrar al panel de administrador de Django para crear usuarios (http://localhost:8000/admin).

- **Por defecto el superusuario tiene rol: FAMILIAR.** Puedes cambiarlo en el panel de administrador de Django. 