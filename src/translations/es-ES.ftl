## Layout - footer

footer-author = Hecho por <author-link>Vincent Tunru</author-link>.
twitter-tooltip = Vincent en Twitter
twitter-label = En Twitter
mastodon-tooltip = Vincent en Mastodon
mastodon-label = En Mastodon
gitlab-tooltip = Código fuente en GitLab
gitlab-label = Código fuente

## Layout - header

urlbar-label = URL:
urlbar-error-invalid = Por favor, introduce una URL válida
urlbar-button-label =
    .value = Ir
profile-button = Tu Perfil
connect-button = Conectar Pod
connect-button-tooltip = Conecta con tu Solid Pod
disconnect-button = Desconectar
disconnect-button-tooltip = Desconecta de tu Solid Pod: { $webId }

## Connecting to your Pod

connectmodal-label = Conecta con tu Solid Pod
connectmodal-close-label = Cerrar
connectform-label = Conecta con tu Pod en:
connectform-button =
    .value = Conectar
# Other potential values, in case they work better: "Connect automatically in the future", "automatically connect from now on"
connectform-autoconnect-label = Conectar automáticamente a partir de ahora
connecterror-no-pod = No se ha encontrado tu Solid Pod en <pod-url>{ $pod-url }</pod-url>. Por favor, comprueba la URL y vuelve a intentarlo.
# This error is shown if the user enters their WebID instead of their Solid Identity Provider.
connecterror-webid =
    Parece que tu Pod está en <pod-url>{ $detected-pod-url }</pod-url>.
    <idp-button>¿Quieres utilizar esta url para conectarte?</idp-button>
connecterror-not-useid =
    No se ha encontrado un Solid Pod para conectar.
    <useid-button>¿Querías decir <pod-url>{ $suggested-pod-url }</pod-url>?</useid-button>
connecterror-not-inrupt =
    No se ha encontrado un Solid Pod para conectar.
    <inrupt-button>¿Querías decir <pod-url>{ $suggested-pod-url }</pod-url>?</inrupt-button>
connecterror-deprecated-inrupt =
    Inrupt ha dejado de utilizar broker.pod.inrupt.com.
    <inrupt-button>¿Quieres utilizar <pod-url>{ $suggested-pod-url }</pod-url>?</inrupt-button>
connecterror-not-solidcommunity =
    No se ha encontrado un Solid Pod para conectar.
    <solidcommunity-button>¿Querías decir <pod-url>{ $suggested-pod-url }</pod-url>?</solidcommunity-button>
fetcherror-no-permission = No tienes permisos para ver este Recurso.
fetcherror-does-not-exist = Este Recurso no existe.
fetcherror-unknown = Se ha producido un error desconocido ({ $statusCode }).

## Homepage

pod-listing-heading = Pod(s) de: <owner-link>{ $owner-name }</owner-link>
pod-listing-tooltip = Inspecciona tu Pod en `{ $pod-url }`
intro-title = ¿Qué es esto?
intro-text =
    Penny es una herramienta para desarrolladores de aplicaciones <solid-link>Solid</solid-link>.
    Te permite inspeccionar los datos en tu Pod y, con los permisos adecuados,
    modificar y añadir nuevos datos.
    Asume familiaridad con conceptos de Solid.
intro-get-started-logged-out =
    Para empezar, conecta con tu Pod para inspeccionar los datos,
    o introduce una URL directamente en la parte superior de la página.
    ¡Si tienes sugerencias, por favor <contact-link>ponte en contacto</contact-link>!
intro-get-started-logged-in =
    Para comenzar, sigue los enlaces anteriores para examinar tu Pod,
    o ingresa manualmente una URL para inspeccionar en la parte superior de la página.
    Y si tienes algún comentarios, por favor; 
    <contact-link>¡Ponte en contacto con nosotros!</contact-link>

## Tree view

tree-expand-button-label = Abrir vista de árbol
tree-expand-button-tooltip = Expandir vista de árbol
tree-collapse-button-label = Cerrar vista de árbol
tree-collapse-button-tooltip = Colapsar vista de árbol
tree-label = Recursos en el Pod

## ContainerViewer

container-children-heading = Recursos del Contenedor
container-empty-warning = Este Contenedor está vacío.
resource-add-button = Añadir Recurso
resource-add-name-label = Nombre del Recurso
resource-add-name-input =
    .placeholder = Ejemplo: nombre-del-recurso o nombre-del-contenedor/
    .title = Nombre del Recurso (acaba con `/` para crear un Contenedor)
resource-add-name-submit = Guardar
resource-add-toast-success = Recurso creado.
resource-add-toast-success-view-button = Ver.

container-download-label = Descargar todo
container-download-tooltip = Descarga todos los Recursos accesibles en este Contenedor
container-download-modal-progress-discovering = Buscando Recursos ({ $discoveredItems } encontrados…)
container-download-modal-progress-zipping = Descargando Recursos ({ $downloadedItems } de { $total })
container-download-modal-save-label = Guardar { $containerName }
container-download-modal-heading = Descargando {$containerName}
container-download-modal-skipped-heading = Ignorados ({ $count })
container-download-modal-skipped-reason-inaccessible = No tienes acceso
container-download-modal-skipped-reason-not-found = No se ha encontrado
container-download-modal-close = Cerrar
container-download-toast-error-unknown = Algo ha ido mal descargando {$containerName}.

file-add-toast-success =
    { $fileCount ->
        [one] Archivo subido.
       *[other] { $fileCount } archivos subidos.
    }
file-add-toast-error-not-allowed = No tienes permisos para subir archivos en este Contenedor.
file-add-toast-error-other =
    { $fileCount ->
        [one] No ha sido posible subir el archivo.
       *[other] No ha sido posible subir los archivos.
    }
file-add-button = Subir archivo(s)
file-add-drop-target = Arrastra aquí para subir

## DatasetViewer

dataset-empty-warning = Este Recurso está vacío.
dataset-update-toast-success = Guardado. <undo-button>Deshacer.</undo-button>
dataset-things-heading = Cosas
danger-zone-heading = Zona peligrosa
dataset-view-turtle = Turtle en crudo
dataset-delete = Eliminar Recurso
dataset-delete-confirm-heading = ¿Estás seguro?
dataset-delete-confirm-lead-container = ¿Estás seguro de que quieres eliminar este Contenedor junto con todos sus Recursos? Esta operación no se podrá deshacer.
dataset-delete-confirm-lead-resource = ¿Estás seguro de que quieres eliminar este Recurso? Esta operación no se podrá deshacer.
dataset-delete-toast-prepare = Preparando para eliminar <dataset-url>{ $datasetUrl }</dataset-url>…
dataset-delete-toast-process = Eliminando <dataset-url>{ $datasetUrl }</dataset-url>…
dataset-delete-toast-success-container = Se ha eliminado <dataset-url>{ $datasetUrl }</dataset-url> y todos sus Recursos.
dataset-delete-toast-success-resource = Se ha eliminado <dataset-url>{ $datasetUrl }</dataset-url>.
dataset-delete-toast-error-not-allowed = No tienes permisos para eliminar este Recurso.
dataset-delete-toast-error-other = No ha sido posible eliminar este Recurso.
thing-add-button = Cosas
thing-add-url-label = URL de la cosa
thing-add-url-input =
    .placeholder = Ejemplo: https://…
    .title = URL de la cosa
thing-add-url-submit = Guardar
thing-toast-error-not-allowed = No tienes permisos para realizar esta operación.
thing-urlcopy-button-tooltip = Copia la URL
thing-urlcopy-toast-success = La URL se ha copiado al portapapeles.
thing-delete-tooltip = Eliminar `{ $thingUrl }`
thing-delete-label = Eliminar `{ $thingUrl }`
thing-collapse-label = Colapsar
thing-collapse-tooltip = Colapsa esto
thing-expand-label = Expandir
thing-expand-tooltip = Expande esto

# This labels a list of rdfs:seeAlso URLs below a Thing:
thing-see-also-heading = Ver también:

wac-control-title = Control de Acceso para:
# When someone adds a new (but still empty) Thing,
# a notification will be shown on top that will allow
# adding the necessary data to turn it into an Access Control:
wac-control-initialise = Convertir en Control de Acceso.
wac-control-toast-saving = Guardando Control de Acceso…
wac-control-toast-saved = Control de Acceso guardado.
wac-control-toast-error-no-controller = Cambios no aplicados; por lo menos un Agente debería tener control del Recurso.
wac-control-toast-error-no-resource = Cambios no aplicados; Recurso desconocido.
wac-control-target-label = Aplicar a:
wac-control-target-option-self = El Recurso
wac-control-target-option-children = Recursos en el Contenedor
wac-control-mode-label = Permisos:
wac-control-mode-option-read = Leer
wac-control-mode-option-append = Añadir
wac-control-mode-option-write = Escribir
wac-control-mode-option-control = Controlar
wac-control-agentClass-label = Para:
wac-control-agentClass-option-agent = Todo el mundo
wac-control-agent-label = Y Agentes:
wac-control-agent-add-button =
    .title = Añadir Agente
wac-control-agent-add-icon =
    .aria-label = Añadir Agente
wac-control-agent-remove-icon =
    .aria-label = Eliminar `{ $agent }`
linked-resources-heading = Recursos enlazados
linked-resources-acl-label = Lista de Control de Acceso
linked-resources-acl-add = Añadir Lista de Control de Acceso
linked-resources-acl-add-toast-success = Se ha creado la lista de control de acceso.
linked-resources-acl-add-toast-error-not-allowed = No tienes permisos para modificar la Lista de Control de Acceso de este Recurso.
linked-resources-acl-add-toast-error-other = No se ha podido crear la Lista de Control de Acceso.
linked-resources-acr-label = Recurso de Control de Acceso
predicate-add-button = Nueva propiedad
predicate-add-url-label = URL de la propiedad
predicate-add-url-input =
    .placeholder = Ejemplo: https://…
    .title = URL de la propiedad
predicate-add-url-submit = Guardar
predicate-urlcopy-button-tooltip = Copiar la URL de este predicado
predicate-urlcopy-toast-success = La URL del predicado se ha copiado al portapapeles.
object-unknown = Datos de tipo desconocido
object-unknown-tooltip = Datos de tipo desconocido { $type }
object-invalid-date = Formato de fecha incorrecto
object-invalid-date-known = Formato de fecha incorrecto ({ $date })
object-delete-button-unknown =
    .title = Eliminar valor `{ $value }` de tipo desconocido `{ $type }`
    .aria-label = Eliminar valor `{ $value }` de tipo desconocido `{ $type }`
object-copy-toast-success-url = La URL se ha copiado al portapapeles.
object-copy-button-url =
    .title = Copiar `{ $value }`
    .aria-label = Copiar `{ $value }`
object-delete-button-url =
    .title = Eliminar `{ $value }`
    .aria-label = Eliminar `{ $value }`
object-delete-button-string =
    .title = Eliminar `{ $value }`
    .aria-label = Eliminar `{ $value }`
object-delete-button-string-locale =
    .title = Eliminar `{ $value } ({ $locale })`
    .aria-label = Eliminar `{ $value } ({ $locale })`
object-delete-button-integer =
    .title = Eliminar `{ $value }`
    .aria-label = Eliminar `{ $value }`
object-delete-button-decimal =
    .title = Eliminar `{ $value }`
    .aria-label = Eliminar `{ $value }`
object-delete-button-datetime =
    .title = Eliminar `{ $value }`
    .aria-label = Eliminar `{ $value }`
object-delete-button-boolean =
    .title = Eliminar `{ $value }`
    .aria-label = Eliminar `{ $value }`
object-add-label = Añadir
object-add-url = URL
object-add-integer = Entero
object-add-decimal = Decimal
object-add-datetime = Fecha y hora
object-add-url-label = URL
object-add-url-input =
    .placeholder = Ejemplo: https://…
    .title = Valor de la URL
object-add-url-submit = Añadir
object-add-string-label = Cadena de texto
object-add-string-input =
    .title = Valor de la cadena de texto
object-add-string-submit = Añadir
object-set-locale-label = Configurar idioma
object-add-locale-label = Idioma
object-add-locale-input =
    .placeholder = Ejemplo: nl-NL
    .title = Idioma
object-add-integer-label = Entero
object-add-integer-input =
    .placeholder = Ejemplo: 42
    .title = Valor del entero
object-add-integer-submit = Añadir
object-add-decimal-label = Decimal
object-add-decimal-input =
    .placeholder = Ejemplo: 4.2
    .title = Valor del decimal
object-add-decimal-submit = Añadir
object-add-date-label = Fecha
object-add-date-input =
    .title = Valor de la fecha
object-add-time-label = Hora
object-add-time-input =
    .title = Valor de la hora
object-add-datetime-submit = Añadir

## FileViewer

file-heading = Archivo
file-download-preparing = Preparando descarga…
file-download-button = Descargar
file-download-button-tooltip = Descargar `{ $filename }`
file-download-toast-error-other = No ha sido posible descargar este archivo. Puede ser que no tengas permisos.
file-delete = Eliminar archivo
file-delete-confirm-heading = ¿Estás seguro?
file-delete-confirm-lead = ¿Estás seguro de que quieres eliminar este archivo? Esta operación no se podrá deshacer.
file-delete-toast-success = Archivo eliminado.
file-delete-toast-error-not-allowed = No tienes permisos para eliminar este archivo.
file-delete-toast-error-other = No ha sido posible eliminar este archivo.
preview-image-heading = Previsualización de imagen
preview-image-thumbnail-tooltip = Ver o descargar la imagen completa
preview-image-alt = Previsualización de `{ $filename }`
preview-audio-heading = Previsualización de audio
preview-audio-error-playback =
    Desafortunadamente, tu navegador no permite mostrar una previsualización de `{ $filename }`.
    Como alternativa, puedes <download-link>descargarlo</download-link>.
preview-video-heading = Previsualización de video
preview-video-error-playback =
    Desafortunadamente, tu navegador no permite mostrar una previsualización de `{ $filename }`.
    Como alternativa, puedes <download-link>descargarlo</download-link>.
preview-json-heading = Contenido del archivo
preview-json-save-button = Guardar
preview-json-update-toast-success = Guardado. <undo-button>Deshacer.</undo-button>
preview-json-update-toast-error = Ha ocurrido un error guardando el archivo JSON.
preview-text-heading = Contenido del archivo
preview-text-save-button = Guardar
preview-text-update-toast-success = Guardado. <undo-button>Deshacer.</undo-button>
preview-text-update-toast-error = Ha ocurrido un error guardando el archivo de texto.

## TurtleViewer

turtle-heading = Turtle en crudo
turtle-danger-warning = Atención: errores tipográficos y sintácticos pueden hacer el archivo ilegible.
turtle-dataset-viewer-link = Vuelve a la zona segura.
turtle-save-button = Guardar
turtle-update-toast-success = Guardado. <undo-button>Deshacer.</undo-button>
turtle-update-toast-error = Ha ocurrido un error guardando el archivo.

## Client ID editor

clientid-editor-heading = Identificador del cliente
clientid-editor-clientname-label = Nombre del cliente
clientid-editor-clientname-input =
    .placeholder = e.g. "Mi app"
clientid-editor-redirect-urls-heading = URLs de redirección
clientid-editor-redirect-url-label = URL de redirección
clientid-editor-redirect-url-input =
    .placeholder = e.g. https://…
    .title = URL de redirección
clientid-update-toast-success = Guardado
