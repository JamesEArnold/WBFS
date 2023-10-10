import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faClipboard, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { VolunteerSignupForm } from "./ui/volunteer-signup"

export function MainAccordion() {
  return (
    <div className="px-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="bg-yellow-400">
          <AccordionTrigger className="justify-center font-bold uppercase">
            <span>
              <FontAwesomeIcon icon={faCheckToSlot} className="px-3"/> 
              Events
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 text-lg text-center">
            Check back in the near future for events.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-[#fbd43b]">
            <AccordionTrigger className="justify-center font-bold uppercase">
              <span>
                <FontAwesomeIcon icon={faClipboard} style={{color: "#000",}} className="px-3"/> 
                Volunteer 
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-3 text-lg text-center">
            I need boots on the ground. Stand by my side as I fight for a better Stark County.
            Let our voices be heard.
            <br />
            <br />
            Are <span className="font-bold">YOU</span> with me?  

            <VolunteerSignupForm />          
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="bg-[#fcdd62]">
          <AccordionTrigger className="justify-center font-bold uppercase">
            <span>
              <FontAwesomeIcon icon={faHandshake} className="px-3"/> 
              Contribute
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 text-lg text-center">
          Your donation <span className="font-bold">WILL</span> make a huge impact.
          <br />
          <br />
Thank you for your Support.          
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
