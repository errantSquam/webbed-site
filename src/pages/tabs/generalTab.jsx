import { useState } from "react"
import React from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { LightHr, Header } from "../../components/tosComponents"
import { Invisidiv, Invisidiv2 } from "../../stylesfunctions/meeboviescript"
import { Link } from "react-router-dom"
import { TableOfContents } from "../../components/tosComponents"
const MagicWord = () => {
    const [isPressed, setIsPressed] = useState(false)
    let magicWordPreview = "Click on the magic word to prove you've read the ToS (it copies to clipboard) -> ".split('')
    //If you're inspect elementing to find the magic word, uhhhhh congratulations. Go read the ToS.

    return <div><div className="flex flex-row flex-wrap">
        {magicWordPreview.map((chara, index) => <span key = {chara + index}>{chara !== " " ? chara : <span>&nbsp;</span>}</span>)}
        <div className={`flex flex-row transition duration-300 border 
            
            ${!isPressed ? "border-zinc-400 hover:border-green-500" : "border-green-500"}
            ${isPressed ? "bg-zinc-700/0" : "bg-zinc-800"}
            ${isPressed ? "text-zinc-300" : "text-zinc-800"} 
            px-2 
            ${"cursor-pointer"}`}
            onClick={() => 
            {setIsPressed(true)
                navigator.clipboard.writeText("snemj")
            }}>
            snemj
        </div>
        
    </div>
    {isPressed &&   
        <div className = "mt-2">You may submit your request <u><a href="https://forms.gle/hepVgfnUVBVBAtNm7">here</a></u> after copying it!</div>
        }
    </div>
}

const GeneralInfo = () => {
    return <div id="general">
        <Header icon="material-symbols:info">GENERAL INFORMATION</Header>
        <div>Please note that <b>I reserve the right to decline any commission request.</b><br /><br />
            <Invisidiv />
            I reserve the right to adjust any information on my commissions and/or request forms, as well as the price of any commission accordingly. <br /><br />
            However, <b>I will never change the price of a commission that has already been previously agreed upon,</b> unless the scope of the commission is modified significantly OR a month has passed without any follow-up/payment.
            <br /><br />
            <Invisidiv />
            I will not be responsible for any mistakes on the final version of any commission due to incorrect or
            missing information.<br /><br />
            It is the commissioner’s responsibility to provide all relevant information when requesting a commission.<br /><br />

            I reserve the right to reject critiques pertaining to artistic skill and style, if the critique reduces the artistic quality of the piece.<br /><br />

            All personal information will be kept private and confidential.</div>
    </div>
}

const ImageRights = () => {
    return <div id="rights">
        <Header icon="material-symbols:wall-art">IMAGE RIGHTS AND USAGE</Header>

        I reserve full rights to the image and its distribution and use, unless otherwise specified. <br /><br />

        I reserve the right to display any commissioned image(s) on any of my websites or my portfolio.<br /><br />

        The commissioner must not claim my work as theirs.<br /><br />

        If you do not want the art to be posted until a certain date/time, please discuss with me ahead of time. If the art is for commercial purposes, I will likely discuss this with you further.<br />

        <LightHr />
        If the commissioner wishes to use commissioned image(s) for <b>commercial or profit purposes</b>, including prints and redistribution of the commissioned image(s), it must be <b>specified beforehand.</b><br /><br />
        <b><u>Otherwise, see the following:<br /></u></b>
        <ul className="list-disc ml-5 space-y-2 mt-2">
            <li>Under no circumstances may the commissioner use commissioned image(s) for commercial or profit purposes, including prints and redistribution of the commissioned image(s). </li>

            <li>The commissioner may only use artwork that was created specifically for them, and are for the commissioner’s personal use only, including: </li>
            <ul className="list-disc ml-10 italic">
                <li>Wallpapers and backgrounds</li>
                <li>Cropping the image for avatars/icons</li>
                <li>Printing the image for personal display</li>
                <li>Using the image as a personal tattoo</li>
                <li><i>Etc.</i></li>
            </ul>

            <li>Gift art is okay, so long as it remains personal use on the recipient’s end.</li>

            <li>The commissioner is allowed to upload commissions I have created for them to an online gallery provided that appropriate credit is given and that the following link is always displayed with the commissioned work:
                <ul className="list-disc ml-10">
                    <li><u><a
                        className="break-all"
                        href="https://bsky.app/profile/errantsquam.heckingsne.cc">https://bsky.app/profile/errantsquam.heckingsne.cc</a></u></li>
                    <li className="list-none">OR</li>
                    <li><u><a
                        className="break-all"
                        href="https://heckingsne.cc/#/gallery">https://heckingsne.cc/#/gallery</a></u></li>
                </ul>
            </li>
        </ul>
    </div>
}

const Guidelines = () => {
    return <div id="guide">
        <Header icon="material-symbols:brush">COMMISSION GUIDELINES & PROTOCOLS</Header>
        <div>
            <b>I do not accept commissions without image references.</b> Giving me a written description without an image reference makes it more difficult for me to complete the commission. As a result, the commissioner may not be fully satisfied with the commission.
            <br /><br />
            Once a commission request has been approved and payment has been received, I will inform the commissioner of their place in the commissions queue as well as an estimate of when I will begin their commission.
            For more details regarding payment procedures, please read the <b className="cursor-pointer"
                onClick={() => document.getElementById("payment")?.scrollIntoView({ behavior: 'smooth' })}><u>"Payment"</u></b> section.
            <br />
            <LightHr />
            I will send the commissioner a sketch for approval before continuing the commission.
            This is the only time the commissioner is permitted to request changes freely.
            During the sketch phase, the commissioner is allowed up to a limit of <b>TWO (2) significant change requests.</b>
            <br /><br />
            The commissioner <b>may not request to make significant changes to the commission once they have approved the sketch,</b> as it will otherwise count as a redraw.
            <br />
            <LightHr />
            <b>THINGS THAT DO NOT COUNT AS SIGNIFICANT CHANGES:</b><br />
            There are some things I may not catch while it’s a work in progress, and I do send my WIPs to other artists for critique, but these are still appreciated!<br />
            <br />
            <b>Examples:</b>
            <ul className="list-disc ml-10">
                <li>“The proportions look slightly off” - I may already be aware/working on it but I still appreciate reminders</li>
                <li>“It would be nice if you made this area slightly lighter/darker…” Minor value changes are a-okay.</li>
            </ul><br />
            However, when it comes to technical critique, please try to batch your list of revisions instead of sending them one by one. <b>I will entertain a limit of TWO (2) <u>lists</u> of revisions per major update, which I will communicate.</b> (Typically sketch/render, though I may break the process up into more WIPs for larger commissions. <i>(&gt;100 USD)</i>)
            <br /><br />
            At the end of the day what counts as significant will be up to my discretion, but I will inform you as such.
            <br /><br />
            A redraw of any type of commission will count as a separate commission, and will be charged as such.

        </div>
    </div>
}

const Payment = () => {
    return <div id="payment">
        <Header icon="raphael:dollar">PAYMENT</Header>
        <div>
            All commissions are PayPal only, in <b>USD (American Dollars).</b>
            <br /><br />
            Payments are made via PayPal invoices, which I will send to the commissioner once the price and details of the commission(s) have been approved.
            <br /><br />
            Once the commissioner receives a PayPal invoice:
            <ul className="list-disc ml-10">
                <li>The commissioner has up to one week to make their payment in full.</li>
                <li>Commissions under $100 must be paid up front.</li>
                <li>Commissions exceeding $100 may be paid 50% up front and 50% upon completion.</li>
            </ul>
            <br />
            Please note that I will not begin a commission until payment has been received. <b>If you cannot pay within a week, <span className="text-red-400">please reconsider submitting your request until you can comfortably pay within a week.</span></b>
        </div><LightHr />
        <div className="italic">
            For returning clients, you may opt to pay in the equivalent of <b>SGD</b> or your <b>local currency,</b>&nbsp;
            with the final price and exchange rate agreed upon during time of quotation.
            SGD results in less fees for <u>me</u>, and your local currency results in less fees for <u>you</u>.
            <br /><br />
            Singaporeans may opt to send me money via local payment methods if you so choose, but you accept the risk of no buyer protection.

        </div>
        <LightHr />
    </div>
}


const Licensing = () => {
    return <div id="credits">
        <Header icon="bi:cc-circle-fill">CREDITS & LICENSING</Header>
        <div className="font-jura font-bold text-zinc-200 italic mt-2 text-lg">TO ARTISTS WHO MAY BE REFERENCING THIS ToS FOR THEIR OWN:</div>
        <div className="">The <b>legal wording</b> has been adapted from <u><b><a href="https://virizecommissions.myportfolio.com/terms-of-service">Virize’s ToS</a></b></u>, with permission.<br />
            <br />
            Should you wish to heavily reference this ToS for your own, please reach out to me or her. I myself would be happy to give pointers! I don’t believe in gatekeeping, but I do think proper attribution is important.
            <br /><br />
            It may “just be writing”, but I think citing and crediting sources is important. If you can ask for attribution in art, it’s not too much to ask for the same in writing.
            <br /><br />
            I do not, however, claim credit to any of the ideas in my ToS, because they are a generic set of requests most artists have for their clients.

            <br /><br />
        </div>
        <a
            className="break-all"
            href="https://creativecommons.org/licenses/by-sa/4.0/ "><img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png" className="h-10 opacity-70" /><u>https://creativecommons.org/licenses/by-sa/4.0/</u></a>

    </div>
}


const GeneralTableOfContents = () => {
    let generalToCDict = {
        "gen": {
            id: "general",
            title: "General Information"
        },
        "rights" :{
            id: "rights",
            title:"Image Rights and Usage"
        },
        "guide" :{
            id: "guide",
            title:"Commission Guidelines & Protocols"
        },
        "pay" :{
            id: "payment",
            title:"Payment"
        },
        "cred" :{
            id: "credits",
            title:"Credits & Licensing"
        }
    }
    return <TableOfContents tocDict = {generalToCDict}><br />
        <div className = "flex flex-col space-y-2">
        <a href="https://forms.gle/hepVgfnUVBVBAtNm7">
            <div className={`flex flex-row items-center gap-x-2 text-green-500 
            text-lg bg-zinc-900 rounded-lg w-fit px-2 py-2 font-jura font-bold border-2 border-zinc-500
            transition duration-100
            hover:bg-zinc-700`}>
                <Icon icon="mdi:arrow-right-bold" className="text-lg" />
                <span>Submit your request in the form!</span>
            </div>
        </a>
        </div></TableOfContents>
}

export const GeneralTab = () => {
    
    return <div className="w-full space-y-4">
        <GeneralTableOfContents/>
        <hr />
        <GeneralInfo />
        <hr />
        <ImageRights />
        <hr />
        <Guidelines />
        <hr />
        <Payment />
        <MagicWord />
        <hr />
        <img src = "assets/gangnamsnake.webp"/>
        <hr/>
        <Licensing />

    </div>

}

export default GeneralTab;