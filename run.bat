@set NODE_PATH=C:\Program Files\nodejs
@echo %PATH% | find "Node.js"
@if %errorlevel% == 1 set PATH=%PATH%;%NODE_PATH% 
@rem @echo %cd% 
echo Starting.....
@node bin\www
pause