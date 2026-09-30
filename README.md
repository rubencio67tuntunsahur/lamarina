# Falla La Marina · Web

Rediseño de [fallalamarina.com](https://fallalamarina.com/): estética mediterránea moderna
(azul mar profundo, arena, oro y brasa), tipografías *Fraunces* + *Manrope*, animaciones
suaves y diseño adaptado a móvil.

## Estructura

```
index.html                 Página (misma estructura de IDs que la web original)
css/styles.css             Todo el diseño nuevo
js/app.js                  Lógica original (API, noticias, eventos, portal, carnet, idioma…)
js/enhance.js              Efectos del rediseño (nav al hacer scroll, apariciones, foto en el hero)
escudo.png / escudo2.png   Escudos originales (favicon, carnet)
escudo-transparente.png    Escudo recortado sin fondo blanco (hero, historia)
manifest.json
```

## Despliegue

Es un reemplazo directo del frontend actual: sube estos archivos a la raíz del hosting
junto a las carpetas existentes `api/` y `uploads/` (el backend PHP no cambia).

## Cambios de comportamiento

- El aviso de cookies recuerda la elección del visitante (antes aparecía en cada visita).
- El fondo del hero muestra una foto destacada de la galería (cargada desde la API).
