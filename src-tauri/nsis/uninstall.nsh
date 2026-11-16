!include "LogicLib.nsh"

; This fork has its own application ID and must never modify or uninstall other applications.
; The upstream hook killed old app processes, removed other applications' registry values
; and restarted Explorer. All of those behaviors are intentionally removed.
!macro NSIS_HOOK_PREUNINSTALL
  DetailPrint "Uninstalling LocalClip (other clipboard applications are untouched)."
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DetailPrint "LocalClip uninstall complete."
!macroend
