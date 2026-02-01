import { CheckCircle2Icon, InfoIcon } from "lucide-react"
import React from "react"

export const Alert = ({ ok, message }) => {
    return (
        <div className="flex items-center justify-center gap-2 p-4 rounded-md bg-[#000000] text-white">
            {ok === true ? <CheckCircle2Icon className="h-5 w-5" /> : <InfoIcon className="h-5 w-5" />}
            <span>{message}</span>
        </div>
    )
}