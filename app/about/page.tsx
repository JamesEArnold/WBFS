import Image from "next/image"

export default function Home() {
  return (
    <main className="relative flex flex-col max-w-full my-8 md:mx-auto md:max-w-5xl">
      <div className="flex">
        <div>
          <div className="absolute z-20 max-w-3xl mx-auto md:top-80 md:left-7 left-7 top-64">
            <h2 className="px-3 font-semibold tracking-widest uppercase bg-white">
              about me
            </h2>
            <h2 className="px-3 py-3 text-3xl font-extrabold uppercase bg-yellow-400">
              meet&nbsp;
              <br className="hidden"/> 
              GOP Candidate 
              <br /> 
              eric weisburn
            </h2>
          </div>
          <div className="relative max-h-[50rem] md:h-[24rem] w-full h-full overflow-hidden">
            <Image
                src="/weisburn-family-min.jpg"
                width="0"
                height="0"
                sizes="100vw"
                className="relative w-full h-full scale-125"
                alt="Weisburn for Sheriff Hero Image"
                />
          </div>
        </div>
        <div className="hidden max-w-xs mt-5 ml-20 text-justify md:block">
          <span>
            Thank you for taking the time to learn more about me and why I am committed to becoming
            <span className="relative mx-2">
              <span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span>
              <span className="relative font-bold text-black">YOUR</span>
            </span>
            Sheriff!!
            <br />
            <br />
            I am a lifetime resident of Stark County. Growing up in a small town, my parents Jack and Maxine
            instilled upon me at a young age the importance of service to our community. At 16 years old, I started
            my career of service as a firefighter for the Waynesburg Volunteer Fire Department…eventually rising to
            the rank of Fire Chief as my father and brother had done before me. I also aided my community as an
            EMT with Quad ambulance.
          </span>
        </div>
      </div>
      <div className="flex flex-col mx-10 mt-20 text-justify">
        <section>
        <div className="block mt-10 text-justify md:hidden">
          <span>
            Thank you for taking the time to learn more about me and why I am committed to becoming
            <span className="relative mx-2">
              <span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span>
              <span className="relative font-bold text-black">YOUR</span>
            </span>
            Sheriff!!
            <br />
            <br />
            I am a lifetime resident of Stark County. Growing up in a small town, my parents Jack and Maxine
            instilled upon me at a young age the importance of service to our community. At 16 years old, I started
            my career of service as a firefighter for the Waynesburg Volunteer Fire Department…eventually rising to
            the rank of Fire Chief as my father and brother had done before me. I also aided my community as an
            EMT with Quad ambulance.
          </span>
        </div>
        </section>
        <section className="mt-10 md:mt-0">
          <h1 className="text-4xl font-bold">1991</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <span>
          My career in law enforcement started when I was hired as a Corrections Officer for the Stark
  County Sheriff’s Office. In that position, I was responsible for the safety and security of the inmates held
  within the jail. I was often assigned to the mental health wing of the jail, where I saw first-hand the
  mental health struggles so many inmates deal with and the devastating effects it has on them and our
  community. I strongly believe early intervention with mental health services is crucial for the
  betterment of both the inmate and society.
          </span>
        </section>
        <section className="mt-10">
          <h1 className="text-4xl font-bold">1998</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <span className="">
          I completed the police officer academy and was assigned to the patrol division. While in this
division, I traveled throughout Stark County responding to every type of call imaginable. I had several
specialized assignments, including being the first SRO (School Resource Officer) for Plain Local School
District, where I served for three years. I was then selected to be the Investigator for child sexual and
physical abuse cases, working closely with case workers, prosecutors and other police agencies to
successfully arrest and incarcerate the monsters who abuse children. Our mission was to always bring
any resemblance of justice to the victims and families.
          </span>
        </section>
        <section className="mt-10">
          <h1 className="text-4xl font-bold">2005</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <span className="">
          I was promoted to Sergeant where I continued to serve the citizens of Stark County as a shift
supervisor. I was responsible for the safety of not only the citizens of the county, but for the deputies
who served under my command. It was a true honor to supervise professional and dedicated deputies,
who worked together to protect and serve the citizens of Stark County.
          </span>
        </section>
        <section className="mt-10">
          <h1 className="text-4xl font-bold">2007</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <span className="">
          I was the lead investigator in the missing person case of Jessie Marie Davis, who was in her final
month of pregnancy when she was murdered. Her body was taken to another location and her two-
year-old son was left at home alone for two days forced to survive on his own. I worked closely with
deputies and countless other federal, state and local agencies to find the suspects responsible for the
deaths of Jessie and her unborn daughter, Chloe. So many lives were destroyed in this incident and the
pain will last forever for those affected. But someone had to go to prison, I had no problem putting him
there.
          </span>
        </section>
        <section className="mt-10">
          <h1 className="text-4xl font-bold">2016</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <span className="">
          I was promoted to Lieutenant and was transferred to the corrections division and served as an
Assistant Jail Commander. I was involved in all aspects of jail management and the daily operations of
the correction division. Furthermore, in this position I ensured the Sheriff’s Office was compliant with
the minimum jail standards for Ohio set by the Department of Rehabilitation and Corrections, along with
local fire and health codes.
          </span>
        </section>
        <section className="mt-10">
          <h1 className="text-4xl font-bold">2022</h1>
          <hr className="w-3/4 mt-2 mb-4 border border-yellow-400" />
          <span className="">
          After a rewarding 31 years, I retired from the Stark County Sheriff’s Office.
          As a life-long first responder and dedicated law enforcement officer, I am humbling asking for your
          support so I can continue to protect Stark County… 
          <br />
          <br />
          <span className="text-xl font-bold">as             <span className="relative mx-2">
              <span className="absolute block -skew-y-3 bg-yellow-400 -inset-1" aria-hidden="true"></span>
              <span className="relative font-bold text-black">YOUR</span>
            </span> newly elected Sheriff.</span>
          </span>
        </section>
        <section className="my-20">
        <span className="text-xl font-bold">
        Respectfully,
        </span>
        <br />
        <div className="relative max-h-[50rem] md:h-1/4 md:w-1/4 h-1/2 w-1/2 overflow-hidden mb-5">
            <Image
                src="/signature.png"
                width="0"
                height="0"
                sizes="100vw"
                className="relative w-full h-full"
                alt="Weisburn for Sheriff Hero Image"
                />
          </div>
        <span className="text-xl font-bold">
        Eric Weisburn
        </span>
        </section>
      </div>
    </main>
  )
};
