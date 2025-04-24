## Layout - footer
footer-author = Door <author-link>Vincent Tunru</author-link>.

twitter-tooltip = Vincent op Twitter
twitter-label = Op Twitter
mastodon-tooltip = Vincent op Mastodon
mastodon-label = Op Mastodon
gitlab-tooltip = Broncode op GitLab
gitlab-label = Broncode

## Layout - header
urlbar-label = URL:
urlbar-error-invalid = Vul een geldige URL in
urlbar-button-label =
  .value = Ga

profile-button = Jouw profiel

connect-button = Verbind Pod
connect-button-tooltip = Verbind je Solid Pod
disconnect-button = Log uit
disconnect-button-tooltip = Verbreek de verbinding met je Solid Pod: {$webId}

## Connecting to your Pod
connectmodal-label = Verbind je Solid Pod
connectmodal-close-label = Sluiten

connectform-label = Verbind je Pod op:
connectform-button =
  .value = Verbinden
connectform-autoconnect-label = Voortaan automatisch verbinden

connecterror-no-pod =
  Kon geen Solid Pod vinden op <pod-url>{$pod-url}</pod-url>. Controleer de URL en probeer het nog eens.
connecterror-webid =
  Je Pod lijkt zich te bevinden op <pod-url>{$detected-pod-url}</pod-url>.
  <idp-button>Daarvan gebruik maken om je Pod te verbinden?</idp-button>
connecterror-not-useid =
  Kon niet verbinden met een Solid Pod.
  <useid-button>Bedoelde je <pod-url>{$suggested-pod-url}</pod-url>?</useid-button>
connecterror-not-inrupt =
  Kon niet verbinden met een Solid Pod.
  <inrupt-button>Bedoelde je <pod-url>{$suggested-pod-url}</pod-url>?</inrupt-button>
connecterror-deprecated-inrupt =
  Inrupt heeft broker.pod.inrupt.com vervangen.
  <inrupt-button>Wil je verbinden met <pod-url>{$suggested-pod-url}</pod-url>?</inrupt-button>
connecterror-not-solidcommunity =
  Kon niet verbinden met een Solid Pod.
  <solidcommunity-button>Bedoelde je <pod-url>{$suggested-pod-url}</pod-url>?</solidcommunity-button>

fetcherror-no-permission = Je hebt onvoldoende rechten om deze Resource te bekijken.
fetcherror-does-not-exist = Deze Resource bestaat niet.
fetcherror-unknown = Er is een onbekende fout ({$statusCode}) opgetreden.

## Homepage
pod-listing-heading = Pod(s) van: <owner-link>{$owner-name}</owner-link>
pod-listing-tooltip = Pod `{$pod-url}` bekijken

intro-title = Wat is dit?
intro-text =
  Penny is een tool for ontwikkelaars van <solid-link>Solid</solid-link> apps.
  Je kan er de data op je Pod mee bekijken en,
  als je de benodigde rechten hebt, de data aanpassen en nieuwe data toevoegen.
  Bekendheid met de concepten in Solid is aan te raden.
intro-get-started-logged-out =
  Verbind je Pod om de data te bekijken,
  of vul bovenaan de pagina handmatig een URL in.
  Als je feedback hebt, <contact-link>laat het weten</contact-link>!
intro-get-started-logged-in =
  Volg de bovenstaande links om de data op de Pod te bekijken,
  of vul bovenaan de pagina handmatig een URL in.
  Als je feedback hebt, <contact-link>laat het weten</contact-link>!

## Tree view
tree-expand-button-label = Open resource-boom
tree-expand-button-tooltip = Boom uitklappen
tree-collapse-button-label = Sluit resource-boom
tree-collapse-button-tooltip = Boom dichtklappen
tree-label = Resources in je Pod

## ContainerViewer
container-children-heading = Resources in deze container
container-empty-warning = Deze container is leeg.

resource-add-button = Resource toevoegen
resource-add-name-label = Naam voor deze resource.
resource-add-name-input =
  .placeholder = bijv. resource-naam of container-naam/
  .title = Naam voor deze resource (als de naam eindigt met een `/` wordt het een container)
resource-add-name-submit = Opslaan
resource-add-toast-success = Resource aangemaakt.
resource-add-toast-success-view-button = Bekijken.

container-download-label = Alles downloaden
container-download-tooltip = Download alle toegangelijke Resources in deze Container
container-download-modal-progress-discovering = Resources aan het verzamelen (tot nu toe { $discoveredItems }…)
container-download-modal-progress-zipping = Resources aan het downloaden ({ $downloadedItems } van { $total })
container-download-modal-save-label = { $containerName } opslaan
container-download-modal-heading = {$containerName} aan het downloaden
container-download-modal-skipped-heading = Overgeslagen ({ $count })
container-download-modal-skipped-reason-inaccessible = Geen toegang
container-download-modal-skipped-reason-not-found = Niet gevonden
container-download-modal-close = Sluiten
container-download-toast-error-unknown = Er is iets misgegaan bij het downloaden van { $containerName }.

file-add-toast-success = {$fileCount ->
  [one] Bestand geüpload.
  *[other] {$fileCount} bestanden geüpload.
}
file-add-toast-error-not-allowed = Je hebt onvoldoende rechten om bestanden naar deze container te uploaden.
file-add-toast-error-other = {$fileCount ->
  [one] Kon het bestand niet uploaden.
  *[other] Kon de bestanden niet uploaden.
}
file-add-button = Bestand(en) uploaden
file-add-drop-target = Hier loslaten om te uploaden

## DatasetViewer
dataset-empty-warning = Deze resource is leeg.
dataset-update-toast-success = Opgeslagen. <undo-button>Ongedaan maken.</undo-button>

dataset-things-heading = Things

danger-zone-heading = Gevarenzone
dataset-view-turtle = Rauwe Turtle
dataset-delete = Resource verwijderen
dataset-delete-confirm-heading = Zeker weten?
dataset-delete-confirm-lead-container = Weet je zeker dat je deze container en alle resources erin wil verwijderen? Dit kan niet ongedaan worden gemaakt.
dataset-delete-confirm-lead-resource = Weet je zeker dat je deze resource wil verwijderen? Dit kan niet ongedaan worden gemaakt.
dataset-delete-toast-prepare = Verwijderen van <dataset-url>{$datasetUrl}</dataset-url> aan het voorbereiden…
dataset-delete-toast-process = <dataset-url>{$datasetUrl}</dataset-url> aan het verwijderen…
dataset-delete-toast-success-container = <dataset-url>{$datasetUrl}</dataset-url> en alle resources erin zijn verwijderd.
dataset-delete-toast-success-resource = <dataset-url>{$datasetUrl}</dataset-url> is verwijderd.
dataset-delete-toast-error-not-allowed = Je hebt onvoldoende rechten om deze resource te verwijderen.
dataset-delete-toast-error-other = Kon de resource niet verwijderen.

thing-add-button = Nieuw thing

thing-add-url-label = URL voor dit thing
thing-add-url-input =
  .placeholder = bijv. https://…
  .title = URL voor dit thing
thing-add-url-submit = Opslaan

thing-toast-error-not-allowed = Je hebt hier onvoldoende rechten voor.
thing-urlcopy-button-tooltip = Kopieer de URL van dit thing.
thing-urlcopy-toast-success = URL van dit Thing is gekopieerd naar het klembord.

thing-delete-tooltip = `{$thingUrl}` verwijderen
thing-delete-label = `{$thingUrl}` verwijderen

thing-collapse-label = Inklappen
thing-collapse-tooltip = Dit thing inklappen
thing-expand-label = Uitklappen
thing-expand-tooltip = Dit thing uitklappen

# This labels a list of rdfs:seeAlso URLs below a Thing:
thing-see-also-heading = Zie ook:

wac-control-title = Access Control voor:
# When someone adds a new (but still empty) Thing,
# a notification will be shown on top that will allow
# adding the necessary data to turn it into an Access Control:
wac-control-initialise = Maak dit een Access Control.
wac-control-toast-saving = Access Control opslaan…
wac-control-toast-saved = Access Control opgeslagen.
wac-control-toast-error-no-controller = Wijziging niet toegepast; zorg dat tenminste één Agent Control-rechten heeft op de Resource zelf.
wac-control-toast-error-no-resource = Wijziging niet toegepast; geen betreffende Resource gevonden.
wac-control-target-label = Werkt op:
wac-control-target-option-self = De Resource
wac-control-target-option-children = Onderliggende Resources
wac-control-mode-label = Rechten:
wac-control-mode-option-read = Read
wac-control-mode-option-append = Append
wac-control-mode-option-write = Write
wac-control-mode-option-control = Control
wac-control-agentClass-label = Voor:
wac-control-agentClass-option-agent = Iedereen
wac-control-agent-label = En deze Agents:
wac-control-agent-add-button =
  .title = Agent toevoegen
wac-control-agent-add-icon =
  .aria-label = Agent toevoegen
wac-control-agent-remove-icon =
  .aria-label = `{$agent}` verwijderen

linked-resources-heading = Gelinkte Resources
linked-resources-acl-label = Access Control List
linked-resources-acl-add = Access Control List toevoegen
linked-resources-acl-add-toast-success = Access Control List aangemaakt.
linked-resources-acl-add-toast-error-not-allowed = Je hebt onvoldoende rechten om de Access Control List van deze Resource aan te passen.
linked-resources-acl-add-toast-error-other = Kon Access Control List niet aanmaken.
linked-resources-acr-label = Access Control Resource

predicate-add-button = Nieuwe property
predicate-add-url-label = URL voor deze property
predicate-add-url-input =
  .placeholder = bijv. https://…
  .title = URL voor deze property
predicate-add-url-submit = Opslaan
predicate-urlcopy-button-tooltip = Kopieer de URL van deze property.
predicate-urlcopy-toast-success = URL van deze property is gekopieerd naar het klembord.

object-unknown = Data van onbekend type
object-unknown-tooltip = Data van onbekend type {$type}
object-invalid-date = Ongeldige datum
object-invalid-date-known = Ongeldige datum ({$date})
object-delete-button-unknown =
  .title = Waarde `{$value}` van onbekend type `{$type}` verwijderen
  .aria-label = Waarde `{$value}` van onbekend type `{$type}` verwijderen
object-copy-toast-success-url = URL is gekopiëerd naar het klembord.
object-copy-button-url =
  .title = `{$value}` kopiëren
  .aria-label = `{$value}` kopiëren
object-delete-button-url =
  .title = `{$value}` verwijderen
  .aria-label = `{$value}` verwijderen
object-delete-button-string =
  .title = `{$value}` verwijderen
  .aria-label = `{$value}` verwijderen
object-delete-button-string-locale =
  .title = `{$value} ({$locale})` verwijderen
  .aria-label = `{$value} ({$locale})` verwijderen
object-delete-button-integer =
  .title = `{$value}` verwijderen
  .aria-label = `{$value}` verwijderen
object-delete-button-decimal =
  .title = `{$value}` verwijderen
  .aria-label = `{$value}` verwijderen
object-delete-button-datetime =
  .title = `{$value}` verwijderen
  .aria-label = `{$value}` verwijderen
object-delete-button-boolean =
  .title = `{$value}` verwijderen
  .aria-label = `{$value}` verwijderen

object-add-label = Toevoegen
object-add-url = URL
object-add-integer = Geheel getal
object-add-decimal = Decimaal
object-add-datetime = Datum+tijd
object-add-url-label = URL
object-add-url-input =
  .placeholder = bijv. https://…
  .title = URL
object-add-url-submit = Toevoegen
object-add-string-label = String
object-add-string-input =
  .title = String
object-add-string-submit = Toevoegen
object-set-locale-label = Locale instellen
object-add-locale-label = Locale
object-add-locale-input =
  .placeholder = bijv. nl-NL
  .title = Locale
object-add-integer-label = Geheel getal
object-add-integer-input =
  .placeholder = bijv. 42
  .title = Geheel getal
object-add-integer-submit = Toevoegen
object-add-decimal-label = Decimaal
object-add-decimal-input =
  .placeholder = bijv. 4.2
  .title = Decimaal
object-add-decimal-submit = Toevoegen
object-add-date-label = Datum
object-add-date-input =
  .title = Datum
object-add-time-label = Tijd
object-add-time-input =
  .title = Tijd
object-add-datetime-submit = Toevoegen

## FileViewer
file-heading = Bestand
file-download-preparing = Download voorbereiden…
file-download-button = Download
file-download-button-tooltip = Download `{$filename}`
file-download-toast-error-other = Kon dit bestand niet downloaden. Wellicht heb je onvoldoende rechten.

file-delete = Bestand verwijderen
file-delete-confirm-heading = Zeker weten?
file-delete-confirm-lead = Weet je zeker dat je dit bestand wil verwijderen? Dit kan niet ongedaan worden gemaakt.
file-delete-toast-success = Bestand verwijderd.
file-delete-toast-error-not-allowed = Je hebt onvoldoende rechten om dit bestand te verwijderen.
file-delete-toast-error-other = Kon het bestand niet verwijderen.

preview-image-heading = Voorvertoning van afbeelding
preview-image-thumbnail-tooltip = Volledige afbeelding bekijken of downloaden
preview-image-alt = Voorvertoning van `{$filename}`

preview-audio-heading = Voorvertoning van geluidsfragment
preview-audio-error-playback =
  Je browser kan geen voorvertoning laten zien van `{$filename}`.
  Je kan wel <download-link>het bestand downloaden</download-link>.

preview-video-heading = Video Preview
preview-video-error-playback =
  Je browser kan geen voorvertoning laten zien van `{$filename}`.
  Je kan wel <download-link>het bestand downloaden</download-link>.

preview-json-heading = Bestandsinhoud
preview-json-save-button = Opslaan
preview-json-update-toast-success = Opgeslagen. <undo-button>Ongedaan maken.</undo-button>
preview-json-update-toast-error = Onbekende fout bij het opslaan van je JSON.

preview-text-heading = Bestandsinhoud
preview-text-save-button = Opslaan
preview-text-update-toast-success = Opgeslagen. <undo-button>Ongedaan maken.</undo-button>
preview-text-update-toast-error = Onbekende fout bij het opslaan van je tekstbestand.

## TurtleViewer
turtle-heading = Rauwe Turtle
turtle-danger-warning = Waarschuwing: syntactische fouten kunnen je data onleesbaar maken.
turtle-dataset-viewer-link = Ga terug.
turtle-save-button = Opslaan
turtle-update-toast-success = Opgeslagen. <undo-button>Ongedaan maken.</undo-button>
turtle-update-toast-error = Onbekende fout bij het opslaan van je Turtle.

## Client ID editor
clientid-editor-heading = Client Identifier
clientid-editor-clientname-label = Naam Client
clientid-editor-clientname-input =
  .placeholder = bijv. "Mijn app"
clientid-editor-redirect-urls-heading = Redirect-URLs
clientid-editor-redirect-url-label = Redirect-URL
clientid-editor-redirect-url-input =
  .placeholder = bijv. https://…
  .title = Redirect-URL
clientid-update-toast-success = Opgeslagen
