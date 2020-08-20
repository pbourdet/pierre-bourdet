@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../vendor/bin/php-cs-fixer
php "%BIN_TARGET%" %*