
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { TableOfContents } from '../../components/tosComponents';
import { LightHr, Header } from '../../components/tosComponents';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { React, useState } from "react"
import { useEffect } from "react"

const ImageExample = ({ fileName, portfolioJson, height = "md:h-60" }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }
    let filePath = "assets/pics/" + fileName + "." + portfolioJson[fileName].extension

    return <div>
        <img src={filePath} className={`rounded-md ${height} cursor-pointer border-2 
            border-green-500/0 hover:border-green-500
            m-2

            `} onClick={() => setIsOpen(true)} />
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
                <div className="px-10 flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="duration-50 ease-in 
                            data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div className="flex flex-col items-center justify-center h-screen py-4 gap-y-2">
                            <img src={filePath} className={"max-h-4/5 object-scale-down"} />
                            <div className="text-white">
                                <Link to={{
                                    pathname: "/gallery",
                                    search: `?art=${fileName.replace(" ", "+")}`
                                }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <u>View in Gallery</u>
                                </Link>
                            </div>
                            <Button
                                className="flex items-center justify-center
                                                                            gap-2 rounded-md 
                                                                bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                                                                shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                                                                data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                                                                data-open:bg-gray-700 cursor-pointer select-none"
                                onClick={handleClose}
                            >
                                Close
                            </Button>

                        </div>



                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>

}
const CommExample = ({ title, children, id }) => {
    return <div id={id}>
        <Header> {title}</Header>
        <div>
            {children}

        </div>
    </div>
}

const MoreExamplesAccordion = ({ children }) => {
    return <Accordion className="bg-zinc-900 text-white">
        <AccordionSummary className="font-bold font-jura"> Click for More Examples</AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
}

const ChibiTab = ({ portfolioJson }) => {
    return <CommExample id="chibi" title="Chibi - $45+" portfolioJson={portfolioJson}>
        <div>Chibis have two styles:</div><br />
        <b className="font-jura text-lg">Clean</b>
        <div> Flat/minimally cel shaded by default! However, lines are cleaner and details are evident. More suitable if you want files to print acrylic charms/stickers with (please note commercial fee if not for personal use.)</div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="abel comm sig" portfolioJson={portfolioJson} />
            <ImageExample fileName="rosch comm final" portfolioJson={portfolioJson} />
        </div>
        <b className="font-jura text-lg">Vibrant</b>
        <div> More vibrant/shaded by default, but messier on the details.    </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="rockuma af" portfolioJson={portfolioJson} />
            <ImageExample fileName="niles af" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=illust,chibi&exclude=shitpost`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div>
    </CommExample>
}

const BustTab = ({ portfolioJson }) => {
    return <CommExample id="bust" title="Bust - $60+" portfolioJson={portfolioJson}>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="yammark comm" portfolioJson={portfolioJson} />
            <ImageExample fileName="trunswicked comm with sig" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=illust,bust&exclude=shitpost,animated`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div>
    </CommExample>
}

const HalfbodyTab = ({ portfolioJson }) => {
    return <CommExample id = "halfbody" title="Halfbody - $120+" portfolioJson={portfolioJson}>
        Standard halfbody. Most detailed textures come free (unless stated in Additional Fees), though please specify the level of realism if necessary.
        <br />(e.g. the cat anthros have different levels of fur detail)<br />

        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="danarei comm sig" portfolioJson={portfolioJson} height="md:h-100" />
            <ImageExample fileName="ordell card render 2 finalizing" portfolioJson={portfolioJson} height="md:h-100" />
        </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="quill comm sig" portfolioJson={portfolioJson} height="md:h-65" />
            <ImageExample fileName="rook comm journal with sig" portfolioJson={portfolioJson} height="md:h-65" />
        </div>
        <div>
            <MoreExamplesAccordion>
                <div className="flex flex-row flex-wrap">
                    <ImageExample fileName="siren comm watermark" portfolioJson={portfolioJson} height="md:h-90" />
                </div>
                <div className="flex flex-row flex-wrap">
                    <ImageExample fileName="xuqian doodle" portfolioJson={portfolioJson} height="md:h-65" />
                    <ImageExample fileName="sarkis af" portfolioJson={portfolioJson} height="md:h-65" />
                </div>
                <div><Link to={{
                    pathname: "/gallery",
                    search: `?include=illust,halfbody&exclude=shitpost,animated`
                }}
                    target="_blank"
                    rel="noopener noreferrer"

                >
                    <u>View the full list of examples in the Gallery.</u>
                </Link></div>
            </MoreExamplesAccordion>
        </div>
    </CommExample>
}

const FullbodyTab = ({ portfolioJson }) => {
    return <CommExample id="fullbody" title="Fullbody - $180+" portfolioJson={portfolioJson}>
        Standard fullbody render. Most of the rules from Halfbody apply here, as well.


        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="ekaitz sword unsheathing small" portfolioJson={portfolioJson} height="md:h-100" />
            <ImageExample fileName="duftmon comm siggy" portfolioJson={portfolioJson} height="md:h-100" />
        </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="medabots at" portfolioJson={portfolioJson} height="md:h-65" />
            <ImageExample fileName="nick non af" portfolioJson={portfolioJson} height="md:h-65" />
        </div>
        <MoreExamplesAccordion>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="digigirl phoenixmon" portfolioJson={portfolioJson} height="md:h-90" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="more dell wings render" portfolioJson={portfolioJson} height="md:h-65" />
                <ImageExample fileName="check out this sick new skell" portfolioJson={portfolioJson} height="md:h-65" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="slashy comm watermark" portfolioJson={portfolioJson} height="md:h-90" />
            </div>
            <div><Link to={{
                pathname: "/gallery",
                search: `?include=illust,fullbody&exclude=shitpost,animated`
            }}
                target="_blank"
                rel="noopener noreferrer"
            >
                <u>View the full list of examples in the Gallery.</u>
            </Link></div>
        </MoreExamplesAccordion>
    </CommExample>
}

const RefSheetsTab = ({ portfolioJson }) => {
    return <CommExample id="refsheet" title="Reference Sheets ($400-500+)" portfolioJson={portfolioJson}>
        Reference sheets! Can just be front/back flats, or even shaded. (More $$$ for shaded.)
        Please ask me for a quote so we can discuss. <br />
        Unlike what's stated in the ToS, I will likely have a back-and-forth with you to finalize details.<br /><br />

        If designing a character from scratch, there'll be an extra fee. Reference images/moodboards GREATLY preferred. I am unlikely to take on your commission if your request is unclear.

        Can basically work with any species. Humans, anthros, mechs...

        <br /><br />However, please see the below guidelines.
        <br /><br />

        <Accordion className="bg-zinc-900 text-zinc-300">
            <AccordionSummary className="font-bold font-jura text-white">Considering a Reference Sheet? Click to see some guidelines...</AccordionSummary>
            <AccordionDetails>

                Communication is hard! Here are my guidelines so we can <b>keep things smooth:</b><br />
                <div className="mt-2">
                    <li>Do NOT send me non-cohesive moodboards (e.g. no set theme). </li>

                    <li>TRY to narrow it down to 2-3 images per ‘feature’ (e.g. clothes, body type, aesthetic). </li>

                    <li>TRY NOT to send a ‘vibe’ that’s a variety of characters from different genres/settings
                        (e.g. fantasy, sci-fi, varying cultures…all as a singular ‘vibe’)
                        unless you add an explanation for it. (e.g. “I’d like you to pull from fantasy knight armor but add Chinese bronze motifs to the gold trims”).
                        <li className="ml-5">Sending me all your favourite fictional characters without elaboration will
                            usually not be entertained unless there’s a key theme/aesthetic I can draw from it.</li>
                    </li>

                    <li>Do NOT send me a text wall. Keep it structured. E.g. 2-3 short paragraphs for personality or backstory. Keep it relevant to the design. </li>

                </div>
                <br />
                I don’t want to impose a hard limit on what you can describe, so use your own judgment. The above guidelines are a good place to start.
                <br /><br />
                If you do not have the artistic vocabulary, and you’ve largely followed the above guidelines,
                YES you may ask me for my input. I’m more than willing to work with you. But I will not entertain requests that lack a clear vision, because I can’t read your mind!

            </AccordionDetails>
        </Accordion>

        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="chuji updated ref 2025" portfolioJson={portfolioJson} height="md:h-100" />

        </div>
    </CommExample>
}

const BGTab = ({ portfolioJson }) => {
    return <CommExample id="background" title="Backgrounds" portfolioJson={portfolioJson}>
        <b className="font-jura text-lg">Simple BG ($20+)</b>
        <div> Loose, painterly backgrounds.</div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="valen bagua study" portfolioJson={portfolioJson} />
            <ImageExample fileName="chopper comm" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=simplebg&exclude=shitpost,animated`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div><br />
        <b className="font-jura text-lg">Complex BG ($150+)</b>
        <div> Detailed painterly backgrounds with compositional elements or complex geometric forms. </div>
        <div>Layman rule of thumb: if you require accurate perspective, it goes here.</div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="armory alley redraw" portfolioJson={portfolioJson} />
            <ImageExample fileName="skell sylvalum big ball" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=complexbg&exclude=shitpost,animated`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div>
    </CommExample>
}

const SpritesTab = ({ portfolioJson }) => {
    return <CommExample id="sprite" title="Other: Sprites & Animated Portraits" portfolioJson={portfolioJson}>
        In general, I'm able to entertain any weird request you'd like, as long as it follows my guidelines (no NSFW).<br /><br />
        I'm an experienced artist (both illustration and pixelart), and can adapt to a variety of styles. However, you may see an additional 'Artstyle' charge, because it does take a bit of effort to draw outside my usual style!
        <br /><br />Please feel free to ask me anything, and I'll give you a quote. <br />
        <br />
        Under this section are quotes for the most common requests.
        <br /><br />

        <b className="font-jura text-2xl">Fire Emblem Portraits</b><br />
        Fire Emblem portraits! I can make them compatible with game insertion, but there will be an additional charge for spritesheet formatting. (Yes, including the Tellius ones :))
        <br /><br />
        <b className="font-jura text-lg">Tellius Portraits (PoR, RD)</b>
        <div>
            <b>Quote Breakdown:</b><br />
            Halfbody fee: $120+<br />
            Artstyle: +$60<br />
            Animation (just the eyes and mouth): +$20<br />

            Total: $200+
        </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="ocre-fe9-comm-neutral" portfolioJson={portfolioJson} />
            <ImageExample fileName="stokori comm 1 anim" portfolioJson={portfolioJson} />
            <ImageExample fileName="stokori comm 2 anim" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=animated,fireemblem&exclude=pixelart`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div><br />
        <b className="font-jura text-lg">FE Sprite Portraits (FE4-8)</b>
        <div>
            <b>Quote Breakdown:</b><br />
            Bust: $60+<br />
            Artstyle: +$40<br />
            Animation: +$20 (just the eyes and mouth)<br />

            Total: $120+
        </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="danarei comm sprite for publishing" portfolioJson={portfolioJson} />
            <ImageExample fileName="TalkAnim" portfolioJson={portfolioJson} />
            <ImageExample fileName="Tina_FE5" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=fireemblem,pixelart`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div><br />

        <b className="font-jura text-2xl">PMD</b><br />
        Quotes are just for portraits for now. Everything A-OK, from humans to mecha :)<br />
        <i>(I have experience with overworld sprites, but a full set is very tedious to make, so we'll discuss if you want a quote.)</i>
        <br /><br />

        <b className="font-jura text-lg">PMD Portraits</b>
        <div>
            <b>Quote Breakdown:</b><br />
            Initial First Portrait - $80<br/>
            Portrait + ~2-4 Selected Expressions (less body language) - $100<br/>
            Portrait + ~2-4 Selected Expressions (more body language) - $120<br/>
            Portrait + All Expressions (less body language) - $180<br/>
            Portrait + All Expressions (more body language) $220<br/>
            <b>May go higher depending on character complexity!</b><br/><br/>
            'Body language' refers to whether a character emotes more in their sprite (head tilt, limbs waving). 
            'Less body language' means mostly a copy+paste of the initial sprite with different facial expressions.
            <br/><br/>

        </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="metalgreymon pmd comm 500x" portfolioJson={portfolioJson} />
            <ImageExample fileName="majima spritesheet large" portfolioJson={portfolioJson} />
            <ImageExample fileName="sebastien pmd comm watermark" portfolioJson={portfolioJson} />
            <ImageExample fileName="pick pmd comm large watermarked" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=pmd`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div><br />
    </CommExample>
}
export const ExampleTab = ({ portfolioJson, setCurrentTab }) => {
    return <div className="w-full space-y-4">
        <Header>Examples </Header>
        <TableOfContents tocDict={{
            "chibi": {
                id: "chibi",
                title: "Chibi - $45+"
            },
            "bust": {
                id: "bust",
                title: "Bust- $60+"
            },
            "half": {
                id: "halfbody",
                title: "Halfbody - $120+"
            },
            "full": {
                id: "fullbody",
                title: "Fullbody - $180+"
            },
            "ref": {
                id: "refsheet",
                title: "Reference Sheet - $400-500"
            },
            "bg": {
                id: "background",
                title: "Backgrounds"
            },
            "sprite": {
                id: "sprite",
                title: "Other: Sprites & Animated Portraits"
            }

        }}><br />
            <p>The following shows various examples of art offered.</p>
            <p>Price quoted is base price, though some of these examples are more detailed and may cost more. </p>
            <p>Please see <u className = "cursor-pointer" onClick = {() => setCurrentTab("fees")}>'Additional Fees'</u> for more information!</p>
            <br />
            <p>You can also <b className = "text-green-500">click on the images</b> to see a larger preview!</p>

        
                <Link to="/gallery">
                    <div className={`flex flex-row items-center gap-x-2 text-green-500 mt-2
                    text-lg bg-zinc-900 rounded-lg w-fit px-2 py-2 font-jura font-bold border-2 border-zinc-500
                    transition duration-100
                    hover:bg-zinc-700`}>
                        <Icon icon="mdi:arrow-right-bold" className="text-lg" />
                        <span>View more examples in the Gallery.</span>
                    </div>
                </Link>
        </TableOfContents>
        <hr />
        <ChibiTab portfolioJson={portfolioJson} />
        <hr />
        <BustTab portfolioJson={portfolioJson} />
        <hr />
        <HalfbodyTab portfolioJson={portfolioJson} />
        <hr />
        <FullbodyTab portfolioJson={portfolioJson} />
        <hr />
        <RefSheetsTab portfolioJson={portfolioJson} />
        <hr />
        <BGTab portfolioJson={portfolioJson} />
        <hr />
        <SpritesTab portfolioJson={portfolioJson} />
        <hr />

        <CommExample id="artcrit" title="BONUS: Art Critique" portfolioJson={portfolioJson}>
            Send me your art! You can just drop money into my <a href="https://ko-fi.com/errantsquam">Ko-fi</a> and we’ll talk.

            <br /><br />
            I usually give my best feedback if you:
            <ul className="list-disc ml-10">
                <li>provide the references you used</li>
                <li>give me a gist of what you’re going for</li>
                <li>tell me what you want to improve on.</li>
            </ul>

            Redlines can be provided.<br /><br />

            We’ll have a back and forth for as long as you need to work on the piece. However, I reserve the right to end a conversation if it is no longer productive (e.g. idle chatter).<br />
            <br />
            <i className="text-xs">If you’re a mutual, just drop into my DMs, honestly. I’ll do it for free.   </i>



        </CommExample>




    </div>
}

export default ExampleTab