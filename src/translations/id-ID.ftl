## Layout - footer
footer-author = Oleh <author-link>Vincent Tunru</author-link>.

twitter-tooltip = Vincent di Twitter
twitter-label = Twitter
mastodon-tooltip = Vincent di Mastodon
mastodon-label = Mastodon
gitlab-tooltip = Source code di GitLab
gitlab-label = Source code

## Layout - header
urlbar-label = URL:
urlbar-button-label =
  .value = Go

profile-button = Profil Anda

connect-button = Pasang Pod
connect-button-tooltip = Pasang Solid Pod Anda
disconnect-button = Putus talian
disconnect-button-tooltip = Putus talian Solid Pod: {$webId}

## Connecting to your Pod
connectmodal-label = Pasang Solid Pod Anda
connectmodal-close-label = Balik

connectform-label = Pasang Pod Anda ke:
connectform-button =
  .value = Pasang

connecterror-no-pod = 
  Tidak dapat cari suatu Solid Pod di <pod-url>{$pod-url}</pod-url>. Mohon periksa semula nama dan cuba lagi.
connecterror-not-useid =
  Tidak dapat cari suatu Solid Pod pun untuk dipasang.
  <useid-button>Mungkin anda mahu memasang Pod <pod-url>{$suggested-pod-url}</pod-url> ini?</useid-button>
connecterror-not-inrupt = 
  Tidak dapat cari suatu Solid Pod pun untuk dipasang.
  <inrupt-button>Mungkin anda mahu memasang Pod <pod-url>{$suggested-pod-url}</pod-url> ini?</inrupt-button>
connecterror-not-solidcommunity = 
  Tidak dapat cari suatu Solid Pod pun untuk dipasang.
  <solidcommunity-button>Mungkin anda mahu memasang Pod <pod-url>{$suggested-pod-url}</pod-url> ini?</solidcommunity-button>

## Homepage
pod-listing-heading = Pod(s) saham: <owner-link>{$owner-name}</owner-link>
pod-listing-tooltip = Meriksa Pod `{$pod-url}`

intro-title = Apa ini?
intro-text =
  Penny adalah suatu alat khas untuk developer <solid-link>Solid</solid-link> apps.
  Ia membolehi anda meriksa data di dalam Pod anda,
  hanya jika anda ada keizinan yang tertentu, untuk mengubah dan menambah data terada.
  Developer harus fasih pemahaman ilmu Solid.
intro-get-started-logged-out =
  Untuk mula menggunakan Penny, sila memasang Pod anda sebelum meriksa data,
  ataupun mengisi URL di halaman atas.
  Jika anda ada cadangan, jangan segan <contact-link>membalas di link ini</contact-link>!
intro-get-started-logged-in = 
  Untuk mula menggunakan Penny, sila ikut link di halaman atas untuk merikssa Pod anda,
  ataupun mengisi URL di halaman atas.
  Jika anda ada cadangan, jangan segan&nbsp;
  <contact-link>membalas di link ini</contact-link>!

## ContainerViewer
container-children-heading = Contained resources
container-empty-warning = Container ini kosong.

resource-add-button = Tambah Resource
resource-add-name-label = Nama Resource
resource-add-name-input =
  .placeholder = e.g. nama-resource atau nama-container/
  .title = Nama Resource (taip `/` untuk membikin suatu Container)
resource-add-name-submit = Save
resource-add-toast-success = Resource dibikin.
resource-add-toast-success-view-button =Meriksa.

file-add-toast-success = {$fileCount ->
  [one] Fail beres upload.
  *[other] {$fileCount} Fail2 beres upload.
}
file-add-toast-error-not-allowed = Anda tiada izin untuk upload Container ini.
file-add-toast-error-other = {$fileCount ->
  [one] Tidak syabas upload fail.
  *[other] Tidak syabas upload fail2.
}
file-add-button = Upload fail2
file-add-drop-target = Drop sini untuk upload

## DatasetViewer
dataset-empty-warning = Resource ini kosong.
dataset-update-toast-success = Syabas Save. <undo-button>Balik semula.</undo-button>

dataset-things-heading = Things

danger-zone-heading = Zon Bahaya
dataset-delete = Hapuskan resource
dataset-delete-confirm-heading = Anda Pasti?
dataset-delete-confirm-lead-container = Anda pasti mahu hapuskan Container ini? Kamu tidak dapat balik semula Container ni.
dataset-delete-confirm-lead-resource = Anda pasti mahu hapuskan resource ini? Kamu tidak dapat balik semula resource ni.
dataset-delete-toast-prepare = Siap sedia hapusan URL <dataset-url>{$datasetUrl}</dataset-url>…
dataset-delete-toast-process = Sedang hapus <dataset-url>{$datasetUrl}</dataset-url>…
dataset-delete-toast-success-container = Telah hapus <dataset-url>{$datasetUrl}</dataset-url> dan resource2-nya.
dataset-delete-toast-success-resource = Telah hapus <dataset-url>{$datasetUrl}</dataset-url>.
dataset-delete-toast-error-not-allowed = Kamu tidak dizin hapuskan resource ini.
dataset-delete-toast-error-other = Tidak boleh hapuskan resource ni.

thing-add-button = Thing Bahru

thing-add-url-label = URL Thing
thing-add-url-input =
  .placeholder = e.g. https://…
  .title = URL Thing
thing-add-url-submit = Save

thing-toast-error-not-allowed = Kamu tidak dizin berbuat sedemikian.
thing-urlcopy-button-tooltip = Salin semula URL Thing ini.
thing-urlcopy-toast-success = URL Thing disalin ke clipboard.

thing-delete-tooltip = Hapuskan `{$thingUrl}`
thing-delete-label = Hapuskan `{$thingUrl}`

thing-collapse-label = Lipat
thing-collapse-tooltip = Lipat Thing ini
thing-expand-label = Lapang
thing-expand-tooltip = Lapang Thing ini

wac-control-title = Access Control utk:
wac-control-toast-saving = Sdg save Access Control…
wac-control-toast-saved = Syabas save Access Control.
wac-control-toast-error-no-controller = Gagal salin; sekurangnya, satu Agent harus ada Access Control dengan Resource terpilih.
wac-control-toast-error-no-resource = Gagal salin; Sila pilih Resource terdahulu.
wac-control-target-label = Pilihan:
wac-control-target-option-self = Resource terpilih
wac-control-target-option-children = Contained Resources
wac-control-mode-label = Direstu:
wac-control-mode-option-read = Read
wac-control-mode-option-append = Append
wac-control-mode-option-write = Write
wac-control-mode-option-control = Control
wac-control-agentClass-label = Kpd:
wac-control-agentClass-option-agent = Semua
wac-control-agent-label = dan juga Agents:
wac-control-agent-add-button =
  .title = Jemput Agent
wac-control-agent-add-icon =
  .aria-label = Jemput Agent
wac-control-agent-remove-icon =
  .aria-label = Pangkar `{$agent}`

predicate-add-button = Properti bahru
predicate-add-url-label = Properti URL
predicate-add-url-input =
  .placeholder = e.g. https://…
  .title = Properti URL
predicate-add-url-submit = Save

object-unknown-tooltip = Jenis Data tidak dikenali {$type}
object-delete-button-unknown =
  .title = Hapuskan value `{$value}` tidak dikenali `{$type}`
  .aria-label = Hapuskan value `{$value}` tidak dikenali `{$type}`
object-delete-button-url =
  .title = Hapuskan `{$value}`
  .aria-label = Hapuskan `{$value}`
object-delete-button-string =
  .title = Hapuskan `{$value}`
  .aria-label = Hapuskan `{$value}`
object-delete-button-string-locale =
  .title = Hapuskan `{$value} ({$locale})`
  .aria-label = Hapuskan `{$value} ({$locale})`
object-delete-button-integer =
  .title = Hapuskan `{$value}`
  .aria-label = Hapuskan `{$value}`
object-delete-button-decimal =
  .title = Hapuskan `{$value}`
  .aria-label = Hapuskan `{$value}`
object-delete-button-datetime =
  .title = Hapuskan `{$value}`
  .aria-label = Hapuskan `{$value}`
object-delete-button-boolean =
  .title = Hapuskan `{$value}`
  .aria-label = Hapuskan `{$value}`

object-add-label = Salin
object-add-url = URL
object-add-integer = Integer
object-add-decimal = Decimal
object-add-datetime = Tarikhmasa
object-add-url-label = URL
object-add-url-input =
  .placeholder = e.g. https://…
  .title = value URL
object-add-url-submit = Salin
object-add-string-label = String
object-add-string-input =
  .title = Value String
object-add-string-submit = Salin
object-set-locale-label = Tetapkan locale
object-add-locale-label = Locale
object-add-locale-input =
  .placeholder = e.g. in-IN
  .title = Locale
object-add-integer-label = Integer
object-add-integer-input =
  .placeholder = e.g. 42
  .title = Value Integer
object-add-integer-submit = Salin
object-add-decimal-label = Decimal
object-add-decimal-input =
  .placeholder = e.g. 4.2
  .title = Value Decimal
object-add-decimal-submit = Salin
object-add-date-label = Tarikh
object-add-date-input =
  .title = Value Tarikh
object-add-time-label = Masa
object-add-time-input =
  .title = Value Masa
object-add-datetime-submit = Salin

## FileViewer
file-heading = Fail
file-download-preparing = Siap sedia download…
file-download-button = Download
file-download-button-tooltip = Download `{$filename}`
file-download-toast-error-other = Gagal download fail ni. Ada kemungkinan anda tidak cukup kebenaran.

file-delete = Hapuskan fail
file-delete-confirm-heading = Anda Pasti?
file-delete-confirm-lead = Anda pasti mahu hapuskan Fail ini? Kamu tidak dapat balik semula Fail ini.
file-delete-toast-success = Fail dihapuskan.
file-delete-toast-error-not-allowed = Kamu tidak dizin hapuskan fail ini.
file-delete-toast-error-other = Tidak boleh hapuskan fail ini.

preview-image-heading = Preview gambar
preview-image-thumbnail-tooltip = View atau download gambar saiz penuh
preview-image-alt = Preview gambar `{$filename}`

preview-audio-heading = Preview Audio
preview-audio-error-playback =
  Sungguh kesal skali browser anda tidak boleh preview fail `{$filename}`.
  Anda boleh <download-link>download fail-nya</download-link> di sini.

preview-video-heading = Preview Video
preview-video-error-playback =
  Sungguh kesal skali browser anda tidak boleh preview video `{$filename}`.
  Anda boleh <download-link>download video tersebut</download-link> di sini.

preview-text-heading = Isi Kandungan Fail
