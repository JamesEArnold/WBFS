import Image from "next/image"

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-wider text-black uppercase md:text-5xl">ABOUT SHERIFF WEISBURN</h1>
          <div className="h-1 w-32 bg-[#fcd34b] mx-auto mb-4"></div>
          <p className="max-w-3xl mx-auto text-xl">A proven leader with a dedication to public service and community safety.</p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="section-title">BIOGRAPHY</h2>
              <p className="mb-4">Thank you for taking the time to learn more about me and my career with the Stark County Sheriff's Office.</p>
              <p className="mb-4">I am a lifetime resident of Stark County. Growing up in a small town, my parents Jack and Maxine instilled upon me at a young age the importance of service to our community. At 16 years old, I started my career of service as a firefighter for the Waynesburg Volunteer Fire Department…eventually rising to the rank of Fire Chief as my father and brother had done before me. I also aided my community as an EMT with Quad ambulance.</p>
              <p>Sheriff Weisburn has proven experience and commitment to the citizens of Stark County. With his strong sense of duty, he will always lead the Sheriff's Office from the frontline. Place your trust in Sheriff Weisburn. He is the right choice… a Sheriff who works for <span className="relative inline-block px-2"><span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span><span className="relative font-bold text-black">YOU!</span></span></p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 transform translate-x-2 translate-y-2 bg-black rounded-lg rotate-2"></div>
                <div className="relative w-full max-w-md overflow-hidden bg-gray-200 border-4 border-black rounded-lg shadow-xl">
                  <Image
                    src="/weisburn-family-2-min.jpg"
                    width={600}
                    height={400}
                    alt="Sheriff Weisburn with family"
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="text-center section-title">CAREER TIMELINE</h2>
          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">1991</h3>
              <p className="mb-4">My career in law enforcement started when I was hired as a Corrections Officer for the Stark County Sheriff's Office. In that position, I was responsible for the safety and security of the inmates held within the jail. I was often assigned to the mental health wing of the jail, where I saw first-hand the mental health struggles so many inmates deal with and the devastating effects it has on them and our community. I strongly believe early intervention with mental health services is crucial for the betterment of both the inmate and society.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">1998</h3>
              <p className="mb-4">I completed the police officer academy and was assigned to the patrol division. While in this division, I traveled throughout Stark County responding to every type of call imaginable. I had several specialized assignments, including being the first SRO (School Resource Officer) for Plain Local School District, where I served for three years. I was then selected to be the Investigator for child sexual and physical abuse cases, working closely with case workers, prosecutors and other police agencies to successfully arrest and incarcerate the monsters who abuse children. Our mission was to always bring any resemblance of justice to the victims and families.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">2005</h3>
              <p className="mb-4">I was promoted to Sergeant where I continued to serve the citizens of Stark County as a shift supervisor. I was responsible for the safety of not only the citizens of the county, but for the deputies who served under my command. It was a true honor to supervise professional and dedicated deputies, who worked together to protect and serve the citizens of Stark County.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">2007</h3>
              <p className="mb-4">I was the lead investigator in the missing person case of Jessie Marie Davis, who was in her final month of pregnancy when she was murdered. Her body was taken to another location and her two-year-old son was left at home alone for two days forced to survive on his own. I worked closely with deputies and countless other federal, state and local agencies to find the suspects responsible for the deaths of Jessie and her unborn daughter, Chloe. So many lives were destroyed in this incident and the pain will last forever for those affected. But someone had to go to prison, I had no problem putting him there.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">2016</h3>
              <p className="mb-4">I was promoted to Lieutenant and was transferred to the corrections division and served as an Assistant Jail Commander. I was involved in all aspects of jail management and the daily operations of the correction division. Furthermore, in this position I ensured the Sheriff's Office was compliant with the minimum jail standards for Ohio set by the Department of Rehabilitation and Corrections, along with local fire and health codes.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">2022</h3>
              <p className="mb-4">After a rewarding 31 years, I retired from the Stark County Sheriff's Office.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">2024</h3>
              <p className="mb-4">Team Weisburn for Sheriff worked tirelessly all summer to share Eric Weisburn's vision and why he was the right choice for Sheriff. From parades and festivals to community events, we connected with voters across Stark County. On November 5th, the people spoke—choosing Eric Weisburn to lead the Sheriff's Office in a new direction.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">Currently</h3>
              <p className="mb-4">Sheriff Eric Weisburn began his term January 6, 2025. Sheriff Weisburn is honored to serve as <span className="relative inline-block px-2"><span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span><span className="relative font-bold text-black">YOUR</span></span> Sheriff of Stark County. Thank you for your trust and support, we won the election in November 2024, but the fight to keep Stark County safe is far from over. Please consider contributing today to support Weisburn For Sheriff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accomplishments */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-center section-title">ACCOMPLISHMENTS & VISION</h2>
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">FIRST TERM</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Reduced violent crime through strategic deployment and community policing</li>
                <li>Modernized department equipment and technology</li>
                <li>Established youth outreach programs in all county school districts</li>
                <li>Implemented comprehensive training programs for all department personnel</li>
                <li>Secured grants for community safety initiatives</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">VISION FOR NEXT TERM</h3>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Expand mental health response team for crisis interventions</li>
                <li>Enhance rural patrol coverage and emergency response times</li>
                <li>Develop advanced training facility for regional law enforcement</li>
                <li>Strengthen partnerships with neighboring jurisdictions</li>
                <li>Implement citizen advisory committee for community input</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h3 className="section-title">A PERSONAL NOTE</h3>
              <p className="mb-4">Respectfully,</p>
              <div className="relative w-48 h-24 mb-5 overflow-hidden">
                <Image
                  src="/signature.png"
                  width={300}
                  height={100}
                  alt="Signature of Sheriff Weisburn"
                  className="object-contain"
                />
              </div>
              <p className="text-xl font-bold">Eric Weisburn</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 transform translate-x-2 translate-y-2 bg-black rounded-lg rotate-2"></div>
                <div className="relative w-full max-w-md overflow-hidden bg-gray-200 border-4 border-black rounded-lg shadow-xl">
                  <Image
                    src="/weisburn-grandkids-min.jpg"
                    width={600}
                    height={400}
                    alt="Sheriff Weisburn with family"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
