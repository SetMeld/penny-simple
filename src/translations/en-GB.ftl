## Layout - footer
footer-author = By <author-link>Vincent Tunru</author-link>.

twitter-tooltip = Vincent on Twitter
twitter-label = On Twitter
mastodon-tooltip = Vincent on Mastodon
mastodon-label = On Mastodon
gitlab-tooltip = Source code on GitLab
gitlab-label = Source code

## Layout - header
urlbar-label = URL:
urlbar-error-invalid = Please enter a valid URL
urlbar-button-label =
  .value = Go

profile-button = Your Profile

connect-button = Connect Pod
connect-button-tooltip = Connect your Solid Pod
disconnect-button = Disconnect
disconnect-button-tooltip = Disconnect from your Solid Pod: {$webId}

## Connecting to your Pod
connectmodal-label = Connect your Solid Pod
connectmodal-close-label = Close

connectform-label = Connect your Pod at:
connectform-button =
  .value = Connect
# Other potential values, in case they work better: "Connect automatically in the future", "automatically connect from now on"
connectform-autoconnect-label = Always auto-connect

connecterror-no-pod =
  Could not find a Solid Pod at <pod-url>{$pod-url}</pod-url>. Please check the name and try again.
# This error is shown if the user enters their WebID instead of their Solid Identity Provider.
connecterror-webid =
  It looks like your Pod is located at <pod-url>{$detected-pod-url}</pod-url>.
  <idp-button>Use that to connect your Pod?</idp-button>
connecterror-not-useid =
  Could not find a Solid Pod to connect to.
  <useid-button>Did you mean <pod-url>{$suggested-pod-url}</pod-url>?</useid-button>
connecterror-not-inrupt =
  Could not find a Solid Pod to connect to.
  <inrupt-button>Did you mean <pod-url>{$suggested-pod-url}</pod-url>?</inrupt-button>
connecterror-deprecated-inrupt =
  Inrupt has deprecated broker.pod.inrupt.com.
  <inrupt-button>Would you like to connect to <pod-url>{$suggested-pod-url}</pod-url> instead?</inrupt-button>
connecterror-not-solidcommunity =
  Could not find a Solid Pod to connect to.
  <solidcommunity-button>Did you mean <pod-url>{$suggested-pod-url}</pod-url>?</solidcommunity-button>

fetcherror-no-permission = You do not have permission to view this Resource.
fetcherror-does-not-exist = This Resource does not exist.
fetcherror-unknown = An unknown error ({$statusCode}) occurred.

## Homepage
pod-listing-heading = Pod(s) of: <owner-link>{$owner-name}</owner-link>
pod-listing-tooltip = Browse Pod `{$pod-url}`

intro-title = What is this?
intro-text =
  Penny is a tool for developers of <solid-link>Solid</solid-link> apps.
  It allows you to inspect the data on your Pod and,
  if you have the appropriate permissions, to modify and add new data.
  It presumes familiarity with the concepts of Solid.
intro-get-started-logged-out =
  To get started, connect to your Pod to inspect its data,
  or manually enter a URL to inspect at the top of the page.
  And if you have feedback, please <contact-link>get in touch</contact-link>!
intro-get-started-logged-in =
  To get started, follow the links above to browse your Pod,
  or manually enter a URL to inspect at the top of the page.
  And if you have feedback, please&nbsp;
  <contact-link>get in touch</contact-link>!

## Tree view
tree-expand-button-label = Open tree view
tree-expand-button-tooltip = Expand tree view
tree-collapse-button-label = Close tree view
tree-collapse-button-tooltip = Collapse tree view
tree-label = Pod Resources

## ContainerViewer
container-children-heading = Contained resources
container-empty-warning = This Container is empty.

resource-add-button = Add Resource
resource-add-name-label = Resource name
resource-add-name-input =
  .placeholder = e.g. resource-name or container-name/
  .title = Resource name (append a `/` to create a Container)
resource-add-name-submit = Save
resource-add-toast-success = Resource created.
resource-add-toast-success-view-button = View.

container-download-label = Download all
container-download-tooltip = Download all accessible Resources in this Container
container-download-modal-progress-discovering = Discovering contained Resources ({ $discoveredItems } so far…)
container-download-modal-progress-zipping = Downloading Resources ({ $downloadedItems } of { $total })
container-download-modal-save-label = Save { $containerName }
container-download-modal-heading = Downloading {$containerName}
container-download-modal-skipped-heading = Skipped ({ $count })
container-download-modal-skipped-reason-inaccessible = No access
container-download-modal-skipped-reason-not-found = Not found
container-download-modal-close = Close
container-download-toast-error-unknown = Something went wrong downloading {$containerName}.

file-add-toast-success = {$fileCount ->
  [one] File uploaded.
  *[other] {$fileCount} files uploaded.
}
file-add-toast-error-not-allowed = You do not have permission to upload files in this Container.
file-add-toast-error-other = {$fileCount ->
  [one] Could not upload the file.
  *[other] Could not upload the files.
}
file-add-button = Upload file(s)
file-add-drop-target = Drop here to upload

## DatasetViewer
dataset-empty-warning = This resource is empty.
dataset-update-toast-success = Saved. <undo-button>Undo.</undo-button>

dataset-things-heading = Things

danger-zone-heading = Danger Zone
dataset-view-turtle = Raw Turtle
dataset-delete = Delete resource
dataset-delete-confirm-heading = Are you sure?
dataset-delete-confirm-lead-container = Are you sure you want to delete this Container resource and its contained resources? This can not be undone.
dataset-delete-confirm-lead-resource = Are you sure you want to delete this resource? This can not be undone.
dataset-delete-toast-prepare = Preparing deletion of <dataset-url>{$datasetUrl}</dataset-url>…
dataset-delete-toast-process = Deleting <dataset-url>{$datasetUrl}</dataset-url>…
dataset-delete-toast-success-container = Deleted <dataset-url>{$datasetUrl}</dataset-url> and its contained resources.
dataset-delete-toast-success-resource = Deleted <dataset-url>{$datasetUrl}</dataset-url>.
dataset-delete-toast-error-not-allowed = You are not allowed to delete this resource.
dataset-delete-toast-error-other = Could not delete the resource.

thing-add-button = New Thing

thing-add-url-label = Thing URL
thing-add-url-input =
  .placeholder = e.g. https://…
  .title = Thing URL
thing-add-url-submit = Save

thing-toast-error-not-allowed = You do not have permission to do that.
thing-urlcopy-button-tooltip = Copy this Thing's URL
thing-urlcopy-toast-success = Thing URL copied to clipboard.

thing-delete-tooltip = Delete `{$thingUrl}`
thing-delete-label = Delete `{$thingUrl}`

thing-collapse-label = Collapse
thing-collapse-tooltip = Collapse this Thing
thing-expand-label = Expand
thing-expand-tooltip = Expand this Thing

# This labels a list of rdfs:seeAlso URLs below a Thing:
thing-see-also-heading = Also see:

wac-control-title = Access Control for:
# When someone adds a new (but still empty) Thing,
# a notification will be shown on top that will allow
# adding the necessary data to turn it into an Access Control:
wac-control-initialise = Convert to Access Control.
wac-control-toast-saving = Saving Access Control…
wac-control-toast-saved = Access Control saved.
wac-control-toast-error-no-controller = Change not applied; at least one Agent should have Control access to the Resource itself.
wac-control-toast-error-no-resource = Change not applied; unknown target Resource.
wac-control-target-label = Applies to:
wac-control-target-option-self = The Resource
wac-control-target-option-children = Contained Resources
wac-control-mode-label = Grants:
wac-control-mode-option-read = Read
wac-control-mode-option-append = Append
wac-control-mode-option-write = Write
wac-control-mode-option-control = Control
wac-control-agentClass-label = To:
wac-control-agentClass-option-agent = Everyone
wac-control-agent-label = And Agents:
wac-control-agent-add-button =
  .title = Add Agent
wac-control-agent-add-icon =
  .aria-label = Add Agent
wac-control-agent-remove-icon =
  .aria-label = Remove `{$agent}`

linked-resources-heading = Linked Resources
linked-resources-acl-label = Access Control List
linked-resources-acl-add = Add Access Control List
linked-resources-acl-add-toast-success = Access Control List created.
linked-resources-acl-add-toast-error-not-allowed = You do not have permission to modify this Resource's Access Control List.
linked-resources-acl-add-toast-error-other = Could not create an Access Control List.
linked-resources-acr-label = Access Control Resource

predicate-add-button = New property
predicate-add-url-label = Property URL
predicate-add-url-input =
  .placeholder = e.g. https://…
  .title = Property URL
predicate-add-url-submit = Save
predicate-urlcopy-button-tooltip = Copy this Predicate URL
predicate-urlcopy-toast-success = Predicate URL copied to clipboard.

object-unknown = Data of unknown type
object-unknown-tooltip = Data of unknown type {$type}
object-invalid-date = Invalid date
object-invalid-date-known = Invalid date ({$date})
object-delete-button-unknown =
  .title = Delete value `{$value}` of unknown type `{$type}`
  .aria-label = Delete value `{$value}` of unknown type `{$type}`
object-copy-toast-success-url = URL copied to clipboard.
object-copy-button-url =
  .title = Copy `{$value}`
  .aria-label = Copy `{$value}`
object-delete-button-url =
  .title = Delete `{$value}`
  .aria-label = Delete `{$value}`
object-delete-button-string =
  .title = Delete `{$value}`
  .aria-label = Delete `{$value}`
object-delete-button-string-locale =
  .title = Delete `{$value} ({$locale})`
  .aria-label = Delete `{$value} ({$locale})`
object-delete-button-integer =
  .title = Delete `{$value}`
  .aria-label = Delete `{$value}`
object-delete-button-decimal =
  .title = Delete `{$value}`
  .aria-label = Delete `{$value}`
object-delete-button-datetime =
  .title = Delete `{$value}`
  .aria-label = Delete `{$value}`
object-delete-button-boolean =
  .title = Delete `{$value}`
  .aria-label = Delete `{$value}`

object-add-label = Add
object-add-url = URL
object-add-integer = Integer
object-add-decimal = Decimal
object-add-datetime = Datetime
object-add-url-label = URL
object-add-url-input =
  .placeholder = e.g. https://…
  .title = URL value
object-add-url-submit = Add
object-add-string-label = String
object-add-string-input =
  .title = String value
object-add-string-submit = Add
object-set-locale-label = Set locale
object-add-locale-label = Locale
object-add-locale-input =
  .placeholder = e.g. nl-NL
  .title = Locale
object-add-integer-label = Integer
object-add-integer-input =
  .placeholder = e.g. 42
  .title = Integer value
object-add-integer-submit = Add
object-add-decimal-label = Decimal
object-add-decimal-input =
  .placeholder = e.g. 4.2
  .title = Decimal value
object-add-decimal-submit = Add
object-add-date-label = Date
object-add-date-input =
  .title = Date value
object-add-time-label = Time
object-add-time-input =
  .title = Time value
object-add-datetime-submit = Add

## FileViewer
file-heading = File
file-download-preparing = Preparing download…
file-download-button = Download
file-download-button-tooltip = Download `{$filename}`
file-download-toast-error-other = Could not download this file. You might not have sufficient access.

file-delete = Delete file
file-delete-confirm-heading = Are you sure?
file-delete-confirm-lead = Are you sure you want to delete this file? This can not be undone.
file-delete-toast-success = File deleted.
file-delete-toast-error-not-allowed = You are not allowed to delete this file.
file-delete-toast-error-other = Could not delete the file.

preview-image-heading = Image Preview
preview-image-thumbnail-tooltip = View or download full image
preview-image-alt = Preview of `{$filename}`

preview-audio-heading = Audio Preview
preview-audio-error-playback =
  Unfortunately your browser cannot provide a preview of `{$filename}`.
  You can <download-link>download it</download-link> instead.

preview-video-heading = Video Preview
preview-video-error-playback =
  Unfortunately your browser cannot provide a preview of `{$filename}`.
  You can <download-link>download it</download-link> instead.

preview-json-heading = File Contents
preview-json-save-button = Save
preview-json-update-toast-success = Saved. <undo-button>Undo.</undo-button>
preview-json-update-toast-error = There was an error saving your JSON.

preview-text-heading = File Contents
preview-text-save-button = Save
preview-text-update-toast-success = Saved. <undo-button>Undo.</undo-button>
preview-text-update-toast-error = There was an error saving your text file.

## TurtleViewer
turtle-heading = Raw Turtle
turtle-danger-warning = Warning: typos and other syntactic errors can make your data unreadable.
turtle-dataset-viewer-link = Back to safety.
turtle-save-button = Save
turtle-update-toast-success = Saved. <undo-button>Undo.</undo-button>
turtle-update-toast-error = There was an error saving your Turtle.

## Client ID editor
clientid-editor-heading = Client Identifier
clientid-editor-clientname-label = Client name
clientid-editor-clientname-input =
  .placeholder = e.g. "My app"
clientid-editor-redirect-urls-heading = Redirect URLs
clientid-editor-redirect-url-label = Redirect URL
clientid-editor-redirect-url-input =
  .placeholder = e.g. https://…
  .title = Redirect URL
clientid-update-toast-success = Saved
