import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faClipboard, faHandshake } from '@fortawesome/free-solid-svg-icons'

export function MainAccordion() {
  return (
    <div className="px-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="bg-yellow-400">
          <AccordionTrigger className="justify-center font-bold uppercase">
            <span>
              <FontAwesomeIcon icon={faCheckToSlot} className="px-3"/> 
              Priorities
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="bg-yellow-500">
            <AccordionTrigger className="justify-center font-bold uppercase">
              <span>
                <FontAwesomeIcon icon={faClipboard} style={{color: "#000",}} className="px-3"/> 
                Volunteer 
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="bg-yellow-600">
          <AccordionTrigger className="justify-center font-bold uppercase">
            <span>
              <FontAwesomeIcon icon={faHandshake} className="px-3"/> 
              Contribute
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
