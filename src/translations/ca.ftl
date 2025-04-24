## Layout - footer
footer-author = Fet per <author-link>Vincent Tunru</author-link>.

twitter-tooltip = Vincent a Twitter
twitter-label = A Twitter
mastodon-tooltip = Vincent a Mastodon
mastodon-label = A Mastodon
gitlab-tooltip = Codi font a GitLab
gitlab-label = Codi font

## Layout - header
urlbar-label = URL:
urlbar-error-invalid = Si us plau, introdueix un URL vàlida
urlbar-button-label =
  .value = Obre

profile-button = Perfil

connect-button = Connectar Pod
connect-button-tooltip = Connecta amb el teu Solid Pod
disconnect-button = Desconnectar
disconnect-button-tooltip = Desconnecta del teu Solid Pod: {$webId}

## Connecting to your Pod
connectmodal-label = Connecta amb el teu Solid Pod
connectmodal-close-label = Tancar

connectform-label = Connecta amb el teu Pod a:
connectform-button =
  .value = Connectar
# Other potential values, in case they work better: "Connect automatically in the future", "automatically connect from now on"
connectform-autoconnect-label = Connectar automàticament a partir d'ara

connecterror-no-pod =
  No s'ha trobat el teu Solid Pod a <pod-url>{$pod-url}</pod-url>. Sisplau, comprova l'URL i torna-ho a provar.
# This error is shown if the user enters their WebID instead of their Solid Identity Provider.
connecterror-webid =
  Sembla que el teu Solid Pod està a <pod-url>{$detected-pod-url}</pod-url>.
  <idp-button>Vols fer servir aquesta adreça per connectar?</idp-button>
connecterror-not-useid =
  No s'ha trobat un Solid Pod per connectar.
  <useid-button>Volies dir <pod-url>{$suggested-pod-url}</pod-url>?</useid-button>
connecterror-not-inrupt =
  No s'ha trobat un Solid Pod per connectar.
  <inrupt-button>Volies dir <pod-url>{$suggested-pod-url}</pod-url>?</inrupt-button>
connecterror-deprecated-inrupt =
  Inrupt ha deixat de fer servir broker.pod.inrupt.com.
  <inrupt-button>Vols fer servir <pod-url>{$suggested-pod-url}</pod-url>?</inrupt-button>
connecterror-not-solidcommunity =
  No s'ha trobat un Solid Pod per connectar.
  <solidcommunity-button>Volies dir <pod-url>{$suggested-pod-url}</pod-url>?</solidcommunity-button>

fetcherror-no-permission = No tens permisos per veure aquest Recurs.
fetcherror-does-not-exist = Aquest Recurs no existeix.
fetcherror-unknown = S'ha produït un error desconegut ({$statusCode}).

## Homepage
pod-listing-heading = Pod(s) de: <owner-link>{$owner-name}</owner-link>
pod-listing-tooltip = Inspecciona el teu Pod a `{$pod-url}`

intro-title = Què és això?
intro-text =
  Penny és una eina per programadors d'aplicacions <solid-link>Solid</solid-link>.
  Permet inspeccionar les dades en el teu Pod i, amb els permisos adients,
  modificar i afegir dades noves.
  Assumeix familiaritat amb els conceptes de Solid.
intro-get-started-logged-out =
  Per començar, connecta amb el teu Pod per inspeccionar les dades,
  o introdueix un URL directament a la part superior de la pàgina.
  Si tens cap suggeriment, no dubtis en <contact-link>contactar amb nosaltres</contact-link>!
intro-get-started-logged-in =
  Per començar, fes servir els links a la part de dalt per inspeccionar el teu Pod,
  o introdueix un URL directament a la part superior de la pàgina.
  Si tens cap suggeriment, no dubtis en <contact-link>contactar amb nosaltres</contact-link>!

## Tree view
tree-expand-button-label = Obrir vista d'arbre
tree-expand-button-tooltip = Expandir vista d'arbre
tree-collapse-button-label = Tancar vista d'arbre
tree-collapse-button-tooltip = Col·lapsar vista d'arbre
tree-label = Recursos en el Pod

## ContainerViewer
container-children-heading = Recursos del Contenidor
container-empty-warning = Aquest Contenidor està buit.

resource-add-button = Afegir Recurs
resource-add-name-label = Nom del Recurs
resource-add-name-input =
  .placeholder = Per exemple, nom-del-recurs o nom-del-contenidor/
  .title = Nom del Recurs (acaba amb `/` per crear un Contenidor)
resource-add-name-submit = Guardar
resource-add-toast-success = Recurs creat.
resource-add-toast-success-view-button = Veure.

container-download-label = Baixar tot
container-download-tooltip = Baixa tots els Recursos accessibles d'aquest Contenidor
container-download-modal-progress-discovering = Buscant Recursos ({ $discoveredItems } trobats…)
container-download-modal-progress-zipping = Baixant Recursos ({ $downloadedItems } de { $total })
container-download-modal-save-label = Guardar { $containerName }
container-download-modal-heading = Baixant {$containerName}
container-download-modal-skipped-heading = Ignorats ({ $count })
container-download-modal-skipped-reason-inaccessible = No tens access
container-download-modal-skipped-reason-not-found = No s'ha trobat
container-download-modal-close = Tancar
container-download-toast-error-unknown = La descàrrega de {$containerName} ha fallat.

file-add-toast-success = {$fileCount ->
  [one] Fitxer pujat.
  *[other] {$fileCount} fitxers pujats.
}
file-add-toast-error-not-allowed = No tens permisos per pujar fitxers en aquest Contenidor.
file-add-toast-error-other = {$fileCount ->
  [one] No ha estat possible pujar el fitxer.
  *[other] No ha estat possible pujar els fitxers.
}
file-add-button = Pujar fitxer(s)
file-add-drop-target = Arrossega aquí per pujar

## DatasetViewer
dataset-empty-warning = Aquest Recurs està buit.
dataset-update-toast-success = Guardat. <undo-button>Desfer.</undo-button>

dataset-things-heading = Coses

danger-zone-heading = Zona perillosa
dataset-view-turtle = Turtle en cru
dataset-delete = Eliminar Recurs
dataset-delete-confirm-heading = Estàs segur?
dataset-delete-confirm-lead-container = Estàs segur que vols eliminar aquest Contenidor i tots els seus Recursos? Aquesta operació no es podrà desfer.
dataset-delete-confirm-lead-resource = Estàs segur que vols eliminar aquest Recurs? Aquesta operació no es podrà desfer.
dataset-delete-toast-prepare = Preparant per eliminar <dataset-url>{$datasetUrl}</dataset-url>…
dataset-delete-toast-process = Eliminant <dataset-url>{$datasetUrl}</dataset-url>…
dataset-delete-toast-success-container = S'ha eliminat <dataset-url>{$datasetUrl}</dataset-url> i tots els seus Recursos.
dataset-delete-toast-success-resource = S'ha eliminat <dataset-url>{$datasetUrl}</dataset-url>.
dataset-delete-toast-error-not-allowed = No tens permisos per eliminar aquest Recurs.
dataset-delete-toast-error-other = No ha estat possible eliminar aquest Recurs.

thing-add-button = Coses

thing-add-url-label = URL de la Cosa
thing-add-url-input =
  .placeholder = Exemple: https://…
  .title = URL de la Cosa
thing-add-url-submit = Guardar

thing-toast-error-not-allowed = No tens permisos per fer aquesta operació.
thing-urlcopy-button-tooltip = Copia l'URL
thing-urlcopy-toast-success = L'URL s'ha copiat al porta-retalls.

thing-delete-tooltip = Eliminar `{$thingUrl}`
thing-delete-label = Eliminar `{$thingUrl}`

thing-collapse-label = Col·lapsar
thing-collapse-tooltip = Col·lapsa això
thing-expand-label = Expandir
thing-expand-tooltip = Expandeix això

# This labels a list of rdfs:seeAlso URLs below a Thing:
thing-see-also-heading = Veure també:

wac-control-title = Control d'Accés per:
# When someone adds a new (but still empty) Thing,
# a notification will be shown on top that will allow
# adding the necessary data to turn it into an Access Control:
wac-control-initialise = Convertir a Control d'Accés.
wac-control-toast-saving = Guardant Control d'Accés…
wac-control-toast-saved = Control d'Accés guardat.
wac-control-toast-error-no-controller = Canvis no aplicats; almenys un Agent hauria de controlar aquest Recurs.
wac-control-toast-error-no-resource = Canvis no aplicats; Recurs desconegut.
wac-control-target-label = Aplicar a:
wac-control-target-option-self = El Recurs
wac-control-target-option-children = Recursos del Contenidor
wac-control-mode-label = Permisos:
wac-control-mode-option-read = Llegir
wac-control-mode-option-append = Afegir
wac-control-mode-option-write = Escriure
wac-control-mode-option-control = Controlar
wac-control-agentClass-label = Per:
wac-control-agentClass-option-agent = Tothom
wac-control-agent-label = I Agents:
wac-control-agent-add-button =
  .title = Afegir Agent
wac-control-agent-add-icon =
  .aria-label = Afegir Agent
wac-control-agent-remove-icon =
  .aria-label = Eliminar `{$agent}`

linked-resources-heading = Recursos enllaçats
linked-resources-acl-label = Llista de Control d'Accés
linked-resources-acl-add = Afegir Llista de Control d'Accés
linked-resources-acl-add-toast-success = S'ha creat la Llista de Control d'Accés
linked-resources-acl-add-toast-error-not-allowed = No tens permisos per modificar la Llista de Control d'Accés d'aquest Recurs.
linked-resources-acl-add-toast-error-other = No ha estat possible crear la Llista de Control d'Accés.
linked-resources-acr-label = Recurs de Control d'Accés

predicate-add-button = Nova propietat
predicate-add-url-label = URL de la propietat
predicate-add-url-input =
  .placeholder = Exemple: https://…
  .title = URL de la propietat
predicate-add-url-submit = Guardar
predicate-urlcopy-button-tooltip = Copiar l'URL d'aquest predicat
predicate-urlcopy-toast-success = L'URL del predicat s'ha copiat al porta-retalls.

object-unknown = Dades de tipus desconegut
object-unknown-tooltip = Dades de tipus desconegut {$type}
object-invalid-date = Format de data incorrecte
object-invalid-date-known = Format de data incorrecte ({$date})
object-delete-button-unknown =
  .title = Eliminar valor `{$value}` de tipus desconegut `{$type}`
  .aria-label = Eliminar valor `{$value}` de tipus desconegut `{$type}`
object-copy-toast-success-url = L'URL s'ha copiat al porta-retalls.
object-copy-button-url =
  .title = Copiar `{$value}`
  .aria-label = Copiar `{$value}`
object-delete-button-url =
  .title = Eliminar `{$value}`
  .aria-label = Eliminar `{$value}`
object-delete-button-string =
  .title = Eliminar `{$value}`
  .aria-label = Eliminar `{$value}`
object-delete-button-string-locale =
  .title = Eliminar `{$value} ({$locale})`
  .aria-label = Eliminar `{$value} ({$locale})`
object-delete-button-integer =
  .title = Eliminar `{$value}`
  .aria-label = Eliminar `{$value}`
object-delete-button-decimal =
  .title = Eliminar `{$value}`
  .aria-label = Eliminar `{$value}`
object-delete-button-datetime =
  .title = Eliminar `{$value}`
  .aria-label = Eliminar `{$value}`
object-delete-button-boolean =
  .title = Eliminar `{$value}`
  .aria-label = Eliminar `{$value}`

object-add-label = Afegir
object-add-url = URL
object-add-integer = Enter
object-add-decimal = Decimal
object-add-datetime = Data i hora
object-add-url-label = URL
object-add-url-input =
  .placeholder = Exemple: https://…
  .title = Valor de l'URL
object-add-url-submit = Afegir
object-add-string-label = Cadena de text
object-add-string-input =
  .title = Valor de la cadena de text
object-add-string-submit = Afegir
object-set-locale-label = Configurar idioma
object-add-locale-label = Idioma
object-add-locale-input =
  .placeholder = Exemple: nl-NL
  .title = Idioma
object-add-integer-label = Enter
object-add-integer-input =
  .placeholder = Exemple: 42
  .title = Valor de l'enter
object-add-integer-submit = Afegir
object-add-decimal-label = Decimal
object-add-decimal-input =
  .placeholder = Exemple: 4.2
  .title = Valor del decimal
object-add-decimal-submit = Afegir
object-add-date-label = Data
object-add-date-input =
  .title = Valor de la data
object-add-time-label = Hora
object-add-time-input =
  .title = Valor de la hora
object-add-datetime-submit = Afegir

## FileViewer
file-heading = fitxer
file-download-preparing = Preparant la descàrrega…
file-download-button = Descarregar
file-download-button-tooltip = Descarregar `{$filename}`
file-download-toast-error-other = No ha estat possible descarregar aquest fitxer. Potser et manquen permisos.

file-delete = Eliminar fitxer
file-delete-confirm-heading = Estàs segur?
file-delete-confirm-lead = Estàs segur que vols eliminar aquest fitxer? Aquesta operació no es podrà desfer.
file-delete-toast-success = Fitxer eliminat.
file-delete-toast-error-not-allowed = No tens permisos per eliminar aquest fitxer.
file-delete-toast-error-other = No ha estat possible eliminar aquest fitxer.

preview-image-heading = Previsualització d'imatge
preview-image-thumbnail-tooltip = Veure o descarregar la imatge completa
preview-image-alt = Previsualització de `{$filename}`

preview-audio-heading = Previsualització d'àudio
preview-audio-error-playback =
  Desafortunadament, el teu navegador no permet mostrar una previsualització de `{$filename}`.
  Com a alternativa, pots <download-link>descarregar-lo</download-link>.

preview-video-heading = Previsualització de vídeo
preview-video-error-playback =
  Desafortunadament, el teu navegador no permet mostrar una previsualització de `{$filename}`.
  Com a alternativa, pots <download-link>descarregar-lo</download-link>.

preview-json-heading = Contingut del fitxer
preview-json-save-button = Guardar
preview-json-update-toast-success = Guardat. <undo-button>Desfer.</undo-button>
preview-json-update-toast-error = Hi ha hagut un error guardant el fitxer JSON.

preview-text-heading = Contingut del fitxer
preview-text-save-button = Guardar
preview-text-update-toast-success = Guardat. <undo-button>Desfer.</undo-button>
preview-text-update-toast-error = Hi ha hagut un error guardant el fitxer de text.

## TurtleViewer
turtle-heading = Turtle en cru
turtle-danger-warning = Atenció: errors tipogràfics i sintàctics poden fer el fitxer illegible.
turtle-dataset-viewer-link = Torna a la zona segura.
turtle-save-button = Guardar
turtle-update-toast-success = Guardat. <undo-button>Desfer.</undo-button>
turtle-update-toast-error = Hi ha hagut un error guardant el fitxer.

## Client ID editor
clientid-editor-heading = Identificador del client
clientid-editor-clientname-label = Nom del client
clientid-editor-clientname-input =
  .placeholder = e.g. "La meva app"
clientid-editor-redirect-urls-heading = URLs de redirecció
clientid-editor-redirect-url-label = URL de redirecció
clientid-editor-redirect-url-input =
  .placeholder = e.g. https://…
  .title = URL de redirecció
clientid-update-toast-success = Guardat
