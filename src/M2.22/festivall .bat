@echo off
title FestivAll - Gestor Docker

:menu
cls
echo.
echo  ================================================
echo            FestivAll - Gestor Docker
echo  ================================================
echo.
echo   [1] Arrancar em DESENVOLVIMENTO (build local)
echo   [2] Arrancar em PRODUCAO (imagens DockerHub)
echo   [3] Parar todos os containers
echo   [4] Parar e apagar dados (reset BD)
echo   [5] Ver estado dos containers
echo   [6] Ver logs (live)
echo   [7] Abrir app no browser
echo   [8] Publicar imagens no DockerHub
echo.
echo   [0] Sair
echo.
echo  ================================================
set /p opcao="  Escolhe uma opcao: "

if "%opcao%"=="1" goto dev
if "%opcao%"=="2" goto prod
if "%opcao%"=="3" goto stop
if "%opcao%"=="4" goto reset
if "%opcao%"=="5" goto status
if "%opcao%"=="6" goto logs
if "%opcao%"=="7" goto browser
if "%opcao%"=="8" goto publish
if "%opcao%"=="0" goto sair
goto menu

:dev
cls
echo.
echo  ^>^> Arrancar em DESENVOLVIMENTO
echo.
docker compose up --build
pause
goto menu

:prod
cls
echo.
echo  ^>^> Arrancar em PRODUCAO (imagens DockerHub)
echo.
docker compose -f docker-compose-prod.yml up
pause
goto menu

:stop
cls
echo.
echo  ^>^> Parar containers
echo.
docker compose down
docker compose -f docker-compose-prod.yml down 2^>nul
echo.
echo  Containers parados.
pause
goto menu

:reset
cls
echo.
echo  ================================================
echo   ATENCAO - Vai apagar a base de dados!
echo  ================================================
echo.
set /p confirmar="  Tens a certeza? (s/N): "
if /i "%confirmar%"=="s" (
    docker compose down -v
    docker compose -f docker-compose-prod.yml down -v 2^>nul
    echo.
    echo  Tudo apagado.
) else (
    echo  Cancelado.
)
pause
goto menu

:status
cls
echo.
echo  ^>^> Estado dos containers
echo.
docker compose ps
echo.
pause
goto menu

:logs
cls
echo.
echo  ^>^> Logs em tempo real (Ctrl+C para sair)
echo.
docker compose logs -f
pause
goto menu

:browser
cls
echo.
echo  ^>^> A abrir http://localhost:3000 no browser...
start http://localhost:3000
timeout /t 2 ^>nul
goto menu

:publish
cls
echo.
echo  ^>^> Publicar imagens no DockerHub
echo.
echo  1. Login
docker login -u a046363
echo.
echo  2. A criar tags...
docker tag m222-web:latest a046363/inf25dw2g31-m2-react:latest
docker tag m222-api:latest a046363/inf25dw2g31-m2:latest
docker tag mysql:8.0 a046363/inf25dw2g31-m2-mysql:latest
echo.
echo  3. A enviar para DockerHub...
docker push a046363/inf25dw2g31-m2-react:latest
docker push a046363/inf25dw2g31-m2:latest
docker push a046363/inf25dw2g31-m2-mysql:latest
echo.
echo  Concluido!
pause
goto menu

:sair
cls
echo.
echo  Ate a proxima!
echo.
timeout /t 2 ^>nul
exit
