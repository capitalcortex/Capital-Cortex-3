import { useState } from "react"
export const AutoFocusOnFirstInput = () => {
    const firstInput = document.getElementsByTagName("input")[0] as HTMLInputElement
    firstInput.focus()
    firstInput.select()
}